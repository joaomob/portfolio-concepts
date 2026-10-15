// 5 · The planner: the temple of Delphi in the back, the title and the Oracle phone in the center.
// The tall track pins the scene while the plan builds.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import Term from './Term';
import OracleMock from './OracleMock';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function PlannerSection() {
  return (
    <section className="section section_planner" id="planner" aria-labelledby="h-planner">
      <div className="section-card oracle_card">
        <div className="oracle_track" data-oracle-section="">
          <div className="oracle_sticky">
            <div className="oracle_bg" aria-hidden="true"><img src={asset('img/oracle-light.webp')} alt="" width="2688" height="1536" loading="lazy" data-oracle-bg="" /><div className="oracle_scrim" /></div>
            <div className="oracle_wrap">
              <Eyebrow text={eyebrowOf('planner')} variant="center" />
              <h2 className="oracle_h2" id="h-planner" data-reveal="">O Oráculo escreve <span className="gray-font">o caminho <span className="otherfont">inteiro.</span></span></h2>
              <p className="oracle_sub" data-reveal="">Uma frase basta. O <Term entry="B2">Oráculo</Term> devolve o plano.</p>
              <OracleMock />
              <a className="button" href="#plans"><span>Começar com o Oráculo</span></a>
              <LearnMore entries={['B2', 'C2']} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
