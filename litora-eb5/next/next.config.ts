// Next.js static export of the Litora EB-5 concept, published hidden at joaomob.com/concepts/litora-eb5/next/.
// The data, the view logic, the scripts and the CSS live once in ../astro/src; externalDir lets this app import them.
// Photos, fonts and the calendar files are not copied: the pages point at the Astro build (/concepts/litora-eb5/assets/).
import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  basePath: '/concepts/litora-eb5/next',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { externalDir: true },
};

export default config;
