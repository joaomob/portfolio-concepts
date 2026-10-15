// Astro static build of the Litora EB-5 concept, published hidden at joaomob.com/concepts/litora-eb5/.
// format 'file' writes webinar-visto-eb5.html (not webinar-visto-eb5/index.html), so Firebase cleanUrls serves
// /concepts/litora-eb5/webinar-visto-eb5 without a trailing slash.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/litora-eb5/',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never', assets: '_astro' },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    build: {
      rollupOptions: {
        // one stylesheet serves every page: a readable name in dist/_astro instead of the route name
        output: {
          assetFileNames: (info) => (info.names?.[0]?.endsWith('.css') ? '_astro/site.[hash][extname]' : '_astro/[name].[hash][extname]'),
        },
      },
    },
  },
});
