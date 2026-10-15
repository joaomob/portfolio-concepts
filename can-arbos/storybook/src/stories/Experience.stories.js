// One story per section of experience-courtyards-walk.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Experience" };

export const Hero = { name: "Hero", render: section('experience', 'hero'), parameters: note('experience', 'hero') };

export const About = { name: "About the experience", render: section('experience', 'about'), parameters: note('experience', 'about') };

export const Walk = { name: "Walk map", render: section('experience', 'walk'), parameters: note('experience', 'walk') };

export const More = { name: "More experiences", render: section('experience', 'more'), parameters: note('experience', 'more') };
