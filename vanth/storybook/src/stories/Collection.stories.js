// One story per section of collection-riot.html and collection-lacquer.html, in the order of the page, the Lacquer beauty section in its place (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Collection' };

export const CollectionHero = { name: 'Hero', render: section('collection', 'hero'), parameters: note('collection', 'hero') };

export const CollectionIntro = { name: 'Intro', render: section('collection', 'intro'), parameters: note('collection', 'intro') };

export const CollectionLook = { name: 'Look', render: section('collection', 'look'), parameters: note('collection', 'look') };

export const CollectionLookReverse = { name: 'Look, reversed', render: section('collection', 'look-reverse'), parameters: note('collection', 'look-reverse') };

export const CollectionPieces = { name: 'Pieces', render: section('collection', 'pieces'), parameters: note('collection', 'pieces') };

export const Beauty = { name: 'Beauty', render: section('lacquer', 'beauty'), parameters: note('lacquer', 'beauty') };

export const CollectionFragrance = { name: 'Fragrance', render: section('collection', 'fragrance'), parameters: note('collection', 'fragrance') };

export const CollectionNext = { name: 'Next line', render: section('collection', 'next'), parameters: note('collection', 'next') };
