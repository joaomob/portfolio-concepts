// One story per section of celebrations.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Celebrations" };

export const Hero = { name: "Hero", render: section('celebrations', 'hero'), parameters: note('celebrations', 'hero') };

export const Spaces = { name: "Spaces", render: section('celebrations', 'spaces'), parameters: note('celebrations', 'spaces') };

export const Care = { name: "How we help", render: section('celebrations', 'care'), parameters: note('celebrations', 'care') };

export const Form = { name: "Event form", render: section('celebrations', 'form'), parameters: note('celebrations', 'form') };
