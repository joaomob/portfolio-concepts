// A card of a piece: its photograph, name, kind and price; the whole card is a link to the product page.
import { Photo } from './Photo';

interface Props {
  href: string;
  image: string;
  alt: string;
  name: string;
  kind: string;
  price: string;
  /** the id the dots of the looks point at ("piece-01"), on the collection pages */
  id?: string;
}

export function PieceCard({ href, image, alt, name, kind, price, id }: Props) {
  return (
    <li className="piece_item" id={id}><a href={href} className="piece_link"><div className="piece_photo"><Photo name={image} frame="piece" loading="lazy" alt={alt} /></div><div className="piece_caption"><span><span className="piece_name heading-style-h5">{name}</span><span className="text-style-label">{kind}</span></span><span className="piece_price">{price}</span></div></a></li>
  );
}
