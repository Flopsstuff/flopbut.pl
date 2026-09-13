# Visual proof on a pull request

Every pull request that changes something a visitor can see carries a screenshot of the result.
A diff says what the markup now is; it does not say what the page now looks like, and the person
who has to decide whether to merge it should not have to build the branch to find out.

## Take the shot

```bash
pnpm dev                                                   # the page has to be running
pnpm shot http://localhost:4321/wall/ .review-shots/11/wall.png
```

`pnpm shot` drives the system Chromium over CDP and writes a full-page PNG at 1280 css px wide
and 2x pixel density. It takes the dev server's toolbar out of the picture first, so the shot
holds the page and nothing else.

| Option       | What it does                                                             |
| ------------ | ------------------------------------------------------------------------ |
| `--width`    | viewport width in css px, 1280 by default                                 |
| `--dpr`      | pixel density, 2 by default                                               |
| `--theme`    | `dark` (default) or `light`, written into the same `theme` key the site reads |
| `--selector` | clip to one element, for when the change is a small part of a long page   |
| `--wait`     | milliseconds to settle after load, 400 by default                         |

## Attach it

The shot is attached to the pull request with GitHub CLI: the same upload as dragging an image
into the browser. Nothing is committed, no branch is involved and nothing changes locally, which
matters because several agents share this working tree.

Write the body with the local path where each image goes:

```markdown
## Visual proof

The wall at `/wall/`, dark theme:

![The wall with the five cats entry](.review-shots/11/wall.png)
```

Then pass the same paths to `--attach`, once per image:

```bash
gh pr create --title "..." --body-file body.md --attach .review-shots/11/wall.png
gh pr edit 18 --body-file body.md --attach .review-shots/11/wall.png   # already open
gh pr comment 18 --body-file reply.md --attach .review-shots/11/wall.png
```

gh uploads each file and rewrites the reference to it in place, keeping the alt text written
there. A file that is attached but not referenced is appended to the end of the body, so
reference every image to decide where it sits.

To change the body later, start from the body as it is now, which already holds the uploaded
links (`gh pr view 18 --json body --jq .body > body.md`), and attach only the images added since.

**Requirements.** GitHub CLI 2.99.0 or newer, write access to the repository, and the OAuth token
`gh auth login` creates or a classic personal access token. If some uploads fail, gh still creates
or updates the pull request with the ones that succeeded, prints its URL and exits non-zero: check
the body and run `gh pr edit` again for the rest.

## Not in the diff

A screenshot never goes into the pull request's own diff. It would ship with the site and stay in
the repository's history for good, and images here are stored in Git LFS (see `.gitattributes`),
so it would also cost LFS storage for something nobody needs after the merge.

Pull requests #16, #17 and #18 embed their images from a `shots` branch, which predates
`--attach`. It stays as it is so those still render; nothing new goes there.

## What a pull request body shows

Under a `## Visual proof` heading, one image per thing worth looking at, each with a caption
saying which page and which state it is.

One shot of the changed page is the floor. Add more when the change depends on state the first
shot cannot hold: the light theme when colours moved, a narrow viewport when the layout is new,
the other two locales when the text length differs enough to reflow anything.

`.review-shots/` is git-ignored scratch. Whoever opened the pull request deletes their directory
there when the work is done, as with any other review leftovers.
