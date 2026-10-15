// The hand-written content of the Home (index.html of the original prototype). The eight lines of the track come from
// collections.json; what is here was written for the Home only. " " is a no-break space that keeps the last two
// words of a line together.
import type { Image } from '../lib/types';

export const hero = {
  image: 'old-blood-campaign',
  alt: 'Three models on a palace staircase: a man in a teal cape with gold brocade flowers over a black velvet tuxedo, a woman in a blood red satin gown with a sculpted fold at the shoulder, and a woman in a black lace gown with a feathered headpiece',
  tag: 'Autumn Winter 2026',
  title: 'Eight lines',
  departments: 'Couture, shoes, accessories, fragrance',
  count: '08',
  countLabel: 'Lines this season',
};

export const manifesto = {
  label: 'The house',
  before: 'A couture house for the ones who dress ',
  accent: 'after dark.',
  after: ' Eight lines, each cut for a different tribe.',
};

/** The campaign photograph of each line on the Home track, described for this smaller frame. */
export const trackAlts: Record<string, string> = {
  'iron-court': 'Iron Court: three models in a concrete hall in silver paillettes, a silver chest plate with a camel cape, and black satin',
  'night-office': 'Night Office: four models in a theatre box in violet taffeta, bottle green velvet, a beaded coat with a magenta sash and black sequins',
  'high-rise': 'High Rise: four models on a concrete rooftop above a city at night, in a black taffeta cape, a midnight blue satin gown with a hood, a black taffeta dress with a wide collar and a quilted coat with blue lapels',
  machine: 'Machine: three models on a floor of light lines in a dark corridor, a woman in a gown covered in silver studs under a cape, a man in a studded black coat over a sheer top, and a woman in an iridescent teal strapless dress with a studded belt and long black gloves',
  'lost-paradise': 'Lost Paradise: three models in front of a ruined stone gate overgrown by rainforest, in a black satin gown with a wide hammered gold collar, a black belted coat with a gold sun disc medallion and an emerald silk gown with a gold ear disc',
  lacquer: 'Lacquer: three models in a room of deep red lacquer, a woman seated in a black satin gown with a leather corset belt, a man in a black leather blazer behind her and a woman in a red satin coat leaning on the wall',
  riot: 'Riot: three models in an old theatre, one with a tall mohawk of black feathers in a pinned tartan blazer and a black tulle skirt',
  'old-blood': 'Old Blood: three models on a palace staircase in a teal cape with gold brocade flowers, a blood red satin gown and a gown of black beaded lace',
};

/** The two rows of giant type, each repeated so the row is wider than the screen as it slides. */
export const marquee = {
  first: ['Iron Court', 'Night Office', 'High Rise', 'Machine', 'Iron Court', 'Night Office'],
  second: ['Lost Paradise', 'Lacquer', 'Riot', 'Old Blood', 'Lost Paradise', 'Lacquer', 'Riot', 'Old Blood'],
};

export interface SelectedPiece extends Image {
  name: string;
  kind: string;
  price: string;
  /** the product page, without the base path */
  page: string;
}

/** Four pieces of Iron Court, line 01. */
export const selectedPieces: SelectedPiece[] = [
  { name: 'The Court Gown', kind: 'Gown', price: 'EUR 8,900', page: 'product-iron-court-court-gown', image: 'iron-court-piece-court-gown', alt: 'The Court Gown on a black dress form: black satin with a halter neck, a draped skirt and a train lined in dark gold' },
  { name: 'The Scale Coat', kind: 'Coat', price: 'EUR 12,400', page: 'product-iron-court-scale-coat', image: 'iron-court-piece-scale-coat', alt: 'The Scale Coat on a black dress form: a floor-length coat covered in silver paillettes with a funnel collar' },
  { name: 'Plate and Cape', kind: 'Armour, cape', price: 'From EUR 6,200', page: 'product-iron-court-chest-plate', image: 'iron-court-piece-plate-and-cape', alt: 'The Chest Plate and the Camel Cape on a black dress form' },
  { name: 'The Box Bag', kind: 'Bag', price: 'EUR 3,400', page: 'product-iron-court-box-bag', image: 'iron-court-piece-box-bag', alt: 'The Box Bag on a concrete block: a structured top handle bag in black leather with steel hardware' },
];

/** Slate, the fragrance of line 01, with its three notes. */
export const fragrance = {
  image: 'slate-door',
  alt: 'A bearded man in a silver chest plate and a camel cape presses two fingers to his neck beside a half open steel door, the Slate bottle in his other hand',
  label: 'Fragrance 01, eau de parfum, 50 ml',
  name: 'Slate',
  notes: [['Top', 'Black pepper'], ['Heart', 'Cold steel'], ['Base', 'Smoked leather']] as [string, string][],
};

/** Six photographs of Iron Court; speed is how far each one drifts inside its frame as the page scrolls. */
export const lookbook: (Image & { speed: number })[] = [
  { speed: -8, image: 'iron-court-look-01-court-gown', alt: 'A woman climbs a concrete staircase in a black satin gown with a gold lined train, looking back over her shoulder' },
  { speed: 10, image: 'iron-court-look-04-grey-suit', alt: 'A man in a grey suit with a sculpted silver shoulder stands at a steel table in a concrete boardroom, a rigid briefcase beside him' },
  { speed: -14, image: 'iron-court-look-02-scale-coat', alt: 'A model in a floor-length coat of silver paillettes stands in a concrete doorway with light behind' },
  { speed: 6, image: 'iron-court-day-campaign', alt: 'Four people in tailoring walk through a concrete and glass lobby in morning light' },
  { speed: -10, image: 'iron-court-look-05-camel-coat', alt: 'A woman in a belted camel coat dress comes down concrete steps at dusk with a black top handle bag' },
  { speed: 12, image: 'iron-court-look-03-plate-and-cape', alt: 'A bearded man sits on a concrete block in a silver chest plate and a camel wool cape' },
];

/** Shop by department: each one opens where that kind of piece is. */
export const departments: { name: string; text: string; page: string; hash?: string }[] = [
  { name: 'Couture', text: 'Gowns, coats, tailoring', page: 'collections' },
  { name: 'Shoes', text: 'Boots and pumps', page: 'product-high-rise-tall-boot' },
  { name: 'Accessories', text: 'Bags, gloves, jewellery, armour', page: 'collection-lacquer', hash: '#pieces' },
  { name: 'Fragrance', text: 'Eight eaux de parfum', page: 'fragrances' },
];
