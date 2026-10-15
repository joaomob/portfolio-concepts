// One story per section of rooftop-spa.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Rooftop and Spa" };

export const Hero = { name: "Hero", render: section('rooftop', 'hero'), parameters: note('rooftop', 'hero') };

export const Pool = { name: "Pool day", render: section('rooftop', 'pool'), parameters: note('rooftop', 'pool') };

export const Bar = { name: "Bar", render: section('rooftop', 'bar'), parameters: note('rooftop', 'bar') };

export const Spa = { name: "Spa", render: section('rooftop', 'spa'), parameters: note('rooftop', 'spa') };
