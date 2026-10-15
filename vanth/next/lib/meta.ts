// The metadata of every page: the title and description, noindex (the concept pages stay out of search), the
// canonical address on joaomob.com and the favicon. The same head as the Astro build.
import type { Metadata } from 'next';
import { canonical } from '@shared/lib/links';
import { MEDIA } from '@shared/lib/photos';
import { BASE } from './config';

/** `page` is the page without the base path ("" for the Home). */
export const pageMeta = (title: string, description: string, page: string): Metadata => ({
  title: { absolute: title },
  description,
  robots: { index: false },
  alternates: { canonical: canonical(BASE, page) },
  icons: { icon: { url: `${MEDIA}/favicon.svg`, type: 'image/svg+xml' } },
});
