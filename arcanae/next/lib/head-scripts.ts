// The small scripts that must run before the first paint, read from the Astro sources at build time (server only).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const read = (name: string) => readFileSync(join(process.cwd(), '../astro/src/scripts/head', name), 'utf8');

export const HEAD_SCRIPTS = {
  heroStill: read('hero-still.js'),
  introGate: read('intro-gate.js'),
  cardLoading: read('card-loading.js'),
};
