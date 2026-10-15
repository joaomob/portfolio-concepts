// The twelve numbered sections of the home. The header index, the dock label and the footer list all read this.
export interface PageSection {
  id: string;
  n: string;
  name: string;
  /** a separator follows this entry in the header index (the three acts of the page) */
  endsGroup?: boolean;
}

export const sections: PageSection[] = [
  { id: 'opening', n: '01', name: 'Abertura' },
  { id: 'problem', n: '02', name: 'O problema' },
  { id: 'turn', n: '03', name: 'A virada', endsGroup: true },
  { id: 'method', n: '04', name: 'O método' },
  { id: 'planner', n: '05', name: 'O planejador' },
  { id: 'followup', n: '06', name: 'O acompanhamento' },
  { id: 'execution', n: '07', name: 'A execução' },
  { id: 'personalization', n: '08', name: 'A personalização' },
  { id: 'staying-power', n: '09', name: 'A permanência', endsGroup: true },
  { id: 'trust', n: '10', name: 'A confiança' },
  { id: 'plans', n: '11', name: 'Os planos' },
  { id: 'closing', n: '12', name: 'Fechamento' },
];

/** "02 · O problema", the eyebrow over each section heading */
export const eyebrowOf = (id: string): string => {
  const s = sections.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown section ${id}`);
  return `${s.n} · ${s.name}`;
};
