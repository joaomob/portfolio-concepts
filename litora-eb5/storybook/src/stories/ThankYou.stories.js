// One story per section of the thank you page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Thank you' };

export const Confirmation = { name: 'Confirmation hero', render: section('thankYou', 'confirmation'), parameters: note('thankYou', 'confirmation') };

export const Steps = { name: 'Steps', render: section('thankYou', 'steps'), parameters: note('thankYou', 'steps') };
