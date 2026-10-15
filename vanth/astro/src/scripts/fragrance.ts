// Fragrance page. Every scroll interaction is scrubbed, so it plays back the same way going up; with reduced motion
// nothing is pinned or moved.
import { footerRise, whenMotion, type MotionKit } from './motion';

function fragranceMotion(kit: MotionKit): () => void {
  const { gsap, SplitText } = kit;
  const mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 992px)' }, (ctx) => {
    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
    if (!motion) return;

    // hero: the photograph drifts sideways and settles while the name rises
    gsap.fromTo('.fragrance-hero_photo img', { scale: 1.12, xPercent: -2, x: 0 }, { scale: 1, xPercent: 2, x: 0, ease: 'none', scrollTrigger: { trigger: '[data-fragrance-hero]', start: 'top top', end: 'bottom top', scrub: true } });

    // notes: pinned on wide screens, the bottle stays and each note lights in its turn (all lit until the pin begins,
    // because text at 0.2 fails the 4.5:1 contrast)
    const notes = gsap.utils.toArray<HTMLElement>('[data-note]');
    if (notes.length && desktop) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-notes]', start: 'top top', end: '+=150%', scrub: true, pin: true } });
      tl.to(notes.slice(1), { opacity: 0.2, ease: 'none', duration: 0.25 }, 0);
      notes.forEach((note, i) => {
        if (i) tl.to(note, { opacity: 1, ease: 'none', duration: 0.5 }, i);
        if (i < notes.length - 1) tl.to(note, { opacity: 0.2, ease: 'none', duration: 0.5 }, i + 0.75);
      });
      tl.fromTo('.fragrance-notes_photo img', { scale: 1.15 }, { scale: 1, ease: 'none', duration: notes.length }, 0);
    }

    // ritual: the title lights word by word and the two photographs move at different speeds in their frames
    const words = document.querySelector<HTMLElement>('[data-words]');
    if (words) {
      const split = new SplitText(words, { type: 'words', wordsClass: 'word' });
      gsap.to(split.words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: words, start: 'top 80%', end: 'bottom 50%', scrub: true } });
    }
    document.querySelectorAll<HTMLElement>('.ritual_item').forEach((item) => {
      const speed = Number(item.dataset.speed || 0);
      gsap.fromTo(item.querySelector('img'), { yPercent: -7 - speed / 2 }, { yPercent: -7 + speed / 2, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // facts rise one after the other; the collection card turns; the footer wordmark rises
    gsap.from('.section_facts .product_fact', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.section_facts .product_facts', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.next_photo', { rotate: -6 }, { rotate: 6, ease: 'none', scrollTrigger: { trigger: '.section_next', start: 'top bottom', end: 'bottom top', scrub: true } });
    footerRise(kit);
  });
  return () => mm.revert();
}

export const initFragrance = (): (() => void) => whenMotion(fragranceMotion);
