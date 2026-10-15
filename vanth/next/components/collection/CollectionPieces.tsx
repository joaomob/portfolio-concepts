// The pieces of a line, each a card that leads to its product page. A garment photographed full length (twice as tall
// as wide) sets the list to tall frames, and a shorter photograph in a tall list is contained in its frame.
import { Photo } from '../shared/Photo';
import type { Line } from '@shared/lib/types';
import { piecePage } from '@shared/lib/catalog';
import { isTall } from '@shared/lib/photos';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function CollectionPieces({ line }: { line: Line }) {
  // four pieces or more: the rule .pieces_list:has(> :nth-child(4)) counts them, so there is no class per line
  const tall = line.pieces.some((piece) => isTall(piece.image));
  return (
    <section id="pieces" className="section_pieces background-color-paper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="pieces_header">
              <h2 className="heading-style-h1">The pieces</h2>
              <p className="text-style-label">Made to order in Berlin, eight weeks</p>
            </div>
            <ul className={tall ? 'pieces_list is-tall' : 'pieces_list'} role="list">
              {line.pieces.map((piece, i) => (
                <li key={i} className="piece_item" id={`piece-${String(i + 1).padStart(2, '0')}`}><a href={href(piecePage(line, i))} className="piece_link"><div className={isTall(piece.image) ? 'piece_photo' : 'piece_photo is-contained'}><Photo name={piece.image} frame="piece" loading="lazy" alt={piece.alt} /></div><div className="piece_caption"><span><span className="piece_name heading-style-h5">{piece.name}</span><span className="text-style-label">{tie(piece.material)}</span></span><span className="piece_price">{piece.price}</span></div></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
