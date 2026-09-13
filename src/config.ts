/** Single source of truth for anything both the Astro config and the pages need. */

export const SITE_URL = 'https://flopbut.pl';

export const LOCALES = ['en', 'ru', 'pl'] as const;
export const DEFAULT_LOCALE = 'en';

export type Locale = (typeof LOCALES)[number];

/** The project catalogue. */
export const PROJECTS_URL = 'https://stuff.flopbut.pl';

/** Where the wall's requests land as issues (docs/request-to-issue.md). */
export const REPO = { owner: 'Flopsstuff', name: 'flopbut.pl' } as const;

/**
 * The wall's GitHub App. Public (GET /apps/flopbut-pl); GitHub stamps it on every issue the
 * form creates as `performed_via_github_app`, which is how the form's issues are told apart
 * from anything else a person files. Same value as APP_ID in .github/workflows/label-wall.yml.
 */
export const APP_ID = 4885332;

/** GitHub logins the wall's rate limit does not apply to: the owner, testing his own form. */
export const RATE_LIMIT_EXEMPT: readonly string[] = ['Fl0p'];

export const LINKS = {
  /** Organisation account - the project catalogue. Personal account is @Fl0p. */
  github: 'https://github.com/Flopsstuff',
  /** This site's own repository, linked from the footer. */
  repo: 'https://github.com/Flopsstuff/flopbut.pl',
  linkedin: 'https://www.linkedin.com/in/flop-but',
  projects: PROJECTS_URL,
} as const;
