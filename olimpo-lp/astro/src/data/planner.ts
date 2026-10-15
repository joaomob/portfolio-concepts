// Section 5: the plan the Oracle mock builds as the section scrolls. show is the scroll progress (0 to 1) at which each row appears.
export interface PlanRow { kind: 'meta' | 'proj' | 'task'; text: string; date?: string; show: string }

export const oracleGoal = 'Juntar a entrada de um apartamento em dois anos.';

export const oraclePlan: PlanRow[] = [
  { kind: 'meta', text: 'Entrada do apartamento em 24 meses', show: '0.50' },
  { kind: 'proj', text: 'Fase 1 · O número', show: '0.54' },
  { kind: 'task', text: 'Somar os gastos fixos', date: 'Hoje', show: '0.58' },
  { kind: 'task', text: 'Definir o valor do mês', date: 'Amanhã', show: '0.62' },
  { kind: 'proj', text: 'Fase 2 · O corte', show: '0.66' },
  { kind: 'task', text: 'Revisar as assinaturas', date: 'Sem 2', show: '0.70' },
  { kind: 'task', text: 'Renegociar o plano do celular', date: 'Sem 2', show: '0.74' },
  { kind: 'proj', text: 'Fase 3 · O automático', show: '0.78' },
  { kind: 'task', text: 'Programar a transferência', date: 'Sem 3', show: '0.82' },
];
