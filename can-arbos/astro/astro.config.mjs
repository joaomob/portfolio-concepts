// Can Arbós, Astro build. Static pages under /concepts/can-arbos/ on joaomob.com. Each page is written as <page>.html
// (format 'file'), which Firebase serves at /concepts/can-arbos/<page> with cleanUrls, so links never carry .html.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/can-arbos/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // one cached style sheet for every page, as the prototype serves its all.min.css
    inlineStylesheets: 'never',
  },
  // the photos are already WebP at their sizes (copied by scripts/sync-assets.mjs); nothing to optimize at build time
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  devToolbar: { enabled: false },
});
