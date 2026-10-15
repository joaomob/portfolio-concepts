// The Home, in English at / and in Spanish at /es: the same sections, each one translated by its lang prop.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import HomeHero from './HomeHero';
import HouseIntro from './HouseIntro';
import RoomsCarousel from './RoomsCarousel';
import DiningIntro from './DiningIntro';
import RooftopIntro from './RooftopIntro';
import WhereWeAre from './WhereWeAre';
import ExperiencesList from './ExperiencesList';
import CelebrationsBand from './CelebrationsBand';
import HomeFaq from './HomeFaq';
import HomeClose from './HomeClose';
import type { Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

/** The head of the two Homes; the title and description are translated with the page. */
export const homeMeta = (lang: Lang): PageMeta => ({
  title: 'Boutique Hotel in Palma Old Town, Rooftop Pool · Can Arbós',
  description: "A boutique hotel in Palma's old town, with 21 rooms around a courtyard from the 1600s, a rooftop pool and Aljub, our Mallorcan restaurant. Adults only.",
  slug: lang === 'es' ? 'es' : '',
  lang,
  alternates: true,
});

export default function HomePage(props: Props) {
  const { lang } = props;
  return (
    <>
<BaseLayout {...homeMeta(lang)}>
  <HomeHero lang={lang} />
  <HouseIntro lang={lang} />
  <RoomsCarousel lang={lang} />
  <DiningIntro lang={lang} />
  <RooftopIntro lang={lang} />
  <WhereWeAre lang={lang} />
  <ExperiencesList lang={lang} />
  <CelebrationsBand lang={lang} />
  <HomeFaq lang={lang} />
  <HomeClose lang={lang} />
</BaseLayout>
    </>
  );
}
