// What a fragrance page shows, in one shape for the eight of them: seven come from collections.json, and Slate (Iron
// Court) from its hand-written content in src/data/slate.ts. Shared by both builds.
import type { Image, Line, Note } from './types';
import { collectionPage, fragrancePage } from './catalog';
import { slate } from '../data/slate';

export interface RitualItem extends Image {
  title: string;
  body: string;
}

export interface FragranceView {
  line: Line;
  /** the page, without the base path */
  page: string;
  name: string;
  title: string;
  description: string;
  /** the opening photograph: the fragrance in use, upright on the seven generated pages */
  hero: Image & { tag: string; portrait: boolean };
  lead: string;
  price: string;
  /** the photograph of the bottle, beside the notes and in the bag */
  bottle: Image;
  notes: { top: Note; heart: Note; base: Note };
  ritual: { label: string; title: string; items: RitualItem[] };
  /** what the bottle is made of */
  material: string;
  next: Image & { label: string; page: string; name: string };
}

const NBSP = ' ';

export function fragranceView(line: Line): FragranceView {
  const { scent } = line;
  const name = line.fragrance;
  const base = {
    line,
    page: fragrancePage(line),
    name,
    title: `${name}, eau de parfum of ${line.name} | Vanth`,
    lead: scent.lead,
    price: scent.price,
    bottle: { image: scent.image, alt: scent.alt },
  };
  if (line.slug === 'iron-court') {
    return {
      ...base,
      description: slate.description,
      hero: { ...slate.hero, portrait: false },
      notes: slate.notes,
      ritual: slate.ritual,
      material: slate.bottle,
      next: { ...slate.next, page: collectionPage(line), name: line.name },
    };
  }
  if (!scent.top || !scent.heart || !scent.base || !scent.use || !scent.use_alt || !scent.ritual || !scent.bottle) {
    throw new Error(`The fragrance of ${line.name} is missing fields in collections.json`);
  }
  return {
    ...base,
    description: `${name} is the eau de parfum of ${line.name} by Vanth. ${scent.notes}`,
    hero: { image: scent.use, alt: scent.use_alt, tag: `Fragrance ${scent.number}, ${line.name}`, portrait: true },
    notes: { top: scent.top, heart: scent.heart, base: scent.base },
    ritual: {
      label: line.name,
      title: `Worn with${NBSP}${name}.`,
      items: scent.ritual.map((index) => {
        const look = line.looks[index];
        return { image: look.image, alt: look.alt, title: look.title, body: look.body };
      }),
    },
    material: scent.bottle,
    next: { label: 'See the collection', page: `collection-${line.slug}`, name: line.name, image: line.campaign.image, alt: line.campaign.alt },
  };
}
