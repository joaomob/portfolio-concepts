// Three photos of the room in a track that moves sideways while the page scrolls down. The bathroom comes first, since
// the photo of the bed is close to the one in the arch of the opening.
import { img } from '@/lib/paths';
import { ROOM_PHOTOS, type Room } from '@astro/data/rooms';

export interface Props {
  room: Room;
}

export default function RoomGallery(props: Props) {
  const { room } = props;
  const alt = ROOM_PHOTOS[room.slug];
  const shots = [
    { photo: `${room.slug}-bath`, alt: alt.bath, caption: 'The bathroom', width: 1200, height: 1490 },
    { photo: `${room.slug}-bed`, alt: alt.bed, caption: 'The bed and the window', width: 1200, height: 1490 },
    { photo: `${room.slug}-view`, alt: alt.view, caption: null, width: 900, height: 1117 },
  ];
  return (
    <>
<section className="room_shot_wrap u-theme-light" aria-label={`Photos of the ${room.name}`} data-rooms="">
  <div className="room_shot_viewport" data-rooms-viewport="">
    <ul className="room_shot_track" data-rooms-track="">
      {shots.map((shot, i) => (
        <li className="room_shot_item"><figure className="room_shot_figure"><img {...img(`rooms/${shot.photo}.webp`, shot.width)} className="room_shot_image" alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" /><p className="room_shot_caption">{i + 1} / {shots.length} · {shot.caption ?? <>The view: <span>{room.view}</span></>}</p></figure></li>
      ))}
    </ul>
  </div>
  <div className="room_shot_foot u-container"><div className="rooms_home_rail" aria-hidden="true"><span className="rooms_home_fill" data-rooms-fill=""></span></div></div>
</section>
    </>
  );
}
