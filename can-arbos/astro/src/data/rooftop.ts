// Rooftop & Spa.
import type { FaqItem } from './types';

export const TREATMENTS: { name: string; length: string; price: string }[] = [
  {
    "name": "Relaxing massage",
    "length": "60 min",
    "price": "€95"
  },
  {
    "name": "Deep tissue massage",
    "length": "60 min",
    "price": "€105"
  },
  {
    "name": "Facial with almond oil",
    "length": "50 min",
    "price": "€90"
  },
  {
    "name": "Massage for two, side by side",
    "length": "60 min",
    "price": "€180"
  }
];

export const ROOFTOP_FAQ: FaqItem[] = [
  {
    "question": "Can I use the pool if I'm not staying at the hotel?",
    "answer": "No. The pool is for hotel guests. After 18:00, anyone can come up to the bar."
  },
  {
    "question": "Is the pool heated?",
    "answer": "No, it has no heating. It's at its warmest from June to September. The bar stays open all year."
  },
  {
    "question": "Do I need to book the steam room?",
    "answer": "It comes with any treatment. Without a treatment, book a 45-minute slot at reception."
  }
];

/** The band of the day runs from 9:00 to 23:00: each row has the hours as written in the copy, a start and an end. */
export const DAY_FROM = 9;
export const DAY_TO = 23;
export const DAY_ROWS: { name: string; hours: string; from: number; to: number }[] = [
  {
    "name": "Pool",
    "hours": "9:00 to 20:00",
    "from": 9,
    "to": 20
  },
  {
    "name": "Rooftop for hotel guests only",
    "hours": "Until 18:00",
    "from": 9,
    "to": 18
  },
  {
    "name": "Bar",
    "hours": "12:00 to 23:00, all year",
    "from": 12,
    "to": 23
  }
];
export const DAY_TICKS: number[] = [
  9,
  12,
  18,
  20,
  23
];

/** Where an hour sits on the band, in percent with two decimals. */
export const dayPercent = (hour: number) => Math.round(((hour - DAY_FROM) / (DAY_TO - DAY_FROM)) * 10000) / 100;
