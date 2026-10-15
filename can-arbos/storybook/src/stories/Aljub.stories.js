// One story per section of aljub.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Aljub" };

export const Hero = { name: "Hero", render: section('aljub', 'hero'), parameters: note('aljub', 'hero') };

export const Menu = { name: "Menu", render: section('aljub', 'menu'), parameters: note('aljub', 'menu') };

export const Chef = { name: "Chef", render: section('aljub', 'chef'), parameters: note('aljub', 'chef') };

export const Hours = { name: "Hours", render: section('aljub', 'hours'), parameters: note('aljub', 'hours') };
