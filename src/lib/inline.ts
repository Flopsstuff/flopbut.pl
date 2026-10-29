/**
 * The little markup the legal pages allow inside a dictionary string: [label](url) for a link and
 * `name` for code. Everything else is plain text, so a string never reaches the page as HTML.
 */
export type Inline =
  | { kind: 'text'; text: string }
  | { kind: 'link'; text: string; href: string }
  | { kind: 'code'; text: string };

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;

export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const match of source.matchAll(TOKEN)) {
    const [whole, label, href, code] = match;
    if (match.index > last) out.push({ kind: 'text', text: source.slice(last, match.index) });
    if (code !== undefined) out.push({ kind: 'code', text: code });
    else if (label !== undefined && href !== undefined)
      out.push({ kind: 'link', text: label, href });
    last = match.index + whole.length;
  }
  if (last < source.length) out.push({ kind: 'text', text: source.slice(last) });
  return out;
}
