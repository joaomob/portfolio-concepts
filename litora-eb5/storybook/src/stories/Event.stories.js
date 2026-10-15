// One story per section of the event page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Event' };

export const Hero = { name: 'Hero', render: section('event', 'hero'), parameters: note('event', 'hero') };
