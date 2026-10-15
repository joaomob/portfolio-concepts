// One page per guide of the Journal collection.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageHero from '@/components/ui/PageHero';
import CloseBand from '@/components/ui/CloseBand';
import GuideBody from '@/components/journal/GuideBody';
import GuideMap from '@/components/journal/GuideMap';
import MoreGuides from '@/components/journal/MoreGuides';
import { page } from '@/lib/paths';
import { GUIDES, AUTHOR, type Guide } from '@astro/data/journal';

export const guideMeta = (guide: Guide): PageMeta => ({ title: guide.title, description: guide.meta, slug: `journal-${guide.slug}` });

export default function JournalSlugView({ guide }: { guide: Guide }) {
  return (
    <BaseLayout {...guideMeta(guide)}>
  <PageHero title={guide.h1} text={guide.summary} image={`${guide.cover.path}.webp`} alt={guide.cover.alt} long guide eyebrowSlot={<a href={page('journal')}>Journal</a>}>
    <p className="journal_author_text">{AUTHOR}</p>
  </PageHero>
  <GuideBody guide={guide} />
  {guide.map && <GuideMap />}
  <MoreGuides current={guide} tinted={!guide.map} />
  <CloseBand />
</BaseLayout>
  );
}
