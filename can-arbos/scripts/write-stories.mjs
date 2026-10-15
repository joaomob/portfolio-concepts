// Writes storybook/src/stories/<Group>.stories.js from storybook/src/sections.js, one story per section in the order
// of the page. Storybook reads the stories statically, so each file has to list its exports; this keeps them in step
// with the single list.  Run: node scripts/write-stories.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const storybook = path.resolve(here, '../storybook');
const { pages, sections, titles } = await import(pathToFileURL(path.join(storybook, 'src/sections.js')).href);
const out = path.join(storybook, 'src/stories');

const exportName = (id) => id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const fileName = (key) => key[0].toUpperCase() + key.slice(1);

for (const key of Object.keys(pages)) {
  const lines = [
    `// One story per section of ${pages[key]}, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).`,
    "import { section, note } from './page.js';",
    '',
    `export default { title: ${JSON.stringify(titles[key])} };`,
    '',
    ...sections[key].map((s) => `export const ${exportName(s.id)} = { name: ${JSON.stringify(s.name)}, render: section('${key}', '${s.id}'), parameters: note('${key}', '${s.id}') };\n`),
  ];
  const name = fileName(key);
  fs.writeFileSync(path.join(out, `${name}.stories.js`), lines.join('\n'));
  console.log(`${name}.stories.js: ${sections[key].length} stories`);
}
