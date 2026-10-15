// Page titles and descriptions taken from the original prototype, plus the four info pages (their body text is the
// rich text of the original, kept as HTML fragments in ./legal/, where {{base}} stands for the page base).
import shipping from './legal/shipping.html?raw';
import terms from './legal/terms.html?raw';
import privacy from './legal/privacy.html?raw';
import legalNotice from './legal/legal-notice.html?raw';

export interface PageMeta {
  title: string;
  description?: string;
  /** og:title, when it differs from the default one */
  ogTitle?: string;
}

export const DEFAULT_OG_TITLE = 'Arcanae Craft · Hand-painted tarot figurines';
export const OG_DESCRIPTION = 'Resin statues of the 22 Major Arcana, painted by hand. Made in A Coruña, Spain.';

export const HOME_META: PageMeta = {
  title: 'Hand-painted Tarot Statues, 22 Major Arcana | Arcanae Craft',
  ogTitle: 'Hand-painted Tarot Statues, 22 Major Arcana | Arcanae Craft',
  description:
    'Collectible hand-painted tarot statues of the 22 Major Arcana. Resin figurines for your altar, shelf, or as a gift. Ships to the EU & US.',
};

export const COLLECTION_META: PageMeta = { title: 'The Collection · Tarot figurines & statues · Arcanae Craft' };

export const SUCCESS_META: PageMeta = { title: 'Thank you · Arcanae Craft' };

/* The category views of the collection page (?status=in-stock or made-to-order) set the heading, lead, title and
   description in the browser, as in the original. */
export const CATEGORY_VIEWS = {
  all: { h1: 'The Collection', lead: '', title: COLLECTION_META.title, meta: null },
  'in-stock': {
    h1: 'In Stock',
    lead: 'Dispatched within 1 to 3 business days. Ships from Spain.',
    title: 'Major Arcana In Stock, Ready to Ship | Arcanae Craft',
    meta: 'Major Arcana statues ready to ship from Spain within 1 to 3 business days.',
  },
  'made-to-order': {
    h1: 'Made to Order',
    lead: 'Printed and painted for you, dispatched within 5 to 8 business days.',
    title: 'Major Arcana Made to Order | Arcanae Craft',
    meta: 'Major Arcana statues printed and painted for you, dispatched within 5 to 8 business days.',
  },
} as const;

export interface InfoPage extends PageMeta {
  slug: string;
  heading: string;
  updated: string;
  body: string;
}

const UPDATED = 'Last updated: 2 September 2026';

export const INFO_PAGES: InfoPage[] = [
  {
    slug: 'shipping',
    heading: 'Shipping & Returns',
    title: 'Shipping & Returns · Arcanae Craft',
    description:
      'How Arcanae Craft ships hand-painted resin tarot figurines across the EU and US, dispatch times, and the 14-day return policy.',
    updated: UPDATED,
    body: shipping,
  },
  {
    slug: 'terms',
    heading: 'Terms of Sale',
    title: 'Terms of Sale · Arcanae Craft',
    description:
      'Terms of sale for Arcanae Craft hand-painted resin tarot figurines: orders, prices, delivery, right of withdrawal and legal guarantee.',
    updated: UPDATED,
    body: terms,
  },
  {
    slug: 'privacy',
    heading: 'Privacy Policy',
    title: 'Privacy Policy · Arcanae Craft',
    description: 'How Arcanae Craft collects, uses and protects your personal data under the GDPR.',
    updated: UPDATED,
    body: privacy,
  },
  {
    slug: 'legal-notice',
    heading: 'Legal Notice',
    title: 'Legal Notice · Arcanae Craft',
    description: 'Legal notice and ownership information for Arcanae Craft, as required by Spanish law (LSSI-CE).',
    updated: UPDATED,
    body: legalNotice,
  },
];

/** The info page body with its links pointing at the given base. */
export const infoBody = (info: InfoPage, base: string): string => info.body.replaceAll('{{base}}', base);
