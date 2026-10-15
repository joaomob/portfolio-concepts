// What every room has, on the rooms hub and on each room page.
import { EVERY_ROOM } from '@astro/data/rooms';

export default function EveryRoom() {
  return (
    <>
<section className="every_room_wrap u-section u-theme-light u-background-2" aria-labelledby="every-title">
  <div className="every_room_contain u-container">
    <div className="every_room_layout">
      <h2 className="every_room_title u-text-style-h2" id="every-title">In every room</h2>
      <ul className="every_room_list">{EVERY_ROOM.map((item) => <li className="every_room_item">{item}</li>)}</ul>
    </div>
  </div>
</section>
    </>
  );
}
