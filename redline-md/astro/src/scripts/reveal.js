// The entrance animation of the original (the inline head script, also in its Webflow custom code), split in two:
// the head of every page adds html.anim-on before the first paint (skipped with reduced motion, see ANIM_ON_SCRIPT),
// and startReveal staggers the children of each [data-anim-group] and adds .is-in as each block scrolls into view.
// Returns the function that disconnects the observer.

/** Inline head script, the same test as the first lines of the original: no anim-on class with reduced motion. */
export const ANIM_ON_SCRIPT = "if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('anim-on');";

export function startReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  document.querySelectorAll('[data-anim-group]').forEach((group) => {
    [...group.children].forEach((child, i) => { child.style.transitionDelay = `${Math.min(i, 8) * 0.08}s`; });
  });
  const items = document.querySelectorAll('[data-anim], [data-anim-group]');
  if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return () => {}; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
