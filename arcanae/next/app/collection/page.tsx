// The whole collection (src/pages/collection.astro); ?status= category views switch in the browser.
import ProductCard from '../../components/ProductCard';
import SiteFrame from '../../components/SiteFrame';
import StatusFilter from '../../components/StatusFilter';
import { CARDS } from '../../../astro/src/data/catalog';
import { COLLECTION_META } from '../../../astro/src/data/pages';
import { pageMetadata } from '../../lib/meta';

export const metadata = pageMetadata(COLLECTION_META, 'collection');

export default function CollectionPage() {
  return (
    <SiteFrame page="collection" cards>
      <section className="section_collection" data-collection=""><div className="padding-global padding-section-large"><div className="container-large">
        <div className="section-heading_component">
          <div className="section-heading_content"><p className="text-style-eyebrow">Collectible tarot figures</p><h1 className="heading-style-h2" id="collection-title">The Collection</h1>
            <p className="section-heading_text is-small" id="collection-lead" hidden></p></div>
        </div>
        <StatusFilter />
        <div className="collection_grid" id="all-grid" data-grid="">
          {CARDS.map((card) => <ProductCard key={card.id} card={card} level="h2" alt={`${card.name}, a 3D-printed resin statue`} />)}
        </div>
      </div></div></section>
    </SiteFrame>
  );
}
