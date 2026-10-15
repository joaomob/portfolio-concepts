// The list pages (all the collections, all the fragrances) and the product pages: the photographs open and drift as
// they arrive. Scrubbed, and only with motion allowed.
import { footerRise, whenMotion, type MotionKit } from './motion';

function listMotion(kit: MotionKit): () => void {
  const { gsap } = kit;
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('[data-list-photo]').forEach((photo, i) => {
      // the first row is on screen when the page opens: it stays whole, so nothing jumps when the library arrives
      if (i > 1) gsap.fromTo(photo, { clipPath: 'inset(14% 10% 14% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: photo, start: 'top 95%', end: 'top 40%', scrub: true } });
      gsap.fromTo(photo.querySelector('img'), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    footerRise(kit);
  });
  return () => mm.revert();
}

export const initList = (): (() => void) => whenMotion(listMotion);
