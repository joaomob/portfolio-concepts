// The beauty product of a line (only Lacquer has one, its lipstick), worn in a portrait.
import { Photo } from '../shared/Photo';
import type { Line, Beauty } from '@shared/lib/types';
import { productPage } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function CollectionBeauty({ line, beauty }: { line: Line; beauty: Beauty }) {
  return (
    <section className="section_collection-beauty">
      <div className="collection-fragrance_layout is-reverse">
        <div className="collection-fragrance_photo"><Photo name={beauty.image} data-focus="50 25" loading="lazy" alt={beauty.alt} /></div>
        <div className="collection-fragrance_content padding-global">
          <p className="text-style-label">{`${beauty.kind} of ${line.name}`}</p>
          <h2 className="collection-fragrance_name">{beauty.name}</h2>
          <p className="look-shop_body">{tie(beauty.body)}</p>
          <a href={href(productPage(line, beauty.id))} className="button is-alternate">See the lipstick</a>
        </div>
      </div>
    </section>
  );
}
