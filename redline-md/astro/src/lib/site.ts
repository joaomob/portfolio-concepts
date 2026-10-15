// Addresses shared by both builds. The media live once, in the Astro build (/concepts/redline-md/assets/), and the
// Next build points at the same files instead of copying them again.
export const SITE = 'https://joaomob.com';
export const BASE = '/concepts/redline-md/';
export const ASSETS = `${BASE}assets/`;

/** Canonical address of a page of a build ('' is the home). */
export const canonicalFor = (path: string, mount = BASE): string => `${SITE}${mount}${path}`;

/** Absolute address of a media file, from its path inside assets/. */
export const asset = (path: string): string => `${ASSETS}${path}`;

/** Link to a page of the Astro build: '' is the landing, 'case-study#style-guide' the style guide tab. */
export const page = (path: string): string => `${BASE}${path}`;
