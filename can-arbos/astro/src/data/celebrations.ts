// Celebrations: the three places take the three shapes of the house.

export interface Space {
  name: string;
  count: string;
  text: string;
  image: string;
  alt: string;
  shape: string;
}

export const SPACES: Space[] = [
  {
    "name": "The courtyard",
    "count": "Up to 40 guests",
    "text": "Dinner at long tables under the arches, from May to October.",
    "image": "courtyard-dusk",
    "alt": "The stone courtyard of the house at dusk, with lit lanterns, round arches, a stone staircase and a small fountain among potted trees",
    "shape": "is-arch"
  },
  {
    "name": "The roof",
    "count": "Up to 30 guests",
    "text": "A ceremony or drinks, with the pool covered for the evening.",
    "image": "roof-ceremony",
    "alt": "Two blocks of white chairs on the roof terrace at sunset, with a tiled aisle between them that leads to an arch of olive branches and white flowers, and the cathedral behind",
    "shape": "is-rectangle"
  },
  {
    "name": "Aljub",
    "count": "Up to 24 guests",
    "text": "Dinner around the old cistern, all year.",
    "image": "aljub-long-table",
    "alt": "One long table set with candles and olive branches under stone vaults, in front of the iron well head of the cistern",
    "shape": "is-circle"
  }
];
