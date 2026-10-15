// One story per section of the style guide tab of astro/dist/case-study.html, in page order (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Style Guide' };

export const Intro = { name: 'Intro', render: section('styleGuide', 'intro'), parameters: note('styleGuide', 'intro') };

export const Colors = { name: 'Colors', render: section('styleGuide', 'colors'), parameters: note('styleGuide', 'colors') };

export const Type = { name: 'Type', render: section('styleGuide', 'type'), parameters: note('styleGuide', 'type') };

export const Text = { name: 'Text', render: section('styleGuide', 'text'), parameters: note('styleGuide', 'text') };

export const Buttons = { name: 'Buttons', render: section('styleGuide', 'buttons'), parameters: note('styleGuide', 'buttons') };

export const Tags = { name: 'Tags', render: section('styleGuide', 'tags'), parameters: note('styleGuide', 'tags') };

export const Surfaces = { name: 'Surfaces', render: section('styleGuide', 'surfaces'), parameters: note('styleGuide', 'surfaces') };

export const Layout = { name: 'Layout', render: section('styleGuide', 'layout'), parameters: note('styleGuide', 'layout') };

export const Spacing = { name: 'Spacing', render: section('styleGuide', 'spacing'), parameters: note('styleGuide', 'spacing') };

export const Components = { name: 'Components', render: section('styleGuide', 'components'), parameters: note('styleGuide', 'components') };

export const Motion = { name: 'Motion', render: section('styleGuide', 'motion'), parameters: note('styleGuide', 'motion') };

export const Finsweet = { name: 'Finsweet', render: section('styleGuide', 'finsweet'), parameters: note('styleGuide', 'finsweet') };

export const Code = { name: 'Code', render: section('styleGuide', 'code'), parameters: note('styleGuide', 'code') };

export const Breakpoints = { name: 'Breakpoints', render: section('styleGuide', 'breakpoints'), parameters: note('styleGuide', 'breakpoints') };
