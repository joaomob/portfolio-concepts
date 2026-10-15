// Aljub: the Dishes collection (dishes.json) and the rest of its page.
import data from './dishes.json';
import type { FaqItem } from './types';

export interface Dish {
  order: number;
  name: string;
  description: string;
  price: number;
  course: string;
  diets: string[];
  allergens: string[];
}

export const dishes: Dish[] = data.items;
export const dishesPage = data.page;

export const dishByName = (name: string) => dishes.find((d) => d.name === name)!;
export const dishByOrder = (order: number) => dishes.find((d) => d.order === order)!;

export const COURSES: { key: string; label: string }[] = [
  {
    "key": "snack",
    "label": "Snacks"
  },
  {
    "key": "starter",
    "label": "Starters"
  },
  {
    "key": "main",
    "label": "Mains"
  },
  {
    "key": "dessert",
    "label": "Desserts"
  }
];

/** Four dishes in a round photo, one from each course, above the menu. */
export const FEATURED_DISHES: { order: number; photo: string; alt: string }[] = [
  {
    "order": 3,
    "photo": "dish-sobrassada.webp",
    "alt": "Three slices of toast with sobrassada, shavings of Mahón cheese and honey on a pale ceramic plate, seen from above on a sandstone table"
  },
  {
    "order": 5,
    "photo": "dish-prawns.webp",
    "alt": "Four grilled red prawns with sea salt, olive oil and half a grilled lemon on a pale ceramic plate, seen from above on a sandstone table"
  },
  {
    "order": 8,
    "photo": "dish-arros-brut.webp",
    "alt": "Soupy rice with rabbit, pork, green beans and artichokes in a wide pale bowl, seen from above on a sandstone table"
  },
  {
    "order": 10,
    "photo": "dish-gato.webp",
    "alt": "A slice of almond cake dusted with icing sugar, a scoop of almond ice cream and toasted almond slivers on a pale ceramic plate, seen from above on a sandstone table"
  }
];

/** The seven courses of the tasting menu. */
export const TASTING_COURSES: string[] = [
  "Cracked olives and coca de trempó",
  "Sobrassada on toast",
  "Red prawn from Sóller",
  "Frit mallorquí",
  "Black pig loin with cabbage",
  "Gató with almond ice cream",
  "Ensaïmada with cream"
];

export const ALJUB_FAQ: FaqItem[] = [
  {
    "question": "Can we eat at Aljub if we're not staying at Can Arbós?",
    "answer": "Yes. Anyone can book up to 30 days ahead. Without a booking, ask at the door after 19:30. We seat you if a table is free."
  },
  {
    "question": "Do we have to order the tasting menu?",
    "answer": "No. You can order à la carte, even a single dish."
  },
  {
    "question": "How do we cancel a table?",
    "answer": "Use the link in your booking email. Please cancel at least 24 hours before, so we can offer the table to someone else. Members can also cancel in My stay."
  }
];

/** The three dishes the Home shows. */
export const HOME_DISHES = ['Red prawns from Sóller', 'Black pig loin with cabbage', 'Tasting menu'];

/** The diets of the menu filter and of the members' preferences. */
export const DIETS: string[] = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free"
];
