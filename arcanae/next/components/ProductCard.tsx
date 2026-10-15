// One product card (ProductCard.astro).
// The photo box is handed to React as an HTML string: the card-loading script in the head (shared with the Astro
// build) adds the gold dot outline inside it before React hydrates, and React does not compare the inside of
// dangerouslySetInnerHTML, so that outline does not count as a hydration mismatch.
import type { Card } from '../../astro/src/data/catalog';
import { cardImage, inStock, money, stockLabel } from '../../astro/src/lib/catalog';
import { NEXT_BASE, page } from '../../astro/src/lib/site';

interface Props {
  card: Card;
  level?: 'h2' | 'h3';
  alt?: string;
  hidden?: boolean;
}

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function mediaHtml(card: Card, alt: string): string {
  const image = cardImage(card);
  const picture = image
    ? `<img class="product-card_image" src="${escape(image)}" alt="${escape(alt)}" loading="lazy">`
    : `<span class="product-card_roman">${escape(card.roman || '·')}</span>`;
  const badge = `<span class="product-card_badge${inStock(card) ? '' : ' is-made'}">${escape(stockLabel(card))}</span>`;
  return picture + badge;
}

export default function ProductCard({ card, level = 'h3', alt = card.name, hidden = false }: Props) {
  const Heading = level;
  return (
    <a className="product-card_component" href={page(NEXT_BASE, `product/${card.slug}`)} data-card={card.id} hidden={hidden}>
      <div className="product-card_media" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: mediaHtml(card, alt) }} />
      <div className="product-card_row"><Heading className="product-card_name">{card.name}</Heading><span className="product-card_price">{money(card.price)}</span></div>
      {card.height ? <p className="product-card_height">{card.height} cm tall</p> : null}
    </a>
  );
}
