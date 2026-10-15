// Where this build lives on joaomob.com, and the link helper every component uses. The pages are named as in the
// Astro build, so a link is the base path of this build plus the page.
import { pageHref } from '@shared/lib/links';

/** The base path of the Next.js build, without the trailing slash (next.config.mjs has the same). */
export const BASE = '/concepts/vanth/next';

/** A link to a page of this build: href('collection-riot'), href('', '#lookbook') for the Home. */
export const href = (page: string, hash = ''): string => pageHref(BASE, page, hash);
