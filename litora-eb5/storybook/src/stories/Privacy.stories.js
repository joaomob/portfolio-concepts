// One story per section of the privacy page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Privacy' };

export const Legal = { name: 'Legal text', render: section('privacy', 'legal'), parameters: note('privacy', 'legal') };
