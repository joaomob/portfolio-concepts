// One story per section of offer-members-rate.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Offer" };

export const Details = { name: "Offer details", render: section('offer', 'details'), parameters: note('offer', 'details') };

export const Others = { name: "Other offers", render: section('offer', 'others'), parameters: note('offer', 'others') };
