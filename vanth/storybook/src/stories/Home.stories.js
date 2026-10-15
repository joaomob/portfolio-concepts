// One story per section of index.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Home' };

export const Nav = { name: 'Site header', render: section('home', 'nav'), parameters: note('home', 'nav') };

export const Hero = { name: 'Hero', render: section('home', 'hero'), parameters: note('home', 'hero') };

export const Manifesto = { name: 'Manifesto', render: section('home', 'manifesto'), parameters: note('home', 'manifesto') };

export const Lines = { name: 'Lines', render: section('home', 'lines'), parameters: note('home', 'lines') };

export const Marquee = { name: 'Marquee', render: section('home', 'marquee'), parameters: note('home', 'marquee') };

export const Pieces = { name: 'Selected pieces', render: section('home', 'pieces'), parameters: note('home', 'pieces') };

export const Fragrance = { name: 'Fragrance', render: section('home', 'fragrance'), parameters: note('home', 'fragrance') };

export const Lookbook = { name: 'Lookbook', render: section('home', 'lookbook'), parameters: note('home', 'lookbook') };

export const Departments = { name: 'Departments', render: section('home', 'departments'), parameters: note('home', 'departments') };

export const Footer = { name: 'Site footer', render: section('home', 'footer'), parameters: note('home', 'footer') };
