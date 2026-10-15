// The cards of a list page, one per line of the season. The first card is the largest thing on a phone screen, so it
// loads first; the others load as they come near.
import { Photo } from '../shared/Photo';
import { tie } from '@shared/lib/text';

export interface ListCard {
  href: string;
  image: string;
  alt: string;
  number: string;
  name: string;
  tag: string;
  meta: string;
}

export function ListGrid({ cards }: { cards: ListCard[] }) {
  return (
    <section className="section_list">
      <div className="padding-global">
        <div className="container-large">
          <ul className="list_grid" role="list">
            {cards.map((card, i) => (
              <li key={card.href} className="list_item"><a href={card.href} className="list_link"><div className="list_photo" data-list-photo=""><Photo name={card.image} frame="list" fetchPriority={i === 0 ? 'high' : undefined} loading={i === 0 ? undefined : 'lazy'} alt={card.alt} /></div><div className="list_caption"><span className="list_number" aria-hidden="true">{card.number}</span><span className="list_text"><span className="list_name heading-style-h2">{card.name}</span><span className="text-style-label">{tie(card.tag)}</span><span className="text-style-label list_meta">{tie(card.meta)}</span></span></div></a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
