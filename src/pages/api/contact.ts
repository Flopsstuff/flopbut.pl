import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';

/**
 * Contact endpoint - the one route that runs on the worker instead of being prerendered.
 *
 * It is deliberately dormant: with no delivery secrets configured it answers 503 and nothing
 * else in the site depends on it. To switch the contact form on, set the secrets listed in
 * `.env.example` (and the repository secrets for production) and add the form markup.
 * No code changes needed here.
 */
export const prerender = false;

interface ContactEnv {
  /** Server-side half of the Turnstile keypair. Required - no captcha, no submissions. */
  TURNSTILE_SECRET?: string;
  /** Telegram delivery. Both must be present to be used. */
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const LIMITS = {
  name: 80,
  email: 120,
  message: 4000,
} as const;

interface Submission {
  name: string;
  email: string;
  message: string;
  token: string;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/** Field-level validation. Returns the first problem found, or the cleaned submission. */
function parseSubmission(form: FormData): { error: string } | { data: Submission } {
  const read = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };

  const name = read('name');
  const email = read('email');
  const message = read('message');
  const token = read('cf-turnstile-response');

  // A filled honeypot means a bot walked the form. Report success so it stops retrying.
  if (read('company') !== '') return { error: 'honeypot' };

  if (name.length === 0 || name.length > LIMITS.name) return { error: 'Check the name field.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > LIMITS.email) {
    return { error: 'Check the email address.' };
  }
  if (message.length < 10 || message.length > LIMITS.message) {
    return { error: 'Messages run between 10 and 4000 characters.' };
  }
  if (token.length === 0) return { error: 'Captcha missing. Reload and try again.' };

  return { data: { name, email, message, token } };
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendToTelegram(secrets: ContactEnv, submission: Submission): Promise<boolean> {
  const text = [
    '📬 flopbut.pl',
    '',
    `From: ${submission.name} <${submission.email}>`,
    '',
    submission.message,
  ].join('\n');

  const response = await fetch(
    `https://api.telegram.org/bot${secrets.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: secrets.TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    },
  );

  return response.ok;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Astro 6 removed `locals.runtime.env`; secrets come from the worker module directly.
  const secrets = env as unknown as ContactEnv;

  const configured =
    Boolean(secrets.TURNSTILE_SECRET) &&
    Boolean(secrets.TELEGRAM_BOT_TOKEN) &&
    Boolean(secrets.TELEGRAM_CHAT_ID);

  if (!configured) {
    return json({ error: 'The contact form is not switched on yet.' }, 503);
  }

  if (!request.headers.get('content-type')?.includes('form')) {
    return json({ error: 'Send the form as form data.' }, 415);
  }

  const parsed = parseSubmission(await request.formData());

  if ('error' in parsed) {
    // Honeypot hits get a 200 so the bot believes it succeeded and moves on.
    if (parsed.error === 'honeypot') return json({ ok: true }, 200);
    return json({ error: parsed.error }, 400);
  }

  const human = await verifyTurnstile(
    parsed.data.token,
    secrets.TURNSTILE_SECRET as string,
    clientAddress ?? null,
  );
  if (!human) return json({ error: 'Captcha failed. Try again.' }, 403);

  const delivered = await sendToTelegram(secrets, parsed.data);
  if (!delivered) return json({ error: 'Could not deliver the message. Email me instead.' }, 502);

  return json({ ok: true }, 200);
};

/** Anything other than POST is a mistake worth naming. */
export const ALL: APIRoute = () => json({ error: 'Use POST.' }, 405);
