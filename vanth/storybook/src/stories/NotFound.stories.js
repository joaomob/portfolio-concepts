// One story per section of 404.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Not found' };

export const NotFound = { name: 'Not found', render: section('notFound', 'not-found'), parameters: note('notFound', 'not-found') };
