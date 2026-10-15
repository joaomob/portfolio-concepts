// The Legal collection. Each paragraph is HTML, since some carry a link.

export interface LegalPage {
  slug: string;
  title: string;
  h1: string;
  meta: string;
  body: string[];
  updated: boolean;
}

/** The day the site went up on Webflow. */
export const UPDATED = "Updated on 4 October 2026";

export const LEGAL: LegalPage[] = [
  {
    "slug": "privacy",
    "title": "Privacy Notice · Can Arbós",
    "h1": "Privacy notice",
    "meta": "What the Can Arbós portfolio demo stores when you test its forms or create an account, which tools hold it, and how to have it deleted.",
    "body": [
      "Can Arbós is a fictional hotel, built as a portfolio project by João Marcos. Nothing you send here books a room or a table at a real place.",
      "If you test the forms or create an account, we store what you type: your name, email, and any booking or preference details. The contact and event forms and the newsletter sign-up send these details through Make to HubSpot's free CRM. Accounts live in Memberstack, in test mode. Table bookings go from Wized to Xano, where they're stored. The site runs on Webflow, translates with Weglot and filters with Jetboost.",
      "We use these details only to show how the site works. We don't sell them or use them for advertising, and the site sets no advertising cookies.",
      "Test accounts and form entries are deleted every month. To have yours deleted sooner, or to ask what we hold, write to <a href=\"mailto:hello@joaomob.com\">hello@joaomob.com</a>."
    ],
    "updated": true
  },
  {
    "slug": "legal",
    "title": "Legal Notice · Can Arbós",
    "h1": "Legal notice",
    "meta": "Can Arbós is a fictional hotel, built as a design and development portfolio project by João Marcos. Nothing on this site can be booked.",
    "body": [
      "This website is a design and development portfolio project by João Marcos. Can Arbós and Aljub are fictional. Prices, rooms and services describe an imagined hotel and can't be booked.",
      "Real places named on this site, such as Palma Cathedral and Mercat de l'Olivar, belong to their owners. Walking and driving times come from OpenStreetMap routes, <a href=\"https://www.openstreetmap.org/copyright\">© OpenStreetMap contributors</a>.",
      "Contact: <a href=\"mailto:hello@joaomob.com\">hello@joaomob.com</a>"
    ],
    "updated": false
  }
];
