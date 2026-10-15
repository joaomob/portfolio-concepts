// Smooth scroll with Lenis (lerp 0.085), asked for after the load event so it stays out of the first paint, and off with
// reduced motion. It calls ScrollTrigger.update on each frame it moves, and the anchors of the page scroll through it.
// The panels that scroll on their own (size guide, menu) are left to the browser with data-lenis-prevent. A page opened
// on an anchor (the menu's Lookbook, /#lookbook) holds that section in place while the pinned sections above it are
// built, until the visitor scrolls.
import type Lenis from 'lenis';
import { loadedKit } from './motion';

let lenis: Lenis | null = null;

const target = (hash: string) => (hash && hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null);

function jump(el: HTMLElement, smooth = false) {
  const y = Math.round(el.getBoundingClientRect().top + window.scrollY);
  if (lenis) lenis.scrollTo(y, { immediate: !smooth, force: true });
  else window.scrollTo(0, y);
}

/** Keeps an anchored section at the top for five seconds, or until the visitor scrolls, clicks or types. */
function hold(signal: AbortSignal) {
  const el = target(location.hash);
  if (!el) return;
  const t0 = Date.now();
  let user = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown', 'mousedown'].forEach((e) => window.addEventListener(e, () => { user = true; }, { once: true, passive: true, signal }));
  const kit = loadedKit();
  if (kit) {
    const onRefresh = () => { if (!user) jump(el); };
    kit.ScrollTrigger.addEventListener('refresh', onRefresh);
    setTimeout(() => kit.ScrollTrigger.removeEventListener('refresh', onRefresh), 5000);
  }
  const check = () => {
    if (user || signal.aborted || Date.now() - t0 > 5000) return;
    if (Math.abs(el.getBoundingClientRect().top) > 2) jump(el);
    setTimeout(check, 150);
  };
  check();
}

async function start(signal: AbortSignal) {
  const { default: LenisClass } = await import('lenis');
  if (signal.aborted || lenis) return;
  document.querySelectorAll('.size-guide_overlay, .size-guide_scroll, .nav_panel').forEach((el) => el.setAttribute('data-lenis-prevent', ''));
  const instance = (lenis = new LenisClass({ lerp: 0.085, smoothWheel: true }));
  instance.on('scroll', () => loadedKit()?.ScrollTrigger.update());
  let frame = 0;
  const raf = (time: number) => {
    instance.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  signal.addEventListener('abort', () => {
    cancelAnimationFrame(frame);
    instance.destroy();
    lenis = null;
  });
  // a link to a section of the same page scrolls there through Lenis
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname) return;
    const el = target(url.hash);
    if (!el) return;
    e.preventDefault();
    jump(el, true);
    history.pushState(null, '', url.hash);
  }, { signal });
}

export function initSmooth(): () => void {
  const control = new AbortController();
  hold(control.signal);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => control.abort();
  const go = () => { void start(control.signal); };
  if (document.readyState === 'complete') go();
  else window.addEventListener('load', go, { once: true, signal: control.signal });
  return () => control.abort();
}
