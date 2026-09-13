# The wall's entry format

Status: **live**, set by the first accepted contribution (issue #11, five cats for @katyoid).
Written 2026-09-13.

The wall is a list of things other people asked for, oldest at the top. Each one is drawn by its
own component, so no two entries look alike, and that is the point: a wall where every entry has
the same shape is a changelog. What every entry does share is this contract. Read it before
building contribution number two, because the format is the durable part and the drawings are
just what the first one happened to be wearing.

## An entry is a frame plus a contribution

`src/components/wall/WallEntry.astro` is the frame: the card on `--surface-raised`, and under it
the credit line saying who asked, which issue the request arrived as, and when. A contribution is
a component under `src/components/wall/` that gets slotted into it, and `src/components/Wall.astro`
appends the pair to the `<ul>`:

```astro
<WallEntry locale={locale} author="katyoid" issue={11} date="2026-09-13" span={6}>
  <FiveCats locale={locale} />
</WallEntry>
```

**Attribution belongs to the frame and is never the contribution's job.** A contribution that
signs itself gets the name onto the wall twice, in two different voices, and makes the credit
line look optional to whoever copies it next. It is not optional: the wall exists because a claim
about someone carries weight only when a real person is attached to it.

Nothing already on the wall moves to make room for a new entry. Appending is the only edit.

## The width: `span` out of six

Above `52rem` the wall is a six-column grid; below it, one column, and `span` does nothing. An
entry claims its width by passing `span`, which `WallEntry` publishes as the `--span` custom
property. The breakpoint lives once, in `Wall.astro`, next to the grid that owns it.

| `span` | Width | What it is for                                                        |
| ------ | ----- | --------------------------------------------------------------------- |
| `6`    | Full  | The default. Drawings, anything with a row of figures, anything wide.  |
| `4`    | Two thirds | A short note that would look thin at full width but needs room to breathe. |
| `3`    | Half  | A one-line note. Two of them sit side by side.                         |

Widths outside `3 | 4 | 6` are a type error. The union is deliberately small: three choices are
enough to keep the wall varied, and the shorter the list the less an author has to weigh. Adding
a value later is additive and costs nothing, so let a contribution that actually needs it ask.

A row that does not add up to six leaves air at its right edge. That is the format working, not a
bug to fix.

**Never add `grid-auto-flow: dense` to `.entries`.** It backfills a later narrow entry into an
earlier row's leftover columns, which silently reorders the wall and breaks the oldest-first
chronology the whole page is built on.

## Colour

A contribution draws in `var(--patina)` and fills against `var(--entry-bg, var(--surface))`,
which the frame sets to the card colour. Never hard-code a surface token inside a contribution:
the fallback exists for a contribution rendered outside the frame, and the frame is free to move
its card colour without every drawing on the wall going stale.

The two brand colours are the whole palette. No new hex values, in an entry or anywhere else.

## Strings

Every word a visitor reads lives in `src/i18n/ui.ts` under `wall.entries.<key>`, where `<key>`
matches the component that draws it (`FiveCats.astro` to `wall.entries.fiveCats`). English first,
because the English dictionary defines the shape and the other two are typed against it, so a
missing Russian or Polish string is a build error rather than a blank card.

## The credit line is settled; do not restyle it per entry

The prefix, the issue link and the date are mono `.label` in `--muted`. The handle is not: it is
sans, mixed case, `--step-0`, in `--text`, because a person's name is not an eyebrow. That
contrast is the whole hierarchy of the line, and it is what makes the contributor the loudest
thing in it rather than one more metadata chip. If an entry needs the credit line to say
something else, change the frame for every entry, not this one.

## Checklist for a new contribution

1. A component under `src/components/wall/`, taking `locale` and nothing else it can avoid.
2. Its strings under `wall.entries.<key>` in all three dictionaries.
3. A `<WallEntry>` in `Wall.astro`, appended last, with `author`, `issue`, `date` and `span`.
4. Rendered at a wide and a narrow viewport in both themes before it is offered for review.
5. A screenshot in the pull request under `## Visual proof`, per
   [`docs/visual-proof.md`](visual-proof.md).
