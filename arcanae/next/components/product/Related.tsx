// "You may also like" (Related.astro).
import type { Card } from '../../../astro/src/data/catalog';
import { related } from '../../../astro/src/lib/catalog';
import { NEXT_BASE, page } from '../../../astro/src/lib/site';
import ProductCard from '../ProductCard';

export default function Related({ card }: { card: Card }) {
  return (
    <section className="section_related"><div className="padding-global padding-section-large"><div className="container-large">
      <div className="section-heading_component"><div className="section-heading_content"><p className="text-style-eyebrow">More Arcana</p><h2>You may also like</h2></div>
        <a className="button is-ghost" href={page(NEXT_BASE, 'collection')}>View all</a></div>
      <div className="collection_grid is-related" id="also-grid">{related(card).map((c) => <ProductCard key={c.id} card={c} level="h3" />)}</div>
    </div></div></section>
  );
}
