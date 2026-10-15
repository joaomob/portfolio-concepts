// The journal hub: the three guides of the concierge.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageIntro from '@/components/ui/PageIntro';
import CloseBand from '@/components/ui/CloseBand';
import JournalList from '@/components/journal/JournalList';
import { journalHub } from '@astro/data/journal';

export const meta: PageMeta = { title: journalHub.title, description: journalHub.meta, slug: "journal" };

export default function JournalView() {
  return (
    <BaseLayout {...meta}>
  <PageIntro eyebrow="Journal" title={journalHub.h1} />
  <JournalList />
  <CloseBand />
</BaseLayout>
  );
}
