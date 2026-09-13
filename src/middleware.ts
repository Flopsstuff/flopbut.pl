import { defineMiddleware } from 'astro:middleware';
import { SITE_URL } from './config.ts';

const canonicalHost = new URL(SITE_URL).host;

/**
 * The worker also answers on www.flopbut.pl and on workers.dev. The sign-in only works on the
 * apex: that is the registered OAuth callback, and cookies set on another host would never
 * reach it. Static pages never get here (assets answer first), so this only touches the SSR
 * routes, which is exactly the set that needs it. Local hosts are left alone for `wrangler dev`.
 */
export const onRequest = defineMiddleware((context, next) => {
  const { url } = context;
  const local = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (!context.isPrerendered && !import.meta.env.DEV && !local && url.host !== canonicalHost) {
    return context.redirect(`${SITE_URL}${url.pathname}${url.search}`, 301);
  }
  return next();
});
