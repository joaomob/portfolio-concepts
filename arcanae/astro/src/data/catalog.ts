// The catalog of the 22 Major Arcana, taken from the original prototype (src/site/js/products.js).
// products.json holds one record per card: price in EUR, height in cm and weight in g as measured on the piece (null
// when not measured yet), image relative to /concepts/arcanae/assets/, and hasRenders for the cards whose gallery
// shows the four studio renders of the print file.
import products from './products.json';

export type Status = 'available' | 'soon';

export interface Correspondences {
  element: string;
  astrology: string;
  energy: string;
  forWhom: string;
  keywords: string[];
}

export interface Card {
  id: string;
  roman: string;
  slug: string;
  name: string;
  price: number;
  status: Status;
  height: number | null;
  weight: number | null;
  image: string | null;
  hasRenders: boolean;
  footprint: { width: number; depth: number } | null;
  correspondences: Correspondences | null;
  blurb: string;
  meaning: string;
}

export const CARDS = products as Card[];

/* what every piece includes */
export const INCLUDES = [
  'One hand-painted resin figurine of the Major Arcana',
  'Primed & washed by hand',
  'Sealed with a matte varnish',
  'One of the 22-piece Major Arcana collection',
];

/* one finish only, so the product page shows a static line and no choice */
export const FINISH = { id: 'white', label: 'White marble', note: 'Matte · hand-painted' } as const;

export const USES =
  'Each Arcanum carries a meaning, and keeping one close is a quiet way to hold onto it. Set it on a shelf, an altar, or a desk, where it holds the energy you want nearby. Choose the card that speaks to where you are, or give one as a gift that actually means something.';

export const ARTWORK =
  'Adapted in 3D from the tarot illustrated by Pamela Colman Smith and published in 1909. The figure keeps the card’s imagery and symbols, with angles and poses reworked for sculpture. Where her monogram appears on the piece, it stays, as credit to the artist.';
