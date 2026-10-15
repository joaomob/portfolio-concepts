// Page metadata for the Next.js build: the same title, description and social card as the Astro build, with the
// canonical address under /concepts/arcanae/next/.
import type { Metadata } from 'next';
import { DEFAULT_OG_TITLE, OG_DESCRIPTION, type PageMeta } from '../../astro/src/data/pages';
import { NEXT_BASE, SITE_ORIGIN, asset, canonical } from '../../astro/src/lib/site';

export function pageMetadata(meta: PageMeta, path: string): Metadata {
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: meta.title,
    description: meta.description,
    robots: { index: false },
    alternates: { canonical: canonical(NEXT_BASE, path) },
    icons: { icon: { url: asset('brand/emblem-ink.svg'), type: 'image/svg+xml' } },
    openGraph: {
      type: 'website',
      siteName: 'Arcanae Craft',
      title: meta.ogTitle ?? DEFAULT_OG_TITLE,
      description: OG_DESCRIPTION,
      images: [{ url: asset('brand/og-image.jpg'), width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  };
}
