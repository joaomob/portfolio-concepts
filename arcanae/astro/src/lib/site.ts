// Addresses shared by both builds. Media live once, in the Astro build, so the Next.js build points at the same
// /concepts/arcanae/assets/ folder; pages differ by base (/concepts/arcanae for Astro, /concepts/arcanae/next for Next).
export const SITE_ORIGIN = 'https://joaomob.com';
export const ASTRO_BASE = '/concepts/arcanae';
export const NEXT_BASE = '/concepts/arcanae/next';
export const ASSET_BASE = '/concepts/arcanae/assets';
export const DRACO_DECODER = '/concepts/arcanae/vendor/draco/';

/** Absolute address of a media file, e.g. asset('brand/emblem-ink.svg'). */
export const asset = (path: string): string => `${ASSET_BASE}/${path.replace(/^\/+/, '')}`;

/** Clean page address under a base: page(base, '') is the home, page(base, 'product/the-fool') a product. */
export const page = (base: string, path = ''): string => `${base}/${path.replace(/^\/+/, '')}`;

/** Canonical address of a page on joaomob.com. */
export const canonical = (base: string, path = ''): string => `${SITE_ORIGIN}${page(base, path)}`;
