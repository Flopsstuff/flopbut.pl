import type { AstroGlobal } from 'astro';
import { type Locale, RATE_LIMIT_EXEMPT } from '../config.ts';
import { localizedPath } from '../i18n/utils.ts';
import { countRecentIssues, createIssue, renderIssue } from './github.ts';
import { readSecrets } from './secrets.ts';
import { clearCookie, readSession, SESSION_COOKIE } from './session.ts';

/**
 * The `/request/` page handles its own POST. A separate endpoint could only redirect after a
 * failure, and the text the person typed would be gone with it; rendering the page again
 * keeps it in the form. Only a page can return a Response or set cookies reliably, so the
 * three locale pages call this and hand the view to the component.
 */

export const LIMITS = {
  text: { min: 20, max: 4000 },
  relation: 120,
  /** Issues per author per hour, counted on GitHub itself: there is no storage here. */
  perHour: 3,
} as const;

export type SignedOutError = 'auth' | 'expired';
export type FormError = 'form' | 'text' | 'relation' | 'rateLimited' | 'github';

export type RequestView =
  | { state: 'unavailable' }
  | { state: 'signedOut'; error?: SignedOutError }
  | { state: 'signedIn'; login: string; text: string; relation: string; error?: FormError }
  | { state: 'sent'; number: number };

interface Fields {
  text: string;
  relation: string;
}

export async function handleRequest(
  Astro: AstroGlobal,
  locale: Locale,
): Promise<Response | RequestView> {
  Astro.response.headers.set('cache-control', 'private, no-store');

  const secrets = readSecrets();
  if (!secrets) return { state: 'unavailable' };

  const session = await readSession(Astro.cookies, secrets.sessionSecret);

  if (Astro.request.method === 'POST') {
    if (!session) {
      Astro.response.status = 401;
      return { state: 'signedOut', error: 'expired' };
    }
    const signedIn = (fields: Fields, error: FormError, status: number): RequestView => {
      Astro.response.status = status;
      return { state: 'signedIn', login: session.login, ...fields, error };
    };

    const form = await readForm(Astro.request);
    if (!form) return signedIn({ text: '', relation: '' }, 'form', 415);

    const parsed = parseSubmission(form);
    if ('error' in parsed) return signedIn(parsed.fields, parsed.error, 400);
    const fields = parsed.fields;

    if (!RATE_LIMIT_EXEMPT.includes(session.login)) {
      const since = new Date(Date.now() - 60 * 60 * 1000);
      const recent = await countRecentIssues(session.token, session.login, since);
      if (recent === null) return signedIn(fields, 'github', 502);
      if (recent >= LIMITS.perHour) return signedIn(fields, 'rateLimited', 429);
    }

    const issue = renderIssue({ login: session.login, locale, ...fields });
    const result = await createIssue(session.token, issue);
    if (!result.ok) {
      if (result.status === 401) {
        clearCookie(Astro.cookies, SESSION_COOKIE, Astro.url);
        Astro.response.status = 401;
        return { state: 'signedOut', error: 'expired' };
      }
      return signedIn(fields, 'github', 502);
    }

    return Astro.redirect(localizedPath(locale, `/request/?sent=${result.number}`), 303);
  }

  const sent = Astro.url.searchParams.get('sent');
  if (sent && /^\d{1,9}$/.test(sent)) return { state: 'sent', number: Number(sent) };

  if (!session) {
    const error = Astro.url.searchParams.get('error');
    return error === 'auth' ? { state: 'signedOut', error: 'auth' } : { state: 'signedOut' };
  }
  return { state: 'signedIn', login: session.login, text: '', relation: '' };
}

async function readForm(request: Request): Promise<FormData | null> {
  const type = request.headers.get('content-type') ?? '';
  if (!type.includes('form')) return null;
  try {
    return await request.formData();
  } catch {
    return null;
  }
}

/** First problem found, with the fields as typed so the form can show them again. */
function parseSubmission(
  form: FormData,
): { error: FormError; fields: Fields } | { fields: Fields } {
  const read = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value : '';
  };
  const fields: Fields = { text: read('text').trim(), relation: read('relation').trim() };
  if (fields.text.length < LIMITS.text.min || fields.text.length > LIMITS.text.max) {
    return { error: 'text', fields };
  }
  if (fields.relation.length > LIMITS.relation) return { error: 'relation', fields };
  return { fields };
}
