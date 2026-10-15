// One story per section of members.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Members" };

export const Welcome = { name: "Welcome", render: section('members', 'welcome'), parameters: note('members', 'welcome') };

export const Stay = { name: "My stay", render: section('members', 'stay'), parameters: note('members', 'stay') };
