// Copies the media of the original prototype into public/assets/, the one place both builds read them from
// (/concepts/litora-eb5/assets/...). public/assets is gitignored: the files are tracked once, in flowforge.
// The full size originals in images/source/ stay out, the pages only use the resized files and the manifest.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const original = process.env.LITORA_SRC ?? path.join(os.homedir(), 'Documents', 'flowforge', 'projects', 'eb5-real-estate', 'src', 'assets');
const target = path.join(here, '..', 'public', 'assets');

if (!fs.existsSync(original)) {
  console.error(`sync-assets: no media at ${original} (set LITORA_SRC to the assets folder of the original prototype)`);
  process.exit(1);
}

const skip = (rel) => rel === path.join('images', 'source') || rel.startsWith(path.join('images', 'source') + path.sep) || rel === 'icons';
let copied = 0;
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(original, target, {
  recursive: true,
  filter: (from) => {
    const rel = path.relative(original, from);
    if (rel && skip(rel)) return false;
    if (fs.statSync(from).isFile()) copied += 1;
    return true;
  },
});
console.log(`sync-assets: ${copied} files into ${path.relative(process.cwd(), target) || target}`);
