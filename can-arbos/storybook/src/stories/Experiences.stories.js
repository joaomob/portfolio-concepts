// One story per section of explore-experiences.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Experiences" };

export const Intro = { name: "Intro", render: section('experiences', 'intro'), parameters: note('experiences', 'intro') };

export const Hub = { name: "Experience list", render: section('experiences', 'hub'), parameters: note('experiences', 'hub') };
