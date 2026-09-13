# flopbut.pl

Instructions for anyone changing this repository, people and coding agents alike, whatever tool
they work in. `CLAUDE.md` and `GEMINI.md` are symlinks to this file, so each tool that looks for
its own file name reads the same rules. Edit `AGENTS.md`, never the links.

What the site is and how it works: [README.md](README.md). Design notes and decisions:
[docs/](docs/).

## Typography rule: no em dashes

Never use the long dash character in any text on this site or in this repository.
Use a plain hyphen instead.

- Wrong: `iOS — с момента появления платформы`
- Right: `iOS - с момента появления платформы`

This applies to all three locales, to code comments, to this file and the README, to commit
messages and pull request descriptions. Check with `grep -rn "—" src/ docs/` before committing.

## Name

The only name that appears anywhere public is **Flop Butylkin**. Never substitute another.

## Content

All copy lives in `src/i18n/ui.ts`. The English dictionary defines the shape and the other
locales are typed against it, so a missing translation is a build error rather than a blank
line. Tool names in `src/data/stack.ts` and agent names with the model each one runs on in
`src/data/crew.ts` are not translated.

The roster in `src/data/crew.ts` mirrors the real Paperclip company, so it goes stale whenever
somebody is hired, retired or moved onto another model. Check it against the live roster
(`GET /api/companies/{id}/agents`) before claiming it is current; internal utility agents that
do not ship anything stay off the list.

Facts that are easy to get wrong: iOS dates back to the launch of the platform, with no
specific year given; React Native is strictly since 2019; Android belongs in the stack too.

The project catalogue the site links out to lives at [stuff.flopbut.pl](https://stuff.flopbut.pl).

## Brand

Two colours, and only two, in the logo, the favicon and the GitHub App badge:

- ink `#0b1312` - near-black with a hint of green, the background
- patina `#5fb79b` - oxidised copper, the mark

`public/logo-512.png` is patina on ink, `public/logo-512-light.png` the inverse. The source of
truth is the token block in `src/styles/global.css` (`--ink`, `--patina`); the same values sit in
`public/favicon.svg` and the dark `theme-color` meta in `src/layouts/Layout.astro`, so changing
one means changing all four. The light theme darkens patina to `#0e7159` for contrast in text;
logos keep `#5fb79b`. Do not introduce new hex values for brand surfaces.

## Stack

| Piece     | Choice                                                                 |
| --------- | ---------------------------------------------------------------------- |
| Framework | Astro 7, static by default, server rendering opted into per route       |
| Hosting   | Cloudflare Workers (`@astrojs/cloudflare`), pages from Static Assets    |
| Styling   | Tailwind 4 tokens over hand-written component CSS                       |
| Fonts     | Geologica, Golos Text, IBM Plex Mono, self-hosted and subset at build   |
| Languages | English at the root, Russian under `/ru/`, Polish under `/pl/`          |
| Tooling   | TypeScript strict, Biome, GitHub Actions                                |

Those three typefaces are the ones that cover latin, latin-ext and cyrillic at once, which is
what all three locales need.

## Commands

```bash
pnpm dev       # dev server at localhost:4321, runs as a daemon
pnpm build     # production build into dist/
pnpm preview   # run the built site on the real workerd runtime
pnpm verify    # lint + type check + build, same as CI
pnpm deploy    # build and push to Cloudflare
pnpm shot      # full-page screenshot of a running page
```

The dev server is a daemon: `pnpm exec astro dev stop` stops it, `pnpm exec astro dev logs`
shows its output.

## Working in git

Work on a branch and land it through a pull request. CI runs `pnpm verify` on every pull request,
and every push to `main` deploys, so nothing goes to `main` directly.

A pull request that changes anything a visitor can see carries a screenshot of the result under a
`## Visual proof` heading. Code alone does not show what a page looks like, and nobody should
have to build the branch to find out. How to take one and attach it:
[docs/visual-proof.md](docs/visual-proof.md).

## Deployment

Pushes to `main` build and deploy through `.github/workflows/deploy.yml`. Repository secrets:

- `CLOUDFLARE_API_TOKEN`, a token with the *Edit Cloudflare Workers* template, and
  `CLOUDFLARE_ACCOUNT_ID`: the deploy itself.
- `GH_APP_CLIENT_ID`, `GH_APP_CLIENT_SECRET`, `SESSION_SECRET`: uploaded to the worker on every
  deploy, they power the sign-in form.
- `WALL_WEBHOOK_URL`: read only by `.github/workflows/label-wall.yml`, never by the worker.

Locally the same names live in `.env`, which is git-ignored and read by `astro dev` and the
deploy script; `.env.example` lists them.

The Cloudflare token has no Workers KV permission, which is why `session: false` is set in
`astro.config.mjs`: without it the adapter tries to provision a KV namespace and the deploy
fails after uploading assets.

The apex and `www` are bound with plain worker routes rather than `custom_domain`, because
leftover proxied A records on `flopbut.pl` block custom domain attachment. The records are
harmless, since the worker answers before any origin is reached; deleting them and switching to
`custom_domain` is the tidier end state.

## The wall

`/wall/` is static. `/request/` and `/api/auth/*` are the server-rendered part: GitHub sign-in,
a sealed cookie, and an issue filed as the visitor. Design and decisions live in
`docs/request-to-issue.md`. In dev the secrets come from `.env`; test on `http://localhost:4321`,
not `127.0.0.1`, because only the former is a registered OAuth callback and cookies do not cross
hosts.
