// One story per section of 404.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "404" };

export const Page = { name: "Not found", render: section('notFound', 'page'), parameters: note('notFound', 'page') };
