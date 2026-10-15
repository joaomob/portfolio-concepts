// One story per section of the info page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Info' };

export const Legal = { name: 'Info text', render: section('info', 'legal'), parameters: note('info', 'legal') };
