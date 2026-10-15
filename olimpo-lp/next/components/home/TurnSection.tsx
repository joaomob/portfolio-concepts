// 3 · The turn: the statement whose words fade in with the scroll (data-text-fade), with the traveler inline.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function TurnSection() {
  return (
    <section className="section section_turn" id="turn" aria-labelledby="h-turn">
      <div className="section-card turn_card">
        <div className="statement_component">
          <Eyebrow text={eyebrowOf('turn')} variant="center dark" />
          <div className="statement_text" data-text-fade="">
            <h2 className="statement_h2" id="h-turn">Os sistemas contavam dias. <span className="statement_turn">Nenhum perguntou o <span className="otherfont">destino.</span></span></h2>{' '}
            <span className="statement_break" aria-hidden="true" />{' '}
            <p className="statement_p">O destino sobreviveu a todos eles. <span className="statement_image-wrap" aria-hidden="true"><img className="statement_inline-image" src={asset('img/s1-traveler-light.webp')} alt="" width="1100" height="804" loading="lazy" /></span> O Olimpo começa por ele.</p>
          </div>
          <LearnMore entries={['A7', 'A1']} variant="center" />
        </div>
      </div>
    </section>
  );
}
