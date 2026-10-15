// The style sheets of a page, read from the Astro build (../astro/src/styles) at build time, with their @import lines
// replaced by the files they name. Each page carries its sheets inline, as the Astro build and the original pages do,
// so the first paint waits for no request and every page type keeps its own cascade. Server only.
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), '..', 'astro', 'src', 'styles');
const cache = new Map<string, string>();

function read(file: string): string {
  const css = fs.readFileSync(file, 'utf8');
  return css.replace(/@import\s+'([^']+)';/g, (_, rel: string) => read(path.resolve(path.dirname(file), rel)));
}

/** The sheets of a page type, in the order the Astro templates import them. */
export const SHEETS = {
  site: ['site/index.css'],
  home: ['site/index.css', 'pages/collection.css', 'pages/home.css'],
  collection: ['site/index.css', 'pages/collection.css', 'pages/spots.css', 'pages/home.css'],
  fragrance: ['site/index.css', 'pages/collection.css', 'pages/spots.css', 'pages/fragrance.css'],
  product: ['site/index.css', 'pages/collection.css', 'pages/spots.css', 'pages/product.css'],
  list: ['site/index.css', 'pages/list.css'],
  shop: ['site/index.css', 'pages/collection.css', 'pages/spots.css', 'pages/product.css', 'pages/shop.css'],
} as const;
export type Sheets = keyof typeof SHEETS;

/** The CSS of a page type, one string. */
export function css(kind: Sheets): string {
  let found = cache.get(kind);
  if (!found) {
    found = SHEETS[kind].map((name) => read(path.join(root, name))).join('\n');
    cache.set(kind, found);
  }
  return found;
}
