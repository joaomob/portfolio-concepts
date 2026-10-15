// Catalog helpers shared by the pages, the components and the browser scripts (src/site/js/products.js and store.js
// in the original).
import { CARDS, type Card } from '../data/catalog';
import { asset } from './site';

export type StatusFilter = 'all' | 'in-stock' | 'made-to-order';

export const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'in-stock', label: 'In stock' },
  { id: 'made-to-order', label: 'Made to order' },
];

const STATUS_TEST: Record<StatusFilter, (card: Card) => boolean> = {
  all: () => true,
  'in-stock': (card) => card.status === 'available',
  'made-to-order': (card) => card.status !== 'available',
};

export const isStatusFilter = (value: unknown): value is StatusFilter =>
  typeof value === 'string' && value in STATUS_TEST;

export const matchesStatus = (card: Card, status: StatusFilter): boolean => STATUS_TEST[status](card);

export const byStatus = (status: StatusFilter): Card[] => CARDS.filter(STATUS_TEST[status]);

export const statusCount = (status: StatusFilter): number => byStatus(status).length;

export const getCard = (key: string): Card | undefined => CARDS.find((c) => c.id === key || c.slug === key);

/** Whole euros, the way the store shows prices (de-DE: "86 €"). */
export const money = (n: number): string =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const inStock = (card: Card): boolean => card.status === 'available';

export const stockLabel = (card: Card): string => (inStock(card) ? 'In stock' : 'Made to order');

export const cardImage = (card: Card): string | null => (card.image ? asset(card.image) : null);

/** The gold dot outline shown while a card photo loads (read by the card loading script in the head). */
export const maskImage = (card: Card): string => asset(`products/silhouettes/${card.slug}-mask.webp`);

export const masks = (): Record<string, string> =>
  Object.fromEntries(CARDS.filter((c) => c.image).map((c) => [c.slug, maskImage(c)]));

/** The next three arcana by number, preferring the ones that have an image. */
export const related = (card: Card, count = 3): Card[] => {
  const index = CARDS.findIndex((c) => c.id === card.id);
  const after = CARDS.map((_, i) => CARDS[(index + i + 1) % CARDS.length]).slice(0, CARDS.length - 1);
  return [...after.filter((c) => c.image), ...after.filter((c) => !c.image)].slice(0, count);
};

export interface GalleryShot {
  src: string;
  thumb: string;
  large: string;
}

/** The product gallery: the four studio renders when the card has them, otherwise its one front image. */
export const gallery = (card: Card): { shots: GalleryShot[]; renders: boolean } => {
  if (card.hasRenders) {
    const shots = [1, 2, 3, 4].map((n) => {
      const src = asset(`products/renders/${card.slug}-${n}.webp?r=2`);
      return { src, thumb: src.replace('.webp', '-t.webp'), large: src.replace('.webp', '-hd.webp') };
    });
    return { shots, renders: true };
  }
  const image = cardImage(card);
  return { shots: image ? [{ src: image, thumb: image, large: image }] : [], renders: false };
};

export const specChips = (card: Card): string[] =>
  [card.height ? `${card.height} cm tall` : null, card.weight ? `${card.weight} g` : null, 'Solid resin'].filter(
    (s): s is string => Boolean(s),
  );

const dimensions = (card: Card): string => {
  if (card.height && card.footprint) return `${card.height} × ${card.footprint.width} × ${card.footprint.depth} cm`;
  return card.height ? `${card.height} cm tall` : 'Confirmed at release';
};

export const detailRows = (card: Card): [string, string][] =>
  (
    [
      ['Material', 'Hand-painted resin'],
      ['Finish', 'White marble, matte varnish'],
      ['Dimensions (H×W×D)', dimensions(card)],
      card.weight ? ['Weight', `${card.weight} g`] : null,
      ['Collection', 'One of the 22 Major Arcana'],
      ['Made in', 'Spain'],
    ] as ([string, string] | null)[]
  ).filter((row): row is [string, string] => row !== null);

/** The meaning text with its first clause set apart, as the product page shows it. */
export const meaningParts = (card: Card): { lead: string; rest: string } => {
  const match = card.meaning.match(/^([^,]+),([\s\S]*)$/);
  return match ? { lead: match[1], rest: `,${match[2]}` } : { lead: '', rest: card.meaning };
};

export const dispatchNote = (card: Card): string =>
  inStock(card)
    ? 'Dispatched within 1 to 3 business days.'
    : 'Printed and painted for you, dispatched within 5 to 8 business days.';
