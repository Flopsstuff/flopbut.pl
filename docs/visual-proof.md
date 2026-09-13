# Visual proof on a pull request

Every pull request that changes something a visitor can see carries a screenshot of the result.
A diff says what the markup now is; it does not say what the page now looks like, and the person
who has to decide whether to merge it should not have to build the branch to find out.

## The two commands

```bash
pnpm dev                                                   # the page has to be running
pnpm shot http://localhost:4321/wall/ .review-shots/11/wall.png
pnpm publish-shot .review-shots/11/wall.png 11/wall.png "The wall with the five cats"
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

`pnpm publish-shot` uploads the file to the orphan `shots` branch through the GitHub contents
API and prints the markdown line that embeds it. It writes nothing locally: no checkout, no
branch switch, no stash, which matters because several agents share this working tree.

## Why a separate branch

A screenshot cannot live in the pull request's own diff. `.gitattributes` sends every PNG on
`main` to Git LFS, and raw.githubusercontent.com answers an LFS path with the pointer file
rather than the image, so the embed would render as broken. Worse, the image would ship with the
site and stay in its history forever.

The `shots` branch is an orphan: no shared history with `main`, its own `.gitattributes` that
keeps PNGs out of LFS, and nothing on it is ever merged. Deleting a directory there costs
nothing once its pull request is closed.

## What a pull request body shows

Under a `## Visual proof` heading, one image per thing worth looking at, each with a caption
saying which page and which state it is:

```markdown
## Visual proof

The wall at `/wall/`, dark theme:

![The wall with the five cats entry](https://raw.githubusercontent.com/Flopsstuff/flopbut.pl/shots/11/wall-en.png)
```

One shot of the changed page is the floor. Add more when the change depends on state the first
shot cannot hold: the light theme when colours moved, a narrow viewport when the layout is new,
the other two locales when the text length differs enough to reflow anything.

`.review-shots/` is git-ignored scratch. Whoever opened the pull request deletes their directory
there when the work is done, as with any other review leftovers.
