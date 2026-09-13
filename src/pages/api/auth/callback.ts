import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE } from '../../../config.ts';
import { localizedPath } from '../../../i18n/utils.ts';
import { callbackUrl, exchangeCode, fetchViewer } from '../../../lib/github.ts';
import { readSecrets } from '../../../lib/secrets.ts';
import {
  clearCookie,
  cookieOptions,
  OAUTH_COOKIE,
  readOauthState,
  redirectResponse,
  SESSION_COOKIE,
  SESSION_TTL,
  seal,
} from '../../../lib/session.ts';

export const prerender = false;

/**
 * GitHub sends the person back here. Anything that does not add up ends on the request page
 * with `?error=auth` and nothing else: no GitHub response ever reaches the address bar.
 */
export const GET: APIRoute = async ({ url, cookies }) => {
  const secrets = readSecrets();
  if (!secrets) return new Response('Sign-in is not configured.', { status: 503 });

  const stored = await readOauthState(cookies, secrets.sessionSecret);
  clearCookie(cookies, OAUTH_COOKIE, url);
  const locale = stored?.locale ?? DEFAULT_LOCALE;
  const fail = () => redirectResponse(localizedPath(locale, '/request/?error=auth'));

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!stored || !code || !state || state !== stored.state) return fail();

  try {
    const token = await exchangeCode({
      clientId: secrets.clientId,
      clientSecret: secrets.clientSecret,
      code,
      redirectUri: callbackUrl(url),
    });
    if (!token) return fail();
    const viewer = await fetchViewer(token);
    if (!viewer) return fail();

    const sealed = await seal(secrets.sessionSecret, SESSION_COOKIE, {
      login: viewer.login,
      token,
      exp: Date.now() + SESSION_TTL * 1000,
    });
    cookies.set(SESSION_COOKIE, sealed, cookieOptions(url, SESSION_TTL));
  } catch {
    return fail();
  }

  return redirectResponse(localizedPath(locale, '/request/'));
};

export const ALL: APIRoute = () => new Response('Use GET.', { status: 405 });
