import type { Locale } from '../config.ts';

type Localized = Record<Locale, string>;

export interface CrewMember {
  name: string;
  role: Localized;
  /** The model behind the agent. Proper nouns, so it stays the same in every locale. */
  engine?: string;
  /** The human gets a different visual treatment - he is the punchline of the list. */
  human?: boolean;
}

/**
 * The actual roster of the Paperclip company that runs the projects, this page included.
 * Order matters: it reads as a shift rota, ending on the one person who is not an agent.
 */
export const crew: CrewMember[] = [
  {
    name: 'Prospero',
    role: { en: 'Chief executive', ru: 'Директор', pl: 'Dyrektor' },
    engine: 'Claude Opus',
  },
  {
    name: 'Daedalus',
    role: { en: 'Chief technology', ru: 'Технический директор', pl: 'Dyrektor techniczny' },
    engine: 'Claude Opus',
  },
  {
    name: 'Wayland',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'Claude Opus',
  },
  {
    name: 'Aldric',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'GPT-5.5',
  },
  {
    name: 'Lyra',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'Gemini 2.5 Pro',
  },
  {
    name: 'Soren',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'Cursor Composer',
  },
  {
    name: 'Orion',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'Qwen3-Coder',
  },
  {
    name: 'Vesper',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
    engine: 'Grok 4.6',
  },
  {
    name: 'Robert',
    role: { en: 'Special projects', ru: 'Особые задачи', pl: 'Zadania specjalne' },
    engine: 'Claude Sonnet',
  },
  {
    name: 'Iris',
    role: { en: 'Interface design', ru: 'Интерфейсы', pl: 'Interfejsy' },
    engine: 'Claude Opus',
  },
  {
    name: 'Pygmalion',
    role: { en: '3D art', ru: '3D-графика', pl: 'Grafika 3D' },
    engine: 'Claude Opus',
  },
  {
    name: 'Flop Butylkin',
    role: {
      en: 'Decides which of them was right',
      ru: 'Решает, кто из них был прав',
      pl: 'Decyduje, który z nich miał rację',
    },
    human: true,
  },
];
