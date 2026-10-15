// The paper map of the old town, read once at build time from the Astro data folder (Astro imports it with ?raw).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const oldTownMap = readFileSync(join(process.cwd(), '../astro/src/data/old-town-map.svg'), 'utf8');
