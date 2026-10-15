// Copies the media of the original prototype (flowforge/projects/redline-md/src/assets) and the Figtree font files
// (joaomob-site/assets/fonts, the same Google Fonts files the original loads from Google) into astro/public/assets/.
// The media are tracked once, in the flowforge repository, so the copy here is gitignored and made before each build.
// Usage: node scripts/sync-assets.mjs [path to redline-md/src/assets] [path to joaomob-site/assets/fonts]
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const media = resolve(process.argv[2] ?? join(homedir(), 'Documents', 'flowforge', 'projects', 'redline-md', 'src', 'assets'));
const fonts = resolve(process.argv[3] ?? join(homedir(), 'Documents', 'joaomob-site', 'assets', 'fonts'));
const target = resolve(here, '..', 'astro', 'public', 'assets');

for (const [name, dir] of [['Original media', media], ['Figtree fonts', fonts]]) {
  if (!existsSync(dir)) {
    console.error(`${name} not found at ${dir}. Pass the paths as arguments (see the header of this script).`);
    process.exit(1);
  }
}

// fs.cpSync fails with EIO on Windows paths with non-ASCII characters (the user folder has "Ã"), so the copy walks
// the tree by hand.
function copyTree(from, to, keep = () => true) {
  mkdirSync(to, { recursive: true });
  let files = 0;
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const a = join(from, entry.name), b = join(to, entry.name);
    if (entry.isDirectory()) files += copyTree(a, b, keep);
    else if (keep(entry.name)) { copyFileSync(a, b); files++; }
  }
  return files;
}

rmSync(target, { recursive: true, force: true });
const copied = copyTree(media, target);
// the four weights the original asks Google for (400, 500, 600, 700), latin and latin-ext
const fontFiles = copyTree(fonts, join(target, 'fonts'), (n) => /^figtree-(400|500|600|700)-normal-latin(-ext)?\.woff2$/.test(n));
console.log(`Copied ${copied} media files from ${media} and ${fontFiles} font files from ${fonts} to ${target}`);
