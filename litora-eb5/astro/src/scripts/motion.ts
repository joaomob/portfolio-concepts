// The one animation file of the site, ported from the original prototype's js/motion.js with the same constants and
// the same numbered interactions. Every hook is a data attribute.
//   1  header: hidden over the hero, shown when the hero ends (no library, runs at once)
//   2  hero: the photo opens from the right 51% to the whole width while the runway passes, 992 px and up
//   3  statement: each word goes from 0.16 to 1 with the scroll
//   4  project photo: opens through a circle, from 5rem of radius to the whole band, until the band sticks; a ring of
//      1 px grows with the circle and fades in the last 15% of the opening
//   5  project word: its letters slide in while the band is stuck
//   6  topic thumbnails: straighten from 25 degrees to 0 while their row comes up to the middle of the window
//   7  lines of 1 px draw themselves, once
//   8  entries: opacity and 1rem of rise, once, one item after the other
//   9  stacked photos: the covered photo grows to 1.12
//   11 final call: the photo behind moves 5% up and down, heavily damped
//   14 header theme: dark over a dark section or a photo, measured at the bottom edge of the header (no library)
//   15 ruler: the line of the numbers draws itself with the scroll, and so does the solid trace of the FAQ timeline
//   23 header button: unseen while the final call is under the header, so two equal buttons never stack (no library)
//   24 questions: one open at a time (details name="faq"; fallback here)
//   25 questions: open and close with their height animated, 0.5 s on the house curve (no library)
// GSAP and ScrollTrigger come from npm and are bundled by the build as a separate chunk of this site (the CSP of
// joaomob.com/concepts allows scripts from the site only; the original loaded them from cdnjs). The chunk loads only
// after the window load event, and under 992 px only at the first scroll, touch or key, because nothing on the first
// screen moves. Nothing here hides content on its own: the states to animate from live under the class js-motion,
// which the inline script of the head sets only when the visitor accepts motion. If the library does not arrive, the
// class is taken away and every piece of content shows.
import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

type GsapApi = typeof Gsap;
type ScrollTriggerApi = typeof ScrollTriggerType;

// the constants of every interaction (LAYOUT-LOGIC.md, section 6, of the original project)
const MOTION = {
  curve: [0.375, 0, 0.625, 1] as [number, number, number, number], // the house curve, cubic-bezier
  scrub: 0.8,
  scrubSlow: 9,
  entry: { y: 16, duration: 0.8, stagger: 0.06, start: 'top 88%' },
  line: { duration: 1.2 },
  hero: { clipFrom: 49, shiftFrom: 0.245, grow: 0.7, scaleTo: 0.95 },
  statement: { from: 0.16, band: 16, start: 'top 85%', end: 'bottom 45%' },
  circle: { from: 80, to: 0.75, word: 0.15, ring: 0.15 }, // radius: 5rem, then 75% of the reference of clip-path
  word: { x: 0.24, stagger: 0.08 }, // of the size of the word: 50 px at 13rem, 11 px at 2.75rem
  thumbnail: { from: 25 },
  draw: { start: 'top 85%', end: 'bottom 60%', solid: 0.6 }, // the solid trace takes 60% of the timeline
  zoom: 1.12,
  parallax: 5,
};
const DESKTOP = '(min-width: 992px)';
const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** The house curve as a function GSAP takes as an ease (the same cubic-bezier the CSS transitions use). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (t: number, a: number, b: number) => { const u = 1 - t; return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t; };
  return (x: number) => {
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) {
      const v = at(t, x1, x2);
      if (Math.abs(v - x) < 0.0005) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return at(t, y1, y2);
  };
}

// Each word, or each letter, of a text in a span of its own; the text stays the same for a screen reader. Letters in
// boxes of their own lose the kerning of the font (in TAVESSA the pairs T A and A V), so each letter is measured in
// the whole word first and gets, as a margin in em, what brings it back to that place.
function split(el: HTMLElement, byLetter: boolean): HTMLSpanElement[] {
  const text = el.textContent ?? '';
  const parts = byLetter ? Array.from(text) : text.split(/(\s+)/);
  if (byLetter) el.textContent = parts.join(''); // one text node again, if the word was split before
  const node = el.firstChild;
  const range = document.createRange();
  let at = 0;
  const natural = byLetter && node && node.nodeType === Node.TEXT_NODE
    ? parts.map((part) => { range.setStart(node, at); range.setEnd(node, (at += part.length)); return range.getBoundingClientRect().left; })
    : null;
  el.textContent = '';
  const spans = parts.flatMap((part) => {
    if (!byLetter && !part.trim()) { el.appendChild(document.createTextNode(part)); return []; }
    const span = document.createElement('span');
    span.textContent = part;
    span.style.display = 'inline-block';
    el.appendChild(span);
    return [span];
  });
  if (natural) {
    const size = parseFloat(getComputedStyle(el).fontSize);
    const boxed = spans.map((span) => span.getBoundingClientRect().left);
    spans.forEach((span, i) => {
      if (i) span.style.marginLeft = `${(((natural[i] - natural[i - 1]) - (boxed[i] - boxed[i - 1])) / size).toFixed(4)}em`;
    });
  }
  return spans;
}

/** 1, 14 and 23. The fixed header: no library, works with reduced motion too. */
function header(bar: HTMLElement | null, undo: (() => void)[]) {
  if (!bar) return;
  const hero = document.querySelector('[data-hero]');
  if (!('IntersectionObserver' in window)) { bar.classList.remove('is-hidden'); return; }
  const topLine = { rootMargin: '0px 0px -100% 0px' }; // what crosses the top line of the window
  if (hero) {
    const observer = new IntersectionObserver((entries) => bar.classList.toggle('is-hidden', entries[0].isIntersecting), topLine);
    observer.observe(hero);
    undo.push(() => observer.disconnect());
  } else bar.classList.remove('is-hidden');
  // 14 and 23 measure at the header itself, whose height is the nav height token (80 px, 72 px from 991 px down).
  // rootMargin takes no calc(), so the two observers are built again when the window or the bar changes size.
  const dark = new Set<Element>(), calls = new Set<Element>();
  let watchers: IntersectionObserver[] = [], builtFor = '';
  const darkSections = document.querySelectorAll('[data-nav-theme="inverse"]');
  const callSections = document.querySelectorAll('[data-cta]');
  const watch = (sections: NodeListOf<Element>, held: Set<Element>, className: string, rootMargin: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? held.add(entry.target) : held.delete(entry.target)));
      bar.classList.toggle(className, held.size > 0);
    }, { rootMargin });
    sections.forEach((section) => observer.observe(section));
    watchers.push(observer);
  };
  const build = () => {
    // clamped at 0: a window of no height (a tab opening in the background) gave the original a "--80px" margin,
    // which IntersectionObserver rejects with a SyntaxError
    const nav = bar.offsetHeight, below = Math.max(0, window.innerHeight - nav);
    if (builtFor === `${nav} ${below}`) return;
    builtFor = `${nav} ${below}`;
    watchers.forEach((observer) => observer.disconnect());
    watchers = []; dark.clear(); calls.clear();
    // 14. theme: what crosses the bottom edge of the header
    watch(darkSections, dark, 'theme-inverse', `-${nav}px 0px -${below}px 0px`);
    // 23. button: while the final call is under the header, its own button is the one to press
    watch(callSections, calls, 'is-over-cta', `0px 0px -${below}px 0px`);
  };
  build();
  window.addEventListener('resize', build, { passive: true });
  undo.push(() => { window.removeEventListener('resize', build); watchers.forEach((observer) => observer.disconnect()); });
}

/** 24. One question open at a time. The details of a FAQ share name="faq", which current browsers already honour. */
function exclusiveFallback(undo: (() => void)[]) {
  if ('name' in HTMLDetailsElement.prototype) return;
  document.querySelectorAll<HTMLDetailsElement>('details[name]').forEach((item) => {
    const onToggle = () => {
      if (!item.open) return;
      document.querySelectorAll<HTMLDetailsElement>(`details[name="${item.getAttribute('name')}"]`).forEach((other) => { if (other !== item) other.open = false; });
    };
    item.addEventListener('toggle', onToggle);
    undo.push(() => item.removeEventListener('toggle', onToggle));
  });
}

/**
 * 25. Questions open and close with their height animated, with the Web Animations API, so it works before the library
 * arrives. The browser closes an exclusive details at once, which would cut the closing animation of the other, so the
 * name leaves the details here (and comes back on cleanup) and this code keeps one open at a time.
 */
function questions(undo: (() => void)[]) {
  const items = [...document.querySelectorAll<HTMLDetailsElement>('details[name]')];
  if (!items.length || !Element.prototype.animate) return;
  const timing: KeyframeAnimationOptions = { duration: 500, easing: `cubic-bezier(${MOTION.curve.join(', ')})` };
  const running = new WeakMap<HTMLDetailsElement, Animation>();
  const groups: Record<string, HTMLDetailsElement[]> = {};
  items.forEach((item) => {
    const group = item.getAttribute('name') as string;
    (groups[group] ??= []).push(item);
    item.removeAttribute('name');
    undo.push(() => item.setAttribute('name', group));
  });
  // the height on screen now (a click in the middle of an animation starts from where it is), then the animation
  // stops, so the end height is measured without it
  const current = (item: HTMLDetailsElement) => {
    const from = item.offsetHeight;
    const run = running.get(item);
    if (run) { run.onfinish = null; run.cancel(); running.delete(item); }
    return from;
  };
  const run = (item: HTMLDetailsElement, from: number, to: number, done?: () => void) => {
    item.style.overflow = 'hidden';
    const animation = item.animate([{ height: `${from}px` }, { height: `${to}px` }], timing);
    running.set(item, animation);
    animation.onfinish = () => { running.delete(item); item.style.overflow = ''; done?.(); };
  };
  const open = (item: HTMLDetailsElement) => {
    const from = current(item);
    item.classList.remove('is-closing');
    item.open = true;
    run(item, from, item.offsetHeight);
  };
  const close = (item: HTMLDetailsElement) => {
    const from = current(item);
    item.open = false;
    const to = item.offsetHeight;
    item.open = true;
    item.classList.add('is-closing');
    run(item, from, to, () => { item.open = false; item.classList.remove('is-closing'); });
  };
  Object.values(groups).forEach((group) => group.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    const onClick = (event: Event) => {
      event.preventDefault();
      if (item.open && !item.classList.contains('is-closing')) { close(item); return; }
      group.forEach((other) => { if (other !== item && other.open && !other.classList.contains('is-closing')) close(other); });
      open(item);
    };
    summary.addEventListener('click', onClick);
    undo.push(() => summary.removeEventListener('click', onClick));
  }));
}

/** The scroll driven interactions, inside one gsap.matchMedia so they all revert together. */
function setup(gsap: GsapApi, ScrollTrigger: ScrollTriggerApi, root: HTMLElement) {
  const ease = bezier(...MOTION.curve);
  const mm = gsap.matchMedia();

  mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (context) => {
    const conditions = context.conditions as { motion: boolean; desktop: boolean };
    if (!conditions.motion) { root.classList.remove('js-motion'); return; }
    root.classList.add('js-motion');

    // 2. hero, 992 px and up: clip-path and shift while the runway passes, then the photo eases back to 0.95
    const runway = document.querySelector('[data-hero-runway]');
    const heroImage = document.querySelector<HTMLElement>('[data-hero-image]');
    if (conditions.desktop && runway && heroImage) {
      const media = heroImage.closest('div');
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: runway, start: 'top bottom', end: 'bottom bottom', scrub: MOTION.scrub, invalidateOnRefresh: true } })
        .fromTo(media, { clipPath: `inset(0% 0% 0% ${MOTION.hero.clipFrom}%)` }, { clipPath: 'inset(0% 0% 0% 0%)', duration: MOTION.hero.grow }, 0)
        .fromTo(heroImage, { x: () => window.innerWidth * MOTION.hero.shiftFrom }, { x: 0, duration: MOTION.hero.grow }, 0)
        .fromTo(heroImage, { scale: 1 }, { scale: MOTION.hero.scaleTo, duration: 1 - MOTION.hero.grow, immediateRender: false }, MOTION.hero.grow);
    }

    // 3. statement: split in words only when the sentence gets near the window, so it never sits dimmed out of view
    gsap.utils.toArray<HTMLElement>('[data-statement]').forEach((sentence) => {
      ScrollTrigger.create({
        trigger: sentence, start: 'top 150%', once: true,
        // context.add keeps the tween made later inside this matchMedia, so it reverts with the rest
        onEnter: () => context.add(() => {
          gsap.fromTo(split(sentence, false), { opacity: MOTION.statement.from }, {
            opacity: 1, ease: 'none', duration: MOTION.statement.band, stagger: 1,
            scrollTrigger: { trigger: sentence, start: MOTION.statement.start, end: MOTION.statement.end, scrub: MOTION.scrub },
          });
        }),
      });
    });

    // 4 and 5. project photo: the circle opens until the band sticks, then the letters of the word slide in
    gsap.utils.toArray<HTMLElement>('[data-project-track]').forEach((track) => {
      const figure = track.querySelector<HTMLElement>('[data-project-figure]');
      const photo = track.querySelector<HTMLElement>('[data-project-media]');
      const word = track.querySelector<HTMLElement>('[data-project-word]');
      const ring = track.querySelector<HTMLElement>('[data-project-ring]');
      if (!figure || !photo || !word || !ring) return;
      const opening = 1 - MOTION.circle.word;
      const stuckAt = () => parseFloat(getComputedStyle(figure).top) || 0;
      // clip-path circle(75%): the percentage is taken from the diagonal of the box divided by the square root of 2
      const radius = () => (MOTION.circle.to * Math.sqrt(photo.offsetWidth ** 2 + photo.offsetHeight ** 2)) / Math.SQRT2;
      const letters = split(word, true);
      // the letters wait unseen and to the right, by a share of their size; the word itself shows, so each letter
      // carries its own opacity
      gsap.set(letters, { x: Math.round(parseFloat(getComputedStyle(word).fontSize) * MOTION.word.x), opacity: 0 });
      gsap.set(word, { opacity: 1 });
      gsap.timeline({ scrollTrigger: { trigger: track, start: 'top bottom', end: () => `top ${stuckAt()}px`, scrub: MOTION.scrub, invalidateOnRefresh: true } })
        .fromTo(photo, { clipPath: `circle(${MOTION.circle.from}px at 50% 50%)` }, { clipPath: () => `circle(${Math.ceil(radius())}px at 50% 50%)`, ease: 'power1.in', duration: opening }, 0)
        // the ring is a disc 1 px larger behind the photo
        .fromTo(ring, { clipPath: `circle(${MOTION.circle.from + 1}px at 50% 50%)` }, { clipPath: () => `circle(${Math.ceil(radius()) + 1}px at 50% 50%)`, ease: 'power1.in', duration: opening }, 0)
        .to(ring, { opacity: 0, ease: 'none', duration: opening * MOTION.circle.ring }, opening * (1 - MOTION.circle.ring))
        .to(letters, { opacity: 1, ease: 'none', duration: MOTION.circle.word }, opening); // the word shows only over the open photo
      gsap.to(letters, {
        x: 0, ease: 'none', stagger: MOTION.word.stagger,
        scrollTrigger: { trigger: track, start: () => `top ${stuckAt()}px`, end: () => `bottom ${stuckAt() + figure.offsetHeight}px`, scrub: MOTION.scrub, invalidateOnRefresh: true },
      });
    });

    // 6. topic thumbnails: from the row entering at the foot of the window to its middle at the middle of the window
    gsap.utils.toArray<HTMLElement>('[data-topic-image]').forEach((img) => {
      gsap.fromTo(img, { rotation: MOTION.thumbnail.from }, {
        rotation: 0, ease: 'none',
        scrollTrigger: { trigger: img.closest('li'), start: 'top bottom', end: 'center center', scrub: MOTION.scrub },
      });
    });

    // 15. ruler: the line draws itself while the list crosses the window and its small marks are uncovered at the
    // same pace; the FAQ timeline uses the same function for its solid trace, and its dashed traces only fade in
    const draw = (trigger: Element) => gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger, start: MOTION.draw.start, end: MOTION.draw.end, scrub: MOTION.scrub } });
    gsap.utils.toArray<HTMLElement>('[data-ruler]').forEach((ruler) => {
      draw(ruler)
        .fromTo(ruler.querySelector('[data-ruler-line]'), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
        .fromTo(ruler.querySelector('[data-ruler-ticks]'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0);
    });
    gsap.utils.toArray<HTMLElement>('[data-timeline]').forEach((list) => {
      draw(list)
        .fromTo(list.querySelectorAll('[data-timeline-trace="solid"]'), { scaleY: 0 }, { scaleY: 1, duration: MOTION.draw.solid }, 0)
        .fromTo(list.querySelectorAll('[data-timeline-trace="dashed"]'), { opacity: 0 }, { opacity: 1, duration: 1 - MOTION.draw.solid }, MOTION.draw.solid);
    });

    // 9. stacked photos: while the next panel covers this one, its photo grows
    const panels = gsap.utils.toArray<HTMLElement>('[data-stack-panel]');
    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;
      gsap.fromTo(panel.querySelector('[data-stack-image]'), { scale: 1 }, {
        scale: MOTION.zoom, ease: 'none',
        scrollTrigger: { trigger: panels[i + 1], start: 'top bottom', end: 'top top', scrub: MOTION.scrub },
      });
    });

    // 11. final call: the photo behind, taller than the section, moves with the scroll
    gsap.utils.toArray<HTMLElement>('[data-cta]').forEach((section) => {
      gsap.fromTo(section.querySelector('[data-cta-image]'), { yPercent: -MOTION.parallax }, {
        yPercent: MOTION.parallax, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: MOTION.scrubSlow },
      });
    });

    // 7. lines draw themselves, once
    gsap.utils.toArray<HTMLElement>('[data-line]:not([data-line="seen"])').forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: MOTION.line.duration, ease, scrollTrigger: { trigger: line, start: MOTION.entry.start, once: true },
        onComplete: () => { line.setAttribute('data-line', 'seen'); gsap.set(line, { clearProps: 'transform' }); },
      });
    });

    // 8. entries: what enters the window together comes one item after the other
    gsap.set('[data-reveal]:not([data-reveal="seen"])', { opacity: 0, y: MOTION.entry.y });
    ScrollTrigger.batch('[data-reveal]:not([data-reveal="seen"])', {
      start: MOTION.entry.start, once: true,
      onEnter: (batch) => context.add(() => {
        gsap.to(batch, {
          opacity: 1, y: 0, duration: MOTION.entry.duration, ease, stagger: MOTION.entry.stagger, overwrite: true,
          onComplete: () => { batch.forEach((el) => el.setAttribute('data-reveal', 'seen')); gsap.set(batch, { clearProps: 'opacity,transform' }); },
        });
      }),
    });

    return () => root.classList.remove('js-motion');
  });

  // the lazy photos get their height from width and height, but the fonts can still move a line
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}

/**
 * Starts every interaction of the page and returns the function that stops them (the Next.js effect calls it on
 * unmount; the Astro page never needs it).
 */
export function initMotion(): () => void {
  const undo: (() => void)[] = [];
  const cleanup = () => { while (undo.length) undo.pop()?.(); };
  const root = document.documentElement;
  const motionAtStart = root.classList.contains('js-motion');
  undo.push(() => root.classList.toggle('js-motion', motionAtStart));

  header(document.querySelector<HTMLElement>('[data-site-header]'), undo);
  exclusiveFallback(undo);
  if (!motionAtStart) return cleanup;
  questions(undo);

  // what is already on the first screen never waits hidden for the library
  document.querySelectorAll('[data-reveal], [data-line]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute(el.hasAttribute('data-reveal') ? 'data-reveal' : 'data-line', 'seen');
  });

  let stopped = false;
  const start = () => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (stopped) return;
      gsap.registerPlugin(ScrollTrigger);
      undo.push(setup(gsap, ScrollTrigger, root));
    }).catch(() => {
      root.classList.remove('js-motion'); // no library: every state to animate from goes away and the page shows whole
    });
  };
  undo.push(() => { stopped = true; });

  // from 992 px up the hero moves with the first scroll, so the library loads right after the load event; under
  // 992 px nothing on the first screen moves, so it waits for the first scroll, touch or key
  const onFirstUse = (callback: () => void) => {
    const events = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'];
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      events.forEach((type) => window.removeEventListener(type, go));
      callback();
    };
    events.forEach((type) => window.addEventListener(type, go, { passive: true }));
    undo.push(() => events.forEach((type) => window.removeEventListener(type, go)));
    if (window.scrollY > 0) go(); // the page opened at an anchor
  };
  const begin = () => (window.matchMedia(DESKTOP).matches ? start() : onFirstUse(start));

  if (document.readyState === 'complete') begin();
  else {
    window.addEventListener('load', begin, { once: true });
    undo.push(() => window.removeEventListener('load', begin));
  }
  return cleanup;
}
