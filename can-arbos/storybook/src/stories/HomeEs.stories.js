// One story per section of es.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Home (Spanish)" };

export const Hero = { name: "Hero", render: section('homeEs', 'hero'), parameters: note('homeEs', 'hero') };

export const Where = { name: "Where we are", render: section('homeEs', 'where'), parameters: note('homeEs', 'where') };
