// Reads the built pages (astro/dist) as text and takes one section out of them for a story. The pages link the Google
// Fonts stylesheet and one external stylesheet (/concepts/arcanae/_astro/BaseLayout.<hash>.css), so the story adds
// those same <link> tags to the preview; Storybook serves astro/dist at /concepts/arcanae/ (see .storybook/main.js).
import home from '../../../astro/dist/index.html?raw';
import collection from '../../../astro/dist/collection.html?raw';
import product from '../../../astro/dist/product/the-fool.html?raw';
import info from '../../../astro/dist/shipping.html?raw';
import success from '../../../astro/dist/success.html?raw';
import { pages, sections } from '../sections.js';

const sources = { home, collection, product, info, success };
const parsed = {};
const doc = (page) => (parsed[page] ??= new DOMParser().parseFromString(sources[page], 'text/html'));
const entryOf = (page, id) => sections[page].find((s) => s.id === id);

/** Adds the page's stylesheet links to the preview once and sets the page language; resolves when they are loaded. */
export function applyStyles(page = 'home') {
  const source = doc(page);
  const loads = [...source.querySelectorAll('head link[rel="stylesheet"]')].map((link) => {
    const href = link.getAttribute('href');
    let tag = [...document.head.querySelectorAll('link[rel="stylesheet"]')].find((l) => l.getAttribute('href') === href);
    if (tag?.sheet) return Promise.resolve();
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = href;
      document.head.append(tag);
    }
    return new Promise((resolve) => { tag.addEventListener('load', resolve, { once: true }); tag.addEventListener('error', resolve, { once: true }); });
  });
  document.documentElement.lang = source.documentElement.lang;
  return Promise.all(loads);
}

// One section of a page inside the wrappers it has on the page (.page-wrapper, and <main> for the sections of main).
// The page scripts do not run here, so every piece of content shows in its final state, as with reduced motion.
export const section = (page, id) => () => {
  const entry = entryOf(page, id);
  const source = doc(page).querySelector(entry.selector);
  if (!source) throw new Error(`${entry.selector} is not in ${pages[page]}`);
  applyStyles(page);
  const node = document.importNode(source, true);
  const wrapper = document.createElement('div');
  wrapper.className = 'page-wrapper';
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
