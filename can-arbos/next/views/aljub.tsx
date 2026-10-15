// Aljub, the restaurant: the menu with its filter, the chef, the hours and the questions.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import AljubHero from '@/components/aljub/AljubHero';
import AljubMenu from '@/components/aljub/AljubMenu';
import AljubChef from '@/components/aljub/AljubChef';
import AljubHours from '@/components/aljub/AljubHours';
import FaqBlock from '@/components/ui/FaqBlock';
import { ALJUB_FAQ } from '@astro/data/dining';
import CloseBand from '@/components/ui/CloseBand';

export const meta: PageMeta = { title: "Mallorcan Restaurant in Palma Old Town · Aljub", description: "Aljub is a Mallorcan restaurant in Palma's old town, open for dinner Tuesday to Saturday. See every dish, price and allergen before you book.", slug: "aljub" };

export default function AljubView() {
  return (
    <BaseLayout {...meta}>
  <AljubHero />
  <AljubMenu />
  <AljubChef />
  <AljubHours />
  <FaqBlock title="Questions about Aljub" items={ALJUB_FAQ} />
  <CloseBand />
</BaseLayout>
  );
}
