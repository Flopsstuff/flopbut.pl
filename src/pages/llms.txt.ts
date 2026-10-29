import type { APIRoute } from 'astro';
import { LINKS, SITE_URL } from '../config.ts';
import { crew } from '../data/crew.ts';
import { STACK_GROUPS, stack } from '../data/stack.ts';
import { useTranslations } from '../i18n/utils.ts';

/**
 * /llms.txt (llmstxt.org): the site in one Markdown file for language models. Built from the
 * same dictionary, roster and stack as the pages, so it cannot drift from what visitors see.
 */

const t = useTranslations('en');
const url = (path: string) => new URL(path, SITE_URL).href;

function render(): string {
  const work = Object.values(t.work.items).map((item) => `- **${item.title}**: ${item.body}`);
  const numbers = Object.values(t.numbers.items).map((item) => `- ${item.value} ${item.label}`);
  const roster = crew.map((member) =>
    member.human
      ? `- ${member.name}: human. ${member.role.en}.`
      : `- ${member.name}: ${member.role.en}, runs on ${member.engine}`,
  );
  const tools = STACK_GROUPS.map(
    (group) => `- ${t.stack.groups[group]}: ${stack[group].join(', ')}`,
  );

  return [
    `# ${t.hero.name}`,
    '',
    `> ${t.meta.description}`,
    '',
    `${t.hero.lead.first} ${t.hero.lead.second} ${t.hero.body}`,
    '',
    `Based in ${t.hero.location}. ${t.contact.body}`,
    '',
    '## Pages',
    '',
    `- [Home](${url('/')}): who he is, what he works on, the stack and the crew of AI agents`,
    `- [The wall](${url('/wall/')}): ${t.wall.meta.description}`,
    `- [Project catalogue](${LINKS.projects}): ${t.projects.body}`,
    `- [Russian version](${url('/ru/')}) and [Polish version](${url('/pl/')}) of the same site`,
    '',
    '## Work',
    '',
    ...work,
    '',
    '## In numbers',
    '',
    ...numbers,
    '',
    '## The crew',
    '',
    t.crew.body,
    '',
    ...roster,
    '',
    `${t.crew.punchline} ${t.crew.humanPart}`,
    '',
    '## Stack',
    '',
    ...tools,
    '',
    '## Contact',
    '',
    '- Email: flopspm@gmail.com',
    `- GitHub: ${LINKS.github}`,
    `- LinkedIn: ${LINKS.linkedin}`,
    '',
    '## Optional',
    '',
    `- [Privacy policy](${url('/privacy/')})`,
    `- [Terms of service](${url('/terms/')})`,
    `- [Source code of this site](${LINKS.repo})`,
    '',
  ].join('\n');
}

export const GET: APIRoute = () =>
  new Response(render(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
