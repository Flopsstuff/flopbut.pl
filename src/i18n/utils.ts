import { AGENTS_URL, DEFAULT_LOCALE, LOCALES, type Locale } from '../config.ts';
import { type Dictionary, dictionaries } from './ui.ts';

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

/** Reads the locale out of a URL. English has no prefix, so anything unknown is English. */
export function getLocale(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Builds a path for a locale. The default locale sits at the root, the others
 * under their own prefix - matching `prefixDefaultLocale: false` in the Astro config.
 */
export function localizedPath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/** Public address of the crew page in every locale: the locale roots of agents.flopbut.pl. */
export function agentsAddresses(): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, `${AGENTS_URL}${localizedPath(locale, '/')}`]),
  ) as Record<Locale, string>;
}

/** Every locale variant of the current page, for the language switcher and hreflang tags. */
export function alternateLinks(currentLocale: Locale, url: URL) {
  const path = stripLocale(url.pathname, currentLocale);
  return LOCALES.map((locale) => ({
    locale,
    path: localizedPath(locale, path),
    isCurrent: locale === currentLocale,
    label: dictionaries[locale].meta.langName,
  }));
}

function stripLocale(pathname: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return pathname;
  const stripped = pathname.slice(`/${locale}`.length);
  return stripped === '' ? '/' : stripped;
}
