// Parity check of the Vanth ports against the original prototype.
//
// Serves, on local ports only:
//   4601  the original prototype (flowforge/projects/ai-photo-collections/src, read only; pages at /site/<page>.html)
//   4602  the Astro build (astro/dist) at /concepts/vanth/
//   4603  the Next.js build (next/out) at /concepts/vanth/next/, with the Astro build at /concepts/vanth/ for the media
// and opens every page of every version in headless Chrome at 1440x900 and 375x812. For each page it compares the
// visible text, the visible links (count and targets), the broken images, the console errors and the document height
// (within 2%). Each page is scrolled to the end first, so lazy photographs load and the scroll animations play.
// It then runs the bag in each version: add a piece on its page, open the bag, check the line and the total.
//
// Usage: node scripts/parity.mjs [--only=index,product] [--versions=astro,next] [--shots]
//   --shots writes JPG screenshots (reduced motion, so nothing waits for a scroll) of the home and one page of each
//   type to review/all (ignored by git) and copies a handful into review/.
import { createServer } from 'node:http';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const ORIGINAL = resolve(process.env.VANTH_ORIGINAL ?? join(root, '../../flowforge/projects/ai-photo-collections/src'));
const ASTRO_DIST = join(root, 'astro/dist');
const NEXT_OUT = join(root, 'next/out');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORTS = { original: 4601, astro: 4602, next: 4603 };
const WIDTHS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '375', width: 375, height: 812 },
];

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

/* ---------- pages: every page of the original ---------- */
const typeOf = (id) => (id === 'index' ? 'home' : id.split('-')[0]);
const PAGES = readdirSync(join(ORIGINAL, 'site'))
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.slice(0, -5))
  .map((id) => ({ id, type: typeOf(id), path: id === 'index' ? '' : `/${id}` }));
const SHOT_PAGES = ['index', 'collection-riot', 'fragrance-riot', 'product-riot-pinned-tartan', 'collections', 'bag'];
const KEEP = ['index', 'product-riot-pinned-tartan'];

const URLS = {
  original: (p) => `http://127.0.0.1:${PORTS.original}/site/${p.id}.html`,
  astro: (p) => `http://127.0.0.1:${PORTS.astro}/concepts/vanth${p.path}`,
  next: (p) => `http://127.0.0.1:${PORTS.next}/concepts/vanth/next${p.path}`,
};

/* ---------- static servers with clean URLs ---------- */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

function resolveFile(dir, urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([\\/])+/, '');
  const base = join(dir, clean);
  if (!base.startsWith(dir)) return null;
  for (const c of [base, `${base}.html`, join(base, 'index.html')]) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
}

/** A server for one version; the first mount whose prefix matches and holds the file answers. */
function serve(port, mounts) {
  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    let file = null;
    for (const [prefix, dir] of mounts) {
      if (url.pathname === prefix.replace(/\/$/, '') || url.pathname.startsWith(prefix)) {
        file = resolveFile(dir, url.pathname.slice(prefix.length));
        if (file) break;
      }
    }
    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(readFileSync(file));
  });
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok(server)));
}

/* ---------- link normalization: the same page in every version reads the same ---------- */
function normalizeLink(href) {
  let u;
  try {
    u = new URL(href);
  } catch {
    return href;
  }
  if (u.hostname !== '127.0.0.1') return href;
  const path = u.pathname
    .replace(/^\/(site|concepts\/vanth\/next|concepts\/vanth)(\/|$)/, '')
    .replace(/\.html$/, '')
    .replace(/^index$/, '');
  return `/${path}${u.search}${u.hash}`;
}

const normText = (t) => t.replace(/\s+/g, ' ').trim();

/* ---------- one page load ---------- */
async function measure(browser, url, vp) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e.message ?? e)));
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  const status = response ? response.status() : 0;
  await scrollThrough(page);
  const data = await page.evaluate(() => {
    const shown = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const links = [...document.querySelectorAll('a[href]')].filter(shown).map((a) => a.href);
    const broken = [...document.images]
      .filter(shown)
      .filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
      .map((img) => img.currentSrc || img.src);
    return { text: document.body.innerText, links, broken, height: document.documentElement.scrollHeight };
  });
  await page.close();
  return { status, errors, ...data, text: normText(data.text), links: data.links.map(normalizeLink) };
}

/** Scrolls to the end in screen steps so lazy photographs load and the animations play, then back to the top. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    for (let i = 0; i < 120 && y < document.documentElement.scrollHeight; i++) {
      y += Math.round(window.innerHeight * 0.8);
      window.scrollTo(0, y);
      await wait(100);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await wait(400);
    const imgs = [...document.images].filter((img) => img.getClientRects().length);
    await Promise.race([
      Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); })))),
      wait(6000),
    ]);
    window.scrollTo(0, 0);
    /* the scrubbed animations ease towards the scroll position: wait until the visible text holds still at the top */
    let last = '';
    for (let i = 0; i < 16; i++) {
      await wait(500);
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      const now = document.body.innerText;
      if (now === last && window.scrollY === 0) break;
      last = now;
    }
  });
}

/** A full page JPG under 300 KB, with reduced motion so every section is drawn in its resting state. */
async function screenshot(browser, url, vp, file) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  /* the wide screenshots are taken at half density so a full page stays a light JPG; the layout does not change */
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.width > 800 ? 0.5 : 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await scrollThrough(page);
  let quality = 70;
  let buffer;
  do {
    buffer = await page.screenshot({ type: 'jpeg', quality, fullPage: true, captureBeyondViewport: true });
    quality -= 10;
  } while (buffer.length > 300 * 1024 && quality >= 20);
  writeFileSync(file, buffer);
  await page.close();
}

/* ---------- the bag: add a piece, open the bag, read the line and the total ---------- */
async function bagFlow(browser, version) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message ?? e)));
  await page.setViewport({ width: 1440, height: 900 });
  const product = PAGES.find((p) => p.id === 'product-riot-pinned-tartan');
  const bag = PAGES.find((p) => p.id === 'bag');
  await page.goto(URLS[version](product), { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle2' });
  await page.click('[data-bag-add]');
  await new Promise((r) => setTimeout(r, 300));
  const count = await page.$eval('[data-bag-count]', (el) => el.textContent.trim());
  await page.goto(URLS[version](bag), { waitUntil: 'networkidle2', timeout: 60000 });
  const result = await page.evaluate(() => ({
    lines: [...document.querySelectorAll('[data-bag-list] .bag_item:not([data-line-model])')].map((li) => li.querySelector('[data-line-name]')?.textContent.trim()),
    total: document.querySelector('[data-bag-total]')?.textContent.trim(),
  }));
  await page.evaluate(() => localStorage.clear());
  await page.close();
  return { count, ...result, errors };
}

/* ---------- comparison ---------- */
function firstDiff(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return { at: i, original: a.slice(Math.max(0, i - 40), i + 80), port: b.slice(Math.max(0, i - 40), i + 80) };
}

function compare(o, p) {
  const problems = [];
  if (p.status !== 200) problems.push(`status ${p.status}`);
  if (o.text !== p.text) {
    const d = firstDiff(o.text, p.text);
    problems.push(`text differs at ${d.at}: original "${d.original}" / port "${d.port}"`);
  }
  if (o.links.length !== p.links.length) problems.push(`links ${o.links.length} vs ${p.links.length}`);
  const linkDiff = o.links.map((l, i) => [l, p.links[i]]).filter(([a, b]) => a !== b);
  if (linkDiff.length) problems.push(`link targets differ: ${linkDiff.slice(0, 4).map(([a, b]) => `${a} -> ${b}`).join(', ')}`);
  if (p.broken.length) problems.push(`broken images: ${p.broken.slice(0, 3).join(', ')}`);
  if (p.errors.length) problems.push(`console errors: ${p.errors.slice(0, 3).join(' | ')}`);
  const diff = Math.abs(p.height - o.height) / o.height;
  if (diff > 0.02) problems.push(`height ${o.height} vs ${p.height} (${(diff * 100).toFixed(1)}%)`);
  return { pass: problems.length === 0, problems, heightDiff: Number((diff * 100).toFixed(2)) };
}

/* ---------- run ---------- */
async function main() {
  const only = typeof args.only === 'string' ? args.only.split(',') : null;
  const wanted = typeof args.versions === 'string' ? args.versions.split(',') : ['astro', 'next'];
  const versions = wanted.filter((v) => existsSync(v === 'astro' ? ASTRO_DIST : NEXT_OUT));
  const pages = PAGES.filter((p) => !only || only.includes(p.id) || only.includes(p.type));
  const shotsDir = join(root, 'review/all');
  mkdirSync(shotsDir, { recursive: true });

  const servers = [
    await serve(PORTS.original, [['/', ORIGINAL]]),
    await serve(PORTS.astro, [['/concepts/vanth/', ASTRO_DIST]]),
    await serve(PORTS.next, [['/concepts/vanth/next/', NEXT_OUT], ['/concepts/vanth/', ASTRO_DIST]]),
  ];
  /* one browser per worker: a tab in the background gets no animation frames, so the GSAP ticker would stop in it */
  const launch = () => puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run', '--mute-audio', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'] });

  const rows = [];
  const jobs = [];
  for (const p of pages) for (const vp of WIDTHS) jobs.push({ p, vp });
  const shotName = (p, vp, v) => `${p.id}-${vp.name}-${v}.jpg`;

  let next = 0;
  const worker = async () => {
    const browser = await launch();
    while (next < jobs.length) {
      const { p, vp } = jobs[next++];
      try {
        const o = await measure(browser, URLS.original(p), vp);
        if (o.errors.length) console.log(`     original console errors on ${p.id}: ${o.errors.slice(0, 2).join(' | ')}`);
        for (const v of versions) {
          const r = await measure(browser, URLS[v](p), vp);
          const c = compare(o, r);
          rows.push({ page: p.id, type: p.type, width: vp.name, version: v, links: `${o.links.length}/${r.links.length}`, height: `${o.height}/${r.height}`, ...c });
          console.log(`${c.pass ? 'PASS' : 'FAIL'} ${v.padEnd(5)} ${vp.name.padEnd(4)} ${p.id}${c.pass ? '' : `\n     ${c.problems.join('\n     ')}`}`);
        }
        if (args.shots && SHOT_PAGES.includes(p.id))
          for (const v of ['original', ...versions]) await screenshot(browser, URLS[v](p), vp, join(shotsDir, shotName(p, vp, v)));
      } catch (e) {
        rows.push({ page: p.id, type: p.type, width: vp.name, version: 'all', pass: false, problems: [String(e.message ?? e)] });
        console.log(`FAIL ${p.id} ${vp.name}: ${e.message ?? e}`);
      }
    }
    await browser.close();
  };
  await Promise.all([worker(), worker(), worker()]);

  const browser = await launch();
  const bag = {};
  for (const v of ['original', ...versions]) bag[v] = await bagFlow(browser, v);
  const bagPass = versions.every((v) => JSON.stringify(bag[v]) === JSON.stringify(bag.original)) && bag.original.lines.length === 1;
  console.log(`${bagPass ? 'PASS' : 'FAIL'} bag flow: ${JSON.stringify(bag)}`);

  await browser.close();
  servers.forEach((s) => s.close());

  if (args.shots)
    for (const p of PAGES.filter((x) => KEEP.includes(x.id)))
      for (const vp of WIDTHS)
        for (const v of ['original', ...versions]) {
          const f = join(shotsDir, shotName(p, vp, v));
          if (existsSync(f)) copyFileSync(f, join(root, 'review', shotName(p, vp, v)));
        }

  rows.sort((a, b) => `${a.version}${a.page}${a.width}`.localeCompare(`${b.version}${b.page}${b.width}`));
  writeFileSync(join(root, 'review/parity.json'), JSON.stringify({ rows, bag, bagPass }, null, 2));
  const failed = rows.filter((r) => !r.pass);
  console.log(`\n${rows.length - failed.length}/${rows.length} checks pass, bag flow ${bagPass ? 'pass' : 'fail'}`);
  process.exitCode = failed.length || !bagPass ? 1 : 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
