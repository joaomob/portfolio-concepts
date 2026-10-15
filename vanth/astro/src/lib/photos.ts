// Width, height and responsive sources of each photograph, from src/data/images.json (written by
// scripts/sync-assets.mjs from the files of the original prototype). Shared by both builds.
import manifest from '../data/images.json';

/** Where the media live on joaomob.com: one copy, served by the Astro build, used by the Next.js build too. */
export const MEDIA = '/concepts/vanth/assets';

interface ImageInfo {
  width: number;
  height: number;
  copies: number[];
}
const images = manifest as Record<string, ImageInfo>;

/** How wide a photograph is drawn, by the frame it sits in (the sizes attribute). */
export const SIZES = {
  /** the Home photograph starts in a slot of 70% of a phone screen */
  homeHero: '(max-width: 767px) 70vw, 100vw',
  hero: '100vw',
  /** a card of the lists: a phone screen less the page padding */
  list: '(max-width: 767px) calc(100vw - 2.5rem), 50vw',
  look: '(max-width: 767px) 80vw, 30vw',
  piece: '(max-width: 767px) 100vw, 25vw',
  half: '(max-width: 767px) 100vw, 50vw',
} as const;
export type Frame = keyof typeof SIZES;

function info(name: string): ImageInfo {
  const found = images[name];
  if (!found) throw new Error(`No photograph named ${name} in src/data/images.json (run scripts/sync-assets.mjs)`);
  return found;
}

export interface Source {
  src: string;
  width: number;
  height: number;
  srcset?: string;
  sizes?: string;
}

/** The attributes of one photograph: the full file, its size, and the smaller copies when they exist. */
export function source(name: string, frame: Frame = 'half'): Source {
  const { width, height, copies } = info(name);
  const src = `${MEDIA}/images/${name}.webp`;
  if (!copies.length) return { src, width, height };
  const srcset = [...copies.map((w) => `${MEDIA}/images/${name}-${w}.webp ${w}w`), `${src} ${width}w`].join(', ');
  return { src, width, height, srcset, sizes: SIZES[frame] };
}

/** A garment photographed full length: the file is at least twice as tall as it is wide. */
export const isTall = (name: string): boolean => {
  const { width, height } = info(name);
  return height >= width * 2;
};

/** The small copy of a photograph, for the lines of the bag. */
export const thumb = (name: string): string => {
  const { copies } = info(name);
  if (copies.includes(672)) return `${name}-672`;
  if (copies.includes(800)) return `${name}-800`;
  return name;
};
