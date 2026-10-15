// Copies the media of the original prototype (fonts, photographs, favicon) into public/assets/, which is gitignored
// because the files are tracked once, in flowforge. It also writes src/data/images.json: the width and height of every
// photograph (read from its WebP header) and the smaller copies that exist, so both builds can write width, height and
// srcset without reading the disk at render time.
//   node scripts/sync-assets.mjs            (from vanth/astro)
//   VANTH_SRC=<path to the prototype src>   to read the prototype from another place
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const astro = path.resolve(here, '..');
const source = path.resolve(process.env.VANTH_SRC || path.join(astro, '../../../flowforge/projects/ai-photo-collections/src'));
const from = path.join(source, 'assets');
const to = path.join(astro, 'public', 'assets');

if (!fs.existsSync(from)) {
  console.error(`No prototype media at ${from}. Clone flowforge next to portfolio-concepts or set VANTH_SRC.`);
  process.exit(1);
}

// copy only what changed, so a second run is quick
let copied = 0;
const copy = (src, dst) => {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const a = path.join(src, entry.name);
    const b = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(b, { recursive: true });
      copy(a, b);
    } else {
      const sa = fs.statSync(a);
      const sb = fs.existsSync(b) && fs.statSync(b);
      if (!sb || sb.size !== sa.size || sb.mtimeMs < sa.mtimeMs) {
        fs.copyFileSync(a, b);
        copied += 1;
      }
    }
  }
};
fs.mkdirSync(to, { recursive: true });
copy(from, to);

/** The pixel size of a WebP file, from its header (lossy VP8, lossless VP8L or extended VP8X). */
function webpSize(file) {
  const b = Buffer.alloc(30);
  const fd = fs.openSync(file, 'r');
  fs.readSync(fd, b, 0, 30, 0);
  fs.closeSync(fd);
  const kind = b.toString('ascii', 12, 16);
  if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (kind === 'VP8L') {
    const n = b.readUInt32LE(21);
    return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1];
  }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
}

// one entry per photograph; a file named <name>-<width>.webp next to <name>.webp is one of its smaller copies
const folder = path.join(from, 'images');
const files = new Set(fs.readdirSync(folder));
const widths = [672, 800, 1280, 1920];
const manifest = {};
for (const file of [...files].sort()) {
  const match = file.match(/^(.+)\.webp$/);
  if (!match) continue;
  const name = match[1];
  const copyOf = name.match(/^(.+)-(672|800|1280|1920)$/);
  if (copyOf && files.has(`${copyOf[1]}.webp`)) continue;
  const [width, height] = webpSize(path.join(folder, file));
  manifest[name] = { width, height, copies: widths.filter((w) => files.has(`${name}-${w}.webp`)) };
}
// one photograph per line, so a diff shows which file changed
const lines = Object.entries(manifest).map(([name, info]) => `  ${JSON.stringify(name)}: ${JSON.stringify(info)}`);
fs.writeFileSync(path.join(astro, 'src', 'data', 'images.json'), `{\n${lines.join(',\n')}\n}\n`);
console.log(`${copied} files copied to public/assets, ${Object.keys(manifest).length} photographs in src/data/images.json`);
