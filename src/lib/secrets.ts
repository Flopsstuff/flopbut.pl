import { env } from 'cloudflare:workers';

/** The three secrets behind the wall's request form. Names match `.env.example` and `deploy.yml`. */
export interface WallSecrets {
  clientId: string;
  clientSecret: string;
  sessionSecret: string;
}

/**
 * Null when any of the three is missing. The form then reports itself unavailable and the
 * auth routes answer 503, so a half-configured deploy never starts a sign-in it cannot finish.
 */
export function readSecrets(): WallSecrets | null {
  const { GH_APP_CLIENT_ID, GH_APP_CLIENT_SECRET, SESSION_SECRET } = env;
  if (!GH_APP_CLIENT_ID || !GH_APP_CLIENT_SECRET || !SESSION_SECRET) return null;
  return {
    clientId: GH_APP_CLIENT_ID,
    clientSecret: GH_APP_CLIENT_SECRET,
    sessionSecret: SESSION_SECRET,
  };
}
