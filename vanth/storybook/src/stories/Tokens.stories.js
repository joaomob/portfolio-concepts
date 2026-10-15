// The design tokens of astro/src/styles/site/tokens.css: colors, type scale and spacing. The names are read from the
// file, the values from the live stylesheet (getComputedStyle), so the story follows the breakpoint of the viewport.
import tokensCss from '../../../astro/src/styles/site/tokens.css?raw';
import { applyStyles } from './page.js';

// every custom property declared in the first :root block (the values without a breakpoint)
const first = tokensCss.slice(tokensCss.indexOf(':root'));
const names = [...new Set([...first.slice(0, first.indexOf('}')).matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))];
const group = (test) => names.filter(test);
const label = (name) => name.replace(/^--_?/, '').replace(/---?/g, ' / ');

function render() {
  applyStyles();
  const root = document.createElement('div');
  root.className = 'background-color-paper';
  root.style.cssText = 'padding:2.5rem;min-height:100vh;font-family:var(--font-family--primary)';
  const value = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const heading = (text) => Object.assign(document.createElement('h2'), { className: 'heading-style-h3', textContent: text, style: 'margin:2.5rem 0 1rem' });
  const small = (text) => Object.assign(document.createElement('span'), { className: 'text-style-label', textContent: text });

  root.append(heading('Colors'));
  const colors = document.createElement('div');
  colors.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(11rem,1fr));gap:1rem';
  for (const name of group((n) => n.includes('color'))) {
    const card = document.createElement('div');
    const swatch = document.createElement('div');
    swatch.style.cssText = `height:4.5rem;border:1px solid #0003;background:var(${name})`;
    card.append(swatch, document.createElement('br'), small(label(name)), document.createElement('br'), small(value(name)));
    colors.append(card);
  }
  root.append(colors);

  root.append(heading('Type scale'));
  for (const name of group((n) => n.startsWith('--_typography'))) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:baseline;border-top:1px solid #0002;padding:0.75rem 0;overflow:hidden';
    const tag = small(`${label(name)}: ${value(name)}`);
    tag.style.flex = '0 0 16rem';
    const sample = document.createElement('span');
    const display = /display|heading/.test(name);
    sample.style.cssText = `white-space:nowrap;line-height:1;font-size:var(${name});font-family:var(${display ? '--font-family--display' : '--font-family--primary'});text-transform:${display ? 'uppercase' : 'none'}`;
    sample.textContent = 'Vanth';
    row.append(tag, sample);
    root.append(row);
  }

  root.append(heading('Families'));
  for (const name of group((n) => n.startsWith('--font-family'))) {
    const row = document.createElement('p');
    row.style.cssText = `font-family:var(${name});font-size:1.5rem;padding:0.5rem 0`;
    row.textContent = `${label(name)}: A couture house for the ones who dress after dark`;
    root.append(row);
  }

  root.append(heading('Spacing'));
  for (const name of group((n) => n.startsWith('--_layout') || n.startsWith('--_sizes'))) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;align-items:center;padding:0.375rem 0';
    const tag = small(`${label(name)}: ${value(name)}`);
    tag.style.flex = '0 0 16rem';
    const bar = document.createElement('span');
    bar.style.cssText = `height:1rem;width:min(var(${name}),100%);background:var(--base-color-brand--red)`;
    row.append(tag, bar);
    root.append(row);
  }
  return root;
}

export default { title: 'Tokens' };

export const Tokens = { name: 'Tokens', render, parameters: { docs: { description: { story: 'Colors, type scale, families and spacing from the CSS custom properties of tokens.css.' } } } };
