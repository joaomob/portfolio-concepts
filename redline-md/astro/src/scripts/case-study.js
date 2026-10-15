// Case study and style guide: two tabs on one page with their own links (port of the original cs.js). The head
// script (SG_HEAD_SCRIPT) sets html.is-sg before the first paint when the address is #style-guide or #sg-*, so the
// page never jumps; startCaseStudy keeps the tab, the project bar and the title in step with later hash changes.
// The original also stops Webflow Interactions with reduced motion; there are none outside Webflow, so that part is
// left out. Returns the function that removes the listeners.
import { startReveal } from './reveal.js';

export const SG_HEAD_SCRIPT = 'if (location.hash === "#style-guide" || location.hash.indexOf("#sg-") === 0) document.documentElement.classList.add("is-sg");';

export function startCaseStudy() {
  const ac = new AbortController();
  const root = document.documentElement;
  const tabLinks = [...document.querySelectorAll('[data-review]')];
  const isStyleGuide = () => location.hash === '#style-guide' || location.hash.indexOf('#sg-') === 0;
  const showTab = (scrollTop) => {
    const sg = isStyleGuide();
    root.classList.toggle('is-sg', sg);
    tabLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('data-review') === (sg ? 'style-guide' : 'case-study')));
    document.title = sg ? 'Redline MD · Style guide' : 'Redline MD · Case study';
    if (scrollTop && location.hash.indexOf('#sg-') !== 0) window.scrollTo(0, 0);
  };
  showTab(false);
  window.addEventListener('hashchange', () => showTab(true), { signal: ac.signal });
  const stopReveal = startReveal();
  return () => { ac.abort(); stopReveal(); };
}
