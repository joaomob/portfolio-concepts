// Reads the built pages (astro/dist) as text and takes one section out of them for a story. The build inlines each
// page's stylesheet in its head (<style> tags), so the story copies those tags into the preview; Storybook serves
// astro/dist at /concepts/vanth/ (see .storybook/main.js), the address the fonts and photographs use.
import home from '../../../astro/dist/index.html?raw';
import collection from '../../../astro/dist/collection-riot.html?raw';
import lacquer from '../../../astro/dist/collection-lacquer.html?raw';
import fragrance from '../../../astro/dist/fragrance-riot.html?raw';
import product from '../../../astro/dist/product-riot-pinned-tartan.html?raw';
import collections from '../../../astro/dist/collections.html?raw';
import fragrances from '../../../astro/dist/fragrances.html?raw';
import bag from '../../../astro/dist/bag.html?raw';
import checkout from '../../../astro/dist/checkout.html?raw';
import notFound from '../../../astro/dist/404.html?raw';
import { pages, sections } from '../sections.js';

const sources = { home, collection, lacquer, fragrance, product, collections, fragrances, bag, checkout, notFound };
const parsed = {};
const doc = (page) => (parsed[page] ??= new DOMParser().parseFromString(sources[page], 'text/html'));
const entryOf = (page, id) => sections[page].find((s) => s.id === id);

/** Puts the page's inlined stylesheet in the preview, in place of the one of the story shown before. */
export function applyStyles(page = 'home') {
  let style = document.getElementById('vanth-css');
  if (!style) {
    style = document.createElement('style');
    style.id = 'vanth-css';
    document.head.append(style);
  }
  // the late fonts blocks (media="not all" until the page script turns them on) are taken as they are applied
  style.textContent = [...doc(page).querySelectorAll('head style')].map((s) => s.textContent).join('\n');
  document.documentElement.lang = doc(page).documentElement.lang;
}

// One section of a page inside the wrappers it has on the page (.page-wrapper, and <main> for the sections of main).
// The page scripts do not run here, so every piece of content shows in its final state, as with reduced motion.
export const section = (page, id) => () => {
  const entry = entryOf(page, id);
  const source = doc(page).querySelector(entry.selector);
  if (!source) throw new Error(`${entry.selector} is not in ${pages[page]}`);
  applyStyles(page);
  const node = document.importNode(source, true);
  if (entry.open) node.setAttribute('open', '');
  const wrapper = document.createElement('div');
  wrapper.className = doc(page).querySelector('.page-wrapper').className;
  // the site header is fixed on the page; the frame gives it room to show
  if (id === 'nav') wrapper.style.minHeight = '6rem';
  if (entry.selector.startsWith('main')) {
    const main = document.createElement('main');
    main.className = 'main-wrapper';
    main.append(node);
    wrapper.append(main);
  } else {
    wrapper.append(node);
  }
  return wrapper;
};

export const note = (page, id) => {
  const entry = entryOf(page, id);
  return { docs: { description: { story: `${entry.text}\n\nTaken from \`astro/dist/${pages[page]}\` with \`${entry.selector}\`.` } } };
};
