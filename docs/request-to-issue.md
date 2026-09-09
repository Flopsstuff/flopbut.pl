# Draft: signed-in form where people contribute content about Flop

Status: **draft, nothing implemented**. Written 2026-08-08, revised 2026-09-09.

## What this actually is

Not a contact form. People who know Flop sign in with GitHub and contribute something to put on
the site: "he is good with electronics", a recommendation, a thank you, a correction. The
submission becomes an issue authored by them. Agents downstream decide whether it belongs on the
site, in what shape, and drop the nasty ones.

So the site is partly written by other people, and the vouching is the point: a claim about
someone carries weight only when it is attached to a real person who made it.

## Scope

This side **ends when the issue exists**. Classification, deciding what goes on the site, writing
the copy and dropping abuse all happen downstream and are out of scope here.

```
/request/
   -> "Sign in with GitHub"        no anonymous path at all
   -> GET  /api/auth/login         redirect to GitHub with a state parameter
   -> GET  /api/auth/callback      exchange the code, set the session cookie
   -> form                         only reachable once signed in
   -> POST /api/request            validate, then GitHub API as the user
   -> issue in Flopsstuff/flopbut.pl, authored by the user
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

Session between sign-in and submit: **signed httpOnly cookie**, Secure, SameSite=Lax, short
lived (one hour is plenty; the GitHub token itself expires after eight). HMAC via WebCrypto with
a `SESSION_SECRET`, so there is no storage and `session: false` in `astro.config.mjs` stays
untouched. This matters: the Cloudflare deploy token has no KV permission, and nothing here
should need one. A `state` parameter on the OAuth round trip, kept in its own short-lived cookie
and checked on callback, against CSRF.

**Rate limit without storage.** With no KV there is no counter to keep. Before creating an
issue, ask GitHub instead: `GET /search/issues?q=repo:Flopsstuff/flopbut.pl author:<login>
created:><one hour ago>` with the user's own token, and refuse above a small cap. GitHub's own
abuse limits sit behind that as the backstop.

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
3. **Callback URLs**, two of them:
   `https://flopbut.pl/api/auth/callback` and `http://localhost:4321/api/auth/callback` for
   `astro dev`.
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

**Before writing any page code, prove the model with a second account.** Sign in with an
account that is not a member of `Flopsstuff`, exchange the code by hand, and `POST
/repos/Flopsstuff/flopbut.pl/issues` with that token. If that works, everything else is
plumbing. If it does not, the assumption that non-collaborators can file issues through the app
was wrong and the design has to change before anything is built on it.

## Suggested order of work

1. Register and install the GitHub App, store the secrets, run the second-account test above.
2. `/request/` page in three locales: signed-out and signed-in states, and the sentence about
   publication.
3. OAuth round trip: `/api/auth/login`, `/api/auth/callback`, `state` check, session cookie.
4. `POST /api/request`: validation, the rate-limit query, template rendering with escaping,
   issue creation as the user.

Four steps, no LLM on this side, and nothing here depends on the downstream design being settled.

## Open questions

- **What does the form ask?** Probably one free text field plus how the person knows Flop, given
  that agents classify rather than the submitter picking a category. Still undecided.
- Removal: if a contributor asks for their entry to be taken down, what is the path?
- Does a published contribution link back to its issue, so the provenance is checkable?
