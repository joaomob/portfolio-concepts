// The shape of the content files in src/data/content/. Each page is a list of modules (one per section), and every
// key of a module is a field of the matching component, the same names the original prototype gave its HubSpot
// modules. The Astro and the Next.js builds both read these files through src/lib/content.ts.

export type Lang = 'pt-BR' | 'en-US';
export type PageId = 'webinar' | 'webinar-thank-you' | 'event' | 'event-thank-you' | 'privacy';
export type Background = 'primary' | 'secondary' | 'inverse';

/** One language version of a page in src/data/site.json. */
export interface SiteEntry {
  file: string;
  path: string;
  content: string;
}

export interface SiteConfig {
  brand: string;
  baseUrl: string;
  defaultLang: Lang;
  pages: Record<PageId, Record<Lang, SiteEntry>>;
}

export interface PageMeta {
  id: PageId;
  lang: Lang;
  title: string;
  metaDescription: string;
  noindex: boolean;
  shareImageAlt: string;
}

export interface GlobalTexts {
  skipLink: string;
  header: { logoText: string; languageCurrent: string; languageOther: string; languageOtherLabel: string };
  footer: { logoText: string; about: string; legalNoticeTitle: string; legalNotice: string; privacyLabel: string; languageLinkLabel: string };
}

export interface Text { text: string }

export interface TimeBlock {
  date: string;
  day: string;
  month: string;
  rows: { time: string; datetime?: string; place: string }[];
}

export interface Calendar {
  buttonLabel: string;
  fileName: string;
  title: string;
  description: string;
  startUtc: string;
  endUtc: string;
}

export interface FormFieldContent {
  name: string;
  type: 'text' | 'email' | 'tel' | 'radio' | 'checkbox' | 'consent';
  label: string;
  autocomplete?: string;
  half?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
  linkLabel?: string;
  linkPage?: PageId;
  errors: { required: string; invalid?: string };
}

/** The fields of every module, by module name. */
export interface ModuleFields {
  'site-header': { ctaLabel: string; ctaTarget: string };
  'site-footer': { fictionalNotice: string };
  'hero-event': { eyebrow: string; heading: string; details: Text[]; timeBlock: TimeBlock; body: string; image: string; imageAlt: string };
  'confirmation-hero': { heading: string; details: Text[]; body: string; timeBlock: TimeBlock; calendar: Calendar | null; image: string; imageAlt: string };
  'form-card': {
    anchorId: string; heading: string; redirectPage: PageId; fields: FormFieldContent[];
    submitLabel: string; submitNote: string; notice: string; submitError: string;
  };
  'statement-reveal': { label: string; text: string };
  'project-reveal': { label: string; word: string; name: string; text: string; caption: string; buttonLabel: string; buttonTarget: string; image: string; imageAlt: string };
  'topic-grid': { label: string; heading: string; intro: string; items: { heading: string; text: string; image: string; imageAlt: string }[] };
  'audience-cards': { heading: string; items: { heading: string; text: string; image: string; imageAlt: string; focus?: string }[] };
  'speakers': { heading: string; note: string; items: { name: string; role: string; text: string; image: string; imageAlt: string }[] };
  'stat-row': {
    heading: string; items: { value: string; caption: string }[]; source: string;
    cost: { heading: string; rows: { label: string; values: { amount: string; when: string }[] }[]; note: string };
  };
  'project-stack': { label: string; items: { label: string; name: string; caption: string; image: string; imageAlt: string }[] };
  'faq-accordion': {
    heading: string; intro: string;
    timeline: { legend: string; items: { title: string; text: string; trace: string }[] };
    items: { question: string; answer: ({ text: string; list?: undefined } | { list: string[]; text?: undefined })[] }[];
  };
  'cta-band': { heading: string; text: string; buttonLabel: string; buttonTarget: string; image: string; imageAlt: string };
  'steps-list': { heading: string; intro: string; items: Text[] };
  'legal-text': { heading: string; updated: string; paragraphs: Text[] };
}

export type ModuleName = keyof ModuleFields;

/** One module as written in a content file: its name, its fields, its surface and, for the form, the module it sits in. */
export type ModuleContent = {
  [K in ModuleName]: { module: K; fields: ModuleFields[K]; style?: { background: Background }; slot?: ModuleName };
}[ModuleName];

export interface PageContent {
  page: PageMeta;
  modules: ModuleContent[];
}

/** One size set of a photo in src/data/images.json (written by the original build-images.py). */
export interface ImageFile { file: string; width: number; height: number; bytes: number; quality: number }
export type ImageManifest = Record<string, Record<string, ImageFile[]>>;

/** What an <img> or a <source> needs: the fallback src, the srcset and the intrinsic size of the largest file. */
export interface ImageSet { src: string; srcset: string; width: number; height: number }
