// The design tokens, read at run time from the :root rules of the built stylesheets (nothing is typed here), so the
// story follows the CSS. Landing: the custom properties of astro/dist/index.html; Style guide: those of the style
// guide page, which has its own palette and semantic layer.
import { applyStyles, stylesheetsOf } from './page.js';

export default { title: 'Tokens' };

const groups = [
  { name: 'Color', test: (n, v) => /^(#|rgb|hsl|var\(--swatch)/.test(v) },
  { name: 'Type scale', test: (n) => /^--(fs|font-size|text-size)-/.test(n) },
  { name: 'Font families and leading', test: (n) => /^--(f|font|lh|leading)-/.test(n) },
  { name: 'Spacing, sizes and radii', test: (n) => /^--(pad|gap|space|spacing|radius|container|nav-h|dock-h|size)/.test(n) },
  { name: 'Motion', test: (n) => /^--(ease|t-)/.test(n) },
];

/** Every custom property set on :root by the page's own stylesheets, first value wins (the base, before media queries). */
function rootTokens(page) {
  const own = stylesheetsOf(page).map((href) => new URL(href, location.href).href);
  const tokens = new Map();
  const walk = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules && !rule.selectorText) continue; // skip @media and the like: they hold the breakpoint values
      if (rule.selectorText === ':root') for (const name of rule.style) if (name.startsWith('--') && !tokens.has(name)) tokens.set(name, rule.style.getPropertyValue(name).trim());
    }
  };
  for (const sheet of document.styleSheets) if (own.includes(sheet.href)) walk(sheet.cssRules);
  return tokens;
}

const el = (tag, style, text) => {
  const node = document.createElement(tag);
  if (style) node.style.cssText = style;
  if (text != null) node.textContent = text;
  return node;
};

function renderTokens(page, title) {
  const tokens = rootTokens(page);
  // literal values, so a sample still reads right after a story of the other page swaps the stylesheet
  const computed = getComputedStyle(document.documentElement);
  const display = computed.getPropertyValue('--f-display').trim() || computed.getPropertyValue('--font-display').trim() || 'inherit';
  const wrap = el('div', 'padding: 40px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 48px; font-family: system-ui, sans-serif; color: #1b1713; background: #fffdf6; min-height: 100vh;');
  wrap.append(el('h1', 'margin: 0; font-size: 32px;', title));
  for (const group of groups) {
    const entries = [...tokens].filter(([n, v]) => group.test(n, v));
    if (!entries.length) continue;
    const block = el('section', 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px;');
    block.append(el('h2', 'margin: 0; font-size: 20px;', group.name));
    const grid = el('div', group.name === 'Color' ? 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;' : 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px;');
    for (const [name, raw] of entries) {
      const value = computed.getPropertyValue(name).trim() || raw;
      const label = el('code', 'font-size: 12px; color: #4a4a4a;', raw === value ? `${name}: ${value}` : `${name}: ${raw} (${value})`);
      if (group.name === 'Color') {
        const card = el('div', 'display: grid; gap: 6px;');
        card.append(el('div', `height: 72px; border-radius: 10px; border: 1px solid #1b171321; background: ${value};`), label);
        grid.append(card);
      } else if (group.name === 'Type scale') {
        const row = el('div', 'display: grid; gap: 4px;');
        row.append(label, el('div', `font-size: ${value}; line-height: 1.1; font-family: ${display};`, 'Você sabe aonde quer chegar.'));
        grid.append(row);
      } else if (group.name === 'Spacing, sizes and radii') {
        const row = el('div', 'display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 16px; align-items: center;');
        const isRadius = name.includes('radius');
        const bar = isRadius
          ? el('div', `width: 96px; height: 48px; background: #e7dcc9; border-radius: ${value};`)
          : el('div', `height: 12px; max-width: 100%; width: ${value}; background: #c2410c; border-radius: 2px;`);
        row.append(label, bar);
        grid.append(row);
      } else {
        grid.append(label);
      }
    }
    block.append(grid);
    wrap.append(block);
  }
  return wrap;
}

export const Landing = {
  name: 'Landing',
  loaders: [async () => { await applyStyles('home'); return {}; }],
  render: () => renderTokens('home', 'Olimpo landing tokens'),
  parameters: { docs: { description: { story: 'The :root custom properties of the landing stylesheet: palette, type scale, families, spacing, radii and motion.' } } },
};

export const StyleGuide = {
  name: 'Style guide',
  loaders: [async () => { await applyStyles('styleGuide'); return {}; }],
  render: () => renderTokens('styleGuide', 'Olimpo style guide tokens'),
  parameters: { docs: { description: { story: 'The :root custom properties of the style guide: the swatches, the semantic layer that points at them, leading and radii.' } } },
};
