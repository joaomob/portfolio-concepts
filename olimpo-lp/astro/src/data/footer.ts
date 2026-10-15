// Footer columns other than the section list (which comes from sections.ts). Each button opens a Codex entry.
export interface FooterLink {
  label: string;
  codex: string;
  /** anchor inside the entry, for the cookies part of the privacy document */
  section?: string;
}

export const legalLinks: FooterLink[] = [
  { label: 'Termos de uso', codex: 'L1' },
  { label: 'Privacidade', codex: 'L2' },
  { label: 'Cookies', codex: 'L2', section: '12-cookies' },
];

export const codexLinks: FooterLink[] = [
  { label: 'Índice', codex: 'IDX' },
  { label: 'Quem criou o Olimpo', codex: 'D1' },
];

/** only Portuguese is translated; the other two buttons are shown disabled, as in the original */
export const languages = [
  { code: 'pt', label: 'PT', ready: true },
  { code: 'en', label: 'EN', ready: false },
  { code: 'es', label: 'ES', ready: false },
];
