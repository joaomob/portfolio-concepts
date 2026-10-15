// One story per section of journal-things-to-do-palma-old-town.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Journal guide" };

export const Hero = { name: "Hero", render: section('guide', 'hero'), parameters: note('guide', 'hero') };

export const Body = { name: "Guide text", render: section('guide', 'body'), parameters: note('guide', 'body') };

export const Map = { name: "Guide map", render: section('guide', 'map'), parameters: note('guide', 'map') };

export const More = { name: "More guides", render: section('guide', 'more'), parameters: note('guide', 'more') };
