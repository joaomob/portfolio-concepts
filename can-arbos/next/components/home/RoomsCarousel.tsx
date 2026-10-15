// The five room types in a track that scrolls sideways, with a rail that fills as it moves.
import Button from '@/components/ui/Button';
import { page, img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';
import { rooms, ROOM_PHOTOS } from '@astro/data/rooms';

export interface Props {
  lang: Lang;
}

export default function RoomsCarousel(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="rooms_home_wrap u-theme-light u-background-2" aria-labelledby="rooms-title" data-rooms="">
  <div className="rooms_home_contain u-container">
    <div className="rooms_home_head">
      <div className="rooms_home_intro">
        <p className="eyebrow_text">{t("Rooms")}</p>
        <h2 className="rooms_home_title u-text-style-h2" id="rooms-title">{t("Check the size and window before you book")}</h2>
      </div>
      <div className="rooms_home_aside">
        <p className="section_text_faded">{t("The Courtyard Rooms look inward and stay cool and quiet. For a balcony on the square, choose an Old Town Room.")}</p>
        <div className="u-button-wrapper">
          <Button label={t("Book a room")} modal="room-modal" />
          <Button label={t("See all rooms")} variant="secondary" href={page("explore-rooms")} />
        </div>
      </div>
    </div>
  </div>
  <div className="rooms_home_viewport">
    <ul className="rooms_home_track" data-rooms-track="">
{rooms.map((room, i) => (
      <li className="room_card_wrap">
        <img className={`room_card_image${i % 2 === 0 ? ' is-arch' : ''}`} {...img(`rooms/${room.slug}.webp`, 900)} alt={t(ROOM_PHOTOS[room.slug].main)} width="900" height="1117" loading="lazy" />
        <p className="room_card_count" data-count="">{i + 1} / {rooms.length}</p>
        <h3 className="room_card_title u-text-style-h3"><a href={page(`room-${room.slug}`)}>{t(room.name)}</a></h3>
        <p className="room_card_facts">{t(`${room.size} · ${room.guests} guests`)}</p>
        <p className="room_card_text">{t(`${room.light}.`)}</p>
      </li>
    ))}
    </ul>
  </div>
  <div className="rooms_home_foot u-container"><div className="rooms_home_rail" aria-hidden="true"><span className="rooms_home_fill" data-rooms-fill=""></span></div></div>
</section>
    </>
  );
}
