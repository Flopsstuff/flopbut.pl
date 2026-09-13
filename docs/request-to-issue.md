# Draft: signed-in form where people contribute content about Flop

Status: **built, tested with the owner's account only**. Written 2026-08-08, revised 2026-09-13.

## What this actually is

Not a contact form. People who know Flop sign in with GitHub and contribute something to put on
the site: "he is good with electronics", a recommendation, a thank you, a correction. The
submission becomes an issue authored by them. Agents downstream decide whether it belongs on the
site, in what shape, and drop the nasty ones.

So the site is partly written by other people, and the vouching is the point: a claim about
someone carries weight only when it is attached to a real person who made it.

## The wall

The public side is a page called **the wall**: `/wall/`, "The wall" / "Стена" / "Ściana" in the
three locales. Accepted contributions are shown there, and it is the only way in for a
contributor: a single button, **"Write on the wall"**, leads to `/request/`. The home page links
to the wall from the contact section.

The wall is a surface, not a slot. The decision below not to pre-define a shape for contributed
content still stands: what an entry looks like on the wall is for the agents downstream to work
out. Until the first one lands the wall is empty, and says so.

Three locales, static, no SSR and no secrets on the wall itself. `/request/` and the auth routes
are the only server-rendered part of the site.

## Scope

This side **ends when the issue exists**. Classification, deciding what goes on the site, writing
the copy and dropping abuse all happen downstream and are out of scope here.

```
/wall/
   -> "Write on the wall"          the only way in, from the public wall
/request/
   -> "Sign in with GitHub"        no anonymous path at all
   -> GET  /api/auth/login         redirect to GitHub with a state parameter
   -> GET  /api/auth/callback      exchange the code, set the session cookie
   -> form                         only reachable once signed in
   -> POST /request/               the page handles its own POST: validate, then GitHub as the user
   -> issue in Flopsstuff/flopbut.pl, authored by the user
   -> /request/?sent=N             thanks, with a link to the issue
   (  POST /api/auth/logout        drops the cookie; www and workers.dev redirect to the apex  )
   -> [ agents downstream: classify, decide, publish or close ]
```

## Three consequences of "other people write the site"

### 1. Attribution is the feature, not a detail

An unattributed endorsement is worthless. "Someone said he is good with electronics" persuades
nobody, and a page full of anonymous praise reads as fabricated. Published contributions should
carry the author's GitHub identity, which is exactly what signing in already gives.

This also makes the whole thing self-defending: forging praise costs a real account with a real
history.

### 2. People must know their words may go public, with their name

Someone typing "thanks for the help" into a form does not automatically expect it rendered on a
public site under their handle. The form has to say so plainly, before submission, not in a
footnote. Whatever downstream decides, this end owes them that sentence.

Worth deciding early: what happens when someone later wants their contribution removed.

### 3. Agents improvise on purpose, and the guardrails are not structural

Deliberate decision by the owner: **do not** pre-define a slot for contributed content. A fixed
shape would flatten exactly what makes this worth doing, which is that a contributor describes
their point in their own terms and an agent works out how it belongs on the site. Prompts and a
custom classifier do the filtering. The bet is a wikipedia effect: enough people, and the site
converges on something truer than what one person would write about himself.

That freedom is affordable because the limits sit elsewhere and already exist:

- **Every change arrives as a pull request** and a human merges. Nothing an agent invents reaches
  the site unreviewed, and anything that lands can be reverted with its full history intact.
- **`pnpm verify` is the automatic filter**: lint, real type checking, and a build. An agent can
  restructure whatever it likes as long as the site still compiles.
- **The i18n contract holds regardless.** The English dictionary defines the shape and the other
  locales are typed against it, so a contribution added in one language fails the build until all
  three exist. That constraint survives any amount of improvisation.

Which is to say the wikipedia analogy needs its other half: what makes that model work is not
only many contributors, but full history, easy reverting and someone watching. Git and CI already
provide all three here.

## Decided

**Issues land in this repository, `Flopsstuff/flopbut.pl`.** It is public with issues enabled,
and keeping the request next to the code it may change means the downstream pull request and its
originating issue live in one place. (Decided 2026-09-09; the catalogue repo was the alternative.)

**GitHub App with user-to-server tokens, `Issues: write` scoped to one repository.**

Not an OAuth App: its `public_repo` scope grants write access to every public repository the
person owns, which is absurd for filing one issue. A GitHub App's user token can only do what the
app is allowed to do *and* the user is allowed to do, and the app is installed on exactly one
repository. Any GitHub account can open an issue in a public repository, so strangers qualify.

Because it is the user-authorization flow and not app-authentication, only the **client id and
client secret** are needed. The app's private key is never used and does not need to leave
GitHub.

**The form is only reachable after sign-in.** The alternative, form first and the issue created
straight from the callback with a token that lives for seconds, would remove the session cookie
entirely. Rejected: the person has to see under which name their words will be published before
they start writing, not after.

Session between sign-in and submit: **sealed httpOnly cookie**, Secure, SameSite=Lax, short
lived (one hour is plenty; the GitHub token itself expires after eight). AES-GCM via WebCrypto
under a key derived from `SESSION_SECRET`, with the cookie's own name as additional data, so the
OAuth state cookie cannot be replayed as a session. Authenticated encryption rather than a bare
HMAC because the cookie carries the user's GitHub token. No storage, and `session: false` in
`astro.config.mjs` stays untouched. This matters: the Cloudflare deploy token has no KV permission, and nothing here
should need one. A `state` parameter on the OAuth round trip, kept in its own short-lived cookie
and checked on callback, against CSRF.

**Rate limit without storage.** With no KV there is no counter to keep. Before creating an
issue, ask GitHub instead: `GET /repos/Flopsstuff/flopbut.pl/issues?creator=<login>&since=<one
hour ago>` with the user's own token, and refuse above three. The list endpoint rather than
search: it is real time, and search with a GitHub App user token needs `is:issue` and has its
own, much smaller, quota. The list lags a second or two behind a write, so a burst of
submissions inside that window slips past the cap (seen on 2026-09-13: three in two seconds
went through, the next one was refused). That is the price of having no storage; GitHub's own
abuse limits sit behind it as the backstop.

**The page handles its own POST.** A separate `/api/request` could only redirect after a
failure, and the text would be gone with it. `/request/` is server-rendered, reads the cookie,
and on POST validates, creates the issue and either redirects to `?sent=N` or renders the form
again with the text still in it.

## The issue is a contract

Downstream has to tell user-written text apart from instructions. So the body is generated from a
**fixed template**, and submitted text goes in a clearly delimited block, never into the
structural parts.

Two things only this side can get right:

- **Escape fence characters in user input.** An unescaped code fence lets someone break out of
  the quoted block and forge structure that looks like ours. Downstream cannot detect this
  afterwards.
- **Never build the title from free text.** Derive it from a fixed field, cap the length, strip
  newlines.

## What else belongs to this side

- Field validation and length caps, same style as `src/pages/api/contact.ts`.
- Honest failures: no success screen if the GitHub call failed, and keep their text in the form.
- A `User-Agent` header on every GitHub API call; GitHub rejects requests without one.
- No anonymous fallback path, including no "or email me instead" that quietly restores it.
- Secrets: `.env` locally, placeholders documented in `.env.example`. In production
  they are repository secrets on GitHub, and `deploy.yml` uploads them to the worker on every
  deploy through the `secrets` input of `wrangler-action`. One set of names everywhere:
  `GH_APP_CLIENT_ID`, `GH_APP_CLIENT_SECRET`, `SESSION_SECRET`. The `GH_` prefix rather than
  `GITHUB_` because GitHub forbids the latter for its secrets. GitHub is the single source of
  truth; nothing is set with `wrangler secret put` by hand.

## GitHub App: registration checklist

Manual, done by the owner. `Flopsstuff` is an organization and the app should be created under
it, so it starts at **Organization settings -> Developer settings -> GitHub Apps -> New GitHub
App**, not under the personal account.

1. **Name**: globally unique on GitHub, shown on the authorization screen. Something like
   `flopbut.pl requests`.
2. **Homepage URL**: `https://flopbut.pl/`.
3. **Callback URLs**, two of them, each in its own field (press *Add redirect URI* for the
   second; both pasted into one field with a comma read as a single URL that matches nothing):
   `https://flopbut.pl/api/auth/callback` and `http://localhost:4321/api/auth/callback` for
   `astro dev`. Leave *Allow wildcard matching* off.
4. **Expire user authorization tokens**: leave on. Tokens then die after eight hours, well after
   the cookie does, and the refresh token is simply never used.
5. **Request user authorization (OAuth) during installation**: off. Installation is a one-time
   act by the owner; users authorize from the site.
6. **Enable Device Flow**: off.
7. **Webhook**: untick *Active*. Nothing here listens; leaving it on forces a webhook URL.
8. **Repository permissions**: *Issues* -> **Read and write**. *Metadata* becomes read-only on
   its own. Nothing else, and no account permissions at all.
9. **Where can this GitHub App be installed?**: *Only on this account*.
10. Create, then on the app page: copy the **Client ID** and **Generate a new client secret**;
    the secret is shown once. Skip *Generate a private key*.
11. **Install App** in the left menu -> `Flopsstuff` -> *Only select repositories* ->
    `flopbut.pl`.
12. Put the secrets in `.env`, then `gh secret set -f .env` once: `GH_APP_CLIENT_ID`,
    `GH_APP_CLIENT_SECRET`, `SESSION_SECRET` (the last one from `openssl rand -hex 32`).
    The next deploy uploads them to the worker.
    Done 2026-09-09.

**Prove the model with a second account.** Sign in with an account that is not a member of
`Flopsstuff` and submit the form. If an issue appears, the model holds. If it does not, the
assumption that non-collaborators can file issues through the app was wrong and the design has
to change. There was no second account to hand on 2026-09-13, so the flow was built and tested
with the owner's account only; this check is still owed.

## Suggested order of work

0. Empty `/wall/` in three locales with the button, `/request/` as a "coming soon" stub, link
   from the home page. Done 2026-09-13.
1. Register and install the GitHub App, store the secrets. Done 2026-09-09. The second-account
   test is still pending.
2. `/request/` replaces the stub: signed-out and signed-in states, and the sentence about
   publication. Done 2026-09-13.
3. OAuth round trip: `/api/auth/login`, `/api/auth/callback`, `state` check, session cookie.
   Done 2026-09-13.
4. `POST /request/`: validation, the rate-limit query, template rendering with escaping, issue
   creation as the user. Done 2026-09-13.

No LLM on this side, and nothing here depends on the downstream design being settled. Code:
`src/lib/session.ts`, `src/lib/github.ts`, `src/lib/request-page.ts`, `src/pages/api/auth/`,
`src/components/Request.astro`.

## Open questions

- **What does the form ask?** Decided 2026-09-13: one free text field (20 to 4000 characters)
  plus an optional line on how the person knows Flop. No category: agents classify.
- **Can a non-collaborator file an issue through the app?** Untested, see the second-account
  check above. Everything else is built on the assumption that they can.
- Removal: if a contributor asks for their entry to be taken down, what is the path?
- Does a published contribution link back to its issue, so the provenance is checkable?
- What does an entry look like on the wall: author, date, the text, a link to the issue? Left to
  downstream on purpose, see "The wall".
