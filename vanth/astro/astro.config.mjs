// Vanth, Astro build. Static pages under /concepts/vanth/ on joaomob.com. Each page is written as <page>.html
// (format 'file'), which Firebase serves at /concepts/vanth/<page> with cleanUrls, so links never carry .html.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/vanth/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // every page carries its own style sheet, as the original did, so the first paint waits for no request
    inlineStylesheets: 'always',
  },
  // the media are copied by scripts/sync-assets.mjs; nothing to optimize at build time
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  devToolbar: { enabled: false },
});
