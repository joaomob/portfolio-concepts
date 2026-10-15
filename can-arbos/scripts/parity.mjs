// Parity check: every page of the original prototype against the same page of the Astro and the Next.js builds.
//
//   node scripts/parity.mjs                 all pages, both builds, 1440 and 375
//   node scripts/parity.mjs --only=astro    one build only (astro or next)
//   node scripts/parity.mjs --pages=index,aljub
//   node scripts/parity.mjs --shots=DIR     also saves a full page JPG of every run into DIR
//
// It compares the visible text, the links (count and targets), broken images, console errors and the document height
// (within 2%). Pages load with reduced motion, so every version shows its final state; a second, short pass with motion
// on only collects console errors. The original asks a CDN for its date picker (Cally); that request is blocked so the
// three versions show the same native date fields (see REPORT.md).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const CASE = path.resolve(here, '..');
const ORIGINAL = path.resolve(CASE, '../../flowforge/projects/can-arbos/src');
const ASTRO = path.join(CASE, 'astro/dist');
const NEXT = path.join(CASE, 'next/out');
const BASE = '/concepts/can-arbos';
const PORT_ORIGINAL = 4621;
const PORT_BUILDS = 4622;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const WIDTHS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '375', width: 375, height: 812, isMobile: true, hasTouch: true },
];

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const builds = args.only ? [args.only] : ['astro', 'next'];
const shotsDir = args.shots ? path.resolve(args.shots) : null;

// ---- a tiny static server with clean URLs -------------------------------------------------------------------------

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

/** mounts: [[url prefix, folder]], the longest prefix first. */
function serve(port, mounts) {
  mounts.sort((a, b) => b[0].length - a[0].length);
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const mount = mounts.find(([prefix]) => url === prefix || url.startsWith(prefix.endsWith('/') ? prefix : prefix + '/'));
    if (!mount) return res.writeHead(404).end('not found');
    const rest = url.slice(mount[0].length).replace(/^\/+/, '');
    const file = path.join(mount[1], rest);
    const tries = [file, file + '.html', path.join(file, 'index.html')];
    const hit = tries.find((f) => f.startsWith(mount[1]) && fs.existsSync(f) && fs.statSync(f).isFile());
    if (!hit) return res.writeHead(404, { 'content-type': 'text/html' }).end('<h1>404</h1>');
    res.writeHead(200, { 'content-type': TYPES[path.extname(hit)] || 'application/octet-stream' });
    fs.createReadStream(hit).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

// ---- pages ----------------------------------------------------------------------------------------------------------

const allPages = fs.readdirSync(path.join(ORIGINAL, 'site')).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5)).sort();
const pages = args.pages ? args.pages.split(',') : allPages;

/** The slug of a page in the builds: index is the Home, index-es the Spanish Home at /es. */
const slugOf = (name) => ({ index: '', 'index-es': 'es' })[name] ?? name;

function urlOf(version, name) {
  if (version === 'original') return `http://127.0.0.1:${PORT_ORIGINAL}/site/${name}.html`;
  const root = version === 'astro' ? BASE : `${BASE}/next`;
  const slug = slugOf(name);
  return `http://127.0.0.1:${PORT_BUILDS}${root}${slug ? '/' + slug : ''}`;
}

/** A link target in one shape for the three versions: the page slug and the hash, or the full external address. */
function normalizeLink(href) {
  let u;
  try { u = new URL(href); } catch { return href; }
  if (!/^127\.0\.0\.1$/.test(u.hostname)) return u.href;
  let p = u.pathname.replace(/\.html$/, '');
  p = p.replace(/^\/site\//, '/').replace(new RegExp(`^${BASE}/next(?=/|$)`), '').replace(new RegExp(`^${BASE}(?=/|$)`), '');
  p = p.replace(/\/index$/, '/').replace(/^\/index-es$/, '/es');
  return (p.replace(/\/$/, '') || '/') + u.search + u.hash;
}

// ---- measuring one page ---------------------------------------------------------------------------------------------

async function measure(browser, version, name, size, { motion = false } = {}) {
  const page = await browser.newPage();
  const errors = [];
  await page.setViewport({ width: size.width, height: size.height, isMobile: !!size.isMobile, hasTouch: !!size.hasTouch });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: motion ? 'no-preference' : 'reduce' }]);
  await page.setRequestInterception(true);
  page.on('request', (req) => (req.url().includes('cdn.jsdelivr.net') ? req.abort() : req.continue()));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    // the blocked Cally request of the original
    if (version === 'original' && /ERR_FAILED|jsdelivr|Failed to fetch dynamically imported module/.test(text)) return;
    errors.push(text);
  });
  page.on('pageerror', (err) => errors.push(String(err.message || err)));
  page.on('requestfailed', (req) => {
    if (!req.url().includes('cdn.jsdelivr.net')) errors.push(`request failed: ${req.url()}`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().includes('favicon')) errors.push(`${res.status()}: ${res.url()}`);
  });

  await page.goto(urlOf(version, name), { waitUntil: 'networkidle0', timeout: 60000 });
  if (motion) {
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await page.close();
    return { errors };
  }

  // every photo loads, lazy or not, before anything is measured
  const images = await page.evaluate(async () => {
    const all = [...document.images];
    all.forEach((img) => { img.loading = 'eager'; });
    await Promise.all(all.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 8000); }))));
    return all.map((img) => ({ src: img.currentSrc || img.src, ok: img.complete && img.naturalWidth > 0 }));
  });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 300));

  const data = await page.evaluate(() => ({
    text: document.body.innerText.replace(/\s+/g, ' ').trim(),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
    height: document.documentElement.scrollHeight,
  }));
  data.links = data.links.map(normalizeLink).sort();
  data.broken = images.filter((i) => !i.ok).map((i) => i.src);
  data.errors = errors;

  if (shotsDir) {
    fs.mkdirSync(shotsDir, { recursive: true });
    await page.screenshot({ path: path.join(shotsDir, `${name}-${size.name}-${version}.jpg`), type: 'jpeg', quality: 45, fullPage: true });
  }
  await page.close();
  return data;
}

function firstDifference(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return `at ${i}: original "${a.slice(Math.max(0, i - 40), i + 60)}" | build "${b.slice(Math.max(0, i - 40), i + 60)}"`;
}

function compare(orig, build) {
  const problems = [];
  if (orig.text !== build.text) problems.push(`text differs ${firstDifference(orig.text, build.text)}`);
  if (orig.links.length !== build.links.length) problems.push(`links ${orig.links.length} vs ${build.links.length}`);
  const missing = orig.links.filter((l, i) => l !== build.links[i]);
  if (missing.length && orig.links.length === build.links.length) {
    const diff = orig.links.map((l, i) => [l, build.links[i]]).filter(([a, b]) => a !== b).slice(0, 4);
    problems.push(`link targets differ: ${diff.map(([a, b]) => `${a} -> ${b}`).join(', ')}`);
  } else if (orig.links.length !== build.links.length) {
    const a = new Set(orig.links); const b = new Set(build.links);
    const onlyOrig = [...a].filter((l) => !b.has(l)).slice(0, 4);
    const onlyBuild = [...b].filter((l) => !a.has(l)).slice(0, 4);
    problems.push(`only original: ${onlyOrig.join(' ')} | only build: ${onlyBuild.join(' ')}`);
  }
  if (build.broken.length) problems.push(`broken images: ${build.broken.slice(0, 3).join(' ')}`);
  if (build.errors.length) problems.push(`console: ${build.errors.slice(0, 3).join(' | ')}`);
  const delta = Math.abs(build.height - orig.height) / orig.height;
  if (delta > 0.02) problems.push(`height ${orig.height} vs ${build.height} (${(delta * 100).toFixed(1)}%)`);
  return { pass: problems.length === 0, problems, delta };
}

// ---- run ------------------------------------------------------------------------------------------------------------

const servers = [
  await serve(PORT_ORIGINAL, [['/', ORIGINAL]]),
  await serve(PORT_BUILDS, [[BASE, ASTRO], [`${BASE}/next`, NEXT]]),
];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });
const rows = [];
try {
  for (const name of pages) {
    for (const size of WIDTHS) {
      const orig = await measure(browser, 'original', name, size);
      if (orig.errors.length || orig.broken.length) console.log(`  note ${name} ${size.name} original: ${[...orig.errors, ...orig.broken].join(' | ')}`);
      for (const version of builds) {
        const build = await measure(browser, version, name, size);
        const motion = await measure(browser, version, name, size, { motion: true });
        build.errors.push(...motion.errors.map((e) => `motion: ${e}`));
        const result = compare(orig, build);
        rows.push({ name, width: size.name, version, ...result });
        console.log(`${result.pass ? 'PASS' : 'FAIL'} ${name} ${size.name} ${version} (height ${(result.delta * 100).toFixed(2)}%)`);
        result.problems.forEach((p) => console.log(`    ${p}`));
      }
    }
  }
} finally {
  await browser.close();
  servers.forEach((s) => s.close());
}

const failed = rows.filter((r) => !r.pass);
console.log(`\n${rows.length - failed.length} of ${rows.length} checks pass`);
fs.writeFileSync(path.join(CASE, 'review', 'parity.json'), JSON.stringify(rows.map(({ problems, ...r }) => ({ ...r, problems })), null, 2));
process.exit(failed.length ? 1 : 0);
