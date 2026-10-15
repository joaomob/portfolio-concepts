// Opens every story of the built Storybook (storybook/storybook-static) the way it is published: Storybook under
// /concepts/vanth/storybook/ and the Astro build under /concepts/vanth/, on port 4602 (local only). For each story, at
// 1440 and 375, it checks that the section rendered with the site stylesheet and at least one of its three fonts, with no page error and no
// failed request (the favicon.ico the browser asks for on its own is left out), and saves
// review/all/storybook-<id>-<width>.jpg (ignored by git).
// Usage: node scripts/storybook-check.mjs
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 4602;
const MOUNTS = [
  ['/concepts/vanth/storybook/', join(ROOT, 'storybook/storybook-static')],
  ['/concepts/vanth/', join(ROOT, 'astro/dist')],
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2' };
const WIDTHS = [{ width: 1440, height: 900 }, { width: 375, height: 812 }];

function resolveFile(dir, urlPath) {
  const base = join(dir, normalize(decodeURIComponent(urlPath)).replace(/^([\\/])+/, ''));
  if (!base.startsWith(dir)) return null;
  for (const c of [base, `${base}.html`, join(base, 'index.html')]) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://127.0.0.1:${PORT}`);
  let file = null;
  for (const [prefix, dir] of MOUNTS) if (pathname.startsWith(prefix) && (file = resolveFile(dir, pathname.slice(prefix.length)))) break;
  if (!file) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(PORT, '127.0.0.1', ok));

const index = JSON.parse(readFileSync(join(ROOT, 'storybook/storybook-static/index.json'), 'utf8'));
const stories = Object.values(index.entries).filter((e) => e.type === 'story');
const base = `http://127.0.0.1:${PORT}/concepts/vanth/storybook/`;
mkdirSync(join(ROOT, 'review/all'), { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run', '--mute-audio'] });
let failed = 0;
let checks = 1;
try {
  const manager = await browser.newPage();
  const res = await manager.goto(base, { waitUntil: 'networkidle2', timeout: 60000 });
  await manager.waitForSelector('#storybook-explorer-tree', { timeout: 30000 }).catch(() => {});
  const tree = await manager.$('#storybook-explorer-tree');
  const robots = await manager.$eval('meta[name="robots"]', (m) => m.content).catch(() => '');
  const managerOk = res?.status() === 200 && tree && robots === 'noindex';
  console.log(`${managerOk ? 'PASS' : 'FAIL'} manager ${base} robots ${robots}`);
  if (!managerOk) failed++;
  await manager.close();

  for (const story of stories) {
    for (const size of WIDTHS) {
      checks++;
      const page = await browser.newPage();
      await page.setViewport(size);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`${base}iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const root = document.querySelector('#storybook-root');
        const box = root?.getBoundingClientRect();
        const css = document.getElementById('vanth-css')?.textContent.length ?? 0;
        const fonts = [...document.fonts].filter((f) => ['Anton', 'Inter Tight', 'JetBrains Mono'].includes(f.family.replace(/"/g, '')) && f.status === 'loaded').map((f) => f.family.replace(/"/g, ''));
        const broken = [...root.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').length;
        return { height: box ? Math.round(box.height) : 0, css, fonts: [...new Set(fonts)].join('+'), broken, text: (root?.innerText || '').trim().length };
      });
      const ok = result.height > 40 && result.css > 1000 && result.fonts && result.broken === 0 && errors.length === 0;
      if (!ok) failed++;
      console.log(`${ok ? 'PASS' : 'FAIL'} ${story.id} ${size.width} height ${result.height} css ${result.css} fonts ${result.fonts} broken ${result.broken}${errors.length ? ` errors: ${errors.join(' | ')}` : ''}`);
      await page.screenshot({ path: join(ROOT, `review/all/storybook-${story.id}-${size.width}.jpg`), type: 'jpeg', quality: 60 });
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`\n${checks - failed}/${checks} checks pass`);
process.exitCode = failed ? 1 : 0;
