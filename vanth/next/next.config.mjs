// Vanth, Next.js build. A static export under /concepts/vanth/next/ on joaomob.com. The data, the catalogue rules, the
// style sheets and the browser code are the ones of the Astro build (../astro/src), so both builds are the same site;
// the photographs are served once, by the Astro build, at /concepts/vanth/assets/.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/concepts/vanth/next',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  // the shared code lives outside this folder
  experimental: { externalDir: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
