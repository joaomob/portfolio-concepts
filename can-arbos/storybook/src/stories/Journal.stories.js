// One story per section of journal.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Journal" };

export const List = { name: "Guide list", render: section('journal', 'list'), parameters: note('journal', 'list') };
