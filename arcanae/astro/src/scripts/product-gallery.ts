// Product page behaviour: the gallery thumbnails, the zoom lens on hover, the lightbox on click, and Add to Cart.
// The markup is rendered on the server (ProductGallery and ProductInfo); the shots are read from data attributes.
import { addToCart } from './cart';
import { trapFocus } from './focus-trap';
import { pauseScroll, resumeScroll } from './smooth-scroll';

const ZOOM = 2.6;
const LENS = 260;

export function initProductPage(): () => void {
  const cleanups: (() => void)[] = [];
  const on = (el: EventTarget | null | undefined, type: string, fn: EventListener) => {
    if (!el) return;
    el.addEventListener(type, fn);
    cleanups.push(() => el.removeEventListener(type, fn));
  };

  /* lightbox: a modal dialog; focus moves to its close button, stays inside, Escape closes, focus returns */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-img') as HTMLImageElement | null;
  let releaseLightbox: (() => void) | null = null;
  const closeLightbox = () => {
    if (!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resumeScroll();
    if (releaseLightbox) {
      const release = releaseLightbox;
      releaseLightbox = null;
      release();
    }
  };
  const openLightbox = (src: string, alt: string) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.setAttribute('aria-label', alt);
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    pauseScroll();
    if (!releaseLightbox) releaseLightbox = trapFocus(lightbox, closeLightbox);
  };
  on(lightbox, 'click', closeLightbox);
  on(lightbox?.querySelector('.lightbox_close'), 'click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  const pdp = document.getElementById('pdp');
  const addButton = document.getElementById('add-to-cart');
  on(addButton, 'click', () => addToCart(addButton!.dataset.card!, addButton!.dataset.finish));

  const main = document.getElementById('gmain');
  const image = document.getElementById('gimg') as HTMLImageElement | null;
  if (!pdp || !main || !image) return () => cleanups.forEach((fn) => fn());

  const name = pdp.dataset.name ?? '';
  const thumbs = Array.from(document.querySelectorAll<HTMLButtonElement>('.gallery_thumb'));
  const lens = main.querySelector<HTMLElement>('.gallery_lens');
  let current = { src: image.src, large: main.dataset.large ?? image.src };

  on(main, 'click', () => openLightbox(current.large, name));
  on(main, 'keydown', (e) => {
    const key = (e as KeyboardEvent).key;
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      openLightbox(current.large, name);
    }
  });

  const setShot = (button: HTMLButtonElement) => {
    current = { src: button.dataset.src!, large: button.dataset.large! };
    image.src = current.src;
    if (lens) lens.style.backgroundImage = `url("${current.large}")`;
    thumbs.forEach((b) => b.setAttribute('aria-current', String(b === button)));
  };
  on(document.querySelector('.gallery_thumbs'), 'click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('.gallery_thumb');
    if (b) setShot(b);
  });

  if (lens && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    lens.style.width = lens.style.height = `${LENS}px`;
    lens.style.backgroundImage = `url("${current.large}")`;
    on(main, 'mouseenter', () => main.classList.add('is-zooming'));
    on(main, 'mouseleave', () => main.classList.remove('is-zooming'));
    on(main, 'mousemove', (ev) => {
      const e = ev as MouseEvent;
      const r = main.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
      const y = Math.max(0, Math.min(r.height, e.clientY - r.top));
      lens.style.left = `${x - LENS / 2}px`;
      lens.style.top = `${y - LENS / 2}px`;
      /* follow the image's object-fit (cover for the renders, contain for a card shown whole) so the zoom keeps the
         real aspect ratio */
      const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1;
      const contain = getComputedStyle(image).objectFit === 'contain';
      let w: number;
      let h: number;
      if (ratio >= 1 !== contain) {
        h = r.height;
        w = r.height * ratio;
      } else {
        w = r.width;
        h = r.width / ratio;
      }
      const offX = (w - r.width) / 2;
      const offY = (h - r.height) / 2;
      lens.style.backgroundSize = `${w * ZOOM}px ${h * ZOOM}px`;
      lens.style.backgroundPosition = `${-((x + offX) * ZOOM - LENS / 2)}px ${-((y + offY) * ZOOM - LENS / 2)}px`;
    });
  }

  return () => {
    closeLightbox();
    cleanups.forEach((fn) => fn());
  };
}
