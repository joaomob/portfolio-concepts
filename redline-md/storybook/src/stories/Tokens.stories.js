// The design tokens, read at run time from the built stylesheets (nothing is typed here), so the story follows the CSS.
// The Redline MD stylesheets come from a Webflow export and hold literal values instead of custom properties, so the
// tokens are the values the classes use, outside media queries: every color, the type scale of the heading-style and
// text-size classes, the font families, the corner radii and the spacing classes (padding-section, spacer).
import { applyStyles, stylesheetsOf } from './page.js';

export default { title: 'Tokens' };

const COLOR_PROPS = ['color', 'background-color', 'border-color', 'border-top-color', 'outline-color', 'fill', 'stroke', 'accent-color'];

/** The base rules (no @media) of the page's own stylesheets. */
function baseRules(page) {
  const own = stylesheetsOf(page).map((href) => new URL(href, location.href).href);
  const rules = [];
  for (const sheet of document.styleSheets) {
    if (!own.includes(sheet.href)) continue;
    for (const rule of sheet.cssRules) if (rule.selectorText) rules.push(rule);
  }
  return rules;
}

function collect(page) {
  const colors = new Map();
  const type = new Map();
  const families = new Set();
  const radii = new Set();
  const spacing = new Map();
  for (const rule of baseRules(page)) {
    const st = rule.style;
    for (const prop of COLOR_PROPS) {
      const v = st.getPropertyValue(prop).trim();
      if (/^(#|rgb|hsl)/.test(v)) colors.set(v, (colors.get(v) ?? 0) + 1);
    }
    const fam = st.getPropertyValue('font-family').trim();
    if (fam) families.add(fam);
    const rad = st.getPropertyValue('border-radius').trim();
    if (rad && rad !== '0' && rad !== '0px') radii.add(rad);
    for (const sel of rule.selectorText.split(',').map((s) => s.trim())) {
      const fs = st.getPropertyValue('font-size').trim();
      if (fs && /^\.(heading-style-h\d|text-size-[a-z]+)$/.test(sel)) type.set(sel.slice(1), fs);
      if (/^\.(padding-section-[a-z]+|spacer-[a-z]+)$/.test(sel)) {
        const v = st.getPropertyValue('padding-top').trim() || st.getPropertyValue('height').trim();
        if (v) spacing.set(sel.slice(1), v);
      }
    }
  }
  return { colors, type, families, radii, spacing };
}

const el = (tag, style, text) => {
  const node = document.createElement(tag);
  if (style) node.style.cssText = style;
  if (text != null) node.textContent = text;
  return node;
};

function block(title, grid) {
  const section = el('section', 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px;');
  section.append(el('h2', 'margin: 0; font-size: 20px;', title), grid);
  return section;
}

function renderTokens(page, title) {
  const { colors, type, families, radii, spacing } = collect(page);
  const wrap = el('div', 'padding: 40px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 48px; font-family: system-ui, sans-serif; color: #0a0a0a; background: #ffffff; min-height: 100vh;');
  wrap.append(el('h1', 'margin: 0; font-size: 32px;', title));

  const colorGrid = el('div', 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;');
  for (const [value, uses] of [...colors].sort((a, b) => b[1] - a[1])) {
    const card = el('div', 'display: grid; gap: 6px;');
    card.append(el('div', `height: 72px; border-radius: 10px; border: 1px solid #0a0a0a21; background: ${value};`), el('code', 'font-size: 12px; color: #4a4a4a;', `${value} (${uses} rules)`));
    colorGrid.append(card);
  }
  wrap.append(block('Color', colorGrid));

  const typeGrid = el('div', 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px;');
  for (const [name, size] of type) {
    const row = el('div', 'display: grid; gap: 4px;');
    row.append(el('code', 'font-size: 12px; color: #4a4a4a;', `.${name}: ${size}`), el('div', `font-size: ${size}; line-height: 1.1; font-family: Figtree, sans-serif;`, 'Know what your contract costs.'));
    typeGrid.append(row);
  }
  wrap.append(block('Type scale', typeGrid));

  const famGrid = el('div', 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px;');
  for (const fam of families) famGrid.append(el('code', 'font-size: 12px; color: #4a4a4a;', fam));
  wrap.append(block('Font families', famGrid));

  const spaceGrid = el('div', 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px;');
  for (const [name, value] of spacing) {
    const row = el('div', 'display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 16px; align-items: center;');
    row.append(el('code', 'font-size: 12px; color: #4a4a4a;', `.${name}: ${value}`), el('div', `height: 12px; max-width: 100%; width: ${value}; background: #de332f; border-radius: 2px;`));
    spaceGrid.append(row);
  }
  wrap.append(block('Spacing', spaceGrid));

  const radGrid = el('div', 'display: flex; flex-wrap: wrap; gap: 16px;');
  for (const value of radii) {
    const card = el('div', 'display: grid; gap: 6px; justify-items: start;');
    card.append(el('div', `width: 96px; height: 48px; background: #fde3df; border-radius: ${value};`), el('code', 'font-size: 12px; color: #4a4a4a;', value));
    radGrid.append(card);
  }
  wrap.append(block('Radii', radGrid));
  return wrap;
}

export const Landing = {
  name: 'Landing',
  loaders: [async () => { await applyStyles('home'); return {}; }],
  render: () => renderTokens('home', 'Redline MD landing tokens'),
  parameters: { docs: { description: { story: 'The values the landing stylesheets use outside media queries: colors, type scale, families, spacing and radii.' } } },
};

export const CaseStudy = {
  name: 'Case study',
  loaders: [async () => { await applyStyles('caseStudy'); return {}; }],
  render: () => renderTokens('caseStudy', 'Redline MD case study tokens'),
  parameters: { docs: { description: { story: 'The same reading for the case study and style guide stylesheets.' } } },
};
