// Reads the built pages (astro/dist) as text and takes one section out of them for a story. Each page links its own
// external stylesheet (/concepts/olimpo-lp/_astro/<page>.<hash>.css), served by Storybook from astro/dist (see
// .storybook/main.js). The two pages' stylesheets disagree (the style guide sets its own fluid root font size), so a
// story keeps only the links of its own page in the preview.
import home from '../../../astro/dist/index.html?raw';
import styleGuide from '../../../astro/dist/style-guide.html?raw';
import { pages, sections } from '../sections.js';

const sources = { home, styleGuide };
const parsed = {};
export const doc = (page) => (parsed[page] ??= new DOMParser().parseFromString(sources[page], 'text/html'));
const entryOf = (page, id) => sections[page].find((s) => s.id === id);

/** The page's stylesheet hrefs, in order. */
export const stylesheetsOf = (page) => [...doc(page).querySelectorAll('head link[rel="stylesheet"]')].map((l) => l.getAttribute('href'));

/** Puts the page's stylesheets in the preview (and removes the other page's), and copies the page's <html> attributes
 *  (lang, data-theme). The page scripts do not run, so html never gets the .js class and every piece of content shows
 *  in its final state, as with reduced motion. Resolves when the stylesheets are loaded. */
export function applyStyles(page) {
  const wanted = stylesheetsOf(page);
  document.head.querySelectorAll('link[data-page-css]').forEach((l) => { if (!wanted.includes(l.getAttribute('href'))) l.remove(); });
  const loads = wanted.map((href) => {
    let tag = document.head.querySelector(`link[data-page-css][href="${href}"]`);
    if (tag?.sheet) return Promise.resolve();
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = href;
      tag.dataset.pageCss = page;
      document.head.append(tag);
    }
    return new Promise((resolve) => { tag.addEventListener('load', resolve, { once: true }); tag.addEventListener('error', resolve, { once: true }); });
  });
  const root = doc(page).documentElement;
  for (const { name, value } of root.attributes) if (name !== 'class') document.documentElement.setAttribute(name, value);
  return Promise.all(loads);
}

// One section of a page inside the same chain of parents it has on the page (main.page-content, .page-wrapper,
// #codex...), each parent copied without its other children, so every descendant selector of the stylesheet matches.
export const section = (page, id) => () => {
  const entry = entryOf(page, id);
  const source = doc(page).querySelector(entry.selector);
  if (!source) throw new Error(`${entry.selector} is not in ${pages[page]}`);
  applyStyles(page);
  let node = document.importNode(source, true);
  for (let parent = source.parentElement; parent && parent.tagName !== 'BODY'; parent = parent.parentElement) {
    const shell = document.importNode(parent, false);
    shell.append(node);
    node = shell;
  }
  entry.settle?.(node);
  if (!entry.fixed) return node;
  const frame = document.createElement('div');
  frame.style.cssText = `transform: translateZ(0); min-height: ${entry.fixed};`;
  frame.append(node);
  return frame;
};

export const note = (page, id) => {
  const entry = entryOf(page, id);
  return { docs: { description: { story: `${entry.text}\n\nTaken from \`astro/dist/${pages[page]}\` with \`${entry.selector}\`.` } } };
};

