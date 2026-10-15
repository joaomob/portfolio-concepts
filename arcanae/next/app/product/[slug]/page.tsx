// One page per arcana (src/pages/product/[slug].astro).
import { notFound } from 'next/navigation';
import Lightbox from '../../../components/product/Lightbox';
import Product from '../../../components/product/Product';
import ProductTrust from '../../../components/product/ProductTrust';
import Related from '../../../components/product/Related';
import SiteFrame from '../../../components/SiteFrame';
import { CARDS } from '../../../../astro/src/data/catalog';
import { getCard } from '../../../../astro/src/lib/catalog';
import { pageMetadata } from '../../../lib/meta';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  return pageMetadata({ title: `${card.name} Tarot Statue, Hand-painted | Arcanae Craft` }, `product/${card.slug}`);
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();
  return (
    <SiteFrame page="product" cards after={<Lightbox />}>
      <Product card={card} />
      <ProductTrust />
      <Related card={card} />
    </SiteFrame>
  );
}
