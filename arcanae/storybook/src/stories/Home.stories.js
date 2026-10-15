// One story per section of the home page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Home' };

export const Nav = { name: 'Site header', render: section('home', 'nav'), parameters: note('home', 'nav') };
export const Hero = { name: 'Hero', render: section('home', 'hero'), parameters: note('home', 'hero') };
export const Collection = { name: 'Collection', render: section('home', 'collection'), parameters: note('home', 'collection') };
export const Craft = { name: 'Craft', render: section('home', 'craft'), parameters: note('home', 'craft') };
export const Trust = { name: 'Trust band', render: section('home', 'trust'), parameters: note('home', 'trust') };
export const Plate = { name: 'Detail plate', render: section('home', 'plate'), parameters: note('home', 'plate') };
export const Story = { name: 'Story', render: section('home', 'story'), parameters: note('home', 'story') };
export const Faq = { name: 'Questions', render: section('home', 'faq'), parameters: note('home', 'faq') };
export const Wheel = { name: 'Wheel', render: section('home', 'wheel'), parameters: note('home', 'wheel') };
export const Newsletter = { name: 'Newsletter', render: section('home', 'newsletter'), parameters: note('home', 'newsletter') };
export const Footer = { name: 'Footer', render: section('home', 'footer'), parameters: note('home', 'footer') };
