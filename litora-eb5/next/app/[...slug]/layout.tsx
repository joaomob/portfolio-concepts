// The root layout of every page (there is no app/layout.tsx: the page language sets <html lang>, so the root layout
// lives in the catch all segment). It carries what the Astro BaseLayout puts in the head besides the metadata: the
// stylesheet, the hero preloads and the inline script that runs before the first paint.
import type { ReactNode } from 'react';
import '@astro/styles/index.css';
import { NEXT_BASE, pageView, routeOf, routes } from '@astro/lib/content';
import { INLINE_SCRIPT } from '@astro/lib/head';

export const dynamicParams = false;
export const generateStaticParams = () => routes.map((route) => ({ slug: route.slug.split('/') }));

interface Props { children: ReactNode; params: Promise<{ slug: string[] }> }

export default async function RootLayout({ children, params }: Props) {
  const page = pageView(routeOf((await params).slug.join('/')), NEXT_BASE);
  return (
    // the inline script adds "js" and "js-motion" to <html> before React hydrates
    <html lang={page.route.lang} suppressHydrationWarning>
      <head>
        {page.preloads.map((p) => (
          <link key={p.media} rel="preload" as="image" href={p.src} imageSrcSet={p.srcset} imageSizes={p.sizes} media={p.media} fetchPriority="high" />
        ))}
        <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
