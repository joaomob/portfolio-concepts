// Rooftop & Spa: the bar and plunge pool on the roof, and the small spa in the old cellar.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import RooftopHero from '@/components/rooftop/RooftopHero';
import PoolDay from '@/components/rooftop/PoolDay';
import RooftopBar from '@/components/rooftop/RooftopBar';
import SpaTreatments from '@/components/rooftop/SpaTreatments';
import FaqBlock from '@/components/ui/FaqBlock';
import { ROOFTOP_FAQ } from '@astro/data/rooftop';
import CloseBand from '@/components/ui/CloseBand';

export const meta: PageMeta = { title: "Rooftop Bar and Spa in Palma Old Town · Can Arbós", description: "A rooftop bar and plunge pool over Palma's old town, with drinks for visitors after 18:00, and a small spa with a steam room in the old cellar.", slug: "rooftop-spa" };

export default function RooftopSpaView() {
  return (
    <BaseLayout {...meta}>
  <RooftopHero />
  <PoolDay />
  <RooftopBar />
  <SpaTreatments />
  <FaqBlock title="Questions about the rooftop and spa" items={ROOFTOP_FAQ} />
  <CloseBand />
</BaseLayout>
  );
}
