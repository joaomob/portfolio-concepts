// The three notes of a fragrance beside its bottle; the photograph is pinned and the notes come in one by one.
import { Photo } from '../shared/Photo';
import { BuyBlock } from '../shared/BuyBlock';
import type { FragranceView } from '@shared/lib/fragrance';
import { tie } from '@shared/lib/text';

export function FragranceNotes({ view }: { view: FragranceView }) {
  const steps = [['Top', view.notes.top], ['Heart', view.notes.heart], ['Base', view.notes.base]] as const;
  return (
    <section id="notes" className="section_fragrance-notes" data-notes="">
      <div className="fragrance-notes_pin">
        <div className="fragrance-notes_photo"><Photo name={view.bottle.image} loading="lazy" alt={view.bottle.alt} /></div>
        <div className="fragrance-notes_content padding-global">
          <p className="text-style-label">Eau de parfum, 50&nbsp;ml</p>
          <h2 className="heading-style-h1">Three notes</h2>
          <ul className="fragrance-notes_list" role="list">
            {steps.map(([step, note]) => <li key={step} className="fragrance-notes_item" data-note=""><span className="fragrance-notes_step text-style-label">{step}</span><span className="heading-style-h2">{note.name}</span><span className="fragrance-notes_text">{tie(note.text)}</span></li>)}
          </ul>
          <div className="fragrance-notes_buy">
            <span className="fragrance-hero_price">{view.price}</span>
            <BuyBlock id={`fragrance-${view.line.slug}`} name={`${view.name}, eau de parfum`} price={view.price} image={view.bottle.image} page={view.page} />
          </div>
        </div>
      </div>
    </section>
  );
}
