// The piece worn: the look photograph (or a photograph of the piece worn, when it has one) with a link to the look in
// its line. The lipstick shows the portrait of its campaign instead.
import { Photo } from '../shared/Photo';
import type { Line, Product } from '@shared/lib/types';
import { collectionPage } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function WornIn({ line, item }: { line: Line; item: Product }) {
  const { beauty, look } = item;
  const collection = collectionPage(line);
  const view = beauty
    ? { link: href(collection), image: beauty.image, alt: beauty.alt, focus: '50 25', label: 'The campaign', title: 'One shade, worn', body: beauty.worn, more: `See ${line.name}` }
    : look
      ? { link: href(collection, `#look-${item.lookNumber}`), image: (item.worn ?? look).image, alt: (item.worn ?? look).alt, focus: undefined, label: 'Worn in', title: `Look ${item.lookNumber}, ${line.name}`, body: look.body, more: 'See the look' }
      : null;
  if (!view) return null;
  return (
    <section className="section_product-look">
      <div className="padding-global">
        <div className="container-large">
          <div className="product-look_layout">
            <a href={view.link} className="product-look_photo" data-list-photo=""><Photo name={view.image} data-focus={view.focus} loading="lazy" alt={view.alt} /></a>
            <div className="product-look_text">
              <p className="text-style-label">{view.label}</p>
              <h2 className="heading-style-h3">{view.title}</h2>
              <p className="product-look_body">{tie(view.body)}</p>
              <a href={view.link} className="product_back text-style-label">{view.more}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
