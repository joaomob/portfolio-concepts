// The plunge pool, and the day on the roof as a band from 9:00 to 23:00 with the hours of the pool, the rooftop and the bar.
import { img } from '@/lib/paths';
import { DAY_ROWS, DAY_TICKS, dayPercent } from '@astro/data/rooftop';

export default function PoolDay() {
  return (
    <>
<section className="pool_page_wrap u-section u-theme-light" aria-labelledby="pool-title">
  <div className="pool_page_contain u-container">
    <div className="split_block_layout">
      <img {...img("rooftop/loungers.webp", 900)} className="split_block_image is-arch" alt="A row of loungers with rolled towels under a wooden pergola, beside a narrow stone pool on the roof terrace" width="900" height="1117" loading="lazy" />
      <div className="split_block_content">
        <h2 className="split_block_title u-text-style-h2" id="pool-title">A plunge pool above the old town</h2>
        <p className="split_block_text">The pool is 6 by 3 metres and 1.4 metres deep. It's for cooling off between hours in the sun. A pergola covers half the deck from noon, and there are twelve loungers, so ask for one at breakfast in August. Towels are by the stairs.</p>
        <p className="split_block_text">After 18:00, anyone can come up to the bar. The pool is for hotel guests.</p>
      </div>
    </div>
    <div className="day_band_wrap" data-day-band="">
      <p className="eyebrow_text">The day on the roof</p>
      <div className="day_band_sky" aria-hidden="true"><span className="day_band_mark" data-day-mark=""></span></div>
      <div className="day_band_scale" aria-hidden="true">{DAY_TICKS.map((hour) => <span className="day_band_tick" data-at={dayPercent(hour)}>{hour}:00</span>)}</div>
      <ul className="day_band_list">
        {DAY_ROWS.map((row) => (
          <li className="day_band_row"><p className="day_band_name">{row.name}</p><p className="day_band_hours">{row.hours}</p><span className="day_band_track" aria-hidden="true"><span className="day_band_span" data-from={dayPercent(row.from)} data-to={dayPercent(row.to)}></span></span></li>
        ))}
      </ul>
    </div>
  </div>
</section>
    </>
  );
}
