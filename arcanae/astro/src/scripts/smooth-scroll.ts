// Smooth scroll with Lenis (lerp 0.085, as in the original). The cart drawer and the lightbox pause it while open.
// In-page links (#collection, #faq) glide through Lenis, since the page has no CSS smooth scroll while Lenis runs.
import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const getLenis = (): Lenis | null => lenis;

export function pauseScroll(): void {
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = 'hidden';
}

export function resumeScroll(): void {
  if (lenis) lenis.start();
  else document.documentElement.style.overflow = '';
}

export function initSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
  lenis = instance;
  let frame = 0;
  const raf = (time: number) => {
    instance.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href') ?? '';
    if (id.length < 2) return;
    const to = document.getElementById(id.slice(1));
    if (!to) return;
    e.preventDefault();
    instance.scrollTo(to);
    history.pushState(null, '', id);
  };
  document.addEventListener('click', onClick);

  return () => {
    cancelAnimationFrame(frame);
    document.removeEventListener('click', onClick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
