// Two rows of giant type with the names of the lines, running in opposite directions at the speed of the scroll.
import { marquee } from '@shared/data/home';

const row = (names: string[]) => names.map((name) => `${name} \u00a0`).join(' ');

export function Marquee() {
  return (
    <section className="section_marquee" data-marquee="">
      <div className="marquee_row" aria-hidden="true" data-marquee-row="-1">{row(marquee.first)}</div>
      <div className="marquee_row is-outline" aria-hidden="true" data-marquee-row="1">{row(marquee.second)}</div>
    </section>
  );
}
