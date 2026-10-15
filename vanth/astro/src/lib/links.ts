// Addresses between pages. Each build lives under its own base path (the Astro build at /concepts/vanth, the
// Next.js build at /concepts/vanth/next) and the pages are named the same in both, so a link is base + page.

export const ORIGIN = 'https://joaomob.com';

/** A page address: "" is the Home, "collection-riot" a page, and a hash ("#lookbook") may follow. */
export function pageHref(base: string, page: string, hash = ''): string {
  return (page ? `${base}/${page}` : base) + hash;
}

/** The menu and the footer point at two sections of the Home; on the Home itself they are plain anchors. */
export function homeAnchor(base: string, onHome: boolean, id: string): string {
  return onHome ? `#${id}` : pageHref(base, '', `#${id}`);
}

/** The canonical address of a page of a build, on joaomob.com. */
export const canonical = (base: string, page: string): string => ORIGIN + pageHref(base, page);
