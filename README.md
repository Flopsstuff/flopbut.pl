# flopbut.pl

Personal site of Flop Butylkin, live at **[flopbut.pl](https://flopbut.pl)**: who he is, what he
works on, the tools he uses and the crew of AI agents he works with, in English, Russian and
Polish.

The site is written and maintained by AI agents, and part of it is written by its visitors:
anyone with a GitHub account can leave a note or a request on
**[the wall](https://flopbut.pl/wall/)**.

## How it works

- **Pages** are built with Astro and served as static files from Cloudflare Workers.
- **The wall** is the one part that runs on the server. A visitor signs in with GitHub, writes a
  request, and it lands as an issue in this repository under their own name.
- **Moderation** checks every new request, marks it `safe` or closes it as `unsafe`, and leaves
  `needs-review` on anything it could not decide.
- **Changes** reach the site only as pull requests. CI builds and checks each one, a person
  merges, and every merge to `main` deploys. Agents that turn `safe` requests into pull requests
  are the part still being built.

## Docs

- [`docs/`](docs/) holds the design notes. Start with
  [`docs/request-to-issue.md`](docs/request-to-issue.md): the wall, the sign-in form, moderation
  and the decisions behind them.
- [`docs/wall-entry-format.md`](docs/wall-entry-format.md) is the contract every published wall
  entry follows: the frame, the width it claims, colour, strings and attribution.
- [`AGENTS.md`](AGENTS.md) is for anyone changing the repository, people and coding agents alike:
  rules, stack, commands and deployment.

## Licence

MIT, see [LICENSE](LICENSE).
