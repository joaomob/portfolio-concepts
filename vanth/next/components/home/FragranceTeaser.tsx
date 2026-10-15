// Slate, the fragrance of line 01: the photograph is pinned and its three notes come in one by one.
import { Photo } from '../shared/Photo';
import { fragrance } from '@shared/data/home';
import { href } from '@/lib/config';

export function FragranceTeaser() {
  return (
    <section id="fragrance" className="section_fragrance" data-fragrance="">
      <div className="fragrance_pin">
        <div className="fragrance_photo"><Photo name={fragrance.image} loading="lazy" alt={fragrance.alt} /></div>
        <div className="fragrance_content padding-global">
          <p className="text-style-label">{fragrance.label}</p>
          <h2 className="fragrance_name">{fragrance.name}</h2>
          <ul className="fragrance_notes" role="list">
            {fragrance.notes.map(([when, note]) => <li key={when} className="fragrance_note" data-note=""><span className="text-style-label">{when}</span><span className="heading-style-h2">{note}</span></li>)}
          </ul>
          <a href={href('fragrance')} className="button is-alternate">See the fragrance</a>
        </div>
      </div>
    </section>
  );
}
