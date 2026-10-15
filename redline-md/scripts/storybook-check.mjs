// Storybook check: serves storybook/storybook-static at /concepts/redline-md/storybook/ (the address it will live at,
// so its relative paths are tested) with the Astro build next to it at /concepts/redline-md/, opens every story at
// 1440x900 and 375x812 and fails on an empty story, a console error, a failed request or a section whose text is not
// the text of the same section in astro/dist. Saves one screenshot per story and width to review/storybook/.
//
//   node scripts/storybook-check.mjs        (port 4646; build the Astro site and the Storybook first)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const STATIC = path.join(root, 'storybook', 'storybook-static');
const ASTRO_DIST = path.join(root, 'astro', 'dist');
const OUT = path.join(root, 'review', 'storybook');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 4646;
const BASE = `http://127.0.0.1:${PORT}/concepts/redline-md/storybook/`;
const widths = [{ name: '1440', width: 1440, height: 900 }, { name: '375', width: 375, height: 812, mobile: true }];

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
const mounts = [['/concepts/redline-md/storybook/', STATIC], ['/concepts/redline-md/', ASTRO_DIST]];

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  for (const [prefix, dir] of mounts) {
    if (!url.startsWith(prefix)) continue;
    const rest = url.slice(prefix.length) || 'index.html';
    for (const c of [rest, `${rest}.html`]) {
      const file = path.join(dir, c);
      if (file.startsWith(dir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
        return;
      }
    }
  }
  res.writeHead(404);
  res.end('not found');
});
await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));

const { sections, pages } = await import(new URL('../storybook/src/sections.js', import.meta.url));
const stories = Object.values(JSON.parse(fs.readFileSync(path.join(STATIC, 'index.json'), 'utf8')).entries).filter((e) => e.type === 'story');
// story id (home--staying-power) back to its page key and section entry
const pageKey = { home: 'home', 'case-study': 'caseStudy', 'style-guide': 'styleGuide' };
const entryOf = (id) => {
  const [group, name] = id.split('--');
  const key = pageKey[group];
  return key ? { key, entry: sections[key].find((s) => s.id === name) } : null;
};

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });
const norm = (t) => t.replace(/\s+/g, ' ').trim();
const rows = [];
let failed = 0;

// the text of each section in the Astro page as built, before any page script runs (no page script)
const astroText = {};
const page0 = await browser.newPage();
await page0.goto(`${BASE}iframe.html`, { waitUntil: 'domcontentloaded' });
for (const [key, { file }] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(ASTRO_DIST, file), 'utf8');
  // the settle steps of src/sections.js only change display, never the text, so they are not run here
  const list = sections[key].map((s) => ({ id: s.id, selector: s.selector, settle: null }));
  astroText[key] = await page0.evaluate((source, entries) => {
    const doc = new DOMParser().parseFromString(source, 'text/html');
    return Object.fromEntries(entries.map((s) => {
      const node = doc.querySelector(s.selector);
      if (node && s.settle) new Function(`return (${s.settle})`)()(node);
      return [s.id, node?.textContent ?? null];
    }));
  }, html, list);
}
await page0.close();

for (const story of stories) {
  for (const vp of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => errors.push(`failed ${r.url()}`));
    page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.mobile, hasTouch: !!vp.mobile, deviceScaleFactor: 1 });
    await page.goto(`${BASE}iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('#storybook-root')?.children.length > 0, { timeout: 15000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 300));
    const shown = await page.evaluate(() => {
      const rootEl = document.querySelector('#storybook-root');
      return { height: Math.round(rootEl?.getBoundingClientRect().height ?? 0), text: rootEl?.textContent ?? '', css: [...document.querySelectorAll('link[data-page-css]')].map((l) => !!l.sheet) };
    });
    const problems = [];
    if (!shown.height) problems.push('empty story');
    if (shown.css.some((ok) => !ok)) problems.push('stylesheet not loaded');
    const found = entryOf(story.id);
    if (found?.entry && norm(shown.text) !== norm(astroText[found.key][found.entry.id] ?? '')) problems.push('text differs from astro/dist');
    problems.push(...errors);
    if (problems.length) failed++;
    rows.push(`${story.id} | ${vp.name} | ${problems.length ? 'FAIL' : 'pass'} | ${shown.height}${problems.length ? ' | ' + problems.join('; ') : ''}`);
    await page.screenshot({ path: path.join(OUT, `${story.id}-${vp.name}.jpg`), type: 'jpeg', quality: 55 });
    await page.close();
  }
}

await browser.close();
server.close();
console.log('story | width | result | root height\n' + rows.join('\n'));
console.log(failed ? `\n${failed} failed` : `\nevery story passes (${stories.length} stories, 2 widths)`);
process.exitCode = failed ? 1 : 0;
