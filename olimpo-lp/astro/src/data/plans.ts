// Section 11: the three plans. Prices are in dollars, annual and monthly; the billing switch swaps them.
export interface Feature {
  text: string;
  state: 'on' | 'off' | 'key';
}

export interface Plan {
  name: string;
  tag?: string;
  /** white card for the recommended plan, no background for the others */
  featured: boolean;
  price: { annual: number; monthly: number } | null;
  freeNote?: string;
  cta: { label: string; dark: boolean };
  features: Feature[];
}

const shared = ['Comunidade + Ranking', 'Estatísticas completas', 'Áudio + Google Calendar'];
const coach = 'Quíron · coach estratégico (IA)';
const oracle = 'Oráculo · construtor de planos (IA)';
const unlimited: Feature[] = [
  { text: 'Metas ilimitadas', state: 'on' },
  { text: 'Foco ilimitado', state: 'on' },
  ...shared.map((text): Feature => ({ text, state: 'on' })),
];

export const plans: Plan[] = [
  {
    name: 'Mortal',
    featured: false,
    price: null,
    freeNote: 'sem cartão',
    cta: { label: 'Começar grátis', dark: true },
    features: [
      { text: '3 metas ativas', state: 'on' },
      { text: '3 sessões de foco por dia', state: 'on' },
      { text: shared[0], state: 'on' },
      { text: shared[1], state: 'off' },
      { text: shared[2], state: 'off' },
      { text: coach, state: 'off' },
      { text: oracle, state: 'off' },
    ],
  },
  {
    name: 'Oráculo',
    tag: 'recomendado',
    featured: true,
    price: { annual: 90, monthly: 9 },
    cta: { label: 'Começar com o Oráculo', dark: false },
    features: [...unlimited, { text: coach, state: 'key' }, { text: oracle, state: 'key' }],
  },
  {
    name: 'Olimpiano',
    featured: false,
    price: { annual: 50, monthly: 5 },
    cta: { label: 'Escolher o Olimpiano', dark: true },
    features: [...unlimited, { text: coach, state: 'off' }, { text: oracle, state: 'off' }],
  },
];
