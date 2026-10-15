// One story per section of the page astro/dist/case-study.html, in page order (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Case Study' };

export const Hero = { name: 'Hero', render: section('caseStudy', 'hero'), parameters: note('caseStudy', 'hero') };

export const Found = { name: 'What I found', render: section('caseStudy', 'found'), parameters: note('caseStudy', 'found') };

export const HeroBlock = { name: 'Hero block', render: section('caseStudy', 'hero-block'), parameters: note('caseStudy', 'hero-block') };

export const Numbers = { name: 'Numbers', render: section('caseStudy', 'numbers'), parameters: note('caseStudy', 'numbers') };

export const Report = { name: 'Report', render: section('caseStudy', 'report'), parameters: note('caseStudy', 'report') };

export const Demo = { name: 'Demo', render: section('caseStudy', 'demo'), parameters: note('caseStudy', 'demo') };

export const Calc = { name: 'Calculator', render: section('caseStudy', 'calc'), parameters: note('caseStudy', 'calc') };

export const Terms = { name: 'Terms', render: section('caseStudy', 'terms'), parameters: note('caseStudy', 'terms') };

export const Cost = { name: 'Cost', render: section('caseStudy', 'cost'), parameters: note('caseStudy', 'cost') };

export const Trust = { name: 'Trust', render: section('caseStudy', 'trust'), parameters: note('caseStudy', 'trust') };

export const Mobile = { name: 'Mobile', render: section('caseStudy', 'mobile'), parameters: note('caseStudy', 'mobile') };

export const Legal = { name: 'Legal', render: section('caseStudy', 'legal'), parameters: note('caseStudy', 'legal') };

export const Build = { name: 'Build', render: section('caseStudy', 'build'), parameters: note('caseStudy', 'build') };

export const Accessibility = { name: 'Accessibility', render: section('caseStudy', 'accessibility'), parameters: note('caseStudy', 'accessibility') };

export const Questions = { name: 'Questions', render: section('caseStudy', 'questions'), parameters: note('caseStudy', 'questions') };

export const Cta = { name: 'CTA', render: section('caseStudy', 'cta'), parameters: note('caseStudy', 'cta') };
