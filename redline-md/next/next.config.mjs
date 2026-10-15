// Next.js static export of the Redline MD concept, published hidden at joaomob.com/concepts/redline-md/next/.
// The sections reuse the data, the stylesheets and the behaviour scripts of the Astro build (../astro/src), so
// externalDir lets the compiler read that folder. Media are not copied: the pages point at the Astro addresses
// (/concepts/redline-md/assets/), served next to this build.

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath: '/concepts/redline-md/next',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: { externalDir: true },
};

export default config;
