// Parity check: every page of the original prototype against the same page of the Astro and the Next.js builds, at
// 1440x900 and 375x812. Compares the visible text, the links, the images, the inline SVG markup, the console errors
// and the page height, then saves screenshots to review/.
//
//   node scripts/parity.mjs                 every check
//   node scripts/parity.mjs --only=astro    the original against one build
//
// Servers (ports 4644 to 4646 only): 4644 the original (flowforge/projects/redline-md/src), 4645 the Astro build at
// /concepts/redline-md/, 4646 the Next.js build at /concepts/redline-md/next/ with the Astro build next to it, because
// the Next.js pages take their media from the Astro addresses.
//
// Measured with prefers-reduced-motion: reduce, so every reveal is in its final, readable state. The original loads
// Finsweet Attributes, Finsweet Cookie Consent and Figtree from CDNs, and they are let through: the ports replace them
// with local code and local font files, and the comparison is against what the original really shows. Those requests
// are listed as notes.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const ORIGINAL = process.env.REDLINE_SRC_ROOT ?? path.join(os.homedir(), 'Documents', 'flowforge', 'projects', 'redline-md', 'src');
const ASTRO_DIST = path.join(root, 'astro', 'dist');
const NEXT_OUT = path.join(root, 'next', 'out');
const REVIEW = path.join(root, 'review');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ASTRO_BASE = '/concepts/redline-md/';
const NEXT_BASE = '/concepts/redline-md/next/';
const HEIGHT_TOLERANCE = 0.02;

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
// slug '' is the home; the style guide is the second tab of the case study page, opened by its hash
const pages = [{ id: 'home', slug: '' }, { id: 'case-study', slug: 'case-study' }, { id: 'style-guide', slug: 'case-study#style-guide' }];
const widths = [{ name: '1440', width: 1440, height: 900, mobile: false }, { name: '375', width: 375, height: 812, mobile: true }];

// ---------- static server with clean URLs ----------

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.txt': 'text/plain', '.ico': 'image/x-icon', '.riv': 'application/octet-stream' };

function serve(port, mounts) {
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
          if (range) {
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
  { name: 'original', url: (slug) => `http://127.0.0.1:4644/${slug}`, base: '/' },
  { name: 'astro', url: (slug) => `http://127.0.0.1:4645${ASTRO_BASE}${slug}`, base: ASTRO_BASE },
  { name: 'next', url: (slug) => `http://127.0.0.1:4646${NEXT_BASE}${slug}`, base: NEXT_BASE },
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
    if (!['127.0.0.1', 'localhost'].includes(h) && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) external.push(r.url());
    r.continue();
  });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('requestfailed', (r) => { errors.push(`failed ${r.url()} ${r.failure()?.errorText ?? ''}`); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(version.url(slug), { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // Finsweet loads async from its CDN on the original; give it time to show the cookie banner and set the counters
  await new Promise((r) => setTimeout(r, 2000));
  await scrollThrough(page);
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 5000); }))));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  const data = await page.evaluate(() => ({
    // a closed accordion item reads as closed whatever hides it: the original's Finsweet sometimes leaves a closed
    // answer at display block with 0 height (innerText then includes it), the local stand-in sets display none
    text: (() => {
      const closed = [...document.querySelectorAll('[fs-accordion-element="content"]')].filter((el) => el.getBoundingClientRect().height === 0);
      const saved = closed.map((el) => el.style.display);
      closed.forEach((el) => { el.style.display = 'none'; });
      const text = document.body.innerText.replace(/\s+/g, ' ').trim();
      closed.forEach((el, i) => { el.style.display = saved[i]; });
      return text;
    })(),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
    // an image that is not rendered (the dark theme twin, display none) is never fetched when lazy; it is not broken
    images: [...document.images].map((img) => ({ src: img.currentSrc || img.src, ok: (img.complete && img.naturalWidth > 0) || (img.loading === 'lazy' && img.getClientRects().length === 0) })),
    // whitespace between SVG tags draws nothing; JSX drops it, so it is left out of the comparison
    svgs: [...document.querySelectorAll('svg')].map((s) => s.innerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()),
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
  const mount = version.name === 'next' ? 'https://joaomob.com/concepts/redline-md/next' : 'https://joaomob.com/concepts/redline-md';
  if (!other.canonical.startsWith(mount)) problems.push(`canonical ${other.canonical}`);
  return { problems, drift };
}

// ---------- run ----------

const servers = [
  await serve(4644, [['/', ORIGINAL]]),
  await serve(4645, [[ASTRO_BASE, ASTRO_DIST]]),
  await serve(4646, [[NEXT_BASE, NEXT_OUT], [ASTRO_BASE, ASTRO_DIST]]),
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
        ...(results.original.external.length ? [`note, the original loads from other hosts: ${[...new Set(results.original.external.map((u) => { const x = new URL(u); return `${x.hostname}${x.pathname.replace(/\/(dist|s)\/.*$/, '/$1/*')}`; }))].join(', ')}`] : []),
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

// behaviour: each page with motion allowed, scrolled top to bottom twice; the reveals and the counters must run
// without a console error, and every rendered [data-anim] element and [data-anim-group] child must end visible
console.log('\nbehaviour, with motion');
const behaviour = [];
for (const version of versions) {
  for (const p of pages) for (const vp of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
    await page.goto(version.url(p.slug), { waitUntil: 'load', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));
    await scrollThrough(page);
    await new Promise((r) => setTimeout(r, 1000));
    await scrollThrough(page);
    await new Promise((r) => setTimeout(r, 1000));
    const state = await page.evaluate(() => ({
      hidden: [...document.querySelectorAll('[data-anim], [data-anim-group] > *')].filter((el) => el.getClientRects().length && Number(getComputedStyle(el).opacity) < 0.99).length,
      reveals: [...document.querySelectorAll('[data-anim], [data-anim-group] > *')].filter((el) => el.getClientRects().length).length,
      counters: [...document.querySelectorAll('[fs-numbercount-element="number"]')].map((el) => el.textContent.trim()).join(' '),
    }));
    await page.close();
    const problems = [...errors.map((e) => `console error: ${e}`), ...(state.hidden ? [`${state.hidden} of ${state.reveals} reveals not visible`] : [])];
    if (problems.length && version.name !== 'original') failures += 1;
    behaviour.push({ build: version.name, page: p.id, width: vp.name, reveals: state.reveals, counters: state.counters, problems });
    console.log(`${version.name} | ${p.id} | ${vp.name} | ${problems.length ? (version.name === 'original' ? 'note' : 'FAIL') : 'pass'} | reveals ${state.reveals} | counters ${state.counters}`);
    problems.forEach((x) => console.log(`    ${x}`));
  }
}

fs.writeFileSync(path.join(REVIEW, 'parity.json'), `${JSON.stringify({ date: new Date().toISOString(), rows, behaviour }, null, 2)}\n`);
await browser.close();
servers.forEach((s) => s.close());
console.log(`\n${failures ? `${failures} failing` : 'every check passes'}`);
process.exit(failures ? 1 : 0);
