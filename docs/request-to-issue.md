# Draft: signed-in form where people contribute content about Flop

Status: **live; tested with a second account**. Written 2026-08-08, revised 2026-09-13.

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
the copy and dropping abuse all happen downstream and are out of scope here. The one piece of
downstream this document does record is moderation, below, because it acts as the same GitHub
App and changed a decision made here.

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
   -> label-wall.yml: label wall, PUT the issue to the webhook
   -> moderation: safe / unsafe / needs-review, as the app          (see "Moderation")
   -> [ agents downstream: take open wall + safe issues, decide, publish ]
```

## Moderation

The automation behind the webhook runs every new wall issue through a content-safety model with
a wall-specific policy: nothing that removes or blanks existing content, nothing that goes after
a person, nothing that tells the agents to break their rules. It then acts on the issue **as the
flopbut-pl GitHub App**, so GitHub shows `flopbut-pl[bot]` and not the owner:

- **safe**: label `safe`. Downstream agents only pick up issues that are open and carry both
  `wall` and `safe`, so they never race the check.
- **unsafe**: a comment in the contributor's locale saying the request was closed and that
  replying is how to dispute it, then label `unsafe` and close as *not planned*. No lock: a
  non-collaborator cannot reopen an issue, so a reply is their only way to reach the owner when
  the model is wrong. The comment ends with a hidden `<!-- wall-moderation v1 ... -->` marker
  carrying the model's categories.
- **no verdict** (the model ran out of tokens or answered off format): label `needs-review` and
  leave the issue open for a person.

**Reruns are safe.** Rerunning `label-wall.yml` for an issue sends it to the webhook again, and
a second model call could disagree with the first. So before the model is called, moderation
reads the issue and stops if it already carries `safe` or `unsafe`. `needs-review` does not stop
it, which makes a rerun the way to settle one, and a safe or unsafe outcome removes
`needs-review`. For unsafe the close and the comment come first and the label last, so the label
only appears on a run that finished; a run cut short in the middle is simply retried.

The labels exist in the repository (created 2026-09-13). Where the automation runs and what it is
built with is deliberately not written down here.

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

Because it is the user-authorization flow and not app-authentication, the form only needs the
**client id and client secret**; the site never holds the app's private key.

Revised 2026-09-13: moderation acts as the app itself, which does need the private key. It lives
only in the moderation automation's own credential store, never in this repository, its secrets
or the worker. Each run signs a short JWT, asks for an installation token and narrows that token
to `issues: write` on this one repository, so the key's reach is closing and labelling issues
here and nothing else.

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
issue, ask GitHub instead: `GET /repos/Flopsstuff/flopbut.pl/issues?creator=<login>&since=<24
hours ago>` with the user's own token, and refuse if there is one already: one note a day per
author (three an hour until 2026-09-13). The list endpoint rather than
search: it is real time, and search with a GitHub App user token needs `is:issue` and has its
own, much smaller, quota. The list lags a second or two behind a write, so a burst of
submissions inside that window slips past the cap (seen on 2026-09-13: three in two seconds
went through, the next one was refused). That is the price of having no storage; GitHub's own
abuse limits sit behind it as the backstop. Logins in `RATE_LIMIT_EXEMPT` (`src/config.ts`)
skip the check: the owner, testing his own form.

**The page handles its own POST.** A separate `/api/request` could only redirect after a
failure, and the text would be gone with it. `/request/` is server-rendered, reads the cookie,
and on POST validates, creates the issue and either redirects to `?sent=N` or renders the form
again with the text still in it.

**The `wall` label is added by the repository, not by the form.** GitHub drops `labels` on
issue creation for authors without push access, which is every contributor this form exists
for. `.github/workflows/label-wall.yml` adds it on `issues: opened` when GitHub's own
`performed_via_github_app` on the issue names the wall's app: only the app's token can set that
field, whereas the marker below anyone can type. Downstream can then filter on `label:wall`
rather than on the title. The same
workflow then `PUT`s the issue (number, url, title, body, author, created_at) as JSON to the
webhook in the `WALL_WEBHOOK_URL` repository secret; the agents' side starts there. The URL is
the only credential, which is why it lives in a secret and not in the workflow file, and where
it points is nobody's business but the owner's. The workflow also runs by hand with an issue
number (`gh workflow run label-wall.yml -f issue=<n>`) to send an issue again.

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
9. **Where can this GitHub App be installed?**: *Any account*, which makes the app public.
   *Only on this account* was the first choice and it was wrong: a private app can only be
   authorized by members of the owning organization, so on 2026-09-13 a second account got a
   404 on GitHub's authorize page. Public only means others could install the app on their own
   repositories, where it does nothing; this installation and its tokens stay limited to
   `flopbut.pl`. An existing app is switched under *Advanced -> Make public*.
10. Create, then on the app page: copy the **Client ID** and **Generate a new client secret**;
    the secret is shown once. *Generate a private key* was skipped at first; moderation needed
    one on 2026-09-13 (see "Moderation"), and the `.pem` went straight into the automation's
    credential store.
11. **Install App** in the left menu -> `Flopsstuff` -> *Only select repositories* ->
    `flopbut.pl`.
12. Put the secrets in `.env`, then `gh secret set -f .env` once: `GH_APP_CLIENT_ID`,
    `GH_APP_CLIENT_SECRET`, `SESSION_SECRET` (the last one from `openssl rand -hex 32`).
    The next deploy uploads them to the worker.
    Done 2026-09-09.

**Prove the model with a second account.** Done 2026-09-13, issue #11: an account outside
`Flopsstuff` (author association `NONE`) signed in on the deployed site and filed a request. The
issue carries that account as author and the app in `performed_via_github_app`; the label workflow
added `wall` and moderation added `safe`. Non-collaborators can file issues through the app, so
the model holds. The first attempt had failed earlier, with a 404 on GitHub's authorize page,
because the app was still private (see checklist step 9).

## Suggested order of work

0. Empty `/wall/` in three locales with the button, `/request/` as a "coming soon" stub, link
   from the home page. Done 2026-09-13.
1. Register and install the GitHub App, store the secrets. Done 2026-09-09. Second-account test
   passed 2026-09-13.
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
- **Can a non-collaborator file an issue through the app?** Yes, once the app is public: issue #11,
  2026-09-13.
- Removal: if a contributor asks for their entry to be taken down, what is the path?
- Does a published contribution link back to its issue, so the provenance is checkable?
- What does an entry look like on the wall: author, date, the text, a link to the issue? Left to
  downstream on purpose, see "The wall".
