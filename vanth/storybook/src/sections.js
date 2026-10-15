// The single list of the stories: which built page of astro/dist each group reads and which sections it shows. Pages
// of the same type share one structure, so one of each stands for the others: Riot for the collections, the
// fragrances and the products, Lacquer for the one collection with a beauty product.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

// page key: the file in astro/dist
export const pages = {
  home: 'index.html',
  collection: 'collection-riot.html',
  lacquer: 'collection-lacquer.html',
  fragrance: 'fragrance-riot.html',
  product: 'product-riot-pinned-tartan.html',
  collections: 'collections.html',
  fragrances: 'fragrances.html',
  bag: 'bag.html',
  checkout: 'checkout.html',
  notFound: '404.html',
};

// open: the section is a closed <dialog> on the page, shown open here
export const sections = {
  home: [
    { id: 'nav', name: 'Site header', selector: '.page-wrapper > .nav_component', text: 'The wordmark, the links and the bag count. Fixed on the page, over the photographs, with the difference blend.' },
    { id: 'hero', name: 'Hero', selector: 'main > .section_hero', text: 'The campaign photograph under the giant wordmark, with the season and the eight lines.' },
    { id: 'manifesto', name: 'Manifesto', selector: 'main > .section_manifesto', text: 'The statement of the house, set word by word; on the page the words light up on scroll.' },
    { id: 'lines', name: 'Lines', selector: 'main > .section_collection', text: 'The eight lines on a track; on the page it moves sideways with the scroll.' },
    { id: 'marquee', name: 'Marquee', selector: 'main > .section_marquee', text: 'Two rows of line names in giant type; on the page they run in opposite directions.' },
    { id: 'pieces', name: 'Selected pieces', selector: 'main > .section_pieces', text: 'Four pieces of one line, with the link to its collection.' },
    { id: 'fragrance', name: 'Fragrance', selector: 'main > .section_fragrance', text: 'One fragrance with its notes and the link to its page.' },
    { id: 'lookbook', name: 'Lookbook', selector: 'main > .section_lookbook', text: 'The looks of one line in a staggered grid.' },
    { id: 'departments', name: 'Departments', selector: 'main > .section_departments', text: 'The four departments as giant links.' },
    { id: 'footer', name: 'Site footer', selector: '.page-wrapper > .footer_component', text: 'The links, the credit and the wordmark.' },
  ],
  collection: [
    { id: 'hero', name: 'Hero', selector: 'main > .section_collection-hero', text: 'The campaign photograph of the line under its giant name.' },
    { id: 'intro', name: 'Intro', selector: 'main > .section_collection-intro', text: 'What the line is, in one paragraph.' },
    { id: 'look', name: 'Look', selector: 'main > .section_look', text: 'A look with the dots on its pieces; a dot opens the card of the piece on the page.' },
    { id: 'look-reverse', name: 'Look, reversed', selector: 'main > .section_look.is-reverse', text: 'The same look section with the photograph on the other side.' },
    { id: 'pieces', name: 'Pieces', selector: 'main > .section_pieces', text: 'Every piece of the line.' },
    { id: 'fragrance', name: 'Fragrance', selector: 'main > .section_collection-fragrance', text: 'The bottle of the line, its notes and the link to its page.' },
    { id: 'next', name: 'Next line', selector: 'main > .section_next', text: 'The link to the next line, with its photograph.' },
  ],
  lacquer: [
    { id: 'beauty', name: 'Beauty', selector: 'main > .section_collection-beauty', text: 'The lipstick of Lacquer, the one line with a beauty product, worn in a portrait.' },
  ],
  fragrance: [
    { id: 'hero', name: 'Hero', selector: 'main > .section_fragrance-hero', text: 'The bottle, the name and the buy block.' },
    { id: 'notes', name: 'Notes', selector: 'main > .section_fragrance-notes', text: 'The top, heart and base notes, with a second buy block.' },
    { id: 'ritual', name: 'Ritual', selector: 'main > .section_ritual', text: 'How to wear it.' },
    { id: 'facts', name: 'Facts', selector: 'main > .section_facts', text: 'Size, concentration and the other facts of the bottle.' },
    { id: 'next', name: 'Next fragrance', selector: 'main > .section_next', text: 'The link to the next fragrance.' },
  ],
  product: [
    { id: 'main', name: 'Product', selector: 'main > .section_product', text: 'The photographs, the name, the price, the sizes and the buy block.' },
    { id: 'look', name: 'Worn in', selector: 'main > .section_product-look', text: 'The look the piece is worn in.' },
    { id: 'more', name: 'More pieces', selector: 'main > .section_pieces', text: 'Four more pieces of the same line.' },
    { id: 'size-guide', name: 'Size guide', selector: '.page-wrapper > dialog.size-guide', open: true, text: 'The size guide, a native dialog opened from the sizes on the page, shown open here.' },
  ],
  collections: [
    { id: 'hero', name: 'Hero', selector: 'main > .section_list-hero', text: 'The title of the list.' },
    { id: 'list', name: 'List', selector: 'main > .section_list', text: 'A card for each of the eight lines.' },
  ],
  fragrances: [
    { id: 'list', name: 'List', selector: 'main > .section_list', text: 'A card for each of the eight fragrances.' },
  ],
  bag: [
    { id: 'shop', name: 'Bag', selector: 'main > .section_shop', text: 'The bag as the page builds it before its script runs: the lines come from the browser storage on the page.' },
  ],
  checkout: [
    { id: 'shop', name: 'Checkout', selector: 'main > .section_shop', text: 'The order form beside the summary; nothing is sent, as in the original.' },
    { id: 'thanks', name: 'Order thanks', selector: '.page-wrapper > dialog.order-thanks', open: true, text: 'The thank you dialog the checkout opens, shown open here.' },
  ],
  notFound: [
    { id: 'not-found', name: 'Not found', selector: 'main > .section_not-found', text: 'The 404 page.' },
  ],
};
