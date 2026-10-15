// Home interactions. Every scroll interaction is scrubbed, so it plays back the same way when the visitor scrolls up.
// With reduced motion nothing is pinned or moved and the page reads as a plain document.
import { footerRise, whenMotion, type MotionKit } from './motion';

function homeMotion(kit: MotionKit): () => void {
  const { gsap, SplitText } = kit;
  const mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' }, (ctx) => {
    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
    if (!motion) return;

    // hero: the photo grows from its slot to the whole screen; the paper wordmark comes in over it. The section holds
    // the screen by sticky (CSS), so the scroll runs from its top to its bottom, with no pin.
    const hero = document.querySelector('[data-hero]');
    if (hero) {
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true } })
        .to('[data-hero-photo]', { width: '100vw', height: '100dvh', ease: 'none' }, 0)
        .to('[data-hero-meta]', { autoAlpha: 0, ease: 'none', duration: 0.25 }, 0)
        .to('[data-hero-over]', { opacity: 1, ease: 'none', duration: 0.3 }, 0.7);
    }

    // manifesto: the words light up with the scroll
    const manifesto = document.querySelector<HTMLElement>('[data-manifesto]');
    if (manifesto) {
      const split = new SplitText(manifesto, { type: 'words', wordsClass: 'word' });
      gsap.to(split.words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: manifesto, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    }

    // the eight lines: pinned, the looks pass sideways (on phones the track scrolls by touch instead)
    const track = document.querySelector<HTMLElement>('[data-collection-track]');
    if (track && desktop) {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '[data-collection]', start: 'top top', end: () => '+=' + distance(), scrub: true, pin: true, invalidateOnRefresh: true } });
    }

    // marquee: two rows of giant type run in opposite directions at the speed of the scroll
    document.querySelectorAll<HTMLElement>('[data-marquee-row]').forEach((row) => {
      const left = Number(row.dataset.marqueeRow) < 0;
      gsap.fromTo(row, { xPercent: left ? 0 : -30 }, { xPercent: left ? -30 : 0, ease: 'none', scrollTrigger: { trigger: '[data-marquee]', start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // fragrance: pinned, the bottle stays and the three notes take turns. Every note is fully lit until the section
    // pins (text at 0.2 fails the 4.5:1 contrast while it waits).
    const notes = gsap.utils.toArray<HTMLElement>('[data-note]');
    if (notes.length && desktop) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-fragrance]', start: 'top top', end: '+=150%', scrub: true, pin: true } });
      tl.to(notes.slice(1), { opacity: 0.2, ease: 'none', duration: 0.25 }, 0);
      notes.forEach((note, i) => {
        if (i) tl.to(note, { opacity: 1, ease: 'none', duration: 0.5 }, i);
        if (i < notes.length - 1) tl.to(note, { opacity: 0.2, ease: 'none', duration: 0.5 }, i + 0.75);
      });
      tl.fromTo('.fragrance_photo img', { scale: 1.15 }, { scale: 1, ease: 'none', duration: notes.length }, 0);
    }

    // lookbook: each photo moves at its own speed inside its frame
    document.querySelectorAll<HTMLElement>('.lookbook_item').forEach((item) => {
      const speed = Number(item.dataset.speed || 0);
      gsap.fromTo(item.querySelector('img'), { yPercent: -8 - speed / 2 }, { yPercent: -8 + speed / 2, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    footerRise(kit);
  });
  return () => mm.revert();
}

export const initHome = (): (() => void) => whenMotion(homeMotion);
