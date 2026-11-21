import { handle } from '@astrojs/cloudflare/handler';
import { AGENTS_URL, LOCALES } from './config.ts';

const agentsHost = new URL(AGENTS_URL).host;

/** `/`, `/ru/`, `/pl/` on the agents host, `/agents/`, `/ru/agents/`, `/pl/agents/` everywhere else. */
const prefixes = LOCALES.map((locale) => (locale === 'en' ? '/' : `/${locale}/`));

/**
 * One worker answers on flopbut.pl, www and agents.flopbut.pl. The crew page is built once,
 * under /agents/, and the agents host shows it at its own root: a request for `/` there is
 * answered with the `/agents/` asset. The same page reached through the apex is sent to the
 * subdomain so it only has one address. Only the paths listed in `run_worker_first`
 * (wrangler.jsonc) reach this code; every other asset is served before the worker runs.
 */
/*
  Typed by hand rather than with `wrangler types`, for the reason given in src/env.d.ts.
  ASSETS is the only binding read here; the rest of the env goes to Astro untouched.
*/
type AstroEnv = Parameters<typeof handle>[1];
type AstroContext = Parameters<typeof handle>[2];
interface WorkerEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: AstroContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.host === agentsHost && prefixes.includes(url.pathname)) {
      const asset = new URL(`${url.pathname}agents/`, url);
      return env.ASSETS.fetch(new Request(asset, request));
    }

    const prefix = prefixes.find((p) => url.pathname === `${p}agents/`);
    const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (prefix && url.host !== agentsHost && !local) {
      return Response.redirect(`${AGENTS_URL}${prefix}${url.search}`, 301);
    }

    return handle(request, env as unknown as AstroEnv, ctx) as unknown as Promise<Response>;
  },
};
