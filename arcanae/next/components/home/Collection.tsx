// Home collection (Collection.astro): all 22 cards rendered, the ones after the first page hidden.
import { CARDS } from '../../../astro/src/data/catalog';
import { NEXT_BASE, page } from '../../../astro/src/lib/site';
import ProductCard from '../ProductCard';
import StatusFilter from '../StatusFilter';

const PER_PAGE = 6;

export default function Collection() {
  const pages = Math.max(1, Math.ceil(CARDS.length / PER_PAGE));
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <section className="section_collection" id="collection"><div className="padding-global padding-section-large"><div className="container-large">
      <div className="section-heading_component">
        <div className="section-heading_content"><p className="text-style-eyebrow">The Collection</p><h2>The 22 Major Arcana</h2></div>
        <a className="button is-ghost" href={page(NEXT_BASE, 'collection')}>View all</a>
      </div>
      <StatusFilter />
      <div className="collection_grid" id="home-grid" data-grid="">
        {CARDS.map((card, i) => <ProductCard key={card.id} card={card} level="h3" alt={`${card.name}, a hand-painted tarot figurine`} hidden={i >= PER_PAGE} />)}
      </div>
      <nav className="pagination_component" id="pagination" aria-label="Collection pages" data-pagination="">
        <button className="pagination_button is-arrow" data-page="0" disabled aria-label="Previous">&larr;</button>
        {numbers.map((n) => <button key={n} className={`pagination_button${n === 1 ? ' is-current' : ''}`} data-page={n} aria-current={n === 1 ? 'true' : 'false'}>{n}</button>)}
        <button className="pagination_button is-arrow" data-page="2" disabled={pages === 1} aria-label="Next">&rarr;</button>
      </nav>
    </div></div></section>
  );
}
