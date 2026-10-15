// Metadata shared by every page of the Next build: noindex, the canonical under /concepts/olimpo-lp/next/ and the icon.
import type { Metadata } from 'next';
import { canonicalFor, ASSETS, BASE, SITE } from '@astro/lib/site';

export const NEXT_MOUNT = `${BASE}next/`;

export function pageMeta({ title, description, path, ogImage }: { title: string; description?: string; path: string; ogImage?: string }): Metadata {
  return {
    metadataBase: new URL(SITE),
    title,
    description,
    robots: { index: false },
    alternates: { canonical: canonicalFor(path, NEXT_MOUNT) },
    icons: { icon: { url: `${ASSETS}icon.svg`, type: 'image/svg+xml' } },
    openGraph: description ? { title, description, images: ogImage ? [ogImage] : undefined } : undefined,
  };
}
