// Home motion with GSAP (the original proto.js): titles rising line by line (SplitText), the detail image drifting
// across the screen, and the render wheel turning on scroll. With reduced motion everything stays still.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { getLenis } from './smooth-scroll';

export function initMotion(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* Lenis drives the scroll, ScrollTrigger listens to it */
  const lenis = getLenis();
  const update = () => ScrollTrigger.update();
  lenis?.on('scroll', update);

  const splits: SplitText[] = [];
  const ctx = gsap.context(() => {
    /* section titles rise line by line (the hero keeps its own reveal) */
    document.querySelectorAll<HTMLElement>('[data-split]:not([data-hero])').forEach((el) => {
      const split = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      splits.push(split);
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    /* detail band: the image drifts and settles while it crosses the screen */
    if (document.getElementById('plate-image')) {
      gsap.fromTo(
        '#plate-image',
        { yPercent: -10, scale: 1.1 },
        {
          yPercent: 10,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.section_plate', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      );
    }

    /* the wheel turns while the collection call stays in the middle; each statue cancels the turn to stay upright */
    const ring = document.getElementById('wheel-ring');
    if (ring) {
      const spin = { deg: 0 };
      gsap.to(spin, {
        deg: 120,
        ease: 'none',
        onUpdate: () => {
          ring.style.transform = `rotate(${spin.deg}deg)`;
          ring.style.setProperty('--spin', `${spin.deg}deg`);
        },
        scrollTrigger: { trigger: '.section_wheel', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
    }
  });

  return () => {
    lenis?.off('scroll', update);
    ctx.revert();
    splits.forEach((s) => s.revert());
  };
}
