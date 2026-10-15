// The addresses of the Next.js build, under /concepts/can-arbos/next/ (the basePath of next.config.ts). Pages link to
// the other pages of this build; the media come from the Astro build, at /concepts/can-arbos/assets/.
import { createSite, type ImageOptions } from '@astro/lib/site';

export const NEXT_BASE = '/concepts/can-arbos/next/';
const site = createSite(NEXT_BASE);

export const { page, canonical, asset } = site;

/** The photo attributes with React's names (srcSet), ready to spread on an <img>. */
export function img(path: string, width: number, options: ImageOptions = {}) {
  const { src, srcset, sizes } = site.img(path, width, options);
  return { src, srcSet: srcset, sizes };
}
