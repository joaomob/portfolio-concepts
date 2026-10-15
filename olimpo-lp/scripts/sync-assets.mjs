// Copies the media of the original prototype (fonts, images, videos, the Lottie file) into astro/public/assets/.
// The media are tracked once, in the flowforge repository, so the copy here is gitignored and made before each build.
// Usage: node scripts/sync-assets.mjs [path to the original src folder]
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(process.argv[2] ?? join(homedir(), 'Documents', 'flowforge', 'projects', 'olimpo', 'src', 'assets'));
const target = resolve(here, '..', 'astro', 'public', 'assets');

if (!existsSync(source)) {
  console.error(`Original media not found at ${source}. Pass the path of olimpo/src/assets as the first argument.`);
  process.exit(1);
}

// fs.cpSync fails with EIO on Windows paths with non-ASCII characters (the user folder has "Ã"), so the copy walks
// the tree by hand.
function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  let files = 0;
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const a = join(from, entry.name), b = join(to, entry.name);
    if (entry.isDirectory()) files += copyTree(a, b);
    else { copyFileSync(a, b); files++; }
  }
  return files;
}

rmSync(target, { recursive: true, force: true });
console.log(`Copied ${copyTree(source, target)} files from ${source} to ${target}`);
