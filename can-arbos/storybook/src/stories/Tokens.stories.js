// The design tokens of astro/src/styles/tokens.css (the values of the Lumos Variables): colours, type scale and
// spacing. The names are read from the file, the values from the live stylesheet (getComputedStyle), so the story
// follows the breakpoint of the chosen viewport.
import tokensCss from '../../../astro/src/styles/tokens.css?raw';
import { applyStyles } from './page.js';

// every custom property declared in the first :root block (the values without a breakpoint)
const firstRoot = tokensCss.slice(tokensCss.indexOf(':root'), tokensCss.indexOf('}', tokensCss.indexOf(':root')));
const names = [...new Set([...firstRoot.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))];
const group = (test) => names.filter(test);
const label = (name) => name.replace(/^--_?/, '').replace(/---?/g, ' / ');

function render() {
  const styled = applyStyles();
  const root = document.createElement('div');
  root.className = 'u-theme-light';
  root.style.cssText = 'padding:2.5rem;background:var(--_theme---background);color:var(--_theme---text);font-family:var(--_typography---font--primary-family)';
  const value = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const heading = (text) => { const h = document.createElement('h2'); h.className = 'u-text-style-h3'; h.textContent = text; h.style.margin = '2.5rem 0 1rem'; return h; };
  const grid = (min) => { const g = document.createElement('div'); g.style.cssText = `display:grid;grid-template-columns:repeat(auto-fill,minmax(${min},1fr));gap:1rem`; return g; };
  const small = 'font-size:0.875rem;margin:0.5rem 0 0';

  root.append(heading('Colours'));
  const colours = grid('11rem');
  for (const name of group((n) => n.startsWith('--swatch--'))) {
    const card = document.createElement('div');
    card.innerHTML = `<div style="height:4.5rem;border-radius:0.25rem;border:1px solid #0002;background:var(${name})"></div><p style="${small}">${label(name)}</p><p style="${small};opacity:0.75"></p>`;
    card.lastElementChild.dataset.value = name;
    colours.append(card);
  }
  root.append(colours);

  root.append(heading('Type scale'));
  for (const name of group((n) => n.startsWith('--_typography---font-size--'))) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:baseline;border-top:1px solid #0001;padding:0.75rem 0;overflow:hidden';
    const display = !/text-/.test(name);
    row.innerHTML = `<span style="flex:0 0 16rem;font-size:0.875rem">${label(name)}<br><span></span></span><span style="white-space:nowrap;line-height:1.1;font-size:var(${name});font-family:var(${display ? '--_typography---font--secondary-family' : '--_typography---font--primary-family'})">Can Arbós</span>`;
    row.querySelector('span span').dataset.value = name;
    root.append(row);
  }

  root.append(heading('Spacing'));
  for (const name of group((n) => n.startsWith('--_spacing---') || n === '--site--margin' || n === '--site--gutter')) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.375rem 0';
    row.innerHTML = `<span style="flex:0 0 16rem;font-size:0.875rem">${label(name)}: <span></span></span><span style="height:1rem;width:var(${name});background:var(--swatch--brand-500);border-radius:2px"></span>`;
    row.querySelector('span span').dataset.value = name;
    root.append(row);
  }
  // the values are read once the stylesheet is in, since a link added just now has not loaded yet
  styled.then(() => { for (const el of root.querySelectorAll('[data-value]')) el.textContent = value(el.dataset.value); });
  return root;
}

export default { title: 'Tokens' };

export const Tokens = { name: 'Tokens', render, parameters: { docs: { description: { story: 'Colours, type scale and spacing from the CSS custom properties of tokens.css.' } } } };
