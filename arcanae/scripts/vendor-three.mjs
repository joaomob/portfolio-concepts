// Copies the parts of three.js the hero uses into vendor/three (shared by the Astro and Next builds through a resolve
// alias) and the Draco decoder into astro/public/vendor/draco (fetched at runtime by DRACOLoader).
// three is not a dependency of the repository root, so it is vendored once from a local copy of the package:
//   node scripts/vendor-three.mjs <path to node_modules/three>
// Only the files reachable from the entry points below are copied, so the vendored tree stays small.
import { readFileSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(process.argv[2] || '');
const pkg = JSON.parse(readFileSync(join(src, 'package.json'), 'utf8'));
const out = join(root, 'vendor/three');
const draco = join(root, 'astro/public/vendor/draco');

const entries = [
  'build/three.module.js',
  'examples/jsm/loaders/GLTFLoader.js',
  'examples/jsm/loaders/DRACOLoader.js',
  'examples/jsm/postprocessing/EffectComposer.js',
  'examples/jsm/postprocessing/RenderPass.js',
  'examples/jsm/postprocessing/UnrealBloomPass.js',
  'examples/jsm/postprocessing/ShaderPass.js',
  'examples/jsm/postprocessing/OutputPass.js',
  'examples/jsm/shaders/FXAAShader.js',
];

rmSync(out, { recursive: true, force: true });
const seen = new Set();
const walk = (file) => {
  if (seen.has(file)) return;
  seen.add(file);
  const code = readFileSync(join(src, file), 'utf8');
  // relative static imports only; 'three' itself is resolved by the alias
  for (const m of code.matchAll(/(?:import|export)[^'"]*?from\s*['"](\.{1,2}\/[^'"]+)['"]/g)) {
    walk(relative(src, resolve(dirname(join(src, file)), m[1])).split(sep).join('/'));
  }
};
entries.forEach(walk);
for (const file of seen) {
  mkdirSync(dirname(join(out, file)), { recursive: true });
  copyFileSync(join(src, file), join(out, file));
}
copyFileSync(join(src, 'LICENSE'), join(out, 'LICENSE'));
writeFileSync(join(out, 'VERSION'), `three ${pkg.version}\n${[...seen].sort().join('\n')}\n`);

mkdirSync(draco, { recursive: true });
for (const f of ['draco_decoder.js', 'draco_decoder.wasm', 'draco_wasm_wrapper.js']) {
  copyFileSync(join(src, 'examples/jsm/libs/draco/gltf', f), join(draco, f));
}
console.log(`three ${pkg.version}: ${seen.size} files in vendor/three, Draco decoder in astro/public/vendor/draco`);
