// One page per experience of the Experiences collection.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import SaveButton from '@/components/ui/SaveButton';
import CloseBand from '@/components/ui/CloseBand';
import ExperienceAbout from '@/components/experiences/ExperienceAbout';
import ExperienceWalk from '@/components/experiences/ExperienceWalk';
import MoreExperiences from '@/components/experiences/MoreExperiences';
import { page } from '@/lib/paths';
import { experiences, EXPERIENCE_ALT, ASK, WALKS, type Experience } from '@astro/data/experiences';

export const experienceMeta = (experience: Experience): PageMeta => ({ title: experience.title, description: experience.meta, slug: `experience-${experience.slug}` });

export default function ExperienceSlugView({ experience }: { experience: Experience }) {
  const walk = WALKS[experience.slug];
  return (
    <BaseLayout {...experienceMeta(experience)}>
  <PageHero title={experience.heading} text={experience.summary} image={`experiences/${experience.slug}.webp`} alt={EXPERIENCE_ALT[experience.slug]} long eyebrowSlot={<a href={page('explore-experiences')}>Experiences</a>}>
    <ul className="fact_line_list"><li>{experience.type}</li><li>{experience.duration}</li><li>{experience.price}</li></ul><div className="u-button-wrapper"><Button label={experience.button} modal="contact-modal" data-contact="Experience" data-contact-detail={experience.name} aria-label={`${experience.button}: ${experience.name}`} /><SaveButton kind="experience" item={experience.slug} name={experience.name} /></div><p className="page_hero_note">{ASK}</p>
  </PageHero>
  <ExperienceAbout experience={experience} />
  {walk && <ExperienceWalk place={walk.place} heading={walk.heading} />}
  <MoreExperiences current={experience} tinted={!walk} />
  <CloseBand />
</BaseLayout>
  );
}
