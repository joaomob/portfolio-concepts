// The Experiences collection (experiences.json) and what the pages add.
import data from './experiences.json';

export interface Experience {
  name: string;
  slug: string;
  title: string;
  meta: string;
  heading: string;
  type: string;
  summary: string;
  text: string;
  duration: string;
  price: string;
  guide: string;
  days: string;
  button: string;
}

export const experiences: Experience[] = data.items;
export const experiencesHub = data.hub;

/** The alt of each experience photo (experiences/<slug>.webp), written looking at it. */
export const EXPERIENCE_ALT: Record<string, string> = {
  "sunset-sail": "A wooden sailing boat with its sails up on a calm bay at sunset, the cathedral on the shore behind",
  "market-morning": "A chef in a white jacket choosing fresh fish at a market stall",
  "courtyards-walk": "A stone patio with arches and a staircase seen through an open wooden street door",
  "wine-tasting": "A wooden table with four glasses of wine and an ice bucket on a terrace, beside rows of vines under grey mountains",
  "llaut-cove": "A white wooden llaüt with a short mast moored in a small cove with clear turquoise water, pines and a stone house above",
  "cathedral-terraces": "A woman looking out from a stone terrace among the flying buttresses of the cathedral, over the roofs and the bay"
};

/** The line under the booking button of an experience page. */
export const ASK = "Ask at the door or send a request from this page. We confirm within the day.";

/** A place of the paper map, with the walk from the house in minutes. */
export interface Place {
  number: number;
  name: string;
  minutes: number;
}

export const PLACES: Place[] = [
  {
    "number": 1,
    "name": "Arab Baths",
    "minutes": 7
  },
  {
    "number": 2,
    "name": "Palma Cathedral",
    "minutes": 10
  },
  {
    "number": 3,
    "name": "Plaça Major",
    "minutes": 10
  },
  {
    "number": 4,
    "name": "Almudaina Palace",
    "minutes": 10
  },
  {
    "number": 5,
    "name": "Passeig del Born",
    "minutes": 13
  },
  {
    "number": 6,
    "name": "Mercat de l'Olivar",
    "minutes": 14
  },
  {
    "number": 7,
    "name": "Parc de la Mar",
    "minutes": 14
  },
  {
    "number": 8,
    "name": "La Llotja",
    "minutes": 18
  },
  {
    "number": 9,
    "name": "Es Baluard",
    "minutes": 20
  }
];

/** Experiences that start on foot from the house: the place of the map and the heading of the walk section. */
export const WALKS: Record<string, { place: number; heading: string }> = {
  "cathedral-terraces": {
    "place": 2,
    "heading": "The walk from our door"
  },
  "market-morning": {
    "place": 6,
    "heading": "The walk from our door"
  },
  "courtyards-walk": {
    "place": 5,
    "heading": "Where the walk ends"
  }
};

/** The three experiences that follow one page: the same type first, then the others in the house's order. */
export function moreExperiences(current: Experience): Experience[] {
  const same = experiences.filter((o) => o.type === current.type && o.slug !== current.slug);
  const others = experiences.filter((o) => o.type !== current.type);
  return [...same, ...others].slice(0, 3);
}

/** The text of a page: the first sentence as the lead, the rest in two paragraphs. */
export function splitText(text: string): [lead: string, first: string, second: string] {
  const sentences = text.split(/(?<=[.?!]) (?=[A-Z])/);
  const half = 1 + Math.floor(sentences.length / 2);
  return [sentences[0], sentences.slice(1, half).join(' '), sentences.slice(half).join(' ')];
}
