// Astro static build of the Redline MD landing and its case study, published hidden at joaomob.com/concepts/redline-md/.
// format 'file' writes case-study.html (not case-study/index.html), so Firebase cleanUrls serves
// /concepts/redline-md/case-study without a trailing slash. compressHTML is off: the sections keep the whitespace of
// the original markup, which renders the spaces between inline elements.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaomob.com',
  base: '/concepts/redline-md/',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never', assets: '_astro' },
  compressHTML: false,
  devToolbar: { enabled: false },
});
