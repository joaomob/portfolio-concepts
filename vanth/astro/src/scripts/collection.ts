// Collection page. The shop-the-look dots work without the animation library (pointer, keyboard and touch); the scroll
// interactions are scrubbed and only run with motion allowed.
import { footerRise, loadedKit, whenMotion, type MotionKit } from './motion';

/**
 * The dots over a look photograph. Each dot is a link to the page of its piece, and so is the card it opens. Pointing
 * at a dot or focusing it opens the card; a click goes to the piece. On a touch screen the first tap opens the card
 * and the second (on the dot or on the card) goes to the piece. One card open at a time; Escape or a tap outside
 * closes it.
 */
function lookDots(signal: AbortSignal): void {
  const hoverable = window.matchMedia('(hover: hover)').matches;
  const cardOf = (dot: HTMLElement) => document.getElementById(dot.dataset.cardId || '');
  const setOpen = (dot: HTMLElement, open: boolean) => {
    const card = cardOf(dot);
    if (!card || dot.dataset.open === String(open)) return;
    dot.dataset.open = String(open);
    card.dataset.cardState = open ? 'open' : 'closed';
    const kit = loadedKit();
    if (open && kit && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      kit.gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };
  const closeAll = (except?: HTMLElement) =>
    document.querySelectorAll<HTMLElement>('[data-dot][data-open="true"]').forEach((dot) => {
      if (dot !== except) setOpen(dot, false);
    });
  const on = { signal };

  document.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
    const card = cardOf(dot);
    let timer = 0;
    const enter = () => { clearTimeout(timer); closeAll(dot); setOpen(dot, true); };
    const leave = () => { timer = window.setTimeout(() => setOpen(dot, false), 250); };
    if (hoverable) {
      dot.addEventListener('mouseenter', enter, on);
      dot.addEventListener('mouseleave', leave, on);
      card?.addEventListener('mouseenter', () => clearTimeout(timer), on);
      card?.addEventListener('mouseleave', leave, on);
    }
    dot.addEventListener('focus', enter, on);
    dot.addEventListener('blur', leave, on);
    // a finger: what counts is whether the card was open before the tap began (a tap also fires the mouse events)
    let touched = false;
    let openBeforeTouch = false;
    dot.addEventListener('touchstart', () => { touched = true; openBeforeTouch = dot.dataset.open === 'true'; }, { passive: true, signal });
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      if (touched && !openBeforeTouch) { e.preventDefault(); enter(); }
      touched = false;
    }, on);
    card?.addEventListener('click', (e) => e.stopPropagation(), on);
  });

  // ?open=<card id>[,<card id>] opens cards on load, for the review captures of the page
  (new URLSearchParams(location.search).get('open') || '').split(',').filter(Boolean).forEach((id) => {
    const dot = document.querySelector<HTMLElement>(`[data-dot][data-card-id="${id}"]`);
    if (dot) setOpen(dot, true);
  });
  document.addEventListener('click', () => closeAll(), on);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); }, on);
}

function collectionMotion(kit: MotionKit): () => void {
  const { gsap, SplitText } = kit;
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // hero: the campaign photograph moves slower than the page (the title rises by CSS, so it shows before this runs)
    gsap.fromTo('.collection-hero_photo img', { yPercent: 0, scale: 1.08 }, { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-collection-hero]', start: 'top top', end: 'bottom top', scrub: true } });

    // intro: the words light up with the scroll
    const words = document.querySelector<HTMLElement>('[data-words]');
    if (words) {
      const split = new SplitText(words, { type: 'words', wordsClass: 'word', aria: 'none' });
      gsap.to(split.words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: words, start: 'top 80%', end: 'bottom 50%', scrub: true } });
    }

    // looks: each photograph opens from a clipped strip as it arrives, and its dots pulse once in view
    document.querySelectorAll<HTMLElement>('[data-look-photo]').forEach((photo) => {
      gsap.fromTo(photo, { clipPath: 'inset(18% 12% 18% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: photo, start: 'top 90%', end: 'top 30%', scrub: true } });
      gsap.fromTo(photo.querySelectorAll('[data-dot]'), { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.15, scrollTrigger: { trigger: photo, start: 'top 40%', toggleActions: 'play none none reverse' } });
    });

    // pieces: the photographs rise one after the other
    gsap.from('.piece_item', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.pieces_list', start: 'top 80%', toggleActions: 'play none none reverse' } });

    // fragrance and beauty: the photograph settles as the section arrives; next line: the photo card turns
    document.querySelectorAll<HTMLElement>('.collection-fragrance_layout').forEach((layout) => {
      gsap.fromTo(layout.querySelector('.collection-fragrance_photo img'), { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: layout, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    });
    gsap.fromTo('.next_photo', { rotate: -6 }, { rotate: 6, ease: 'none', scrollTrigger: { trigger: '.section_next', start: 'top bottom', end: 'bottom top', scrub: true } });
    footerRise(kit);
  });
  return () => mm.revert();
}

export function initCollection(): () => void {
  const listeners = new AbortController();
  lookDots(listeners.signal);
  const stopMotion = whenMotion(collectionMotion);
  return () => { listeners.abort(); stopMotion(); };
}
