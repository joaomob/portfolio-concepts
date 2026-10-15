// Reads the built pages (astro/dist) as text and takes one section out of them for a story. The pages link one
// external stylesheet (/concepts/can-arbos/_astro/BaseLayout.<hash>.css), so the story adds that same <link> to the
// preview; Storybook serves astro/dist at /concepts/can-arbos/ (see .storybook/main.js).
import home from '../../../astro/dist/index.html?raw';
import homeEs from '../../../astro/dist/es.html?raw';
import rooms from '../../../astro/dist/explore-rooms.html?raw';
import room from '../../../astro/dist/room-terrace-suite.html?raw';
import experiences from '../../../astro/dist/explore-experiences.html?raw';
import experience from '../../../astro/dist/experience-courtyards-walk.html?raw';
import aljub from '../../../astro/dist/aljub.html?raw';
import rooftop from '../../../astro/dist/rooftop-spa.html?raw';
import celebrations from '../../../astro/dist/celebrations.html?raw';
import journal from '../../../astro/dist/journal.html?raw';
import guide from '../../../astro/dist/journal-things-to-do-palma-old-town.html?raw';
import offer from '../../../astro/dist/offer-members-rate.html?raw';
import members from '../../../astro/dist/members.html?raw';
import legal from '../../../astro/dist/legal.html?raw';
import notFound from '../../../astro/dist/404.html?raw';
import { pages, sections } from '../sections.js';

const sources = { home, homeEs, rooms, room, experiences, experience, aljub, rooftop, celebrations, journal, guide, offer, members, legal, notFound };
const parsed = {};
const doc = (page) => (parsed[page] ??= new DOMParser().parseFromString(sources[page], 'text/html'));
const entryOf = (page, id) => sections[page].find((s) => s.id === id);

/** Adds the page's stylesheet links to the preview once and sets the page language; resolves when they are loaded. */
export function applyStyles(page = 'home') {
  const source = doc(page);
  const loads = [...source.querySelectorAll('head link[rel="stylesheet"]')].map((link) => {
    const href = link.getAttribute('href');
    let tag = document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`);
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

// One section of a page inside the wrappers it has on the page (.page_wrap, and <main> for the sections of main).
// The page scripts do not run here, so every piece of content shows in its final state, as with reduced motion.
export const section = (page, id) => () => {
  const entry = entryOf(page, id);
  const source = doc(page).querySelector(entry.selector);
  if (!source) throw new Error(`${entry.selector} is not in ${pages[page]}`);
  applyStyles(page);
  const node = document.importNode(source, true);
  if (entry.show) {
    node.setAttribute('data-visible', 'true');
    if (node.tagName === 'DIALOG') {
      node.setAttribute('open', '');
      node.style.position = 'relative';
    }
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'page_wrap';
  const lang = doc(page).querySelector('.page_wrap')?.getAttribute('lang');
  if (lang) wrapper.lang = lang;
  if (entry.selector.startsWith('main')) {
    const main = document.createElement('main');
    main.className = 'page_main';
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
