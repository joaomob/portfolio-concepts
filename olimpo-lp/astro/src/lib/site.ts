// Addresses shared by both builds. The media live once, in the Astro build (/concepts/olimpo-lp/assets/), and
// the Next build points at the same files instead of copying them again.
export const SITE = 'https://joaomob.com';
export const BASE = '/concepts/olimpo-lp/';
export const ASSETS = `${BASE}assets/`;

/** Canonical address of a page of this build ('' is the home). */
export const canonicalFor = (path: string, mount = BASE): string => `${SITE}${mount}${path}`;

/** Absolute address of a media file, from its path inside assets/. */
export const asset = (path: string): string => `${ASSETS}${path}`;
