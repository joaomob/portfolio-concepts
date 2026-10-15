// The opening hours and the booking rules, with the buttons to book a table or jump to the menu.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';

export default function AljubHours() {
  return (
    <>
<section className="hours_page_wrap u-section u-theme-light u-background-2" aria-labelledby="hours-title">
  <div className="hours_page_contain u-container">
    <div className="split_block_layout">
      <img {...img("dining/courtyard-tables.webp", 900)} className="split_block_image is-arch" alt="Round tables with white linen set for dinner in the courtyard, seen from the gallery above" width="900" height="1117" loading="lazy" />
      <div className="split_block_content">
        <h2 className="split_block_title u-text-style-h2" id="hours-title">Opening hours and booking</h2>
        <p className="split_block_lead u-text-style-h3">Tuesday to Saturday, 19:30 to 23:00</p>
        <p className="split_block_text">Hotel guests and members can book 60 days ahead. Everyone else, 30 days. We also keep two tables each evening for hotel guests who decide on the day. Ask at reception before 18:00. Without a booking, ask at the door after 19:30. We seat you if a table is free.</p>
        <div className="u-button-wrapper"><Button label="Book a table" modal="table-modal" /><Button label="See the menu" variant="secondary" href={"#menu"} /></div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
