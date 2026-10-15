// The rooms hub.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageHero from '@/components/ui/PageHero';
import CloseBand from '@/components/ui/CloseBand';
import RoomList from '@/components/rooms/RoomList';
import EveryRoom from '@/components/rooms/EveryRoom';
import { ROOMS_HUB_ALT } from '@astro/data/rooms';

export const meta: PageMeta = { title: "Rooms and Suites in Palma Old Town · Can Arbós", description: "Five kinds of room in a 1600s house in Palma's old town. Courtyard Rooms start at 20 m², and the Arbós Suite has 55 m² and a terrace. Adults only, 16+.", slug: "explore-rooms" };

export default function ExploreRoomsView() {
  return (
    <BaseLayout {...meta}>
  <PageHero eyebrow="Stay" title="Rooms and suites in Palma's old town" text="Every room has its size, its windows and its view written on the card. Filter by how many of you are coming and what you want to see from the window." image="rooms/courtyard-gallery.webp" alt={ROOMS_HUB_ALT} />
  <RoomList />
  <EveryRoom />
  <CloseBand />
</BaseLayout>
  );
}
