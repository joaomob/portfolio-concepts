// 12 · Closing: the summit in the back and the last call to start.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function ClosingSection() {
  return (
    <section className="section section_closing" id="closing" aria-labelledby="h-closing">
      <div className="section-card cta">
        <img className="cta_bg" src={asset('img/summit-light.webp')} alt="" width="2400" height="1373" loading="lazy" data-cta-bg="" />
        <div className="container cta_inner">
          <Eyebrow text={eyebrowOf('closing')} variant="center is-white" />
          <h2 className="h2-display is-cta" id="h-closing" data-reveal="">O primeiro degrau <span className="is-soft">você dá <span className="otherfont">hoje.</span></span></h2>
          <p className="cta_p" data-reveal="">Grátis, sem cartão, e a primeira meta pode começar ainda hoje.</p>
          <div className="button-group cnt" data-reveal=""><a className="button is-bronze" href="#plans"><span>Começar grátis</span></a></div>
          <LearnMore entries={['B7']} variant="center is-light" />
        </div>
      </div>
    </section>
  );
}
