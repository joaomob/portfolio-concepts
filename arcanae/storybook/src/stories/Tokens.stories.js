// The design tokens of astro/src/styles/tokens.css: colours, type scale and spacing. The names are read from the file,
// the values from the live stylesheet (getComputedStyle), so the story follows the breakpoint of the chosen viewport.
import tokensCss from '../../../astro/src/styles/tokens.css?raw';
import { applyStyles } from './page.js';

// every custom property declared in the first :root block (the values without a breakpoint)
const names = [...new Set([...tokensCss.slice(tokensCss.indexOf(':root')).matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))];
const group = (prefix) => names.filter((n) => n.startsWith(prefix));
const label = (name) => name.replace(/^--_?/, '').replace(/---?/g, ' / ');

function render() {
  const styled = applyStyles();
  const root = document.createElement('div');
  root.className = 'padding-global';
  root.style.padding = '2.5rem';
  root.style.fontFamily = 'var(--font-family--primary)';
  const value = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const heading = (text) => { const h = document.createElement('h2'); h.className = 'heading-style-h3'; h.textContent = text; h.style.margin = '2.5rem 0 1rem'; return h; };
  const grid = (min) => { const g = document.createElement('div'); g.style.cssText = `display:grid;grid-template-columns:repeat(auto-fill,minmax(${min},1fr));gap:1rem`; return g; };

  root.append(heading('Colours'));
  const colours = grid('11rem');
  for (const name of group('--base-color')) {
    const card = document.createElement('div');
    card.innerHTML = `<div style="height:4.5rem;border-radius:0.375rem;border:1px solid #0002;background:var(${name})"></div><p class="text-size-small" style="margin-top:0.5rem">${label(name)}</p><p class="text-size-small text-color-secondary"></p>`;
    card.lastElementChild.dataset.value = name;
    colours.append(card);
  }
  root.append(colours);

  root.append(heading('Type scale'));
  for (const name of group('--_typography---').filter((n) => /heading--|text--|display--/.test(n))) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:baseline;border-top:1px solid #0001;padding:0.75rem 0;overflow:hidden';
    const display = /heading|display/.test(name);
    row.innerHTML = `<span class="text-size-small text-color-secondary" style="flex:0 0 14rem">${label(name)}<br></span><span style="white-space:nowrap;line-height:1.1;font-size:var(${name});font-family:var(${display ? '--font-family--display' : '--font-family--primary'})">Arcanae Craft</span>`;
    row.firstElementChild.append(Object.assign(document.createElement('span'), { className: 'token-value' }));
    row.firstElementChild.lastElementChild.dataset.value = name;
    root.append(row);
  }

  root.append(heading('Spacing'));
  for (const name of group('--_layout---').filter((n) => /spacing|section-padding/.test(n))) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.375rem 0';
    row.innerHTML = `<span class="text-size-small text-color-secondary" style="flex:0 0 14rem"></span><span style="height:1rem;width:var(${name});background:var(--base-color-brand--gold);border-radius:2px"></span>`;
    row.firstElementChild.innerHTML = `${label(name)}: <span></span>`;
    row.firstElementChild.lastElementChild.dataset.value = name;
    root.append(row);
  }
  // the values are read once the stylesheet is in, since a link added just now has not loaded yet
  styled.then(() => { for (const el of root.querySelectorAll('[data-value]')) el.textContent = value(el.dataset.value); });
  return root;
}

export default { title: 'Tokens' };

export const Tokens = { name: 'Tokens', render, parameters: { docs: { description: { story: 'Colours, type scale and spacing from the CSS custom properties of tokens.css.' } } } };
