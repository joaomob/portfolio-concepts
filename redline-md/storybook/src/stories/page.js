// Reads the built pages (astro/dist) as text and takes one section out of them for a story. Each page links its own
// external stylesheets (/concepts/redline-md/_astro/<name>.<hash>.css), served by Storybook from astro/dist (see
// .storybook/main.js). The landing and the case study load different stylesheets, so a story keeps only the links of
// its own page in the preview. The style guide is a tab of the case study page: its stories put html.is-sg on, the
// class the page sets for that tab.
import home from '../../../astro/dist/index.html?raw';
import caseStudy from '../../../astro/dist/case-study.html?raw';
import { pages, sections } from '../sections.js';

const sources = { 'index.html': home, 'case-study.html': caseStudy };
const parsed = {};
export const doc = (page) => {
  const file = pages[page].file;
  return (parsed[file] ??= new DOMParser().parseFromString(sources[file], 'text/html'));
};
const entryOf = (page, id) => sections[page].find((s) => s.id === id);

/** The page's stylesheet hrefs, in order. */
export const stylesheetsOf = (page) => [...doc(page).querySelectorAll('head link[rel="stylesheet"]')].map((l) => l.getAttribute('href'));

/** Puts the page's stylesheets in the preview (and removes the other page's), copies the page's <html> attributes
 *  (lang) and sets the tab class. The page scripts do not run, so html never gets the class that turns the reveals on
 *  and every piece of content shows in its final state, as with reduced motion. Resolves when the stylesheets load. */
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
  document.documentElement.classList.toggle('is-sg', pages[page].htmlClass === 'is-sg');
  return Promise.all(loads);
}

// One section of a page inside the same chain of parents it has on the page (main.main-wrapper, .page-wrapper,
// section.overlays_component), each parent copied without its other children, so every descendant selector matches.
export const section = (page, id) => () => {
  const entry = entryOf(page, id);
  const source = doc(page).querySelector(entry.selector);
  if (!source) throw new Error(`${entry.selector} is not in ${pages[page].file}`);
  applyStyles(page);
  let node = document.importNode(source, true);
  entry.settle?.(node);
  for (let parent = source.parentElement; parent && parent.tagName !== 'BODY'; parent = parent.parentElement) {
    const shell = document.importNode(parent, false);
    shell.append(node);
    node = shell;
  }
  if (!entry.fixed) return node;
  const frame = document.createElement('div');
  frame.style.cssText = `transform: translateZ(0); min-height: ${entry.fixed};`;
  frame.append(node);
  return frame;
};

export const note = (page, id) => {
  const entry = entryOf(page, id);
  return { docs: { description: { story: `${entry.text}\n\nTaken from \`astro/dist/${pages[page].file}\` with \`${entry.selector}\`.` } } };
};
