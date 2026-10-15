// Slate, the fragrance of Iron Court (line 01). Its page (fragrance.html of the original prototype) was written by
// hand, so its content lives here and not in collections.json; it is drawn by the template of the seven others.
import type { Note } from '../lib/types';

export const slate = {
  description: 'Slate is the eau de parfum of Iron Court by Vanth. Black pepper, cold steel and smoked leather, in smoked black glass with a steel cap.',
  hero: {
    image: 'slate-night',
    alt: 'Three people in couture cross a wet concrete square at night under cold street lamps: a coat of silver paillettes, a camel wool cape, and a black satin gown with a gold lined train',
    tag: 'Fragrance 01, Iron Court',
  },
  notes: {
    top: { name: 'Black pepper', text: 'Dry and sharp, in the first minute.' },
    heart: { name: 'Cold steel', text: 'A mineral, metallic accord that stays close to the skin.' },
    base: { name: 'Smoked leather', text: 'Warm and dark, until morning.' },
  } satisfies Record<'top' | 'heart' | 'base', Note>,
  ritual: {
    label: 'The ritual',
    title: 'The last thing you put on.',
    items: [
      { image: 'slate-mirror', alt: 'A woman with a short black fringe sprays perfume on her neck in front of a steel framed mirror, in a black satin gown and long gloves', title: 'The mirror', body: 'One spray on each side of the neck. The glass forgets a face, and the room keeps the scent.' },
      { image: 'slate-door', alt: 'A bearded man in a silver chest plate and a camel cape presses two fingers to his neck beside a half open steel door, the perfume bottle in his other hand', title: 'The threshold', body: 'Wait to be asked in. By then the scent has already crossed the room.' },
    ],
  },
  bottle: 'Smoked glass, steel cap',
  next: {
    label: 'See the collection',
    image: 'iron-court-day-campaign',
    alt: 'Four people in tailoring walk through a concrete and glass lobby in morning light: a grey suit with a sculpted shoulder, a camel coat dress with a black bag, a black satin suit, and a long charcoal overcoat',
  },
};
