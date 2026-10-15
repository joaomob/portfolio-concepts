// The Journal collection, three guides by Aina Ferrer, the concierge. In Webflow the body is two Rich Text fields around the photo; here each block keeps its kind.

/** A block of the body: a heading, a paragraph, a paragraph with a link (raw HTML) or the photo. */
export type GuideBlock =
  | { kind: 'h' | 'p' | 'raw'; text: string }
  | { kind: 'img'; path: string; alt: string; shape: string };

export type GuidePhoto = Extract<GuideBlock, { kind: 'img' }>;

export interface Guide {
  slug: string;
  title: string;
  meta: string;
  h1: string;
  summary: string;
  cover: { path: string; alt: string; height: number };
  /** The experience the guide ends on. */
  end: { slug: string; label: string };
  /** The guide of things to do carries the paper map with the nine places. */
  map: boolean;
  body: GuideBlock[];
}

export const AUTHOR = 'By Aina Ferrer, concierge';

export const GUIDES: Guide[] = [
  {
    "slug": "things-to-do-palma-old-town",
    "title": "Things to Do in Palma Old Town · Can Arbós",
    "meta": "Things to do in Palma old town, with real walking times from La Calatrava. The cathedral is 10 minutes away, the Arab Baths 7 and Es Baluard 20.",
    "h1": "Things to do in Palma's old town, with walking times",
    "summary": "Nine places within 20 minutes on foot, ordered by walking time, with the hours that matter.",
    "cover": {
      "path": "journal/cathedral-terraces",
      "alt": "A woman looking out from a stone terrace among the flying buttresses of the cathedral, over the roofs and the bay",
      "height": 1241
    },
    "end": {
      "slug": "courtyards-walk",
      "label": "Old town courtyards walk"
    },
    "map": true,
    "body": [
      {
        "kind": "p",
        "text": "I'm Aina, the concierge at Can Arbós. Guests ask me what to see almost every morning, so here's my answer on one page. Every time below is the walk from our door in La Calatrava. We measured each route on a map and rounded it up. On the stone streets, you'll probably walk a little slower than the map."
      },
      {
        "kind": "h",
        "text": "Seven minutes: the Arab Baths"
      },
      {
        "kind": "p",
        "text": "Start small. The baths sit in the garden of Can Pit, on Carrer de Can Serra. Their central room has a ring of columns, and it was the hot bath of a private house. A warm room and a second hot room survive beside it. I like them first thing in the morning."
      },
      {
        "kind": "h",
        "text": "Ten minutes: the cathedral, the Almudaina and Plaça Major"
      },
      {
        "kind": "p",
        "text": "Three places are ten minutes away. The cathedral dates from the 13th century, and its nave is about 44 metres high. Inside, look for the canopy by Gaudí and the ceramic mural by Miquel Barceló, which is 12 metres tall. April to October, it opens 10:00 to 17:15 on weekdays and until 14:15 on Saturday. Tourist visits stop on Sundays."
      },
      {
        "kind": "p",
        "text": "The Almudaina Palace is next door. It began as a Roman building, and the Moors later rebuilt it. Today it's one of the residences of the Spanish royal family. You can visit the parade ground, the Gothic chapel of Santa Anna, the Islamic baths and the terraces over the bay."
      },
      {
        "kind": "p",
        "text": "Plaça Major is the same distance to the north. I use it as a meeting point when friends get lost."
      },
      {
        "kind": "h",
        "text": "Thirteen and fourteen minutes: the Born, the market and the park"
      },
      {
        "kind": "p",
        "text": "On Passeig del Born, look into the courtyard of Casal Solleric. The Morell family built the house in the middle of the 18th century, and it now shows contemporary art."
      },
      {
        "kind": "p",
        "text": "Mercat de l'Olivar has fed Palma since 1951. Go before lunch, when the stalls are full. The tapas counters serve until 16:00, and some restaurants upstairs will cook what you buy downstairs. The market closes on Sundays."
      },
      {
        "kind": "p",
        "text": "Parc de la Mar lies below the cathedral, by the old sea walls. The cathedral is reflected in its water. I take friends there at the end of the day."
      },
      {
        "kind": "img",
        "path": "journal/courtyard-door",
        "alt": "A stone patio with arches and a staircase seen through an open wooden street door",
        "shape": "is-arch"
      },
      {
        "kind": "h",
        "text": "Eighteen and twenty minutes: La Llotja and Es Baluard"
      },
      {
        "kind": "p",
        "text": "La Llotja was the meeting place of Palma's merchants. Guillem Sagrera designed it, and its columns rise like stone palm trees into the vaults. The streets around it have plenty of places to eat."
      },
      {
        "kind": "p",
        "text": "Es Baluard is the museum of modern and contemporary art, built into the old city walls. It opened in 2004. The collection has more than 700 works, with Miró and Picasso among them."
      },
      {
        "kind": "h",
        "text": "If you only have one day in Palma"
      },
      {
        "kind": "p",
        "text": "See the Arab Baths at 10:00 and the cathedral at 11:00. Eat lunch at the market. After the heat, walk the Born and finish at Es Baluard. On a Sunday, the cathedral and the market are closed to visitors, so walk to Parc de la Mar and along the Born instead."
      },
      {
        "kind": "h",
        "text": "Two things I book for you"
      },
      {
        "kind": "p",
        "text": "The cathedral terraces need a time slot, so tell me the day before. And three mornings a week, I walk guests through the courtyards of the old town myself. Ask me at the door, or book the walk from My stay."
      }
    ]
  },
  {
    "slug": "palma-in-winter",
    "title": "Palma in Winter, Weather and What's Open · Can Arbós",
    "meta": "Palma in winter, by our concierge. Highs of 15 to 17°C, about six rainy days a month, the Sant Sebastià bonfires and what changes in the old town.",
    "h1": "Palma in winter, from someone who stays all year",
    "summary": "The weather, the shorter hours, the January festival and the almond trees, for a stay between December and February.",
    "cover": {
      "path": "journal/courtyard-morning",
      "alt": "The courtyard seen from the first-floor gallery, with green shutters on the sandstone walls and potted plants around the fountain",
      "height": 1250
    },
    "end": {
      "slug": "courtyards-walk",
      "label": "Old town courtyards walk"
    },
    "map": false,
    "body": [
      {
        "kind": "p",
        "text": "Most of our guests come between May and October. I like the city better in January. Here's what to expect if you come between December and February."
      },
      {
        "kind": "h",
        "text": "Palma weather in winter"
      },
      {
        "kind": "p",
        "text": "Spain's weather agency keeps averages for 1981 to 2010 at its station in Palma's port. In January, the average high is 15.4°C and the average low is 8.3°C. December is a little warmer, with an average high of 16.5°C. Each winter month has about six days of rain. January gets 167 hours of sun. Pack a coat for the evenings and sunglasses for lunch outside."
      },
      {
        "kind": "h",
        "text": "What changes in the old town"
      },
      {
        "kind": "p",
        "text": "The cathedral keeps shorter hours. In winter it opens at 10:00 and closes at 15:15 on weekdays, earlier on Saturday. Tourist visits stop on Sundays. The terraces on its roof close December to March, so the climb waits for spring. Mercat de l'Olivar keeps its usual days, Monday to Saturday from 7:00."
      },
      {
        "kind": "p",
        "text": "At Can Arbós, Aljub moves indoors November to April. You eat around the old cistern of the house, under the vaults."
      },
      {
        "kind": "img",
        "path": "journal/aljub-vaults",
        "alt": "Tables with linen and candles under stone vaults, around an old cistern with an iron well head",
        "shape": ""
      },
      {
        "kind": "h",
        "text": "Sant Sebastià, 19 and 20 January"
      },
      {
        "kind": "p",
        "text": "Sant Sebastià is the patron saint of Palma, and his day is 20 January. The big night is the 19th. People light bonfires in the squares, called foguerons, and grill meat over them. The grills have their own name, torradoras. There are concerts, giant costumed heads and xeremiers, who play the xeremia, our island bagpipe. Look out for the Drac de na Coca. The story says this dragon, shaped like a crocodile, ran through Palma in the 17th century. Its body is still in the Museum of Religious Art."
      },
      {
        "kind": "h",
        "text": "Almond blossom"
      },
      {
        "kind": "p",
        "text": "The almond trees on the island start to flower in late December, and the groves stay white until March. You won't see them in the old town. Bunyola is about 25 minutes away by car, and Selva about 35. Son Servera holds an almond blossom fair in late January and early February. Ask us for a driver the evening before."
      },
      {
        "kind": "h",
        "text": "Christmas Eve"
      },
      {
        "kind": "p",
        "text": "On the night of 24 December, Mallorca sings the Chant of the Sibyl. It's a medieval chant, and UNESCO lists it as Intangible Cultural Heritage. Ask me where to hear it, and go early for a seat."
      },
      {
        "kind": "h",
        "text": "What we do with you in winter"
      },
      {
        "kind": "p",
        "text": "The courtyards walk runs all year for hotel guests, on Tuesday, Thursday and Saturday. The cooking class with our chef and the winery in Binissalem run all year too. The boats rest until spring. The sunset sail starts again in April, and the llaüt in May."
      },
      {
        "kind": "raw",
        "text": "Staying four nights? <a href=\"offer-fourth-night-free.html\">In winter the fourth night is free.</a>"
      },
      {
        "kind": "p",
        "text": "On your first evening, I'll mark the sunny squares on your map. In January, lunch outside is my favourite hour of the day."
      }
    ]
  },
  {
    "slug": "mallorcan-food-palma-old-town",
    "title": "Mallorcan Food to Try in Palma Old Town · Can Arbós",
    "meta": "Mallorcan food to try in Palma's old town, from our concierge. When kitchens open, what to order, lunch at the market and the island's pastries.",
    "h1": "Mallorcan food to try in Palma's old town, and when to eat it",
    "summary": "Kitchen hours, the dishes to order, lunch at the market and the bakeries, from someone who eats here every day.",
    "cover": {
      "path": "journal/market-fish",
      "alt": "A chef in a white jacket choosing fresh fish at a market stall",
      "height": 1241
    },
    "end": {
      "slug": "market-morning",
      "label": "Morning at Mercat de l'Olivar with our chef"
    },
    "map": false,
    "body": [
      {
        "kind": "p",
        "text": "Guests ask me where to eat more than anything else. I mark my own places on the map I give you on your first evening. This page covers the rest: the hours, the dishes and how I choose a table."
      },
      {
        "kind": "h",
        "text": "When to eat"
      },
      {
        "kind": "p",
        "text": "Restaurants in Spain usually serve lunch between 13:00 and 16:00 and dinner between 20:00 and 23:30. Around noon, people meet for a drink and a few tapas before lunch."
      },
      {
        "kind": "h",
        "text": "Lunch at the market"
      },
      {
        "kind": "p",
        "text": "Mercat de l'Olivar is 14 minutes from our door. Downstairs, the tapas counters serve food to eat there or to take away. Upstairs, some restaurants will cook the fish you've just bought at the stalls. The food counters serve until 16:00, Monday to Saturday. On Sundays the market is closed."
      },
      {
        "kind": "h",
        "text": "Mallorcan dishes to order"
      },
      {
        "kind": "p",
        "text": "Start with pa amb oli. It's round country bread with tomato, olive oil and salt."
      },
      {
        "kind": "p",
        "text": "Frit mallorquí is a fry of lamb or pork with potatoes, peppers and fennel. At Aljub we make it with lamb."
      },
      {
        "kind": "p",
        "text": "Tumbet layers seasonal vegetables, a little like ratatouille."
      },
      {
        "kind": "p",
        "text": "Arròs brut is a spicy rice cooked with game."
      },
      {
        "kind": "p",
        "text": "If you can't choose, order a variat. It's one plate of many small tapas. Mallorcans have eaten it with their aperitif for almost a century."
      },
      {
        "kind": "p",
        "text": "Sobrassada is our soft pork sausage, made with paprika and black pepper. Spread it on bread, with a little honey if you like."
      },
      {
        "kind": "h",
        "text": "The bakeries"
      },
      {
        "kind": "p",
        "text": "The ensaïmada is the island's classic pastry. It's a spiral of dough made with lard, which the Mallorcans call saïm. The plain one and the one filled with angel hair jam are the traditional kinds. For something savoury, try a coca with trempó. That's onion, green pepper and tomato on a thin dough. Many bakeries in Palma have a few tables, so you can eat breakfast there."
      },
      {
        "kind": "img",
        "path": "journal/ensaimada-breakfast",
        "alt": "A breakfast tray with coffee, an ensaïmada and orange juice on a small table in the stone gallery, beside green shutters",
        "shape": "is-arch"
      },
      {
        "kind": "h",
        "text": "Around La Llotja"
      },
      {
        "kind": "p",
        "text": "The streets around La Llotja, 18 minutes from us, have plenty of places to eat close together. It's a good area for a long dinner after a walk by the water."
      },
      {
        "kind": "h",
        "text": "How I choose a table"
      },
      {
        "kind": "p",
        "text": "These are my own rules, and they rarely let me down. The menu is short, and it changes with the season. At the next table, someone is speaking Mallorcan. The bread arrives before you ask for it. If two of the three are true, sit down."
      },
      {
        "kind": "h",
        "text": "And at home"
      },
      {
        "kind": "p",
        "text": "Aljub, our restaurant, serves dinner around the old cistern of the house, and in the courtyard May to October. Hotel guests and members can book 60 days ahead. We also keep two tables each evening for hotel guests who decide on the day. You can see the full menu, the prices and the 14 allergens before you book."
      },
      {
        "kind": "p",
        "text": "If you'd like to cook Mallorcan food yourself, join our chef's cooking class, which starts at the market."
      }
    ]
  }
] as Guide[];

/** The body before the photo, the photo, and the body after it, so the photo stays beside the passage it shows. */
export function splitGuide(guide: Guide) {
  const at = guide.body.findIndex((b) => b.kind === 'img');
  return { before: guide.body.slice(0, at), photo: guide.body[at] as GuidePhoto, after: guide.body.slice(at + 1) };
}

/** The journal hub. */
export const journalHub = {
  title: 'Journal · Can Arbós',
  meta: 'Three guides to Palma by the concierge of Can Arbós: what to do in the old town, the city in winter and Mallorcan food to try.',
  h1: 'Three guides to Palma, by our concierge',
};

/** The photo in the body is an arch, or a wide landscape. */
export const photoHeight = (photo: GuidePhoto) => (photo.shape === 'is-arch' ? 1117 : 503);
