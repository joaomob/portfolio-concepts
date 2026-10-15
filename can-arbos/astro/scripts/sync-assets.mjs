// Copies the media of the original prototype (fonts, favicon, the WebP photos and their phone copies) into
// public/assets/, which Astro serves at /concepts/can-arbos/assets/. The folder is gitignored: the media are tracked
// once, in the flowforge repository. The Gemini source photos (images/source, JPG) are not used by any page and stay out.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const source = process.env.CAN_ARBOS_ASSETS ?? join(homedir(), 'Documents/flowforge/projects/can-arbos/src/assets');
const target = resolve(here, '../public/assets');

if (!existsSync(source)) {
  console.error(`sync-assets: the original media folder was not found at ${source} (set CAN_ARBOS_ASSETS)`);
  process.exit(1);
}
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, {
  recursive: true,
  filter: (path) => !path.includes(`${sep}images${sep}source`) && !path.includes('/images/source'),
});
console.log(`sync-assets: ${source} -> ${target}`);
