// Arcanae Craft, Next.js build. Static export under /concepts/arcanae/next/ on joaomob.com. The data, the CSS and the
// browser code are the ones of the Astro build (../astro/src), so both builds stay the same site.
import { fileURLToPath } from 'node:url';

// three.js is vendored in ../vendor/three (it is not installed at the root of portfolio-concepts)
const vendor = fileURLToPath(new URL('../vendor/three/', import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/concepts/arcanae/next',
  trailingSlash: false,
  images: { unoptimized: true },
  // the shared code lives outside this folder
  experimental: { externalDir: true },
  eslint: { ignoreDuringBuilds: true },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      three$: `${vendor}build/three.module.js`,
      'three/addons': `${vendor}examples/jsm`,
    };
    // the info pages import their rich text as a string (file.html?raw), as Vite does for the Astro build
    config.module.rules.push({ test: /\.html$/, resourceQuery: /raw/, type: 'asset/source' });
    return config;
  },
};

export default nextConfig;
