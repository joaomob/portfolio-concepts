// Parity check of the Arcanae Craft ports against the original prototype.
//
// Serves, on local ports only:
//   4611  the original prototype (flowforge/projects/arcanae, read only; the pages live at /src/site/<page>.html)
//   4612  the Astro build (astro/dist) at /concepts/arcanae/ and the Next.js build (next/out) at /concepts/arcanae/next/
// and opens every page of every version in headless Chrome at 1440x900 and 375x812. For each page it compares the
// visible text, the visible links (count and targets), the broken images, the console errors and the document height
// (within 2%). The intro is marked as seen and each page is scrolled to the end so lazy images load.
//
// Usage: node scripts/parity.mjs [--only=home,collection] [--versions=astro,next] [--shots]
//   --shots writes JPG screenshots of the home and one page of each type to the scratch folder given by
//   PARITY_SHOTS (default ./review/all) and copies a handful into ./review.
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync, copyFileSync } from 'node:fs';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import products from '../astro/src/data/products.json' with { type: 'json' };

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const ORIGINAL = resolve(process.env.ARCANAE_ORIGINAL ?? join(root, '../../flowforge/projects/arcanae'));
const ASTRO_DIST = join(root, 'astro/dist');
const NEXT_OUT = join(root, 'next/out');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT_ORIGINAL = 4611;
const PORT_BUILDS = 4612;
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

/* ---------- pages ---------- */
const INFO = ['shipping', 'terms', 'privacy', 'legal-notice'];
const PAGES = [
  { id: 'home', type: 'home', original: '/src/site/index.html', port: '' },
  { id: 'collection', type: 'collection', original: '/src/site/collection.html', port: 'collection' },
  ...products.map((p) => ({
    id: `product/${p.slug}`,
    type: 'product',
    original: `/src/site/product.html?card=${p.slug}`,
    port: `product/${p.slug}`,
  })),
  ...INFO.map((slug) => ({ id: slug, type: 'info', original: `/src/site/${slug}.html`, port: slug })),
  { id: 'success', type: 'success', original: '/src/site/success.html', port: 'success' },
];
const SHOT_PAGES = ['home', 'collection', 'product/the-fool', 'shipping', 'success'];
const KEEP = ['home', 'product/the-fool'];

const VERSIONS = {
  original: (p) => `http://127.0.0.1:${PORT_ORIGINAL}${p.original}`,
  astro: (p) => `http://127.0.0.1:${PORT_BUILDS}/concepts/arcanae${p.port ? `/${p.port}` : ''}`,
  next: (p) => `http://127.0.0.1:${PORT_BUILDS}/concepts/arcanae/next${p.port ? `/${p.port}` : ''}`,
};

/* ---------- static servers with clean URLs ---------- */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.glb': 'model/gltf-binary',
  '.bin': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
};

function resolveFile(dir, urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([\\/])+/, '');
  const base = join(dir, clean);
  if (!base.startsWith(dir)) return null;
  const candidates = [base, `${base}.html`, join(base, 'index.html')];
  for (const c of candidates) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
}

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

/* ---------- link normalization ---------- */
function normalizeLink(href) {
  let u;
  try {
    u = new URL(href);
  } catch {
    return href;
  }
  if (u.hostname !== '127.0.0.1') return href;
  let path = u.pathname.replace(/^\/(src\/site|concepts\/arcanae\/next|concepts\/arcanae)(\/|$)/, '');
  path = path.replace(/\.html$/, '').replace(/^index$/, '');
  const card = u.searchParams.get('card');
  if (path === 'product' && card) {
    path = `product/${card}`;
    u.searchParams.delete('card');
  }
  const search = u.searchParams.toString();
  return `/${path}${search ? `?${search}` : ''}${u.hash}`;
}

const normText = (t) => t.replace(/\s+/g, ' ').trim();

/* ---------- one page load ---------- */
async function measure(browser, url, vp, shotFile) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e.message ?? e)));
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem('arcanae_intro', '1');
    } catch {}
  });
  const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  const status = response ? response.status() : 0;
  /* the home hero loads a 3D model; its loading line is part of the text until the statue is in, so wait for it */
  await page
    .waitForFunction(() => {
      const el = document.querySelector('[data-loading]');
      return !el || el.hidden || document.documentElement.classList.contains('no-gpu');
    }, { timeout: 30000 })
    .catch(() => {});
  /* scroll to the end in screen steps so lazy images load and scroll animations play, then back to the top */
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    for (let i = 0; i < 80 && y < document.documentElement.scrollHeight; i++) {
      y += Math.round(window.innerHeight * 0.8);
      window.scrollTo(0, y);
      await wait(120);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await wait(400);
  });
  await page.evaluate(async () => {
    const shown = (el) => el.getClientRects().length > 0;
    const imgs = [...document.images].filter(shown);
    await Promise.race([
      Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true }) || img.addEventListener('error', r, { once: true }))))),
      new Promise((r) => setTimeout(r, 6000)),
    ]);
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 900));
  const data = await page.evaluate(() => {
    const shown = (el) => {
      if (!el.getClientRects().length) return false;
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden';
    };
    const links = [...document.querySelectorAll('a[href]')].filter(shown).map((a) => a.href);
    const broken = [...document.images]
      .filter(shown)
      .filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
      .map((img) => img.currentSrc || img.src);
    return { text: document.body.innerText, links, broken, height: document.documentElement.scrollHeight, title: document.title };
  });
  if (shotFile) await screenshot(page, vp, shotFile);
  await page.close();
  return { status, errors, ...data, text: normText(data.text), links: data.links.map(normalizeLink) };
}

async function screenshot(page, vp, file) {
  /* the wide screenshots are taken at half density so a full page stays a light JPG; the layout does not change */
  if (vp.width > 800) await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 0.5 });
  /* a full page capture never scrolls, so the scroll reveals would stay blank: show them for the picture only */
  await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;visibility:visible!important}' });
  await new Promise((r) => setTimeout(r, 500));
  let quality = 70;
  let buffer;
  do {
    buffer = await page.screenshot({ type: 'jpeg', quality, fullPage: true, captureBeyondViewport: true });
    quality -= 10;
  } while (buffer.length > 300 * 1024 && quality >= 20);
  writeFileSync(file, buffer);
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
  if (p.errors.length > o.errors.length) problems.push(`console errors: ${p.errors.slice(0, 3).join(' | ')}`);
  const diff = Math.abs(p.height - o.height) / o.height;
  if (diff > 0.02) problems.push(`height ${o.height} vs ${p.height} (${(diff * 100).toFixed(1)}%)`);
  return { pass: problems.length === 0, problems, heightDiff: diff };
}

/* ---------- run ---------- */
async function main() {
  const only = typeof args.only === 'string' ? args.only.split(',') : null;
  const wanted = typeof args.versions === 'string' ? args.versions.split(',') : ['astro', 'next'];
  const versions = wanted.filter((v) => existsSync(v === 'astro' ? ASTRO_DIST : NEXT_OUT));
  const pages = PAGES.filter((p) => !only || only.includes(p.id) || only.includes(p.type));
  const shotsDir = resolve(process.env.PARITY_SHOTS ?? join(root, 'review/all'));
  if (args.shots) mkdirSync(shotsDir, { recursive: true });

  const servers = [
    await serve(PORT_ORIGINAL, [['/', ORIGINAL]]),
    await serve(PORT_BUILDS, [
      ['/concepts/arcanae/next/', NEXT_OUT],
      ['/concepts/arcanae/', ASTRO_DIST],
    ]),
  ];
  if (args.serve) {
    /* --serve: only the servers, for a manual look; stop with Ctrl+C or after --serve=<seconds> */
    console.log(`serving on ${PORT_ORIGINAL} and ${PORT_BUILDS}`);
    const seconds = Number(args.serve) || 300;
    await new Promise((r) => setTimeout(r, seconds * 1000));
    servers.forEach((s) => s.close());
    return;
  }
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run', '--mute-audio'] });

  const rows = [];
  const jobs = [];
  for (const p of pages) for (const vp of WIDTHS) jobs.push({ p, vp });
  const shotName = (p, vp, v) => `${p.id.replace(/\//g, '-')}-${vp.name}-${v}.jpg`;

  let next = 0;
  const worker = async () => {
    while (next < jobs.length) {
      const { p, vp } = jobs[next++];
      const shoot = args.shots && SHOT_PAGES.includes(p.id);
      try {
        const o = await measure(browser, VERSIONS.original(p), vp, shoot && join(shotsDir, shotName(p, vp, 'original')));
        for (const v of versions) {
          const r = await measure(browser, VERSIONS[v](p), vp, shoot && join(shotsDir, shotName(p, vp, v)));
          const c = compare(o, r);
          rows.push({ page: p.id, width: vp.name, version: v, links: `${o.links.length}/${r.links.length}`, height: `${o.height}/${r.height}`, errors: `${o.errors.length}/${r.errors.length}`, broken: `${o.broken.length}/${r.broken.length}`, ...c });
          console.log(`${c.pass ? 'PASS' : 'FAIL'} ${v.padEnd(5)} ${vp.name.padEnd(4)} ${p.id}${c.pass ? '' : `\n     ${c.problems.join('\n     ')}`}`);
          if (o.errors.length) console.log(`     original console errors: ${o.errors.slice(0, 2).join(' | ')}`);
        }
      } catch (e) {
        rows.push({ page: p.id, width: vp.name, version: 'all', pass: false, problems: [String(e.message ?? e)] });
        console.log(`FAIL ${p.id} ${vp.name}: ${e.message ?? e}`);
      }
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  await browser.close();
  servers.forEach((s) => s.close());

  if (args.shots) {
    for (const p of PAGES.filter((x) => KEEP.includes(x.id)))
      for (const vp of WIDTHS)
        for (const v of ['original', ...versions]) {
          const f = join(shotsDir, shotName(p, vp, v));
          if (existsSync(f)) copyFileSync(f, join(root, 'review', shotName(p, vp, v)));
        }
  }

  rows.sort((a, b) => `${a.version}${a.page}${a.width}`.localeCompare(`${b.version}${b.page}${b.width}`));
  writeFileSync(join(root, 'review/parity.json'), JSON.stringify(rows, null, 2));
  const failed = rows.filter((r) => !r.pass);
  console.log(`\n${rows.length - failed.length}/${rows.length} checks pass`);
  process.exitCode = failed.length ? 1 : 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
