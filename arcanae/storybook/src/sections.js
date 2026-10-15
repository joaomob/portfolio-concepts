// The single list of the stories: which built page each group reads and which sections it shows. The 22 product
// pages and the 4 info pages share one structure, so one of each (The Fool, Shipping) stands for them.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

// page key: the file in astro/dist
export const pages = {
  home: 'index.html',
  collection: 'collection.html',
  product: 'product/the-fool.html',
  info: 'shipping.html',
  success: 'success.html',
};

export const sections = {
  home: [
    { id: 'nav', name: 'Site header', selector: '.page-wrapper > .nav_component', text: 'Logo, the four section links, the cart button and the menu toggle (opens on small screens).' },
    { id: 'hero', name: 'Hero', selector: 'main > .section_hero', text: 'The dark opener with the title and the call to the collection. The 3D statue is drawn by the page script, which does not run here.' },
    { id: 'collection', name: 'Collection', selector: 'main > .section_collection', text: 'Status tabs, the first six cards and the pagination.' },
    { id: 'craft', name: 'Craft', selector: 'main > .section_craft', text: 'The four steps of how each piece is made.' },
    { id: 'trust', name: 'Trust band', selector: 'main > .section_trust', text: 'Four reassurance items with icons.' },
    { id: 'plate', name: 'Detail plate', selector: 'main > .section_plate', text: 'A full width detail render of The Fool.' },
    { id: 'story', name: 'Story', selector: 'main > .section_story', text: 'The person behind the shop, photo beside the text.' },
    { id: 'faq', name: 'Questions', selector: 'main > .section_faq', text: 'The first question open; one open at a time on the page.' },
    { id: 'wheel', name: 'Wheel', selector: 'main > .section_wheel', text: 'Every statue once around a circle, turned on scroll on the page.' },
    { id: 'newsletter', name: 'Newsletter', selector: 'main > .section_newsletter', text: 'The sign up form.' },
    { id: 'footer', name: 'Footer', selector: '.page-wrapper > .footer_component', text: 'Brand column, links, copyright and the logo band.' },
  ],
  collection: [
    { id: 'grid', name: 'All products', selector: 'main > .section_collection', text: 'The page title, the status tabs and all 22 cards.' },
  ],
  product: [
    { id: 'product', name: 'Product', selector: 'main > .section_product', text: 'Gallery with thumbnails and correspondences beside the price, the finish, the add to cart button and the details.' },
    { id: 'trust', name: 'Trust row', selector: 'main > .section_trust', text: 'Four reassurance items for the product.' },
    { id: 'related', name: 'Related', selector: 'main > .section_related', text: 'Three more arcana.' },
  ],
  info: [
    { id: 'legal', name: 'Info text', selector: 'main > .section_legal', text: 'Eyebrow, heading, date and the rich text of an info page.' },
  ],
  success: [
    { id: 'success', name: 'Thank you', selector: 'main > .section_success', text: 'The page after a paid checkout, without menu or footer.' },
  ],
};
