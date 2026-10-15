// Celebrations: small weddings and private dinners, the three places and the request form.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import CelebrationsHero from '@/components/celebrations/CelebrationsHero';
import SpaceList from '@/components/celebrations/SpaceList';
import CelebrationsCare from '@/components/celebrations/CelebrationsCare';
import EventForm from '@/components/celebrations/EventForm';
import CloseBand from '@/components/ui/CloseBand';

export const meta: PageMeta = { title: "Intimate Wedding Venue in Palma · Can Arbós", description: "Small weddings and private dinners in a 1600s house in Palma's old town. Up to 40 guests in the courtyard, 30 on the roof, and all 21 rooms.", slug: "celebrations" };

export default function CelebrationsView() {
  return (
    <BaseLayout {...meta}>
  <CelebrationsHero />
  <SpaceList />
  <CelebrationsCare />
  <EventForm />
  <CloseBand />
</BaseLayout>
  );
}
