// Arcanae Craft, Astro build. Static pages under /concepts/arcanae/ on joaomob.com. Each page is written as
// <page>.html (format 'file'), served at /concepts/arcanae/<page> with clean URLs, so links never carry .html.
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// three.js is not installed at the root of portfolio-concepts, so a copy of the files the hero uses is kept in
// ../vendor/three (see scripts/vendor-three.mjs) and both builds resolve 'three' there.
const vendor = fileURLToPath(new URL('../vendor/three/', import.meta.url));

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/arcanae/',
  trailingSlash: 'never',
  build: { format: 'file' },
  // the media are copied by scripts/sync-assets.mjs; nothing to optimize at build time
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  devToolbar: { enabled: false },
  vite: {
    resolve: {
      alias: [
        { find: /^three$/, replacement: `${vendor}build/three.module.js` },
        { find: /^three\/addons\//, replacement: `${vendor}examples/jsm/` },
      ],
    },
    server: { fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] } },
  },
});
