// A whole legal page: the small intro and the text, from one entry of the Legal collection.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageIntro from '@/components/ui/PageIntro';
import LegalText from './LegalText';
import { LEGAL } from '@astro/data/legal';

export interface Props {
  slug: 'legal' | 'privacy';
}

const legalOf = (slug: Props['slug']) => LEGAL.find((entry) => entry.slug === slug)!;

export const legalMeta = (slug: Props['slug']): PageMeta => {
  const legal = legalOf(slug);
  return { title: legal.title, description: legal.meta, slug: legal.slug };
};

export default function LegalPageView(props: Props) {
  const legal = legalOf(props.slug);
  return (
    <>
<BaseLayout {...legalMeta(props.slug)}>
  <PageIntro title={legal.h1} small />
  <LegalText legal={legal} />
</BaseLayout>
    </>
  );
}
