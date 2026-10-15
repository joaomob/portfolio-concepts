// The animation library (GSAP with ScrollTrigger and SplitText) stays out of the first paint: it is asked for 1.2 s after
// the load event, or at the first scroll, touch or key, whichever comes first, and then each page script runs. It is
// bundled from npm and served by the site itself, because the pages allow scripts from their own address only.
import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type { SplitText as SplitTextType } from 'gsap/SplitText';

export interface MotionKit {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerType;
  SplitText: typeof SplitTextType;
}

let kit: MotionKit | null = null;
let loading: Promise<MotionKit> | null = null;

/** The library, once it is in (null before): the bag and the smooth scroll use it only when it is already there. */
export const loadedKit = (): MotionKit | null => kit;

function load(): Promise<MotionKit> {
  loading ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText')]).then(
    ([g, st, sp]) => {
      g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
      kit = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
      return kit;
    },
  );
  return loading;
}

const GESTURES = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

/**
 * Runs `run` once the library is in. Returns a function that cancels the wait and undoes what `run` built (the
 * Next.js build calls it when the page changes).
 */
export function whenMotion(run: (kit: MotionKit) => (() => void) | void): () => void {
  let undo: (() => void) | void;
  let cancelled = false;
  let timer = 0;
  const start = () => {
    clearTimeout(timer);
    GESTURES.forEach((e) => window.removeEventListener(e, start));
    window.removeEventListener('load', onLoad);
    load().then((k) => {
      if (!cancelled) undo = run(k);
    });
  };
  const onLoad = () => {
    timer = window.setTimeout(start, 1200);
  };
  if (kit) start();
  else {
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    GESTURES.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
  }
  return () => {
    cancelled = true;
    clearTimeout(timer);
    GESTURES.forEach((e) => window.removeEventListener(e, start));
    window.removeEventListener('load', onLoad);
    if (undo) undo();
  };
}

/** The footer wordmark rises from below as the footer arrives (every page with motion has it). */
export function footerRise({ gsap }: MotionKit): void {
  gsap.fromTo('[data-footer-wordmark]', { yPercent: 40 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.footer_component', start: 'top bottom', end: 'bottom bottom', scrub: true } });
}
