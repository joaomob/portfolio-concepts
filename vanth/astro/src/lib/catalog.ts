// The rules of the catalogue: which pieces of a line can be bought, in which order, and the page of each thing.
// Page addresses are returned without the base path (for example "collection-riot"), so each build adds its own.
import data from '../data/collections.json';
import type { Line, Product } from './types';

export const lines = (data as unknown as { collections: Line[] }).collections;

export const lineBySlug = (slug: string): Line => {
  const line = lines.find((l) => l.slug === slug);
  if (!line) throw new Error(`No line ${slug}`);
  return line;
};

/** The line after this one, in the order of the season (the last one leads back to the first). */
export const nextLine = (line: Line): Line => lines[(lines.indexOf(line) + 1) % lines.length];

/** Iron Court, line 01, keeps the first addresses of the site: collection and fragrance, without a suffix. */
export const collectionPage = (line: Line): string => (line.slug === 'iron-court' ? 'collection' : `collection-${line.slug}`);
export const fragrancePage = (line: Line): string => (line.slug === 'iron-court' ? 'fragrance' : `fragrance-${line.slug}`);
export const productPage = (line: Line, id: string): string => `product-${line.slug}-${id}`;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Every piece of a line that can be bought, once each, in the order it shows on the page: the pieces named by a dot
 * over a look, then the pieces that only have a card (the Box Bag), then the beauty product (the Lacquer lipstick).
 */
export function products(line: Line): Product[] {
  const found: Product[] = [];
  const seen = new Set<string>();
  line.looks.forEach((look, i) => {
    for (const dot of look.dots) {
      if (seen.has(dot.name)) continue;
      seen.add(dot.name);
      const piece = dot.href.startsWith('#piece-') ? line.pieces[Number(dot.href.slice(-2)) - 1] : null;
      found.push({
        id: dot.id, name: dot.name, label: dot.label, material: dot.material, price: dot.price,
        look, lookNumber: pad(i + 1), dot, piece,
        photo: dot.photo ?? piece?.photo, worn: piece?.worn,
      });
    }
  });
  for (const piece of line.pieces) {
    if (piece.product && !seen.has(piece.name)) {
      found.push({
        id: piece.product.id, name: piece.name, label: piece.product.label, material: piece.material, price: piece.price,
        look: null, lookNumber: '', dot: null, piece,
      });
    }
  }
  const beauty = line.beauty;
  if (beauty) {
    // its portrait is the campaign photograph; its own photograph stands in for the card
    found.push({
      id: beauty.id, name: beauty.name, label: beauty.label, material: beauty.material, price: beauty.price,
      look: null, lookNumber: '', dot: null, beauty, piece: { image: beauty.product_image, alt: beauty.product_alt },
    });
  }
  return found;
}

/** The page of a piece by its name, or "" when nothing of that name is sold. */
export function productPageByName(line: Line, name: string): string {
  const item = products(line).find((p) => p.name === name);
  return item ? productPage(line, item.id) : '';
}

/** The page a card of the pieces list leads to; a card that groups several pieces leads to the first one. */
export function piecePage(line: Line, index: number): string {
  const piece = line.pieces[index];
  const direct = productPageByName(line, piece.name);
  if (direct) return direct;
  const item = products(line).find((p) => p.piece === piece);
  return item ? productPage(line, item.id) : '';
}

/** Every product page of the season, for the static paths of both builds. */
export const allProducts = (): { line: Line; product: Product; others: Product[] }[] =>
  lines.flatMap((line) => {
    const items = products(line);
    return items.map((product) => ({ line, product, others: items.filter((o) => o !== product) }));
  });
