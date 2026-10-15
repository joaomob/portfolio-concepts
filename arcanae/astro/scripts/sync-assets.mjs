// Copies the media the site uses from the original prototype into public/assets/, served at /concepts/arcanae/assets/.
// public/assets/ is gitignored: the media are already tracked in the flowforge repository, so they are copied at build
// time instead of committed twice. Run before `astro build` (the "build" script in package.json does it).
//
// The original keeps its media in two folders: proto2/assets (brand, process photos, product renders) and src/assets
// (the hero model and its stills, the story portrait, the paper grain). Both are merged into one assets/ folder here;
// no file name appears in both.
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../public/assets');
const original = process.env.ARCANAE_ORIGINAL
  || resolve(here, '../../../../flowforge/projects/arcanae');

if (!existsSync(original)) {
  console.error(`Original prototype not found at ${original}. Set ARCANAE_ORIGINAL to its folder.`);
  process.exit(1);
}

// [source relative to the original folder, destination relative to public/assets]
const copies = [
  ['proto2/assets/brand', 'brand'],
  ['proto2/assets/process', 'process'],
  ['proto2/assets/products/renders', 'products/renders'],
  ['proto2/assets/products/silhouettes', 'products/silhouettes'],
  ['src/assets/story', 'story'],
  ['src/assets/grain', 'grain'],
  ['src/assets/the-fool-wash.glb', 'the-fool-wash.glb'],
  ['src/assets/the-fool-wash.points.bin', 'the-fool-wash.points.bin'],
  ['src/assets/hero-still-desktop.webp', 'hero-still-desktop.webp'],
  ['src/assets/hero-still-mobile.webp', 'hero-still-mobile.webp'],
  ['src/assets/hero-wall-desktop.webp', 'hero-wall-desktop.webp'],
  ['src/assets/hero-wall-mobile.webp', 'hero-wall-mobile.webp'],
];

// fs.cpSync fails with EIO on this Windows path (it has a non-ASCII user name), so the walk is done by hand
const copy = (from, to) => {
  if (statSync(from).isDirectory()) {
    mkdirSync(to, { recursive: true });
    for (const name of readdirSync(from)) copy(join(from, name), join(to, name));
  } else {
    copyFileSync(from, to);
  }
};

rmSync(out, { recursive: true, force: true });
for (const [from, to] of copies) {
  const dest = join(out, to);
  mkdirSync(dirname(dest), { recursive: true });
  copy(join(original, from), dest);
}
console.log(`Synced ${copies.length} media entries into ${out}`);
