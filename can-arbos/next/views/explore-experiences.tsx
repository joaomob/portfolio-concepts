// The experiences hub.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageIntro from '@/components/ui/PageIntro';
import CloseBand from '@/components/ui/CloseBand';
import ExperienceHub from '@/components/experiences/ExperienceHub';
import { experiencesHub } from '@astro/data/experiences';

export const meta: PageMeta = { title: experiencesHub.title, description: experiencesHub.meta, slug: "explore-experiences" };

export default function ExploreExperiencesView() {
  return (
    <BaseLayout {...meta}>
  <PageIntro eyebrow="Experiences" title={experiencesHub.h1} text={experiencesHub.intro} />
  <ExperienceHub />
  <CloseBand />
</BaseLayout>
  );
}
