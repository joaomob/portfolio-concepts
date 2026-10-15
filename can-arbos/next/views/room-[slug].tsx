// One page per room of the Rooms collection.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import SaveButton from '@/components/ui/SaveButton';
import CloseBand from '@/components/ui/CloseBand';
import RoomAbout from '@/components/rooms/RoomAbout';
import RoomGallery from '@/components/rooms/RoomGallery';
import EveryRoom from '@/components/rooms/EveryRoom';
import OtherRooms from '@/components/rooms/OtherRooms';
import { page } from '@/lib/paths';
import { rooms, ROOM_PHOTOS, ROOM_SUMMARY, type Room } from '@astro/data/rooms';

export const roomMeta = (room: Room): PageMeta => ({ title: room.title, description: room.meta, slug: `room-${room.slug}` });

export default function RoomSlugView({ room }: { room: Room }) {
  return (
    <BaseLayout {...roomMeta(room)}>
  <PageHero title={room.name} text={ROOM_SUMMARY[room.slug].line} image={`rooms/${room.slug}.webp`} alt={ROOM_PHOTOS[room.slug].main} eyebrowSlot={<a href={page('explore-rooms')}>Rooms</a>}>
    <ul className="fact_line_list"><li>{room.size}</li><li><span>{room.guests}</span> guests</li><li>View: <span>{room.view}</span></li></ul><div className="u-button-wrapper"><Button label="Book this room" modal="room-modal" data-room-type={room.name} /><SaveButton kind="room" item={room.slug} name={room.name} /></div><p className="page_hero_note">Free cancellation up to 7 days before arrival.</p>
  </PageHero>
  <RoomAbout room={room} />
  <RoomGallery room={room} />
  <EveryRoom />
  <OtherRooms current={room} />
  <CloseBand />
</BaseLayout>
  );
}
