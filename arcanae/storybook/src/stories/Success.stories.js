// One story per section of the success page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Success' };

export const Success = { name: 'Thank you', render: section('success', 'success'), parameters: note('success', 'success') };
