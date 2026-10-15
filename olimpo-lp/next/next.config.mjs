// Next.js static export of the Olimpo landing concept, published hidden at joaomob.com/concepts/olimpo-lp/next/.
// The sections reuse the data, the stylesheets and the behavior scripts of the Astro build (../astro/src), so
// externalDir lets the compiler read that folder. Media are not copied: the pages point at the Astro addresses
// (/concepts/olimpo-lp/assets/), served next to this build.
// three.js is not in the root install; the alias points the bare imports of vase.js at ../vendor/three (0.171.0).
import { fileURLToPath } from 'node:url';

const vendor = fileURLToPath(new URL('../vendor/three/', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath: '/concepts/olimpo-lp/next',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: { externalDir: true },
  webpack(cfg) {
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      three$: `${vendor}three.module.min.js`,
      'three/addons': `${vendor}addons`,
    };
    return cfg;
  },
};

export default config;
