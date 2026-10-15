// One story per section of fragrance-riot.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Fragrance' };

export const Hero = { name: 'Hero', render: section('fragrance', 'hero'), parameters: note('fragrance', 'hero') };

export const Notes = { name: 'Notes', render: section('fragrance', 'notes'), parameters: note('fragrance', 'notes') };

export const Ritual = { name: 'Ritual', render: section('fragrance', 'ritual'), parameters: note('fragrance', 'ritual') };

export const Facts = { name: 'Facts', render: section('fragrance', 'facts'), parameters: note('fragrance', 'facts') };

export const Next = { name: 'Next fragrance', render: section('fragrance', 'next'), parameters: note('fragrance', 'next') };
