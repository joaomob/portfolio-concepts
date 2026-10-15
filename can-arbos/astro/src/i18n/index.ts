// The Spanish Home (/es). Only the Home is translated, as in the prototype: every other page stays in English and
// its language link leads to /es. The dictionary is the Spanish copy of the prototype, keyed by the English text.
import es from './es.json';

export type Lang = 'en' | 'es';
export type Translate = (text: string) => string;

const ES: Record<string, string> = es;
const squash = (text: string) => text.replace(/\s+/g, ' ').trim();

/** The text in Spanish. A price alone (the menu's "€34") takes the Spanish order, the amount and then the sign. */
function toSpanish(text: string): string {
  const key = squash(text);
  if (key in ES) return ES[key];
  const price = key.match(/^€\s?([\d.,]+)$/);
  return price ? `${price[1]} €` : text;
}

/** The translation function of a page: English text in, the text of the page's language out. */
export function useTranslate(lang: Lang): Translate {
  return lang === 'es' ? toSpanish : (text) => text;
}

const decode = (s: string) =>
  s.replace(/&(amp|lt|gt|quot|#39|#x27);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'" })[e as 'amp']);
const encodeText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const encodeAttr = (s: string) => encodeText(s).replace(/"/g, '&quot;');

/**
 * Translates a piece of trusted markup (the paper map SVG): every text node and the alt, aria-label, placeholder and
 * title attributes, as the prototype's build did for the whole Spanish page.
 */
export function translateMarkup(markup: string, t: Translate): string {
  return markup
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        return part.replace(/\b(alt|aria-label|placeholder|title)="([^"]*)"/g, (whole, name, value) => {
          const text = decode(value);
          const done = t(text);
          return done === text ? whole : `${name}="${encodeAttr(done)}"`;
        });
      }
      if (!/\S/.test(part)) return part;
      const text = decode(part);
      const done = t(text);
      if (done === text) return part;
      const lead = text.match(/^\s*/)![0];
      const tail = text.match(/\s*$/)![0];
      return lead + encodeText(done) + tail;
    })
    .join('');
}
