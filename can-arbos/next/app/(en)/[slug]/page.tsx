// Every inner page from one route, with the same addresses as the Astro build (aljub, room-arbos-suite, ...).
import type { Metadata } from 'next';
import { metadataOf, pageOf, pages } from '@/lib/routes';

export const dynamicParams = false;
export const generateStaticParams = () => pages.map((entry) => ({ slug: entry.meta.slug }));

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataOf(pageOf((await params).slug).meta);
}

export default async function Page({ params }: Props) {
  return pageOf((await params).slug).render();
}
