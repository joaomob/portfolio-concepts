// The shape of src/data/collections.json: eight lines of the season, each with its looks, its pieces and its
// fragrance. Shared by the Astro and the Next.js builds.

/** A photograph by file name (without .webp) and its description. */
export interface Image {
  image: string;
  alt: string;
}

/** A dot over a look photograph: one piece of the look, placed in percent of the photograph. */
export interface Dot {
  id: string;
  /** what the piece is ("gown", "boot"): it picks the size chart */
  label: string;
  name: string;
  material: string;
  price: string;
  left: number;
  top: number;
  /** "#piece-NN" when the piece has a card of its own in the line, "#pieces" when it does not */
  href: string;
  /** a photograph of the piece alone, when it has no card */
  photo?: Image;
}

export interface Look extends Image {
  title: string;
  body: string;
  dots: Dot[];
}

export interface Piece extends Image {
  name: string;
  material: string;
  price: string;
  width?: number;
  height?: number;
  photo?: Image;
  /** a piece that no dot names (the Box Bag) is sold under this id */
  product?: { id: string; label: string };
  /** a photograph of the piece worn, used in place of the look photograph */
  worn?: Image;
}

export interface Note {
  name: string;
  text: string;
}

export interface Scent extends Image {
  notes: string;
  number: string;
  price: string;
  lead: string;
  // the fields below are missing on Iron Court, whose fragrance page (Slate) is written by hand
  bottle?: string;
  top?: Note;
  heart?: Note;
  base?: Note;
  use?: string;
  use_alt?: string;
  /** the indexes of the two looks shown in the ritual section */
  ritual?: number[];
}

export interface Beauty extends Image {
  id: string;
  label: string;
  name: string;
  kind: string;
  body: string;
  material: string;
  price: string;
  facts: [string, string][];
  product_image: string;
  product_alt: string;
  worn: string;
}

export interface Line {
  slug: string;
  number: string;
  name: string;
  fragrance: string;
  description?: string;
  campaign: Image & { focus?: number; focus_x?: number; width?: number; height?: number };
  meta: string;
  intro: string;
  looks: Look[];
  pieces: Piece[];
  scent: Scent;
  beauty?: Beauty;
}

/** One piece that can be bought, with what its page needs to know about where it shows in the line. */
export interface Product {
  id: string;
  name: string;
  label: string;
  material: string;
  price: string;
  /** the look whose dot names it, with its number ("01"); null for a piece with only a card */
  look: Look | null;
  lookNumber: string;
  dot: Dot | null;
  /** its card in the line, when it has one */
  piece: Image | null;
  photo?: Image;
  worn?: Image;
  beauty?: Beauty;
}
