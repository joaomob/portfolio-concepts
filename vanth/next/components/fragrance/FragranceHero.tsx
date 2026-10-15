// The opening screen of a fragrance: the photograph of it in use, its name, one line about it, the price and the buy
// block, with a link down to the notes.
import { Photo } from '../shared/Photo';
import { BuyBlock } from '../shared/BuyBlock';
import type { FragranceView } from '@shared/lib/fragrance';
import { tie } from '@shared/lib/text';

export function FragranceHero({ view }: { view: FragranceView }) {
  return (
    <section className="section_fragrance-hero" data-fragrance-hero="">
      <div className={view.hero.portrait ? 'fragrance-hero_photo is-portrait' : 'fragrance-hero_photo'}><Photo name={view.hero.image} frame="hero" fetchPriority="high" alt={view.hero.alt} /></div>
      <div className="fragrance-hero_content padding-global">
        <span className="hero_tag text-style-label">{view.hero.tag}</span>
        <h1 className="fragrance-hero_title">{view.name}</h1>
        <div className="fragrance-hero_row">
          <p className="fragrance-hero_lead">{tie(view.lead)}</p>
          <div className="fragrance-hero_buy">
            <span className="fragrance-hero_price">{view.price}</span>
            <BuyBlock id={`fragrance-${view.line.slug}`} name={`${view.name}, eau de parfum`} price={view.price} image={view.bottle.image} page={view.page} />
            <a href="#notes" className="fragrance-hero_more text-style-label">See the notes</a>
          </div>
        </div>
      </div>
    </section>
  );
}
