// The Offers collection. The members' offer shows closed until sign-in.
import type { Photo } from './types';

export interface Offer {
  slug: string;
  name: string;
  h1: string;
  title: string;
  meta: string;
  summary: string;
  included: string[];
  know: string;
  /** The rooms the offer applies to; empty means every room. */
  rooms: string;
  members: boolean;
  photo: Photo;
}

export const OFFERS: Offer[] = [
  {
    "slug": "three-nights",
    "name": "Three nights in the old town",
    "h1": "Three nights in the old town",
    "title": "Three Nights in the Old Town · Can Arbós, Palma",
    "meta": "Three nights at Can Arbós in Palma's old town, with dinner for two at Aljub on one evening. November to March, in any room.",
    "summary": "Stay three nights and dinner for two at Aljub is on us.",
    "included": [
      "Three nights in any room",
      "Dinner for two at Aljub, à la carte, on one evening"
    ],
    "know": "Breakfast, a drink on the roof and the concierge's map come with every direct booking. Drinks with dinner are extra. Choose the evening for your dinner after you book the room. Aljub is open Tuesday to Saturday. Valid from November to March.",
    "rooms": "",
    "members": false,
    "photo": {
      "path": "dining/aljub-night",
      "alt": "Tables with linen and candles under stone vaults, around an old cistern with an iron well head",
      "width": 1400,
      "height": 781
    }
  },
  {
    "slug": "fourth-night-free",
    "name": "Fourth night free",
    "h1": "The fourth night is free in winter",
    "title": "Fourth Night Free · Can Arbós, Palma",
    "meta": "Stay four nights at Can Arbós in Palma's old town between November and February and pay for three, with a massage for one.",
    "summary": "From November to February, the fourth night is free.",
    "included": [
      "Four nights for the price of three",
      "A 60-minute massage for one"
    ],
    "know": "Arrive on any day from Sunday to Thursday. Breakfast and a drink on the roof come with every direct booking. The rooftop pool isn't heated, and the rooftop bar stays open all winter.",
    "rooms": "Courtyard Room, Old Town Room, Junior Suite",
    "members": false,
    "photo": {
      "path": "rooftop/spa-steam-room",
      "alt": "A small steam room with stone benches under a vaulted ceiling, lit from a niche",
      "width": 900,
      "height": 1117
    }
  },
  {
    "slug": "members-rate",
    "name": "Members' rate",
    "h1": "Members' rate",
    "title": "Members' Rate · Can Arbós, Palma",
    "meta": "Members of the free Can Arbós club save 10% on every room in Palma's old town, with late checkout until 14:00 held for them.",
    "summary": "Members save 10% on every room, all year.",
    "included": [
      "10% off the room rate",
      "Late checkout until 14:00, held for you when you book",
      "A table at Aljub held for your first evening it's open"
    ],
    "know": "Sign in before you book. The rate can't be combined with other offers.",
    "rooms": "",
    "members": true,
    "photo": {
      "path": "journal/courtyard-door",
      "alt": "A stone patio with arches and a staircase seen through an open wooden street door",
      "width": 900,
      "height": 1117
    }
  }
];
