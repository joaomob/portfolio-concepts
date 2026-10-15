// The top of a product page: the photograph of the piece, its line, name and price, the size picker (garments and
// footwear), the buy block and the facts.
import { Photo } from '../shared/Photo';
import { BuyBlock } from '../shared/BuyBlock';
import { Facts } from '../shared/Facts';
import { SizePicker } from './SizePicker';
import type { Line, Product } from '@shared/lib/types';
import { collectionPage, productPage } from '@shared/lib/catalog';
import { isTall } from '@shared/lib/photos';
import type { Chart } from '@shared/lib/sizes';
import { tie } from '@shared/lib/text';
import { href } from '@/lib/config';

export function ProductMain({ line, item, chart }: { line: Line; item: Product; chart: Chart | null }) {
  const { beauty, piece, look, dot } = item;
  const facts: [string, string][] = beauty ? beauty.facts : [['Material', item.material], ['Made in', 'Berlin, to order'], ['Ready in', 'Eight weeks']];

  // the photograph: the lipstick, the piece alone, its card, or the look drawn closer around the dot of the piece
  let photo: { image: string; alt: string };
  let frame = 'product_photo';
  let origin: string | undefined;
  if (beauty && piece) photo = piece;
  else if (item.photo) photo = item.photo;
  else if (piece) {
    photo = piece;
    if (isTall(piece.image)) frame = 'product_photo is-tall';
  } else {
    photo = look!;
    origin = `${dot!.left} ${dot!.top}`;
    frame = 'product_photo is-look';
  }
  const mainImage = (item.photo ?? piece ?? look)!.image;

  return (
    <section className="section_product">
      <div className="product_layout">
        <div className={frame}><Photo name={photo.image} data-origin={origin} fetchPriority="high" alt={photo.alt} /></div>
        <div className="product_content padding-global">
          <a href={href(collectionPage(line))} className="product_back text-style-label">{`Line ${line.number}, ${line.name}`}</a>
          <h1 className="product_name heading-style-h2">{tie(item.name)}</h1>
          <p className="product_price">{item.price}</p>
          {beauty && <p className="product_lead">{tie(beauty.body)}</p>}
          {chart && <SizePicker chart={chart} />}
          <div className="product_buy">
            <BuyBlock id={`${line.slug}-${item.id}`} name={item.name} price={item.price} image={mainImage} page={productPage(line, item.id)} />
            <p className="text-style-label product_status" data-bag-status="" aria-live="polite"></p>
          </div>
          <Facts facts={facts} />
        </div>
      </div>
    </section>
  );
}
