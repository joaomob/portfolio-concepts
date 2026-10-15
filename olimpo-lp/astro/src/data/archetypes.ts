// Section 8: the 16 MBTI archetypes. god and goddess name the two portraits (assets/deities) that take turns on the card.
export interface Archetype { type: string; name: string; phrase: string; god: string; goddess: string }

export const archetypes: Archetype[] = [
  { type: "INTJ", name: "O Arquiteto", phrase: "Mente estratégica que transforma visões em sistemas.", god: "hades", goddess: "athena" },
  { type: "INTP", name: "O Lógico", phrase: "Mergulha fundo em ideias que a maioria nem percebe.", god: "prometheus", goddess: "metis" },
  { type: "ENTJ", name: "O Comandante", phrase: "Lidera com visão, força e uma clareza quase implacável.", god: "zeus", goddess: "nike" },
  { type: "ENTP", name: "O Inovador", phrase: "Adora desafiar ideias e encontrar soluções inesperadas.", god: "hermes", goddess: "eris" },
  { type: "INFJ", name: "O Advogado", phrase: "Insight profundo com propósito de impactar o mundo.", god: "morpheus", goddess: "psyche" },
  { type: "INFP", name: "O Mediador", phrase: "Guiado por valores profundos e uma empatia rara.", god: "eros", goddess: "persephone" },
  { type: "ENFJ", name: "O Protagonista", phrase: "Inspira, conecta e eleva as pessoas ao redor.", god: "apollo", goddess: "harmonia" },
  { type: "ENFP", name: "O Ativista", phrase: "Enxerga potencial em tudo e em todos, inclusive em si.", god: "dionysus", goddess: "iris" },
  { type: "ISTJ", name: "O Logístico", phrase: "Confiável, metódico e comprometido com o que promete.", god: "atlas", goddess: "themis" },
  { type: "ISFJ", name: "O Defensor", phrase: "Cuida dos outros com lealdade silenciosa e constante.", god: "asclepius", goddess: "hestia" },
  { type: "ESTJ", name: "O Executivo", phrase: "Organiza o caos com eficiência, lógica e disciplina.", god: "poseidon", goddess: "hera" },
  { type: "ESFJ", name: "O Provedor", phrase: "Constrói laços duradouros com cuidado e generosidade.", god: "helios", goddess: "demeter" },
  { type: "ISTP", name: "O Virtuoso", phrase: "Resolve problemas práticos com elegância e precisão.", god: "hephaestus", goddess: "artemis" },
  { type: "ISFP", name: "O Aventureiro", phrase: "Sensível, presente e com um gosto estético único.", god: "adonis", goddess: "aphrodite" },
  { type: "ESTP", name: "O Empreendedor", phrase: "Age primeiro, pensa depois, e quase sempre funciona.", god: "ares", goddess: "enyo" },
  { type: "ESFP", name: "O Animador", phrase: "Vive intensamente o presente e arrasta os outros junto.", god: "pan", goddess: "hebe" },
];
