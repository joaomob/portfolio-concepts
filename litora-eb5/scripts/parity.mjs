// Parity check: every page of the original prototype against the same page of the Astro and the Next.js builds, at
// 1440x900 and 375x812. Compares the visible text, the links, the images, the console errors and the page height,
// then runs two behaviour checks (the scroll reveals and the form) and saves screenshots.
//
//   node scripts/parity.mjs                 every check
//   node scripts/parity.mjs --only=astro    the original against one build
//   node scripts/parity.mjs --shots=all     a full page screenshot of every page type, not only the key pages
//
// Servers (ports 4631 to 4633 only): 4631 the original (its src folder, pages under /site/), 4632 the Astro build at
// /concepts/litora-eb5/, 4633 the Next.js build at /concepts/litora-eb5/next/ with the Astro build next to it, because
// the Next.js pages take their media and calendar files from the Astro addresses.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const ORIGINAL = process.env.LITORA_SRC_ROOT ?? path.join(os.homedir(), 'Documents', 'flowforge', 'projects', 'eb5-real-estate', 'src');
const ASTRO_DIST = path.join(root, 'astro', 'dist');
const NEXT_OUT = path.join(root, 'next', 'out');
const REVIEW = path.join(root, 'review');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ASTRO_BASE = '/concepts/litora-eb5/';
const NEXT_BASE = '/concepts/litora-eb5/next/';
const HEIGHT_TOLERANCE = 0.02;
const PIXEL_TOLERANCE = 0.01; // share of the first screen pixels allowed to differ (a channel off by more than 24)

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const site = JSON.parse(fs.readFileSync(path.join(root, 'astro', 'src', 'data', 'site.json'), 'utf8'));
const pages = Object.entries(site.pages).flatMap(([pageId, langs]) => Object.entries(langs).map(([lang, entry]) => ({ pageId, lang, slug: entry.path.slice(1) })));
const widths = [{ name: '1440', width: 1440, height: 900, mobile: false }, { name: '375', width: 375, height: 812, mobile: true }];

// ---------- static server with clean URLs ----------

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ics': 'text/calendar', '.txt': 'text/plain', '.ico': 'image/x-icon' };

function serve(port, mounts) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    for (const [prefix, dir] of mounts) {
      if (!url.startsWith(prefix) && url !== prefix.replace(/\/$/, '')) continue;
      const rest = url.slice(prefix.length);
      const candidates = [rest, `${rest}.html`, path.posix.join(rest, 'index.html')].filter((c) => c !== '');
      if (rest === '' || url === prefix.replace(/\/$/, '')) candidates.push('index.html');
      for (const c of candidates) {
        const file = path.join(dir, c);
        if (file.startsWith(dir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
          res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
          fs.createReadStream(file).pipe(res);
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
  { name: 'original', port: 4631, url: (slug) => `http://127.0.0.1:4631/site/${slug}.html`, base: '/site/' },
  { name: 'astro', port: 4632, url: (slug) => `http://127.0.0.1:4632${ASTRO_BASE}${slug}`, base: ASTRO_BASE },
  { name: 'next', port: 4633, url: (slug) => `http://127.0.0.1:4633${NEXT_BASE}${slug}`, base: NEXT_BASE },
].filter((v) => v.name === 'original' || !args.only || args.only === v.name);

// ---------- what a page shows ----------

// a link target without the origin, the base of its build and .html, so the three versions compare
function normalizeLink(href, version) {
  const u = new URL(href);
  if (!['127.0.0.1', 'localhost'].includes(u.hostname)) return href;
  let p = u.pathname;
  for (const base of [version.base, NEXT_BASE, ASTRO_BASE, '/site/']) if (p.startsWith(base)) { p = p.slice(base.length); break; }
  return p.replace(/\.html$/, '') + u.hash;
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
  });
}

async function measure(browser, version, slug, vp, { motion = false } = {}) {
  const page = await browser.newPage();
  const errors = [];
  const external = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  page.on('request', (r) => { const h = new URL(r.url()).hostname; if (!['127.0.0.1', 'localhost'].includes(h) && !r.url().startsWith('data:')) external.push(r.url()); });
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile, hasTouch: vp.mobile, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: motion ? 'no-preference' : 'reduce' }]);
  await page.goto(version.url(slug), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await scrollThrough(page);
  if (motion) {
    await new Promise((r) => setTimeout(r, 1500));
    await scrollThrough(page);
    await new Promise((r) => setTimeout(r, 1500));
  }
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 200));
  const data = await page.evaluate(() => ({
    text: document.body.innerText.replace(/\s+/g, ' ').trim(),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
    images: [...document.images].map((img) => ({ src: img.currentSrc || img.src, ok: img.complete && img.naturalWidth > 0 })),
    height: document.documentElement.scrollHeight,
    title: document.title,
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    reveals: [...document.querySelectorAll('[data-reveal]')].map((el) => el.getAttribute('data-reveal')),
    motionClass: document.documentElement.classList.contains('js-motion'),
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

function compare(orig, other) {
  const problems = [];
  if (orig.text !== other.text) problems.push(`text differs ${firstDifference(orig.text, other.text)}`);
  if (orig.links.length !== other.links.length) problems.push(`links ${orig.links.length} vs ${other.links.length}`);
  else orig.links.forEach((l, i) => { if (l !== other.links[i]) problems.push(`link ${i}: ${l} vs ${other.links[i]}`); });
  const broken = other.images.filter((img) => !img.ok);
  if (broken.length) problems.push(`broken images: ${broken.map((b) => b.src).join(', ')}`);
  if (orig.images.length !== other.images.length) problems.push(`images ${orig.images.length} vs ${other.images.length}`);
  if (other.errors.length) problems.push(`console errors: ${other.errors.join(' | ')}`);
  if (other.external.length) problems.push(`requests to other hosts: ${other.external.join(', ')}`);
  const drift = Math.abs(orig.height - other.height) / orig.height;
  if (drift > HEIGHT_TOLERANCE) problems.push(`height ${orig.height} vs ${other.height} (${(drift * 100).toFixed(1)}%)`);
  if (other.robots !== 'noindex') problems.push('no robots noindex');
  if (!other.canonical.startsWith('https://joaomob.com/concepts/litora-eb5/')) problems.push(`canonical ${other.canonical}`);
  return { problems, drift };
}

// share of pixels that differ between two PNG screenshots of the same size, measured in a canvas of a blank page
let diffPage;
async function pixelDiff(a, b) {
  diffPage ??= await browser.newPage();
  return diffPage.evaluate(async (pa, pb) => {
    const load = (src) => new Promise((resolve) => { const img = new Image(); img.onload = () => resolve(img); img.src = `data:image/png;base64,${src}`; });
    const [ia, ib] = await Promise.all([load(pa), load(pb)]);
    if (ia.width !== ib.width || ia.height !== ib.height) return { share: 1, box: 'size' };
    const pixelsOf = (img) => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
    const da = pixelsOf(ia), db = pixelsOf(ib);
    let differ = 0;
    const box = [Infinity, Infinity, -1, -1];
    for (let i = 0; i < da.length; i += 4) {
      if (Math.abs(da[i] - db[i]) > 24 || Math.abs(da[i + 1] - db[i + 1]) > 24 || Math.abs(da[i + 2] - db[i + 2]) > 24) {
        differ += 1;
        const x = (i / 4) % ia.width, y = Math.floor(i / 4 / ia.width);
        box[0] = Math.min(box[0], x); box[1] = Math.min(box[1], y); box[2] = Math.max(box[2], x); box[3] = Math.max(box[3], y);
      }
    }
    return { share: differ / (da.length / 4), box: differ ? box.join(',') : '' };
  }, a, b);
}

// ---------- behaviour checks ----------

// with motion allowed, scrolling the whole page must show every entry (data-reveal="seen")
async function motionCheck(browser, version, slug, vp) {
  const { page, data } = await measure(browser, version, slug, vp, { motion: true });
  await page.close();
  const unseen = data.reveals.filter((r) => r !== 'seen').length;
  const problems = [];
  if (!data.motionClass) problems.push('js-motion class missing (the motion library did not start)');
  if (unseen) problems.push(`${unseen} of ${data.reveals.length} entries never revealed`);
  const ownErrors = data.errors.filter((e) => !(version.name === 'original' && /cdnjs/.test(e)));
  if (ownErrors.length) problems.push(`console errors: ${ownErrors.join(' | ')}`);
  return problems;
}

// the form: an empty submit shows the messages and stays; a valid one goes to the thank you page without posting
async function formCheck(browser, version, slug, expected) {
  const page = await browser.newPage();
  const posts = [];
  page.on('request', (r) => { if (r.method() === 'POST') posts.push(r.url()); });
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(version.url(slug), { waitUntil: 'load' });
  const problems = [];
  await page.click('form[data-hubspot-form] button[type="submit"]');
  await new Promise((r) => setTimeout(r, 300));
  const shown = await page.$$eval('form [data-form-error]', (els) => els.filter((e) => e.textContent.trim()).length);
  if (!shown) problems.push('empty submit showed no message');
  if (!page.url().includes(slug)) problems.push(`empty submit left the page (${page.url()})`);
  await page.evaluate(() => {
    const form = document.querySelector('form[data-hubspot-form]');
    const set = (input, value) => { input.value = value; input.dispatchEvent(new Event('input', { bubbles: true })); };
    form.querySelectorAll('input[data-form-text]').forEach((input) => {
      set(input, input.type === 'email' ? 'ana@example.com' : input.type === 'tel' ? '+55 11 98765 4321' : 'Ana Souza');
    });
    form.querySelectorAll('[data-form-group]').forEach((group) => { group.querySelector('input').checked = true; });
    form.querySelectorAll('input[data-form-check]').forEach((box) => { box.checked = true; });
  });
  await Promise.all([page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => null), page.click('form[data-hubspot-form] button[type="submit"]')]);
  const landed = normalizeLink(page.url(), version);
  if (landed !== expected) problems.push(`valid submit went to ${landed}, expected ${expected}`);
  if (version.name !== 'original' && posts.length) problems.push(`posted to ${posts.join(', ')}`);
  await page.close();
  return problems;
}

// ---------- run ----------

const servers = [
  await serve(4631, [['/', ORIGINAL]]),
  await serve(4632, [[ASTRO_BASE, ASTRO_DIST]]),
  await serve(4633, [[NEXT_BASE, NEXT_OUT], [ASTRO_BASE, ASTRO_DIST]]),
];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });

// the key pages kept in git in review/; with --shots=all every page type goes to review/all/ (ignored by git)
const keyShots = new Set(['webinar pt-BR', 'webinar-thank-you pt-BR']);
const typeShots = new Set(['webinar pt-BR', 'event pt-BR', 'webinar-thank-you pt-BR', 'event-thank-you pt-BR', 'privacy pt-BR']);
fs.mkdirSync(REVIEW, { recursive: true });
if (args.shots === 'all') fs.mkdirSync(path.join(REVIEW, 'all'), { recursive: true });

const rows = [];
let failures = 0;
for (const p of pages) {
  for (const vp of widths) {
    const results = {};
    for (const version of versions) {
      const { page, data } = await measure(browser, version, p.slug, vp);
      // the first screen as PNG, compared pixel by pixel with the original below
      data.firstScreen = await page.screenshot({ type: 'png', encoding: 'base64' });
      results[version.name] = data;
      const id = `${p.pageId} ${p.lang}`;
      if (keyShots.has(id)) {
        await page.screenshot({ path: path.join(REVIEW, `${p.pageId}-${vp.name}-${version.name}.jpg`), type: 'jpeg', quality: 60 });
      }
      if (args.shots === 'all' && typeShots.has(id)) {
        await page.screenshot({ path: path.join(REVIEW, 'all', `${p.pageId}-${vp.name}-${version.name}.jpg`), type: 'jpeg', quality: 45, fullPage: true });
      }
      await page.close();
    }
    for (const version of versions.filter((v) => v.name !== 'original')) {
      const { problems, drift } = compare(results.original, results[version.name]);
      // an error of the original itself is a note, not a failure of the build
      const notes = results.original.errors.map((e) => `note, original console error: ${e}`);
      if (problems.length) failures += 1;
      const { share: pixels, box } = await pixelDiff(results.original.firstScreen, results[version.name].firstScreen);
      if (pixels > PIXEL_TOLERANCE) problems.push(`first screen: ${(pixels * 100).toFixed(2)}% of the pixels differ, inside x1,y1,x2,y2 ${box}`);
      const samePixels = `${(pixels * 100).toFixed(2)}%${box ? ` (box ${box})` : ''}`;
      rows.push({ page: p.slug, width: vp.name, build: version.name, pass: !problems.length, samePixels, height: `${results.original.height}/${results[version.name].height}`, drift: `${(drift * 100).toFixed(2)}%`, problems: [...problems, ...notes] });
    }
  }
}

console.log('\npage | width | build | pass | height original/build | drift | first screen pixels that differ');
for (const r of rows) {
  console.log(`${r.page} | ${r.width} | ${r.build} | ${r.pass ? 'pass' : 'FAIL'} | ${r.height} | ${r.drift} | ${r.samePixels}`);
  r.problems.forEach((problem) => console.log(`    ${problem}`));
}

// behaviour: reveals with motion on the webinar and the event pages at both widths, the form on both form pages
console.log('\nbehaviour');
const behaviour = [];
for (const p of pages.filter((x) => ['webinar', 'event'].includes(x.pageId) && x.lang === 'pt-BR')) {
  for (const version of versions) {
    for (const vp of widths) {
      const problems = await motionCheck(browser, version, p.slug, vp);
      behaviour.push({ check: `motion ${vp.name}`, page: p.slug, build: version.name, problems });
    }
    const thanks = pages.find((x) => x.pageId === `${p.pageId}-thank-you` && x.lang === p.lang).slug;
    behaviour.push({ check: 'form', page: p.slug, build: version.name, problems: await formCheck(browser, version, p.slug, thanks) });
  }
}
for (const b of behaviour) {
  const fail = b.problems.length && b.build !== 'original';
  if (fail) failures += 1;
  console.log(`${b.check} | ${b.page} | ${b.build} | ${b.problems.length ? (b.build === 'original' ? 'note' : 'FAIL') : 'pass'}`);
  b.problems.forEach((problem) => console.log(`    ${problem}`));
}

fs.writeFileSync(path.join(REVIEW, 'parity.json'), `${JSON.stringify({ date: new Date().toISOString(), rows, behaviour }, null, 2)}\n`);
await browser.close();
servers.forEach((s) => s.close());
console.log(`\n${failures ? `${failures} failing` : 'every check passes'}`);
process.exit(failures ? 1 : 0);
