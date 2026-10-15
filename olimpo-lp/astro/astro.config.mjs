// Astro static build of the Olimpo landing concept, published hidden at joaomob.com/concepts/olimpo-lp/.
// format 'file' writes style-guide.html (not style-guide/index.html), so Firebase cleanUrls serves
// /concepts/olimpo-lp/style-guide without a trailing slash.
// three.js is not in the root install: a copy of three 0.171.0 lives in ../vendor/three (MIT, LICENSE beside it),
// and the alias below points the bare imports of vase.js at it.
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const vendor = fileURLToPath(new URL('../vendor/three/', import.meta.url));

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/olimpo-lp/',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never', assets: '_astro' },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    resolve: {
      alias: [
        { find: /^three$/, replacement: `${vendor}three.module.min.js` },
        { find: /^three\/addons\//, replacement: `${vendor}addons/` },
      ],
    },
  },
});
