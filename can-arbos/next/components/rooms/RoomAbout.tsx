// The room's text and a table of what the opening does not say yet (size, guests and view are in its line of facts).
import type { Room } from '@astro/data/rooms';

export interface Props {
  room: Room;
}

export default function RoomAbout(props: Props) {
  const { room } = props;
  const facts: [string, string][] = [
    ['Bed', room.bed],
    ['Bathroom', room.bathroom],
    ['Light', room.light],
    ['Rooms like this', String(room.count)],
  ];
  return (
    <>
<section className="room_page_wrap u-section u-theme-light" aria-label={`About the ${room.name}`}>
  <div className="room_page_contain u-container">
    <div className="room_page_layout">
      <p className="room_page_text u-text-style-large">{room.text}</p>
      <dl className="fact_table_wrap">
        {facts.map(([name, value]) => (
          <div className="fact_table_row"><dt className="fact_table_name">{name}</dt><dd className="fact_table_value">{value}</dd></div>
        ))}
      </dl>
    </div>
  </div>
</section>
    </>
  );
}
