// Next.js static export of the Can Arbós concept, published hidden at joaomob.com/concepts/can-arbos/next/.
// The data, the translations, the scripts and the CSS live once in ../astro/src; externalDir lets this app import them.
// Photos and fonts are not copied: the pages point at the Astro build (/concepts/can-arbos/assets/).
import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  basePath: '/concepts/can-arbos/next',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { externalDir: true, globalNotFound: true },
};

export default config;
