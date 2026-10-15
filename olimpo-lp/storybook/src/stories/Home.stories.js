// One story per section of the landing (astro/dist/index.html), in page order (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Home' };

export const Nav = { name: 'Nav', render: section('home', 'nav'), parameters: note('home', 'nav') };

export const Hero = { name: 'Hero', render: section('home', 'hero'), parameters: note('home', 'hero') };

export const Frieze = { name: 'Frieze', render: section('home', 'frieze'), parameters: note('home', 'frieze') };

export const Problem = { name: 'Problem', render: section('home', 'problem'), parameters: note('home', 'problem') };

export const Turn = { name: 'Turn', render: section('home', 'turn'), parameters: note('home', 'turn') };

export const Method = { name: 'Method', render: section('home', 'method'), parameters: note('home', 'method') };

export const Planner = { name: 'Planner', render: section('home', 'planner'), parameters: note('home', 'planner') };

export const Followup = { name: 'Follow-up', render: section('home', 'followup'), parameters: note('home', 'followup') };

export const Execution = { name: 'Execution', render: section('home', 'execution'), parameters: note('home', 'execution') };

export const Personalization = { name: 'Personalization', render: section('home', 'personalization'), parameters: note('home', 'personalization') };

export const StayingPower = { name: 'Staying power', render: section('home', 'staying-power'), parameters: note('home', 'staying-power') };

export const Trust = { name: 'Trust', render: section('home', 'trust'), parameters: note('home', 'trust') };

export const Plans = { name: 'Plans', render: section('home', 'plans'), parameters: note('home', 'plans') };

export const Closing = { name: 'Closing', render: section('home', 'closing'), parameters: note('home', 'closing') };

export const Footer = { name: 'Footer', render: section('home', 'footer'), parameters: note('home', 'footer') };

export const Dock = { name: 'Codex dock', render: section('home', 'dock'), parameters: note('home', 'dock') };
