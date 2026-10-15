// One story per section of index.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Home" };

export const Nav = { name: "Menu", render: section('home', 'nav'), parameters: note('home', 'nav') };

export const Hero = { name: "Hero", render: section('home', 'hero'), parameters: note('home', 'hero') };

export const House = { name: "The house", render: section('home', 'house'), parameters: note('home', 'house') };

export const Rooms = { name: "Rooms carousel", render: section('home', 'rooms'), parameters: note('home', 'rooms') };

export const Dining = { name: "Dining", render: section('home', 'dining'), parameters: note('home', 'dining') };

export const Rooftop = { name: "Rooftop", render: section('home', 'rooftop'), parameters: note('home', 'rooftop') };

export const Where = { name: "Where we are", render: section('home', 'where'), parameters: note('home', 'where') };

export const Experiences = { name: "Experiences", render: section('home', 'experiences'), parameters: note('home', 'experiences') };

export const Celebrations = { name: "Celebrations band", render: section('home', 'celebrations'), parameters: note('home', 'celebrations') };

export const Faq = { name: "Questions", render: section('home', 'faq'), parameters: note('home', 'faq') };

export const Close = { name: "Closing band", render: section('home', 'close'), parameters: note('home', 'close') };

export const Footer = { name: "Footer", render: section('home', 'footer'), parameters: note('home', 'footer') };

export const Dialog = { name: "Booking dialog", render: section('home', 'dialog'), parameters: note('home', 'dialog') };
