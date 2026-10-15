// The fragrance of a line: its bottle, its notes in one sentence and a link to its page.
import { Photo } from '../shared/Photo';
import type { Line } from '@shared/lib/types';
import { fragrancePage } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function CollectionFragrance({ line }: { line: Line }) {
  return (
    <section className="section_collection-fragrance">
      <div className="collection-fragrance_layout">
        <div className="collection-fragrance_photo"><Photo name={line.scent.image} loading="lazy" alt={line.scent.alt} /></div>
        <div className="collection-fragrance_content padding-global">
          <p className="text-style-label">{`The fragrance of ${line.name}`}</p>
          <h2 className="collection-fragrance_name">{line.fragrance}</h2>
          <p className="look-shop_body">{tie(line.scent.notes)}</p>
          <a href={href(fragrancePage(line))} className="button is-alternate">See the fragrance</a>
        </div>
      </div>
    </section>
  );
}
