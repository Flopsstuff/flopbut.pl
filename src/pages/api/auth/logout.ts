import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, type Locale } from '../../../config.ts';
import { isLocale, localizedPath } from '../../../i18n/utils.ts';
import { clearCookie, redirectResponse, SESSION_COOKIE } from '../../../lib/session.ts';

export const prerender = false;

/** Drops the session cookie. The GitHub token inside it simply expires on its own. */
export const POST: APIRoute = async ({ request, url, cookies }) => {
  let locale: Locale = DEFAULT_LOCALE;
  try {
    const value = (await request.formData()).get('locale');
    if (typeof value === 'string' && isLocale(value)) locale = value;
  } catch {
    /* no form body: sign out anyway and land on the English wall */
  }
  clearCookie(cookies, SESSION_COOKIE, url);
  return redirectResponse(localizedPath(locale, '/wall/'), 303);
};

export const ALL: APIRoute = () => new Response('Use POST.', { status: 405 });
