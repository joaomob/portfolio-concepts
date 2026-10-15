// The rooms hub: filters by guests and view, then one row per room. On hover and focus the photo of the room gives way
// to the view from its window.
import Button from '@/components/ui/Button';
import SaveButton from '@/components/ui/SaveButton';
import { img, page } from '@/lib/paths';
import { rooms, ROOM_PHOTOS, ROOM_SUMMARY } from '@astro/data/rooms';

export default function RoomList() {
  const GUESTS = ['2', '3', '4'];
  const VIEWS = ['Courtyard', 'Square', 'Rooftops'];
  return (
    <>
<section className="room_list_wrap u-section u-theme-light" aria-label="Rooms">
  <div className="room_list_contain u-container">
    <form className="filter_bar_wrap" data-filter-list="rooms-list" aria-label="Filter rooms">
      <fieldset className="filter_group"><legend className="field_label">Guests</legend>
        <label className="filter_chip"><input type="radio" name="guests" value="" defaultChecked /> Any</label>
        {GUESTS.map((value) => <label className="filter_chip"><input type="radio" name="guests" value={value} /> {value}</label>)}
      </fieldset>
      <fieldset className="filter_group"><legend className="field_label">View</legend>
        <label className="filter_chip"><input type="radio" name="view" value="" defaultChecked /> Any</label>
        {VIEWS.map((value) => <label className="filter_chip"><input type="radio" name="view" value={value} /> {value}</label>)}
      </fieldset>
    </form>
    <p className="filter_empty" data-filter-empty="" data-visible="false">No room matches both filters. Clear one to see more.</p>
    <ul className="room_list_rows" id="rooms-list">
      {rooms.map((room, i) => {
        const summary = ROOM_SUMMARY[room.slug];
        const href = page(`room-${room.slug}`);
        return (
          <li className={`room_list_item${i % 2 ? ' is-reverse' : ''}`} data-filter-guests={room.guests} data-filter-view={room.view_filter}>
            <a className={`room_list_media${i % 2 ? '' : ' is-arch'}`} href={href} aria-label={`${room.name}: see the room`}>
              <img {...img(`rooms/${room.slug}.webp`, 900)} className="room_list_image" alt={ROOM_PHOTOS[room.slug].main} width="900" height="1117" loading="lazy" />
              <img {...img(`rooms/${room.slug}-view.webp`, 900)} className="room_list_image is-view" alt={ROOM_PHOTOS[room.slug].view} width="900" height="1117" loading="lazy" />
            </a>
            <div className="room_list_content">
              <h2 className="room_list_title u-text-style-h2">{room.name}</h2>
              <p className="room_list_text">{summary.light ? `${summary.line} ${summary.light}` : summary.line}</p>
              <dl className="room_list_facts"><div className="room_list_fact"><dt className="room_list_label">Size</dt><dd className="room_list_value">{room.size}</dd></div><div className="room_list_fact"><dt className="room_list_label">Guests</dt><dd className="room_list_value">{room.guests}</dd></div><div className="room_list_fact"><dt className="room_list_label">View</dt><dd className="room_list_value">{room.view}</dd></div></dl>
              <div className="u-button-wrapper"><Button label="Book this room" modal="room-modal" data-room-type={room.name} /><Button label="See the room" href={href} variant="secondary" /><SaveButton kind="room" item={room.slug} name={room.name} /></div>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
</section>
    </>
  );
}
