#!/usr/bin/env node
// Put a screenshot on the `shots` branch and print the line that embeds it in a pull request.
//
//   node scripts/publish-shot.mjs <file.png> <path/on/shots/branch.png> ["alt text"]
//
// The upload goes through the GitHub contents API, so nothing is checked out, fetched or
// switched locally, and the PNG is stored as a plain blob rather than a Git LFS pointer.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const BRANCH = 'shots';
const [file, destination, alt] = process.argv.slice(2);

if (!file || !destination) {
  console.error('Usage: node scripts/publish-shot.mjs <file.png> <path/on/shots/branch.png> [alt]');
  process.exit(2);
}

function gh(args, { input, quiet } = {}) {
  return execFileSync('gh', args, {
    input,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['pipe', 'pipe', quiet ? 'ignore' : 'inherit'],
  });
}

function identity() {
  const name = process.env.GIT_AUTHOR_NAME ?? execFileSync('git', ['config', 'user.name']);
  const email = process.env.GIT_AUTHOR_EMAIL ?? execFileSync('git', ['config', 'user.email']);
  return { name: String(name).trim(), email: String(email).trim() };
}

const repo = JSON.parse(gh(['repo', 'view', '--json', 'nameWithOwner'])).nameWithOwner;
const path = destination.replace(/^\/+/, '');
const who = identity();

// An existing path needs its blob sha, otherwise the API refuses to overwrite it.
let sha;
try {
  const existing = gh(['api', `repos/${repo}/contents/${path}?ref=${BRANCH}`], { quiet: true });
  sha = JSON.parse(existing).sha;
} catch {
  sha = undefined;
}

gh(['api', '-X', 'PUT', `repos/${repo}/contents/${path}`, '--input', '-'], {
  input: JSON.stringify({
    branch: BRANCH,
    message: `shot: ${path}`,
    content: readFileSync(file).toString('base64'),
    author: who,
    committer: who,
    sha,
  }),
});

const url = `https://raw.githubusercontent.com/${repo}/${BRANCH}/${path}`;
console.log(`![${alt ?? path}](${url})`);
