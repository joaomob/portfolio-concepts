// Four more pieces of the same line. A piece with no photograph of its own shows its look, drawn closer around its dot.
import { Photo } from '../shared/Photo';
import type { Line, Product } from '@shared/lib/types';
import { collectionPage, productPage } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function MorePieces({ line, others }: { line: Line; others: Product[] }) {
  const cards = others.slice(0, 4).map((other) => {
    const own = other.photo ?? other.piece;
    return own
      ? { other, own: true, image: own.image, alt: own.alt, origin: undefined }
      : { other, own: false, image: other.look!.image, alt: other.look!.alt, origin: `${other.dot!.left} ${other.dot!.top}` };
  });
  return (
    <section className="section_pieces background-color-paper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="pieces_header">
              <h2 className="heading-style-h2">{`More from ${line.name}`}</h2>
              <a href={href(collectionPage(line))} className="button">See the collection</a>
            </div>
            <ul className="pieces_list is-four" role="list">
              {cards.map((card) => (
                <li key={card.other.id} className="piece_item"><a href={href(productPage(line, card.other.id))} className="piece_link"><div className={card.own ? 'piece_photo' : 'piece_photo is-look'}><Photo name={card.image} frame="piece" data-origin={card.origin} loading="lazy" alt={card.alt} /></div><div className="piece_caption"><span><span className="piece_name heading-style-h5">{card.other.name}</span><span className="text-style-label">{tie(card.other.material)}</span></span><span className="piece_price">{card.other.price}</span></div></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
