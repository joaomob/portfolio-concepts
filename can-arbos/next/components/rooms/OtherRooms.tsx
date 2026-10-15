// The four other rooms, as cards, at the end of a room page.
import { img, page } from '@/lib/paths';
import { rooms, ROOM_PHOTOS, type Room } from '@astro/data/rooms';

export interface Props {
  current: Room;
}

export default function OtherRooms(props: Props) {
  const others = rooms.filter((room) => room.slug !== props.current.slug);
  return (
    <>
<section className="other_room_wrap u-section u-theme-light" aria-labelledby="other-title">
  <div className="other_room_contain u-container">
    <div className="other_room_head"><h2 className="other_room_title u-text-style-h2" id="other-title">Other rooms</h2><a className="link_arrow_wrap" href={page('explore-rooms')}>See all rooms</a></div>
    <ul className="other_room_list">
      {others.map((room) => (
        <li className="room_card_wrap">
          <img {...img(`rooms/${room.slug}.webp`, 900)} className="room_card_image" alt={ROOM_PHOTOS[room.slug].main} width="900" height="1117" loading="lazy" />
          <h3 className="room_card_title u-text-style-h3"><a href={page(`room-${room.slug}`)}>{room.name}</a></h3>
          <p className="room_card_facts"><span>{room.size}</span> · <span>{room.guests}</span> guests</p>
          <p className="room_card_text"><span>{room.light}</span>.</p>
        </li>
      ))}
    </ul>
  </div>
</section>
    </>
  );
}
