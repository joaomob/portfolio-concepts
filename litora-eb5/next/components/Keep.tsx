// A heading text with "EB-5" kept on one line (see keepTerms in astro/src/lib/content.ts).
import { keepTerms } from '@astro/lib/content';

export function Keep({ text }: { text: string }) {
  return <>{keepTerms(text).map((part, i) => (part.keep ? <span key={i} className="text-style-nowrap">{part.text}</span> : part.text))}</>;
}
