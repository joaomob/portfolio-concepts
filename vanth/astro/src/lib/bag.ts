// The bag kept in the browser, shared by both builds: the same key, the same lines, so a piece added on one page shows
// on every other. A private window that refuses storage keeps the bag for the open page only.

export const BAG_KEY = 'vanth-bag';

export interface BagLine {
  /** the piece and its size: one line per size of a piece */
  key: string;
  id: string;
  name: string;
  /** in euros, whole */
  price: number;
  /** the small copy of its photograph, by file name */
  image: string;
  href: string;
  /** the European size, or "" for a piece in one size */
  size: string;
  qty: number;
}

export function readBag(): BagLine[] {
  try {
    const list = JSON.parse(localStorage.getItem(BAG_KEY) || '[]') as BagLine[];
    return list.filter((item) => item && item.id);
  } catch {
    return [];
  }
}

export function writeBag(list: BagLine[]): void {
  try {
    localStorage.setItem(BAG_KEY, JSON.stringify(list));
  } catch {
    /* private window: the bag lives for this page only */
  }
}

export const money = (value: number): string => 'EUR ' + Number(value).toLocaleString('en-US');

/** The amount of a price as written on the page ("EUR 8,900" is 8900). */
export const amount = (price: string): string => price.replace(/\D/g, '');
