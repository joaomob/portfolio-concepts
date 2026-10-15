// One look of a line: the photograph with a dot over each piece (a dot opens the card of that piece, and the card is a
// link to its product page) beside the name and the story of the look. The looks alternate sides.
import { Fragment } from 'react';
import { Photo } from '../shared/Photo';
import type { Line, Look } from '@shared/lib/types';
import { productPageByName } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function LookSection({ line, look, index }: { line: Line; look: Look; index: number }) {
  const number = String(index + 1).padStart(2, '0');
  const dots = look.dots.map((dot) => ({
    ...dot,
    // the card opens at the outer edge of the photograph, on the side away from the dot, level with it
    side: dot.left <= 50 ? 'is-right' : 'is-left',
    cardTop: Math.min(Math.max(dot.top - 6, 4), 76),
    cardId: `piece-${line.slug}-${dot.id}`,
    page: href(productPageByName(line, dot.name)),
  }));
  return (
    <section id={`look-${number}`} className={index % 2 === 1 ? 'section_look is-reverse' : 'section_look'} data-look="">
      <div className="padding-global">
        <div className="container-large">
          <div className="look-shop_layout">
            <div className="look-shop_photo" data-look-photo="">
              <Photo name={look.image} loading="lazy" alt={look.alt} />
              {dots.map((dot) => (
                <Fragment key={dot.cardId}>
                  <a className="look-shop_dot" href={dot.page} data-left={String(dot.left)} data-top={String(dot.top)} data-dot="" data-card-id={dot.cardId} data-open="false"><span className="visually-hidden">{`${dot.name}, ${dot.price}, see the piece`}</span></a>
                  <a className={`look-shop_card ${dot.side}`} href={dot.page} id={dot.cardId} data-top={String(dot.cardTop)} tabIndex={-1} aria-hidden="true" data-card="" data-card-state="closed">
                    <span className="text-style-label">{`Look ${number}, ${dot.label}`}</span>
                    <span className="look-shop_card-name">{dot.name}</span>
                    <span className="text-style-label">{dot.material}</span>
                    <span className="look-shop_card-row"><span className="look-shop_price">{dot.price}</span><span className="look-shop_card-link text-style-label">See the piece</span></span>
                  </a>
                </Fragment>
              ))}
            </div>
            <div className="look-shop_text">
              <p className="look-shop_number" aria-hidden="true">{number}</p>
              <h2 className="heading-style-h2">{tie(look.title)}</h2>
              <p className="look-shop_body">{tie(look.body)}</p>
              {index === 0 && <p className="text-style-label look-shop_hint">Select a dot to open the&nbsp;piece</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
