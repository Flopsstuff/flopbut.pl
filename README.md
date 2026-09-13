# flopbut.pl

Personal site of Flop Butylkin, live at **[flopbut.pl](https://flopbut.pl)**.
Astro, deployed to Cloudflare Workers.

Static by default: every page is prerendered and served from Workers Static Assets, so the
worker itself only runs for routes that opt out of prerendering.

## Stack

| Piece      | Choice                                                             |
| ---------- | ------------------------------------------------------------------ |
| Framework  | Astro 7, static output with an SSR escape hatch per route           |
| Hosting    | Cloudflare Workers (`@astrojs/cloudflare`)                          |
| Styling    | Tailwind 4 tokens over hand-written component CSS                   |
| Fonts      | Geologica, Golos Text, IBM Plex Mono - self-hosted, subset at build |
| Languages  | English at the root, Russian under `/ru/`, Polish under `/pl/`      |
| Tooling    | TypeScript strict, Biome, GitHub Actions                            |

Those three typefaces are the ones that cover latin, latin-ext and cyrillic at once, which is
what all three locales need.

## Commands

```bash
pnpm dev       # dev server at localhost:4321, runs as a daemon
pnpm build     # production build into dist/
pnpm preview   # run the built site on the real workerd runtime
pnpm verify    # lint + type check + build, same as CI
pnpm deploy    # build and push to Cloudflare
```

The dev server is a daemon: `pnpm exec astro dev stop` to stop it, `astro dev logs` for output.

## Content

All copy lives in `src/i18n/ui.ts`. The English dictionary defines the shape; the other two
locales are typed against it, so a missing translation is a build error rather than a blank
line on the page. Tool names in `src/data/stack.ts` and the agent roster in `src/data/crew.ts`
are not translated.

Text on this site uses plain hyphens, never em dashes. See [CLAUDE.md](CLAUDE.md).

The catalogue this site links out to lives at [stuff.flopbut.pl](https://stuff.flopbut.pl).

## Deployment

Pushes to `main` build and deploy through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which runs lint, type check and build before shipping. Two repository secrets deploy the site:

- `CLOUDFLARE_API_TOKEN` - a token with the *Edit Cloudflare Workers* template
- `CLOUDFLARE_ACCOUNT_ID`

Three more are uploaded to the worker on every deploy and power the sign-in form behind
`/request/` (see `docs/request-to-issue.md`): `GH_APP_CLIENT_ID`, `GH_APP_CLIENT_SECRET` and
`SESSION_SECRET`. Locally the same names live in `.env`, which `astro dev` reads.

The apex and `www` are bound through plain worker routes rather than a custom domain, because
`flopbut.pl` still carries leftover proxied A records that block custom domain attachment. The
records are harmless: the worker intercepts requests before any origin is reached.

## Licence

MIT - see [LICENSE](LICENSE).
