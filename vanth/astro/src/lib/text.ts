// Text helpers shared by both builds.

const NBSP = ' ';

/**
 * Joins the last two words of a sentence with a no-break space when the pair fits a phone line (up to 24 characters),
 * so the last line never holds one word alone. The same rule as the generator of the original pages.
 */
export function tie(text: string): string {
  const trimmed = text.trimEnd();
  const cut = trimmed.lastIndexOf(' ');
  if (cut < 0) return text;
  const head = trimmed.slice(0, cut);
  const last = trimmed.slice(cut + 1);
  const before = head.slice(head.lastIndexOf(' ') + 1);
  if (before.length + 1 + last.length > 24) return text;
  return head + NBSP + last;
}

/** The words of a name, for the titles that set each word on its own line. */
export const words = (text: string): string[] => text.split(' ');
