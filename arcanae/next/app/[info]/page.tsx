// The four info pages (src/pages/[info].astro).
import { notFound } from 'next/navigation';
import LegalArticle from '../../components/LegalArticle';
import SiteFrame from '../../components/SiteFrame';
import { INFO_PAGES } from '../../../astro/src/data/pages';
import { pageMetadata } from '../../lib/meta';

type Params = Promise<{ info: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return INFO_PAGES.map((info) => ({ info: info.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { info: slug } = await params;
  const info = INFO_PAGES.find((p) => p.slug === slug);
  return info ? pageMetadata(info, info.slug) : {};
}

export default async function InfoPage({ params }: { params: Params }) {
  const { info: slug } = await params;
  const info = INFO_PAGES.find((p) => p.slug === slug);
  if (!info) notFound();
  return (
    <SiteFrame page="info" cartNote>
      <LegalArticle info={info} />
    </SiteFrame>
  );
}
