import type { AstroCookieSetOptions, AstroCookies } from 'astro';
import type { Locale } from '../config.ts';
import { isLocale } from '../i18n/utils.ts';
import { LOGIN_RE } from './github.ts';

/**
 * Sealed cookies, no storage. Each cookie is AES-GCM under a key derived from SESSION_SECRET,
 * with the cookie's own name as additional data: a value sealed for one name does not open
 * under another, so the short-lived OAuth cookie cannot be replayed as a session.
 */

export const SESSION_COOKIE = 'wall_session';
export const OAUTH_COOKIE = 'wall_oauth';
/** Seconds. The GitHub token itself lives eight hours; the cookie dies long before. */
export const SESSION_TTL = 60 * 60;
export const OAUTH_TTL = 10 * 60;

export interface Session {
  login: string;
  token: string;
  /** Milliseconds since the epoch. Checked on read: the browser's maxAge is not trusted. */
  exp: number;
}

export interface OauthState {
  state: string;
  locale: Locale;
  exp: number;
}

const IV_BYTES = 12;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function deriveKey(secret: string): Promise<CryptoKey> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(secret));
  return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function seal(secret: string, name: string, payload: unknown): Promise<string> {
  const key = await deriveKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: encoder.encode(name) },
    key,
    encoder.encode(JSON.stringify(payload)),
  );
  const out = new Uint8Array(IV_BYTES + cipher.byteLength);
  out.set(iv);
  out.set(new Uint8Array(cipher), IV_BYTES);
  return toBase64Url(out);
}

/** Null for anything that is not a value this secret sealed under this name. */
export async function open(
  secret: string,
  name: string,
  value: string | undefined,
): Promise<unknown> {
  if (!value) return null;
  try {
    const bytes = fromBase64Url(value);
    if (bytes.length <= IV_BYTES) return null;
    const key = await deriveKey(secret);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: bytes.slice(0, IV_BYTES), additionalData: encoder.encode(name) },
      key,
      bytes.slice(IV_BYTES),
    );
    return JSON.parse(decoder.decode(plain));
  } catch {
    return null;
  }
}

export async function readSession(cookies: AstroCookies, secret: string): Promise<Session | null> {
  const data = await open(secret, SESSION_COOKIE, cookies.get(SESSION_COOKIE)?.value);
  return isSession(data) ? data : null;
}

export async function readOauthState(
  cookies: AstroCookies,
  secret: string,
): Promise<OauthState | null> {
  const data = await open(secret, OAUTH_COOKIE, cookies.get(OAUTH_COOKIE)?.value);
  return isOauthState(data) ? data : null;
}

/**
 * Secure only over https: Safari drops Secure cookies on http://localhost, which would end the
 * dev sign-in at the state check.
 */
export function cookieOptions(url: URL, maxAge: number): AstroCookieSetOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: url.protocol === 'https:',
    maxAge,
  };
}

/** Path must match the one the cookie was set with, or the browser keeps the old cookie. */
export function clearCookie(cookies: AstroCookies, name: string, url: URL): void {
  cookies.delete(name, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
  });
}

/** A redirect that no cache or back-forward store is allowed to keep. */
export function redirectResponse(location: string, status = 302): Response {
  return new Response(null, {
    status,
    headers: { location, 'cache-control': 'private, no-store' },
  });
}

export function randomHex(bytes: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLive(value: Record<string, unknown>): boolean {
  return typeof value.exp === 'number' && value.exp > Date.now();
}

function isSession(value: unknown): value is Session {
  return (
    isRecord(value) &&
    isLive(value) &&
    typeof value.login === 'string' &&
    LOGIN_RE.test(value.login) &&
    typeof value.token === 'string' &&
    value.token.length > 0
  );
}

function isOauthState(value: unknown): value is OauthState {
  return (
    isRecord(value) &&
    isLive(value) &&
    typeof value.state === 'string' &&
    value.state.length > 0 &&
    typeof value.locale === 'string' &&
    isLocale(value.locale)
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const b64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(b64.padEnd(Math.ceil(b64.length / 4) * 4, '='));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
