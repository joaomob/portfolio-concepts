// Section 6: the four scenes painted on the vase, with the message Chiron sends at each one.
export interface VaseScene { n: string; caption: string; message: string }

export const vaseScenes: VaseScene[] = [
  { n: 'I', caption: 'O herói escolhe o cume.', message: '“Meta anotada: correr 5 km sem parar. O primeiro treino tem vinte minutos.”' },
  { n: 'II', caption: 'Quíron caminha junto.', message: '“Terceiro treino feito. Na próxima fase, o trecho correndo cresce um pouco.”' },
  { n: 'III', caption: 'Na queda, a mão estendida.', message: '“Faz 11 dias que a corrida não anda. Um treino de vinte minutos ainda cabe?”' },
  { n: 'IV', caption: 'O templo, pela mesma trilha.', message: '“Cinco quilômetros sem parar. A meta do primeiro dia está cumprida.”' },
];

export const vaseLabel = 'Ânfora de figura vermelha: um herói olha o cume, Quíron mostra o caminho, estende a mão quando ele cai, e o herói chega ao templo.';
