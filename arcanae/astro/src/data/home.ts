// Home page content taken from the original prototype (src/site/index.html): the craft steps, the trust bars of the
// home and the product page, and the FAQ.
export interface CraftStep {
  number: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

export const CRAFT_INTRO =
  'Before anything is printed, each figure is designed and modelled in 3D by Arcanae Craft as an adaptation of Pamela Colman Smith’s original cards. No model is bought or downloaded.';

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: '01',
    title: 'Printed in resin',
    text: 'High-resolution 3D printing, built up layer by layer for crisp, deep detail.',
    image: 'process/craft-01-printer.webp',
    alt: 'The Emperor statue hanging from the build plate of the resin printer',
  },
  {
    number: '02',
    title: 'Cleaned & cured',
    text: 'Washed, UV-cured, then supports removed and every mark filled and sanded smooth by hand.',
    image: 'process/craft-02-cure-detail.webp',
    alt: 'The Emperor statue on the turntable of the UV cure station',
  },
  {
    number: '03',
    title: 'Finished by hand',
    text: 'Primed, washed and sealed in the spray booth: a cream primer, then white from above, a dark wash that settles in the recesses, and a matte varnish over the whole piece.',
    image: 'process/craft-03-primer.webp',
    alt: 'The Emperor statue in the spray booth, half covered in cream primer, with the airbrush',
  },
  {
    number: '04',
    title: 'Boxed & shipped',
    text: 'Packed by hand in fragile-safe, all-paper packaging, ready to travel.',
    image: 'process/craft-06-box.webp',
    alt: 'Gloved hands closing a kraft box filled with wood wool, with the fragile seal and the Arcanae Craft seal',
  },
];

export const CRAFT_NOTE = 'Each piece takes hours, and every one comes out a little different.';

/** An icon is drawn from SVG elements in a 24 by 24 box, stroked in the current colour. */
export interface TrustIcon {
  linecap?: boolean;
  shapes: ({ path: string } | { rect: { x: number; y: number; width: number; height: number; rx: number } } | { circle: { cx: number; cy: number; r: number } })[];
}

export interface TrustItem {
  title: string;
  text: string;
  icon: TrustIcon;
}

const ICON_SET: TrustIcon = {
  shapes: [{ rect: { x: 4, y: 6, width: 9, height: 13, rx: 1.2 } }, { path: 'M15 6.5l4 1.2-3 11.5-3-.8' }],
};
const ICON_BOX: TrustIcon = { shapes: [{ path: 'M12 4 4 8v8l8 4 8-4V8l-8-4Z' }, { path: 'M4 8l8 4 8-4M12 12v8' }] };

export const HOME_TRUST: TrustItem[] = [
  {
    title: '3D-printed resin',
    text: 'Painted by hand',
    icon: { shapes: [{ path: 'M12 4 4 8l8 4 8-4-8-4Z' }, { path: 'M4 12l8 4 8-4' }, { path: 'M4 16l8 4 8-4' }] },
  },
  {
    title: 'White marble finish',
    text: 'Primed, washed, sealed',
    icon: { linecap: true, shapes: [{ path: 'M12 4l7 3v4.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V7l7-3Z' }] },
  },
  { title: 'The full set', text: 'One of the 22 Major Arcana', icon: ICON_SET },
  { title: 'Ships EU & US', text: 'Fragile-safe, all-paper packaging', icon: ICON_BOX },
];

export const PRODUCT_TRUST: TrustItem[] = [
  {
    title: 'Hand-painted',
    text: 'Matte finish, painted by hand',
    icon: {
      linecap: true,
      shapes: [
        { path: 'M14.5 4.5l5 5-7.5 7.5-5-5 7.5-7.5Z' },
        { path: 'M7 12l-2.5 2.5a2.5 2.5 0 0 0 0 3.5L6 19.5a2.5 2.5 0 0 0 3.5 0L12 17' },
      ],
    },
  },
  {
    title: 'High resolution',
    text: 'Crisp, deep detail in fine resin',
    icon: { linecap: true, shapes: [{ circle: { cx: 10.5, cy: 10.5, r: 5.5 } }, { path: 'M15 15l5 5' }, { path: 'M8 10.5h5M10.5 8v5' }] },
  },
  { title: 'Collectible set', text: 'One of the 22 Major Arcana', icon: ICON_SET },
  { title: 'Ships EU & US', text: 'Fragile-safe, all-paper packaging', icon: ICON_BOX },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Will it arrive in one piece?',
    answer:
      'Each figurine is wrapped and boxed by hand in fragile-safe, all-paper packaging. If it turns up broken, write to us within 7 days of delivery with a photo of the damage and the packaging. You get a replacement or a full refund, at no cost to you.',
  },
  {
    question: 'How big is each piece?',
    answer:
      'Most figures stand 10 to 12 cm tall, about the height of a tarot card, so the collection looks even side by side. Weight depends on the design: a slender figure like The Magician weighs 115 g, and a fuller one like The Emperor weighs 246 g. Heavier figures use more resin, so they cost a little more.',
  },
  {
    question: 'What is it made of?',
    answer:
      'Solid resin, 3D-printed, then painted by hand in a white marble finish and sealed with a matte varnish. It looks like classical marble; it is resin.',
  },
  {
    question: 'Does it look like the images?',
    answer:
      'The images are 3D renders of the figures. Each piece is painted by hand, so every one comes out a little different.',
  },
  {
    question: 'How long until it arrives?',
    answer:
      'In stock: dispatched within 1 to 3 business days. Made to order: printed and painted for you, dispatched within 5 to 8 business days. Once dispatched, delivery usually takes 3 to 7 business days within the EU and 7 to 14 business days to the US. You will get a tracking link by email as soon as your order is on its way.',
  },
  {
    question: 'Will I have to pay customs duties?',
    answer:
      'Orders inside the EU carry no extra charges. For the US and other countries outside the EU, any import duties or taxes are set by the destination country and are paid by the buyer. They are not included in the price or the shipping cost.',
  },
  {
    question: 'How do I care for it?',
    answer:
      'Keep it indoors and out of direct sunlight, which can make resin brittle and change its colour over time. The matte varnish helps protect the paint from scratches and wear when the piece is handled.',
  },
];

export const STORY = {
  image: 'story/story-portrait.webp?v=3',
  alt: 'João Marcos, the maker behind Arcanae Craft, reading a tarot book on his sofa, with The Fool statue on the side table',
  lead: 'Arcanae Craft is one person in A Coruña, Spain, who prints and hand-paints the 22 Major Arcana.',
  paragraphs: [
    'It began with a tarot deck that meant something, and the wish to have those cards as real objects rather than printed paper. Each figure is modelled, printed in resin, and painted by hand.',
    'The figures are adaptations of the tarot Pamela Colman Smith illustrated in 1909. They keep her imagery, elements and symbols. Angles and poses change where a flat drawing has to become a solid piece. Her drawings still shape how most people picture the Major Arcana, and this collection is a tribute to her work.',
  ],
};
