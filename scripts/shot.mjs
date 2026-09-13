#!/usr/bin/env node
// Full-page screenshot of a running page, for the visual proof a pull request carries.
//
//   node scripts/shot.mjs <url> <out.png> [--width 1280] [--dpr 2] [--selector "#id"]
//                                         [--theme dark|light] [--wait 400]
//
// Drives the system Chromium over CDP: no Playwright, no Puppeteer, no extra dependency.

import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const BROWSERS = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'];

function usage(message) {
  console.error(`${message}\n\nUsage: node scripts/shot.mjs <url> <out.png> [options]`);
  process.exit(2);
}

function parseArgs(argv) {
  const positional = [];
  const options = { width: 1280, dpr: 2, wait: 400, selector: null, theme: 'dark' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (value === undefined) usage(`Option --${key} needs a value.`);
    i += 1;
    if (key === 'width' || key === 'dpr' || key === 'wait') options[key] = Number(value);
    else if (key === 'selector' || key === 'theme') options[key] = value;
    else usage(`Unknown option --${key}.`);
  }
  if (positional.length !== 2) usage('Expected a URL and an output path.');
  if (options.theme !== 'dark' && options.theme !== 'light') usage('--theme is dark or light.');
  return { url: positional[0], out: resolve(positional[1]), ...options };
}

// A binary that is not installed reports itself through an 'error' event on the next tick, not
// through a missing pid, and an 'error' nobody listens for is an uncaught exception. The listener
// stays on for the child's whole life, because a kill that fails raises the same event.
function trySpawn(binary, flags) {
  return new Promise((fulfil) => {
    const child = spawn(binary, flags, { stdio: ['ignore', 'ignore', 'pipe'] });
    child.on('error', () => fulfil(null));
    child.once('spawn', () => fulfil(child));
  });
}

async function launch(profileDir) {
  const flags = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--user-data-dir=${profileDir}`,
    '--remote-debugging-port=0',
    'about:blank',
  ];
  for (const binary of BROWSERS) {
    const child = await trySpawn(binary, flags);
    if (child) return child;
  }
  throw new Error(`No browser found, tried: ${BROWSERS.join(', ')}`);
}

function waitForEndpoint(child) {
  return new Promise((fulfil, reject) => {
    let stderr = '';
    const timer = setTimeout(() => reject(new Error('Browser never opened a CDP port.')), 30_000);
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      const match = stderr.match(/ws:\/\/[^\s]+/);
      if (!match) return;
      clearTimeout(timer);
      fulfil(match[0]);
    });
    child.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Browser exited with ${code}:\n${stderr}`));
    });
  });
}

// A browser that died on its own emits no second 'exit', and one that ignores the term never
// emits a first: either way, waiting on the event alone is a wait that can last forever.
function stop(child) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((done) => {
    const forced = setTimeout(() => child.kill('SIGKILL'), 2_000);
    child.once('exit', () => {
      clearTimeout(forced);
      done();
    });
    child.kill();
  });
}

// One request/response pair per CDP command, with events routed to whoever is waiting.
function connect(endpoint) {
  return new Promise((fulfil, reject) => {
    const socket = new WebSocket(endpoint);
    const pending = new Map();
    const listeners = new Map();
    let nextId = 1;
    let closed = null;
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const { fulfil: ok, reject: fail } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) fail(new Error(message.error.message));
        else ok(message.result);
        return;
      }
      const listener = listeners.get(message.method);
      if (listener) {
        listeners.delete(message.method);
        listener(message.params);
      }
    });
    socket.addEventListener('error', () => reject(new Error(`CDP connection failed: ${endpoint}`)));
    // A browser that dies mid-capture takes the socket with it. Without this every command still
    // in flight stays pending for good, the event loop empties, and node walks out on an
    // unsettled await - past the cleanup that would have killed the browser and swept the profile.
    socket.addEventListener('close', () => {
      closed = new Error(`CDP connection closed: ${endpoint}`);
      for (const waiting of pending.values()) waiting.reject(closed);
      pending.clear();
      reject(closed);
    });
    socket.addEventListener('open', () =>
      fulfil({
        send(method, params = {}) {
          if (closed) return Promise.reject(closed);
          const id = nextId;
          nextId += 1;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((ok, fail) => pending.set(id, { fulfil: ok, reject: fail }));
        },
        once(method, timeout) {
          return new Promise((ok) => {
            const timer = setTimeout(ok, timeout);
            listeners.set(method, () => {
              clearTimeout(timer);
              ok();
            });
          });
        },
        close: () => socket.close(),
      }),
    );
  });
}

async function capture(page, { url, width, dpr, wait, selector, theme }) {
  await page.send('Page.enable');
  await page.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-color-scheme', value: theme }],
  });
  // The site reads its theme from localStorage, not from the media query.
  await page.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `try { localStorage.setItem('theme', ${JSON.stringify(theme)}); } catch {}`,
  });
  await page.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: dpr,
    mobile: false,
  });
  const loaded = page.once('Page.loadEventFired', 30_000);
  await page.send('Page.navigate', { url });
  await loaded;
  await new Promise((done) => setTimeout(done, wait));
  // The dev server injects a toolbar that floats over the page and would land in the proof.
  await page.send('Runtime.evaluate', {
    expression: "document.querySelector('astro-dev-toolbar')?.remove()",
  });

  const { cssContentSize } = await page.send('Page.getLayoutMetrics');
  let clip = { x: 0, y: 0, width, height: Math.ceil(cssContentSize.height), scale: 1 };
  if (selector) {
    const { result } = await page.send('Runtime.evaluate', {
      expression: `(() => {
        const node = document.querySelector(${JSON.stringify(selector)});
        if (!node) return null;
        const box = node.getBoundingClientRect();
        return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
      })()`,
      returnByValue: true,
    });
    if (!result.value) throw new Error(`Nothing matched ${selector} on ${url}`);
    clip = { ...result.value, scale: 1 };
  }

  const { data } = await page.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip,
  });
  return { data, clip };
}

const options = parseArgs(process.argv.slice(2));
const profileDir = await mkdtemp(join(tmpdir(), 'flopbut-shot-'));
let child;
let browser;
try {
  child = await launch(profileDir);
  const browserSocket = await waitForEndpoint(child);
  browser = await connect(browserSocket);
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const targets = await fetch(
    `${browserSocket.replace(/^ws/, 'http').split('/devtools')[0]}/json/list`,
  );
  const target = (await targets.json()).find((entry) => entry.id === targetId);
  const page = await connect(target.webSocketDebuggerUrl);
  const { data, clip } = await capture(page, options);
  await mkdir(dirname(options.out), { recursive: true });
  await writeFile(options.out, Buffer.from(data, 'base64'));
  page.close();
  console.log(
    `${options.out} - ${clip.width}x${Math.round(clip.height)} css px at ${options.dpr}x`,
  );
} finally {
  browser?.close();
  if (child) await stop(child);
  await rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
