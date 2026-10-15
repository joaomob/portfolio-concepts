// Section 4: the three levels of the method, each with a light and a dark illustration.
export interface MethodRow { n: string; name: string; line: string; image: string }

export const methodRows: MethodRow[] = [
  { n: '01', name: 'Meta', line: 'O destino, com prazo e com critério de chegada.', image: 'ms-goal' },
  { n: '02', name: 'Projeto', line: 'As frentes que levam até lá.', image: 'ms-project' },
  { n: '03', name: 'Tarefa', line: 'A parte de hoje, pronta quando o dia começa.', image: 'ms-task' },
];
