import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE } from '../../../config.ts';
import { isLocale } from '../../../i18n/utils.ts';
import { callbackUrl } from '../../../lib/github.ts';
import { readSecrets } from '../../../lib/secrets.ts';
import {
  cookieOptions,
  OAUTH_COOKIE,
  OAUTH_TTL,
  randomHex,
  redirectResponse,
  seal,
} from '../../../lib/session.ts';

export const prerender = false;

/** Starts the GitHub sign-in. The locale rides along in the sealed state cookie. */
export const GET: APIRoute = async ({ url, cookies }) => {
  const secrets = readSecrets();
  if (!secrets) return new Response('Sign-in is not configured.', { status: 503 });

  const requested = url.searchParams.get('locale') ?? undefined;
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const state = randomHex(32);

  const sealed = await seal(secrets.sessionSecret, OAUTH_COOKIE, {
    state,
    locale,
    exp: Date.now() + OAUTH_TTL * 1000,
  });
  cookies.set(OAUTH_COOKIE, sealed, cookieOptions(url, OAUTH_TTL));

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', secrets.clientId);
  authorize.searchParams.set('redirect_uri', callbackUrl(url));
  authorize.searchParams.set('state', state);
  return redirectResponse(authorize.href);
};

export const ALL: APIRoute = () => new Response('Use GET.', { status: 405 });
