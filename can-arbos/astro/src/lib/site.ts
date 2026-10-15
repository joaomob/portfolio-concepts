// Addresses of the site, shared by the Astro and the Next.js builds. Each build passes the base its pages live under;
// the media always live once, in the Astro build, at /concepts/can-arbos/assets/.

export const SITE = 'https://joaomob.com';
export const ASSETS = '/concepts/can-arbos/assets/';

/** The responsive attributes of a photo, as the prototype's build gave them (scripts/build-pages.py, responsive()). */
export interface ImageAttrs {
  src: string;
  srcset?: string;
  sizes?: string;
}

export interface ImageOptions {
  /** The Home hero: below 992 px the photo is an arch inside the container, not the whole screen. */
  hero?: boolean;
}

export function createSite(pageBase: string) {
  /** Clean address of a page: page() is the Home, page('es') the Spanish Home, page('aljub', 'menu') a section. */
  const page = (slug = '', hash?: string) => {
    const path = slug ? pageBase + slug : pageBase.replace(/\/$/, '');
    return hash ? `${path}#${hash}` : path;
  };

  /** The canonical address of a page of this build. */
  const canonical = (slug = '') => SITE + page(slug);

  /** Any media file of the site (fonts, favicon, map). */
  const asset = (path: string) => ASSETS + path;

  /**
   * A WebP photo with its phone copies: a photo wider than 700 px has a copy of 680 px, and a photo that goes from edge
   * to edge (1400 px or more) also one of 800 px.
   */
  const img = (path: string, width: number, options: ImageOptions = {}): ImageAttrs => {
    const src = `${ASSETS}images/${path}`;
    if (width <= 700) return { src };
    const stem = src.replace(/\.webp$/, '');
    const copies = width >= 1400 ? [680, 800] : [680];
    const srcset = [...copies.map((size) => `${stem}-${size}.webp ${size}w`), `${src} ${width}w`].join(', ');
    let sizes = width >= 1400 ? '100vw' : '(max-width: 767px) calc(100vw - 2.5rem), 40vw';
    if (options.hero) sizes = '(max-width: 991px) calc(100vw - 2.5rem), 100vw';
    return { src, srcset, sizes };
  };

  return { page, canonical, asset, img };
}
