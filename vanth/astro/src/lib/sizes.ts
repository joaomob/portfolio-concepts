// The size charts of the house. Every piece is cut in European sizes; the picker shows each size in the system the
// visitor picks and the guide gives the body measurements of each size, in centimetres or inches.

export const SYSTEMS = [['eu', 'EU'], ['fr', 'FR'], ['it', 'IT'], ['uk', 'UK'], ['us', 'US'], ['jp', 'JP']] as const;
export type System = (typeof SYSTEMS)[number][0];

export interface Chart {
  /** the European sizes, the value sent to the bag */
  sizes: string[];
  /** the same sizes in each of the other systems */
  others: Record<Exclude<System, 'eu'>, string[]>;
  measures: [string, number[]][];
  note: string;
}

const CLOTHING: Chart = {
  sizes: ['36', '38', '40', '42'],
  others: { fr: ['38', '40', '42', '44'], it: ['42', '44', '46', '48'], uk: ['10', '12', '14', '16'], us: ['6', '8', '10', '12'], jp: ['9', '11', '13', '15'] },
  measures: [['Bust', [84, 88, 92, 96]], ['Waist', [66, 70, 74, 78]], ['Hips', [92, 96, 100, 104]]],
  note: 'Measured on the body. Each piece is made to order, and the atelier adjusts it to your measurements at no charge.',
};

const FOOTWEAR: Chart = {
  sizes: ['37', '38', '39', '40'],
  others: { fr: ['38', '39', '40', '41'], it: ['37', '38', '39', '40'], uk: ['4.5', '5.5', '6', '7'], us: ['6.5', '7.5', '8', '9'], jp: ['23.5', '24', '24.5', '25.5'] },
  measures: [['Foot', [23.5, 24, 24.5, 25.5]]],
  note: 'Measured from the heel to the longest toe, standing.',
};

const GARMENTS = ['gown', 'coat', 'suit', 'dress', 'cape', 'blazer', 'jacket', 'skirt', 'tuxedo', 'top'];
const FOOTWEAR_LABELS = ['boot', 'shoe'];

/** The chart of a piece by what it is, or null for a piece in one size (a bag, a glove, a necklace). */
export function chartFor(label: string): Chart | null {
  if (GARMENTS.includes(label)) return CLOTHING;
  if (FOOTWEAR_LABELS.includes(label)) return FOOTWEAR;
  return null;
}

/** One size in every system: { eu: '38', fr: '40', ... }. */
export function bySystem(chart: Chart, i: number): Record<System, string> {
  return { eu: chart.sizes[i], fr: chart.others.fr[i], it: chart.others.it[i], uk: chart.others.uk[i], us: chart.others.us[i], jp: chart.others.jp[i] };
}
