// Where this build lives on joaomob.com, and the link helper every component uses.
import { pageHref } from './lib/links';

/** The base path of the Astro build, without the trailing slash (astro.config.mjs has the same). */
export const BASE = '/concepts/vanth';

/** A link to a page of this build: href('collection-riot'), href('', '#lookbook') for the Home. */
export const href = (page: string, hash = ''): string => pageHref(BASE, page, hash);
