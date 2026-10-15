// One story per section of the collection page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Collection' };

export const Grid = { name: 'All products', render: section('collection', 'grid'), parameters: note('collection', 'grid') };
