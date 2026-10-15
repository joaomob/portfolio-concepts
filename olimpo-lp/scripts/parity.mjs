// Parity check: every page of the original prototype against the same page of the Astro and the Next.js builds, at
// 1440x900 and 375x812. Compares the visible text, the links, the images, the inline SVG markup, the console errors
// and the page height, then saves screenshots to review/.
//
//   node scripts/parity.mjs                 every check
//   node scripts/parity.mjs --only=astro    the original against one build
//
// Servers (ports 4641 to 4643 only): 4641 the original (flowforge/projects/olimpo/src), 4642 the Astro build at
// /concepts/olimpo-lp/, 4643 the Next.js build at /concepts/olimpo-lp/next/ with the Astro build next to it, because
// the Next.js pages take their media from the Astro addresses.
//
// Measured with prefers-reduced-motion: reduce, so every section is in its final, readable state (the scroll scenes
// and reveals of olimpo.js stand still). Google Fonts is blocked for the original style guide: the port cannot load
// it under the CSP of /concepts, so both are compared with the same fallback fonts.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const ORIGINAL = process.env.OLIMPO_SRC_ROOT ?? path.join(os.homedir(), 'Documents', 'flowforge', 'projects', 'olimpo', 'src');
const ASTRO_DIST = path.join(root, 'astro', 'dist');
const NEXT_OUT = path.join(root, 'next', 'out');
const REVIEW = path.join(root, 'review');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ASTRO_BASE = '/concepts/olimpo-lp/';
const NEXT_BASE = '/concepts/olimpo-lp/next/';
const HEIGHT_TOLERANCE = 0.02;

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
// slug '' is the home; the _lab folder of the original is out of scope
const pages = [{ id: 'home', slug: '' }, { id: 'style-guide', slug: 'style-guide' }];
const widths = [{ name: '1440', width: 1440, height: 900, mobile: false }, { name: '375', width: 375, height: 812, mobile: true }];

// ---------- static server with clean URLs ----------

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.txt': 'text/plain', '.ico': 'image/x-icon', '.riv': 'application/octet-stream' };

// The original style guide is a fragment with no viewport meta, so a phone lays it out 980 px wide and scales it
// down. The port adds the meta. To compare like for like at 375, the original is served with the same meta in
// front (it stays in quirks mode, as there is still no doctype). REPORT.md records the difference.
const VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
function patchOriginal(file, buf) {
  if (path.basename(file) === 'style-guide.html' && !buf.includes('name="viewport"')) return Buffer.concat([Buffer.from(VIEWPORT_META), buf]);
  return buf;
}

function serve(port, mounts, { patch = null } = {}) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    for (const [prefix, dir] of mounts) {
      if (!url.startsWith(prefix) && url !== prefix.replace(/\/$/, '')) continue;
      const rest = url === prefix.replace(/\/$/, '') ? '' : url.slice(prefix.length);
      const candidates = rest === '' ? ['index.html'] : [rest, `${rest}.html`, path.posix.join(rest, 'index.html')];
      for (const c of candidates) {
        const file = path.join(dir, c);
        if (file.startsWith(dir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
          const size = fs.statSync(file).size;
          const type = TYPES[path.extname(file)] ?? 'application/octet-stream';
          // videos need byte ranges, or Chrome will not play them
          const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
          if (patch && file.endsWith('.html')) {
            const buf = patch(file, fs.readFileSync(file));
            res.writeHead(200, { 'Content-Type': type, 'Content-Length': buf.length });
            res.end(buf);
          } else if (range) {
            const start = range[1] ? Number(range[1]) : 0;
            const end = range[2] ? Number(range[2]) : size - 1;
            res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
            fs.createReadStream(file, { start, end }).pipe(res);
          } else {
            res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
            fs.createReadStream(file).pipe(res);
          }
          return;
        }
      }
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

const versions = [
  { name: 'original', url: (slug) => `http://127.0.0.1:4641/${slug}`, base: '/' },
  { name: 'astro', url: (slug) => `http://127.0.0.1:4642${ASTRO_BASE}${slug}`, base: ASTRO_BASE },
  { name: 'next', url: (slug) => `http://127.0.0.1:4643${NEXT_BASE}${slug}`, base: NEXT_BASE },
].filter((v) => v.name === 'original' || !args.only || args.only === v.name);

// ---------- what a page shows ----------

// a link target without the origin, the base of its build and .html, so the three versions compare
function normalizeLink(href, version) {
  const u = new URL(href);
  if (!['127.0.0.1', 'localhost'].includes(u.hostname)) return href;
  let p = u.pathname;
  for (const base of [version.base, NEXT_BASE, ASTRO_BASE, ASTRO_BASE.replace(/\/$/, ''), '/']) if (p.startsWith(base)) { p = p.slice(base.length); break; }
  p = p.replace(/\.html$/, '').replace(/^index$/, '');
  return p + u.hash;
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function measure(browser, version, slug, vp) {
  const page = await browser.newPage();
  const errors = [];
  const external = [];
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    const h = new URL(r.url()).hostname;
    if (/fonts\.(googleapis|gstatic)\.com$/.test(h)) { r.abort(); return; }
    if (!['127.0.0.1', 'localhost'].includes(h) && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) external.push(r.url());
    r.continue();
  });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('requestfailed', (r) => { if (!/fonts\.(googleapis|gstatic)/.test(r.url())) errors.push(`failed ${r.url()} ${r.failure()?.errorText ?? ''}`); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(version.url(slug), { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // the preloader of the home holds the first screen for about 1.4 s on a fresh tab
  await new Promise((r) => setTimeout(r, 2200));
  await scrollThrough(page);
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 5000); }))));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  // the original of the style guide runs in quirks mode (no doctype), where body carries the page height
  const data = await page.evaluate(() => ({
    text: document.body.innerText.replace(/\s+/g, ' ').trim(),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
    // an image that is not rendered (the dark theme twin, display none) is never fetched when lazy; it is not broken
    images: [...document.images].map((img) => ({ src: img.currentSrc || img.src, ok: (img.complete && img.naturalWidth > 0) || (img.loading === 'lazy' && img.getClientRects().length === 0) })),
    // the streak counter of the original is drawn by lottie-web from a CDN; lottie-web is not installed here, so the
    // port shows the counter without that drawing and the Lottie SVG is left out of the comparison
    // whitespace between SVG tags draws nothing; JSX drops it, so it is left out of the comparison
    svgs: [...document.querySelectorAll('svg')].filter((s) => !s.querySelector('[id^="__lottie_element"]')).map((s) => s.innerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()),
    lottie: document.querySelectorAll('svg [id^="__lottie_element"]').length > 0,
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    title: document.title,
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  }));
  data.links = data.links.map((l) => normalizeLink(l, version));
  data.errors = errors;
  data.external = external;
  return { page, data };
}

function firstDifference(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i += 1;
  return `at ${i}: "${a.slice(Math.max(0, i - 40), i + 60)}" vs "${b.slice(Math.max(0, i - 40), i + 60)}"`;
}

function compare(orig, other, version) {
  const problems = [];
  if (orig.text !== other.text) problems.push(`text differs ${firstDifference(orig.text, other.text)}`);
  if (orig.links.length !== other.links.length) problems.push(`links ${orig.links.length} vs ${other.links.length}`);
  else orig.links.forEach((l, i) => { if (l !== other.links[i]) problems.push(`link ${i}: ${l} vs ${other.links[i]}`); });
  const broken = other.images.filter((img) => !img.ok);
  if (broken.length) problems.push(`broken images: ${broken.map((b) => b.src).join(', ')}`);
  if (orig.images.length !== other.images.length) problems.push(`images ${orig.images.length} vs ${other.images.length}`);
  if (orig.svgs.length !== other.svgs.length) {
    const i = orig.svgs.findIndex((x, k) => x !== other.svgs[k]);
    problems.push(`svgs ${orig.svgs.length} vs ${other.svgs.length}, first difference at ${i}: "${orig.svgs[i]?.slice(0, 160)}"`);
  }
  else orig.svgs.forEach((s, i) => { if (s !== other.svgs[i]) problems.push(`svg ${i} differs ${firstDifference(s, other.svgs[i])}`); });
  if (other.errors.length) problems.push(`console errors: ${other.errors.join(' | ')}`);
  if (other.external.length) problems.push(`requests to other hosts: ${other.external.join(', ')}`);
  const drift = Math.abs(orig.height - other.height) / orig.height;
  if (drift > HEIGHT_TOLERANCE) problems.push(`height ${orig.height} vs ${other.height} (${(drift * 100).toFixed(1)}%)`);
  if (other.robots !== 'noindex') problems.push('no robots noindex');
  const mount = version.name === 'next' ? 'https://joaomob.com/concepts/olimpo-lp/next' : 'https://joaomob.com/concepts/olimpo-lp';
  if (!other.canonical.startsWith(mount)) problems.push(`canonical ${other.canonical}`);
  return { problems, drift };
}

// ---------- run ----------

const servers = [
  await serve(4641, [['/', ORIGINAL]], { patch: patchOriginal }),
  await serve(4642, [[ASTRO_BASE, ASTRO_DIST]]),
  await serve(4643, [[NEXT_BASE, NEXT_OUT], [ASTRO_BASE, ASTRO_DIST]]),
];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
fs.mkdirSync(REVIEW, { recursive: true });

const rows = [];
let failures = 0;
for (const p of pages) {
  for (const vp of widths) {
    const results = {};
    for (const version of versions) {
      const { page, data } = await measure(browser, version, p.slug, vp);
      results[version.name] = data;
      // the first screen of every page and width, small JPGs kept in git
      await page.screenshot({ path: path.join(REVIEW, `${p.id}-${vp.name}-${version.name}.jpg`), type: 'jpeg', quality: 55 });
      if (args.shots === 'full') {
        fs.mkdirSync(path.join(REVIEW, 'full'), { recursive: true });
        await page.screenshot({ path: path.join(REVIEW, 'full', `${p.id}-${vp.name}-${version.name}.jpg`), type: 'jpeg', quality: 40, fullPage: true });
      }
      await page.close();
    }
    for (const version of versions.filter((v) => v.name !== 'original')) {
      const { problems, drift } = compare(results.original, results[version.name], version);
      // an error or a CDN request of the original itself is a note, not a failure of the build
      const notes = [
        ...results.original.errors.map((e) => `note, original console error: ${e}`),
        ...(results.original.lottie && !results[version.name].lottie ? ['note, the original draws the streak counter with lottie-web from a CDN; the build shows it without that drawing'] : []),
        ...(results.original.external.length ? [`note, the original loads from other hosts: ${results.original.external.map((u) => u.replace(/^https?:\/\//, '')).join(', ')}`] : []),
      ];
      if (problems.length) failures += 1;
      rows.push({ page: p.id, width: vp.name, build: version.name, pass: !problems.length, height: `${results.original.height}/${results[version.name].height}`, drift: `${(drift * 100).toFixed(2)}%`, links: results[version.name].links.length, images: results[version.name].images.length, svgs: results[version.name].svgs.length, problems, notes });
    }
  }
}

console.log('\npage | width | build | pass | height original/build | drift | links | images | svgs');
for (const r of rows) {
  console.log(`${r.page} | ${r.width} | ${r.build} | ${r.pass ? 'pass' : 'FAIL'} | ${r.height} | ${r.drift} | ${r.links} | ${r.images} | ${r.svgs}`);
  r.problems.forEach((problem) => console.log(`    ${problem}`));
  r.notes.forEach((note) => console.log(`    ${note}`));
}

// behaviour: the home with motion allowed, scrolled top to bottom twice; the scroll scenes, the vase and the
// reveals must run without a console error, and every [data-reveal] element must end visible
console.log('\nbehaviour, home with motion');
const behaviour = [];
for (const version of versions) {
  for (const vp of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
    await page.goto(version.url(''), { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    await scrollThrough(page);
    await new Promise((r) => setTimeout(r, 1000));
    await scrollThrough(page);
    await new Promise((r) => setTimeout(r, 1000));
    const state = await page.evaluate(() => ({
      hidden: [...document.querySelectorAll('[data-reveal]')].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
      reveals: document.querySelectorAll('[data-reveal]').length,
      canvas: document.querySelectorAll('canvas').length,
    }));
    await page.close();
    const problems = [...errors.map((e) => `console error: ${e}`), ...(state.hidden ? [`${state.hidden} of ${state.reveals} reveals not visible`] : [])];
    if (problems.length && version.name !== 'original') failures += 1;
    behaviour.push({ build: version.name, width: vp.name, canvas: state.canvas, problems });
    console.log(`${version.name} | ${vp.name} | ${problems.length ? (version.name === 'original' ? 'note' : 'FAIL') : 'pass'} | canvas ${state.canvas}`);
    problems.forEach((p) => console.log(`    ${p}`));
  }
}

fs.writeFileSync(path.join(REVIEW, 'parity.json'), `${JSON.stringify({ date: new Date().toISOString(), rows, behaviour }, null, 2)}\n`);
await browser.close();
servers.forEach((s) => s.close());
console.log(`\n${failures ? `${failures} failing` : 'every check passes'}`);
process.exit(failures ? 1 : 0);
