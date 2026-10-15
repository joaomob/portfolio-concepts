// One story per section of collections.html and fragrances.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Lists' };

export const CollectionsHero = { name: 'Collections, Hero', render: section('collections', 'hero'), parameters: note('collections', 'hero') };

export const CollectionsList = { name: 'Collections, List', render: section('collections', 'list'), parameters: note('collections', 'list') };

export const FragrancesList = { name: 'Fragrances, List', render: section('fragrances', 'list'), parameters: note('fragrances', 'list') };
