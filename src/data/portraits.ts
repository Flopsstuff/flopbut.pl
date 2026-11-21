import type { ImageMetadata } from 'astro';

/*
  One portrait per agent, named after the agent in lower case. The same images are the agents'
  Gravatars, which is where their commits get a face outside GitHub. agent.jpg is the shared
  one: the machine account the agents push from wears it.
*/
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/agents/*.jpg', {
  eager: true,
});

function load(file: string): ImageMetadata {
  const image = files[`../assets/agents/${file}.jpg`]?.default;
  if (!image) throw new Error(`src/assets/agents/${file}.jpg is missing`);
  return image;
}

/** Fails the build rather than render a crew member without a face. */
export function portraitOf(name: string): ImageMetadata {
  return load(name.toLowerCase());
}

export const sharedPortrait = load('agent');
