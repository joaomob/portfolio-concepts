// The Rooms collection (rooms.json) and what the pages add to it.
import data from './rooms.json';

export interface Room {
  name: string;
  slug: string;
  title: string;
  meta: string;
  summary: string;
  text: string;
  size: string;
  guests: number;
  bed: string;
  bathroom: string;
  view: string;
  light: string;
  count: number;
  view_filter: string;
}

export const rooms: Room[] = data.items;

/** The alt of the four photos of each room, written looking at each photo. */
export interface RoomPhotos {
  main: string;
  bed: string;
  bath: string;
  view: string;
}

export const ROOM_PHOTOS: Record<string, RoomPhotos> = {
  "courtyard-room": {
    "main": "A bed with sand and green linen under a tall window with green shutters open onto the courtyard arches",
    "bed": "The bed of the Courtyard Room seen through the door, with the window onto the courtyard behind it",
    "bath": "A walk-in shower in pale stone beside a small window and a stone basin on a wooden shelf",
    "view": "The courtyard seen from the room window, with green shutters open, the fountain and potted trees below"
  },
  "old-town-room": {
    "main": "A room with patterned floor tiles, a bed and two tall windows, one open onto a small iron balcony over the square",
    "bed": "The bed of the Old Town Room in morning light, in front of two tall windows with green shutters",
    "bath": "A freestanding bathtub on patterned floor tiles, beside a stone basin and a window with green shutters",
    "view": "A quiet square of stone houses with green shutters and a church tower, seen from the iron balcony"
  },
  "junior-suite": {
    "main": "A corner room with windows on two walls, a linen sofa and a bed under dark oak beams",
    "bed": "The bed of the Junior Suite between two windows with green shutters, under oak beams",
    "bath": "A long stone basin with two brass taps and a walk-in shower in pale stone",
    "view": "A narrow old town street and a corner of the square, seen from the corner window"
  },
  "terrace-suite": {
    "main": "A top-floor room with a bed and glass doors open onto a terrace with two loungers over the tiled roofs",
    "bed": "The bed of the Terrace Suite under a sloped oak ceiling, with the terrace doors open",
    "bath": "A stone bathtub under a sloped ceiling with a skylight",
    "view": "Old tiled roofs and the cathedral in the distance, seen from the private terrace in late afternoon"
  },
  "the-arbos-suite": {
    "main": "A sitting room with a linen sofa between two doors, and a window open onto a terrace table and the old town roofs",
    "bed": "The main bedroom of the Arbós Suite, with a large bed and a tall arched window with green shutters",
    "bath": "A stone bathtub under an arched window, with two stone basins on a wooden counter",
    "view": "A table set for four on the suite terrace at dusk, with the old town roofs and the cathedral behind"
  }
};

/** One sentence and one line of light per room, for the rooms hub and the opening of the room page. */
export const ROOM_SUMMARY: Record<string, { line: string; light: string }> = {
  "courtyard-room": {
    "line": "Cool in summer, and the quietest rooms in the house.",
    "light": "One window, sun from late morning."
  },
  "old-town-room": {
    "line": "Two tall windows and a small balcony over the square.",
    "light": "Morning sun."
  },
  "junior-suite": {
    "line": "On a corner, with windows on two sides and room for a third guest.",
    "light": ""
  },
  "terrace-suite": {
    "line": "On the top floor, with your own terrace over the rooftops.",
    "light": "Sun most of the day."
  },
  "the-arbos-suite": {
    "line": "On the top floor, with two bedrooms and a terrace for four.",
    "light": "Sun most of the day."
  }
};

export const ROOMS_HUB_ALT = "The courtyard seen from the first-floor gallery, with green shutters on the sandstone walls and potted plants around the fountain";

/** What every room has. */
export const EVERY_ROOM: string[] = [
  "Air conditioning and heating",
  "Blackout curtains",
  "Coffee machine and kettle",
  "Safe",
  "Wi-Fi",
  "Bathrobes and slippers"
];
