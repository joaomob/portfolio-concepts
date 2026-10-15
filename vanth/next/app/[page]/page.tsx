// Every page of a line: its collection, its fragrance and one page per piece that can be bought.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seasonPage, seasonPages } from '@/lib/pages';
import { CollectionPage, collectionMeta } from '@/components/templates/CollectionPage';
import { FragrancePage, fragranceMeta } from '@/components/templates/FragrancePage';
import { ProductPage, productMeta } from '@/components/templates/ProductPage';

interface Props {
  params: Promise<{ page: string }>;
}

export const dynamicParams = false;
export const generateStaticParams = () => seasonPages().map((page) => ({ page }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = seasonPage((await params).page);
  if (!found) return {};
  if (found.kind === 'collection') return collectionMeta(found.line);
  if (found.kind === 'fragrance') return fragranceMeta(found.view);
  return productMeta(found.line, found.product);
}

export default async function Page({ params }: Props) {
  const found = seasonPage((await params).page);
  if (!found) notFound();
  if (found.kind === 'collection') return <CollectionPage line={found.line} />;
  if (found.kind === 'fragrance') return <FragrancePage view={found.view} />;
  return <ProductPage line={found.line} product={found.product} others={found.others} />;
}
