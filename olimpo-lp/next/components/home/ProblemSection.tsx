// 2 · The problem: every count reset after one slip. The marquee of attempts is cloned and moved by olimpo.js.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import AttemptCard from './AttemptCard';
import { attempts } from '@astro/data/attempts';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function ProblemSection() {
  return (
    <section className="section section_problem" id="problem" aria-labelledby="h-problem">
      <div className="section-card is-dark">
        <div className="container problem_content">
          <Eyebrow text={eyebrowOf('problem')} variant="is-light" />
          <h2 className="problem_heading" id="h-problem" data-reveal="">A contagem inteira <span className="gray-font">zerou num <span className="otherfont">tropeço.</span></span></h2>
          <div className="problem_row">
            <figure className="media problem_video" data-reveal="">
              <video className="cover" muted loop playsInline preload="none" poster={asset('video/s2-effort-dark.webp')} data-autoplay="" aria-hidden="true"><source src={asset('video/s2-effort-dark.mp4')} type="video/mp4" /></video>
            </figure>
            <p className="problem_subtitle" data-reveal="">Caderno, planilha, mais um aplicativo de hábito. Todos mediam a mesma coisa, dias seguidos, e um dia fora apagava o resto. Vale para a poupança, para o treino, para o livro começado.</p>
          </div>
        </div>
        <div className="logos" data-marquee="" data-marquee-speed="40" aria-label="Tentativas que pararam">
          <div className="logos_list" data-marquee-list="">
            {attempts.map((a) => <AttemptCard key={a.goal} {...a} />)}
          </div>
        </div>
        <div className="container">
          <LearnMore entries={['A2', 'A3']} variant="is-light" />
        </div>
      </div>
    </section>
  );
}
