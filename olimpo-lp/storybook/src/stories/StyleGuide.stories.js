// One story per section of the style guide (astro/dist/style-guide.html), in page order (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Style Guide' };

export const Hero = { name: 'Hero', render: section('styleGuide', 'hero'), parameters: note('styleGuide', 'hero') };

export const Typography = { name: 'Typography', render: section('styleGuide', 'typography'), parameters: note('styleGuide', 'typography') };

export const RichText = { name: 'Rich text', render: section('styleGuide', 'rich-text'), parameters: note('styleGuide', 'rich-text') };

export const Color = { name: 'Color', render: section('styleGuide', 'color'), parameters: note('styleGuide', 'color') };

export const Spacing = { name: 'Spacing', render: section('styleGuide', 'spacing'), parameters: note('styleGuide', 'spacing') };

export const Sizing = { name: 'Sizing', render: section('styleGuide', 'sizing'), parameters: note('styleGuide', 'sizing') };

export const Components = { name: 'Components', render: section('styleGuide', 'components'), parameters: note('styleGuide', 'components') };
