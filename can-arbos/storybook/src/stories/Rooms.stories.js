// One story per section of explore-rooms.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Rooms" };

export const Hero = { name: "Hero", render: section('rooms', 'hero'), parameters: note('rooms', 'hero') };

export const List = { name: "Room list", render: section('rooms', 'list'), parameters: note('rooms', 'list') };

export const Every = { name: "In every room", render: section('rooms', 'every'), parameters: note('rooms', 'every') };
