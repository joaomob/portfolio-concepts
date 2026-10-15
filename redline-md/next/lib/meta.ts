// Metadata shared by both pages of the Next build: noindex, the canonical under /concepts/redline-md/next/ and the icon.
import type { Metadata } from 'next';
import { canonicalFor, asset, SITE } from '@astro/lib/site';
import { NEXT_MOUNT } from './links';

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    metadataBase: new URL(SITE),
    title,
    description,
    robots: { index: false },
    alternates: { canonical: canonicalFor(path, NEXT_MOUNT) },
    icons: { icon: { url: asset('seo/favicon-256.png'), type: 'image/png' } },
  };
}
