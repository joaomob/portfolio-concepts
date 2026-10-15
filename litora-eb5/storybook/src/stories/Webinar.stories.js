// One story per section of the webinar page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Webinar' };

export const Header = { name: 'Site header', render: section('webinar', 'header'), parameters: note('webinar', 'header') };

export const Hero = { name: 'Hero', render: section('webinar', 'hero'), parameters: note('webinar', 'hero') };

export const Statement = { name: 'Statement', render: section('webinar', 'statement'), parameters: note('webinar', 'statement') };

export const Project = { name: 'Project reveal', render: section('webinar', 'project'), parameters: note('webinar', 'project') };

export const Topics = { name: 'Topics', render: section('webinar', 'topics'), parameters: note('webinar', 'topics') };

export const Audience = { name: 'Audience', render: section('webinar', 'audience'), parameters: note('webinar', 'audience') };

export const Speakers = { name: 'Speakers', render: section('webinar', 'speakers'), parameters: note('webinar', 'speakers') };

export const Numbers = { name: 'Numbers', render: section('webinar', 'numbers'), parameters: note('webinar', 'numbers') };

export const Stack = { name: 'Project stack', render: section('webinar', 'stack'), parameters: note('webinar', 'stack') };

export const Faq = { name: 'Questions', render: section('webinar', 'faq'), parameters: note('webinar', 'faq') };

export const Cta = { name: 'Final call', render: section('webinar', 'cta'), parameters: note('webinar', 'cta') };

export const Footer = { name: 'Site footer', render: section('webinar', 'footer'), parameters: note('webinar', 'footer') };
