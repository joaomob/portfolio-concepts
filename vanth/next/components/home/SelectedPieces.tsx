// Four pieces of line 01, each a link to its product page.
import { PieceCard } from '../shared/PieceCard';
import { selectedPieces } from '@shared/data/home';
import { href } from '@/lib/config';

export function SelectedPieces() {
  return (
    <section id="pieces" className="section_pieces background-color-paper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="pieces_header">
              <h2 className="heading-style-h1">Selected pieces</h2>
              <a href={href('collection', '#pieces')} className="button">Shop Iron Court</a>
            </div>
            <ul className="pieces_list is-four" role="list">
              {selectedPieces.map((p) => <PieceCard key={p.name} href={href(p.page)} image={p.image} alt={p.alt} name={p.name} kind={p.kind} price={p.price} />)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
