// One story per section of legal.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Legal" };

export const Text = { name: "Legal text", render: section('legal', 'text'), parameters: note('legal', 'text') };
