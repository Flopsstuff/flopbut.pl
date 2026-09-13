// @ts-check
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES, SITE_URL } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,

  // Static by default. Individual routes opt into SSR with `export const prerender = false`,
  // which is how the contact endpoint will run once it is switched on.
  adapter: cloudflare({
    imageService: 'compile',
  }),

  // Nothing here uses sessions. Off means the adapter stops provisioning a KV namespace
  // for them, and the session runtime drops out of the worker bundle entirely.
  session: false,

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      // English lives at the root (flopbut.pl/), the rest under /ru/ and /pl/.
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // Subsets cover all three alphabets we ship: Polish diacritics live in latin-ext,
  // Russian in cyrillic. Astro subsets and self-hosts these at build time.
  fonts: [
    {
      name: 'Geologica',
      cssVariable: '--font-display',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Golos Text',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
      // Body copy is 400 everywhere; 500 and 600 were declared but never used.
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  integrations: [
    sitemap({
      // The request form is per-person and noindex. It is SSR now, so the sitemap would skip
      // it anyway; the filter stays so that stays true even if the route is prerendered again.
      filter: (page) => !page.includes('/request/'),
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((locale) => [locale, locale])),
      },
    }),
  ],

  vite: {
    plugins: [tailwind()],
  },
});
