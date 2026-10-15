// Page effects from the original fx.js: the paper grain overlay, the intro that animates out, and the reveal of
// [data-reveal] blocks on scroll. Everything degrades safely: without this script the page is fully visible.
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function addGrain(): () => void {
  if (document.querySelector('.grain_overlay')) return () => {};
  const grain = document.createElement('div');
  grain.className = 'grain_overlay';
  grain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(grain);
  return () => grain.remove();
}

/* The intro element is in the HTML, first in the body, so it covers the page from the first frame; the head marks the
   page intro-skip when it was already seen in this session or motion is reduced. Here it only animates out. */
function playIntro(): () => void {
  const root = document.documentElement;
  const body = document.body;
  const el = document.querySelector<HTMLElement>('.intro_component');
  const finish = () => {
    root.classList.remove('is-loading');
    body.classList.remove('is-loading');
    body.classList.add('intro-done');
  };
  if (!el || root.classList.contains('intro-skip') || reducedMotion()) {
    el?.remove();
    finish();
    return () => {};
  }

  body.classList.add('is-loading');
  const timers: number[] = [];
  let frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => el.classList.add('is-ready'));
  });
  /* loading percentage, 0 to 100 over the intro */
  const pct = el.querySelector('.intro_percentage');
  const t0 = performance.now();
  let counter = 0;
  const count = (now: number) => {
    const k = Math.min(1, (now - t0) / 1800);
    if (pct) pct.textContent = `${Math.round(k * 100)}%`;
    if (k < 1) counter = requestAnimationFrame(count);
  };
  count(t0);
  timers.push(
    window.setTimeout(() => {
      el.classList.add('is-done');
      finish();
      try {
        sessionStorage.setItem('arcanae_intro', '1');
      } catch {
        /* storage blocked: the intro plays again next time */
      }
      timers.push(window.setTimeout(() => el.remove(), 1100));
    }, 2000),
  );
  return () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(counter);
    timers.forEach(clearTimeout);
  };
}

function revealOnScroll(): () => void {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return () => {};
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('is-in'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  els.forEach((e) => io.observe(e));
  return () => io.disconnect();
}

export function initEffects(): () => void {
  /* guards the reveal and hero hiding rules in states.css */
  document.documentElement.classList.add('fx-ready');
  const cleanups = [addGrain(), playIntro(), revealOnScroll()];
  return () => cleanups.forEach((fn) => fn());
}
