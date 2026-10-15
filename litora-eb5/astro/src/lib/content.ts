// Turns the content files into what the components render: one PageView per page and language, with the links, the
// photos (src, srcset and size from the image manifest) and the small derived values (numbers, ids, states) that the
// original prototype's build.mjs computed. Framework free on purpose: the Astro pages and the Next.js pages both call
// pageView() with their own base path, so the two builds render the same data the same way.
import siteJson from '../data/site.json';
import imagesJson from '../data/images.json';
import eventThankYouEn from '../data/content/event-thank-you.en-US.json';
import eventThankYouPt from '../data/content/event-thank-you.pt-BR.json';
import eventEn from '../data/content/event.en-US.json';
import eventPt from '../data/content/event.pt-BR.json';
import globalEn from '../data/content/global.en-US.json';
import globalPt from '../data/content/global.pt-BR.json';
import privacyEn from '../data/content/privacy.en-US.json';
import privacyPt from '../data/content/privacy.pt-BR.json';
import thankYouEn from '../data/content/thank-you.en-US.json';
import thankYouPt from '../data/content/thank-you.pt-BR.json';
import webinarEn from '../data/content/webinar.en-US.json';
import webinarPt from '../data/content/webinar.pt-BR.json';
import type {
  Background, Calendar, FormFieldContent, GlobalTexts, ImageManifest, ImageSet, Lang, ModuleContent, ModuleFields,
  ModuleName, PageContent, PageId, PageMeta, SiteConfig,
} from './types';

export const site = siteJson as SiteConfig;
const manifest = imagesJson as ImageManifest;

/** Where each build lives on joaomob.com. Media and the calendar files exist once, in the Astro build. */
export const ORIGIN = 'https://joaomob.com';
export const ASTRO_BASE = '/concepts/litora-eb5/';
export const NEXT_BASE = '/concepts/litora-eb5/next/';
export const ASSETS = `${ASTRO_BASE}assets/`;

// The brand name lives in one place, "brand" in site.json: the texts write {brand} where the name goes and {brandSlug}
// where a file name needs it.
export const brandSlug = site.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const fill = <T>(data: unknown): T => JSON.parse(JSON.stringify(data).replaceAll('{brandSlug}', brandSlug).replaceAll('{brand}', site.brand)) as T;

const contentFiles: Record<string, unknown> = {
  'event-thank-you.en-US.json': eventThankYouEn, 'event-thank-you.pt-BR.json': eventThankYouPt,
  'event.en-US.json': eventEn, 'event.pt-BR.json': eventPt,
  'privacy.en-US.json': privacyEn, 'privacy.pt-BR.json': privacyPt,
  'thank-you.en-US.json': thankYouEn, 'thank-you.pt-BR.json': thankYouPt,
  'webinar.en-US.json': webinarEn, 'webinar.pt-BR.json': webinarPt,
};
const globals: Record<Lang, unknown> = { 'pt-BR': globalPt, 'en-US': globalEn };

// ---------- routes ----------

export interface Route { pageId: PageId; lang: Lang; slug: string }

/** Every page of the site, one per page and language; the slug is the path without the leading slash. */
export const routes: Route[] = (Object.keys(site.pages) as PageId[]).flatMap((pageId) =>
  (Object.keys(site.pages[pageId]) as Lang[]).map((lang) => ({ pageId, lang, slug: site.pages[pageId][lang].path.slice(1) })));

export const routeOf = (slug: string): Route => {
  const route = routes.find((r) => r.slug === slug);
  if (!route) throw new Error(`no page at ${slug}`);
  return route;
};

const slugOf = (pageId: PageId, lang: Lang) => site.pages[pageId][lang].path.slice(1);
const otherLang = (pageId: PageId, lang: Lang) => (Object.keys(site.pages[pageId]) as Lang[]).find((l) => l !== lang) as Lang;

// ---------- images ----------

/** src, srcset, width and height of one photo of the manifest; the src is the first file of 1280 px or more. */
export function image(key: string, variant: string): ImageSet {
  const entries = manifest[key]?.[variant];
  if (!entries?.length) throw new Error(`no image ${key} ${variant} in src/data/images.json`);
  const url = (file: string) => `${ASSETS}images/${file}`;
  const largest = entries[entries.length - 1];
  const fallback = entries.find((e) => e.width >= 1280) ?? largest;
  return {
    src: url(entries.length > 1 ? fallback.file : largest.file),
    srcset: entries.map((e) => `${url(e.file)} ${e.width}w`).join(', '),
    width: largest.width,
    height: largest.height,
  };
}

// every letter of the giant word must be in the font subset (src/assets/fonts/unbounded-latin-500-word.woff2), or it
// would show in the fallback font
const WORD_FONT_CHARACTERS = 'AESTVaestv';
function checkWordFont(word: string) {
  const missing = [...new Set(word.replace(/\s/g, ''))].filter((c) => !WORD_FONT_CHARACTERS.includes(c));
  if (missing.length) throw new Error(`the word "${word}" has letters the font subset does not have (${missing.join(' ')})`);
}

// ---------- views ----------

// the surface of a section: a Theme class on the section (Client-First: the children read the semantic variables)
const BACKGROUNDS: Record<Background, string> = { primary: 'background-color-primary', secondary: 'background-color-secondary', inverse: 'theme-inverse' };
const two = (n: number) => String(n).padStart(2, '0');

/** What the header, the hero panel and the footer share: the logo, the language switch and the footer links. */
export interface SharedView {
  global: GlobalTexts;
  logo: { href: string; text: string };
  languages: { current: string; other: string; otherLabel: string; href: string; lang: Lang };
  privacyHref: string;
}

export interface FormFieldView extends FormFieldContent {
  id: string; errorId: string; helpId: string; describedBy: string;
  kind: 'text' | 'radio' | 'check'; isConsent: boolean; linkHref?: string;
}

/** The extra values each component needs on top of its content fields. */
interface Extras {
  'site-header': { hasHero: boolean };
  'site-footer': object;
  'hero-event': { wide: ImageSet; tall: ImageSet; form?: FormView };
  'confirmation-hero': { wide: ImageSet; tall: ImageSet; calendarHref?: string };
  'form-card': { redirect: string; pageName: string; fields: FormFieldView[] };
  'statement-reveal': object;
  'project-reveal': { wide: ImageSet; tall: ImageSet };
  'topic-grid': { items: (ModuleFields['topic-grid']['items'][number] & { number: string; img: ImageSet })[] };
  'audience-cards': { items: (ModuleFields['audience-cards']['items'][number] & { img: ImageSet; focusClass: string })[] };
  'speakers': { items: (ModuleFields['speakers']['items'][number] & { img: ImageSet })[] };
  'stat-row': object;
  'project-stack': { items: (ModuleFields['project-stack']['items'][number] & { id: string; wide: ImageSet; tall: ImageSet; marks: { line: boolean; current: boolean }[] })[] };
  'faq-accordion': { timeline: { legend: string; items: (ModuleFields['faq-accordion']['timeline']['items'][number] & { dashed: boolean; open: boolean })[] } };
  'cta-band': { wide: ImageSet; tall: ImageSet };
  'steps-list': { items: { text: string; number: string }[] };
  'legal-text': object;
}

export type ViewOf<K extends ModuleName> = Omit<ModuleFields[K], keyof Extras[K]> & Extras[K] & { bgClass: string };
export type FormView = ViewOf<'form-card'>;
export type ModuleView = { [K in ModuleName]: { module: K; key: string; view: ViewOf<K> } }[ModuleName];

export interface PageView {
  route: Route;
  meta: PageMeta;
  canonical: string;
  alternates: { lang: string; href: string }[];
  share: { src: string; width: number; height: number };
  preloads: (ImageSet & { sizes: string; media: string })[];
  hasForm: boolean;
  shared: SharedView;
  header: ViewOf<'site-header'>;
  footer: ViewOf<'site-footer'>;
  main: ModuleView[];
}

interface Context { route: Route; base: string; meta: PageMeta; hasHero: boolean }

function prepare(mod: ModuleContent, ctx: Context, slots: Partial<Record<ModuleName, FormView>>): ModuleView['view'] {
  const bgClass = BACKGROUNDS[mod.style?.background ?? 'primary'];
  const pair = (key: string) => ({ wide: image(key, 'wide'), tall: image(key, 'tall') });
  const { lang } = ctx.route;
  switch (mod.module) {
    case 'site-header': return { ...mod.fields, bgClass, hasHero: ctx.hasHero };
    case 'hero-event': return { ...mod.fields, bgClass, ...pair(mod.fields.image), form: slots['hero-event'] };
    case 'confirmation-hero': {
      const { calendar } = mod.fields;
      // the calendar file is written next to the thank you page, as in the original (src/pages/[...file].ics.ts)
      const folder = ctx.route.slug.split('/').slice(0, -1).join('/');
      return { ...mod.fields, bgClass, ...pair(mod.fields.image), calendarHref: calendar ? `${ASTRO_BASE}${folder}/${calendar.fileName}` : undefined };
    }
    case 'project-reveal':
      checkWordFont(mod.fields.word);
      return { ...mod.fields, bgClass, ...pair(mod.fields.image) };
    case 'cta-band': return { ...mod.fields, bgClass, ...pair(mod.fields.image) };
    case 'topic-grid': return { ...mod.fields, bgClass, items: mod.fields.items.map((item, i) => ({ ...item, number: two(i + 1), img: image(item.image, 'thumb') })) };
    case 'steps-list': return { ...mod.fields, bgClass, items: mod.fields.items.map((item, i) => ({ ...item, number: two(i + 1) })) };
    case 'audience-cards': return { ...mod.fields, bgClass, items: mod.fields.items.map((item) => ({ ...item, img: image(item.image, 'square'), focusClass: item.focus ? `is-focus-${item.focus}` : '' })) };
    case 'speakers': return { ...mod.fields, bgClass, items: mod.fields.items.map((item) => ({ ...item, img: image(item.image, 'square') })) };
    case 'project-stack':
      // the still ruler on the right edge of each photo: one mark per photo, the mark of this photo full
      return {
        ...mod.fields, bgClass,
        items: mod.fields.items.map((item, i, all) => ({ ...item, id: `inside-${i + 1}`, ...pair(item.image), marks: all.map((_, j) => ({ line: j > 0, current: j === i })) })),
      };
    case 'faq-accordion':
      // the trace after each milestone: solid after the first, dashed after the others, and the last one has no end point
      return { ...mod.fields, bgClass, timeline: { ...mod.fields.timeline, items: mod.fields.timeline.items.map((item, i, all) => ({ ...item, dashed: i >= 1, open: i === all.length - 1 })) } };
    case 'form-card': {
      const f = mod.fields;
      return {
        ...f, bgClass,
        redirect: `${ctx.base}${slugOf(f.redirectPage, lang)}`,
        pageName: ctx.meta.title,
        fields: f.fields.map((field): FormFieldView => {
          const id = `${f.anchorId}-${field.name.replace(/_/g, '-')}`;
          const kind = field.type === 'radio' ? 'radio' : field.type === 'checkbox' || field.type === 'consent' ? 'check' : 'text';
          return {
            ...field, id, kind, errorId: `${id}-error`, helpId: `${id}-help`,
            describedBy: field.help ? `${id}-help ${id}-error` : `${id}-error`,
            isConsent: field.type === 'consent',
            linkHref: field.linkPage ? `${ctx.base}${slugOf(field.linkPage, lang)}` : undefined,
          };
        }),
      };
    }
    default: return { ...mod.fields, bgClass };
  }
}

/** Everything one page renders, for the build that lives at `base` (ASTRO_BASE or NEXT_BASE). */
export function pageView(route: Route, base: string): PageView {
  const { pageId, lang } = route;
  const content = fill<PageContent>(contentFiles[site.pages[pageId][lang].content]);
  const global = fill<GlobalTexts>(globals[lang]);
  if (content.page.lang !== lang) throw new Error(`${pageId}: content lang ${content.page.lang} is not ${lang}`);
  const alt = otherLang(pageId, lang);
  const href = (id: PageId, l: Lang) => `${base}${slugOf(id, l)}`;
  const has = (name: ModuleName) => content.modules.some((m) => m.module === name);
  const ctx: Context = { route, base, meta: content.page, hasHero: has('hero-event') || has('confirmation-hero') };

  const shared: SharedView = {
    global,
    logo: { href: href(pageId, lang), text: global.header.logoText },
    languages: { current: global.header.languageCurrent, other: global.header.languageOther, otherLabel: global.header.languageOtherLabel, href: href(pageId, alt), lang: alt },
    privacyHref: href('privacy', lang),
  };

  // modules placed inside another module's slot (the form inside the hero panel) are prepared first
  const slots: Partial<Record<ModuleName, FormView>> = {};
  for (const mod of content.modules) if (mod.slot && mod.module === 'form-card') slots[mod.slot] = prepare(mod, ctx, {}) as FormView;

  let header: ViewOf<'site-header'> | undefined;
  let footer: ViewOf<'site-footer'> | undefined;
  const main: ModuleView[] = [];
  content.modules.filter((m) => !m.slot).forEach((mod, i) => {
    const view = prepare(mod, ctx, slots);
    if (mod.module === 'site-header') header = view as ViewOf<'site-header'>;
    else if (mod.module === 'site-footer') footer = view as ViewOf<'site-footer'>;
    else main.push({ module: mod.module, key: `${mod.module}-${i}`, view } as ModuleView);
  });
  if (!header || !footer) throw new Error(`${pageId} ${lang}: a page needs a site-header and a site-footer`);

  const absolute = (id: PageId, l: Lang) => `${ORIGIN}${href(id, l)}`;
  const alternates: PageView['alternates'] = (Object.keys(site.pages[pageId]) as Lang[]).map((l) => ({ lang: l, href: absolute(pageId, l) }));
  alternates.push({ lang: 'x-default', href: absolute(pageId, site.defaultLang) });
  const share = manifest.share.wide[0];
  // the hero photo is the largest element of the first screen: one preload per crop, each with its media
  const preloads = ctx.hasHero
    ? [{ ...image('hero', 'wide'), sizes: '100vw', media: '(min-width: 768px)' }, { ...image('hero', 'tall'), sizes: '100vw', media: '(max-width: 767px)' }]
    : [];

  return {
    route, meta: content.page, canonical: absolute(pageId, lang), alternates,
    share: { src: `${ORIGIN}${ASSETS}images/${share.file}`, width: share.width, height: share.height },
    preloads, hasForm: has('form-card'), shared, header, footer, main,
  };
}

// ---------- small helpers the components share ----------

/** "EB-5" never breaks at its hyphen inside a title (at 375 px the H1 broke as "EB-" and "5"). */
export function keepTerms(text: string): { text: string; keep: boolean }[] {
  return text.split(/(EB-5)/).filter(Boolean).map((part) => ({ text: part, keep: part === 'EB-5' }));
}

/** The calendar file of a thank you page (RFC 5545), CRLF line ends. */
export function icsText(cal: Calendar, uid: string): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${site.brand}//EB-5 webinar//EN`, 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${uid}`, 'DTSTAMP:20261002T000000Z', `DTSTART:${cal.startUtc}`, `DTEND:${cal.endUtc}`, `SUMMARY:${esc(cal.title)}`, `DESCRIPTION:${esc(cal.description)}`,
    'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n');
}

/** Every calendar file of the site: its path under the base and its text. */
export function calendarFiles(): { path: string; body: string }[] {
  return routes.flatMap((route) => {
    const content = fill<PageContent>(contentFiles[site.pages[route.pageId][route.lang].content]);
    return content.modules.flatMap((mod) => {
      if (mod.module !== 'confirmation-hero' || !mod.fields.calendar) return [];
      const folder = route.slug.split('/').slice(0, -1).join('/');
      return [{ path: `${folder}/${mod.fields.calendar.fileName}`, body: icsText(mod.fields.calendar, `${brandSlug}-${route.pageId}-${mod.fields.calendar.startUtc}`) }];
    });
  });
}
