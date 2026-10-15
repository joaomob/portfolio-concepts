// 1 · Opening. The video of the clouds parting over the temple plays once and stops on the last frame.
// olimpo.js picks the light or dark file from the data-* attributes.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import Term from './Term';
import HeroGoalCard from './HeroGoalCard';
import { asset } from '@astro/lib/site';

export default function OpeningSection() {
  return (
    <section className="section_opening" id="opening" aria-labelledby="h-opening" data-hero="">
      <div className="hero">
        <div className="hero_media" aria-hidden="true">
          <video className="hero_video" muted playsInline autoPlay preload="auto" poster={asset('video/cap0-light.webp')} data-hero-video=""
            data-light={asset('video/cap0-light.mp4')} data-dark={asset('video/cap0-dark.mp4')}
            data-poster-light={asset('video/cap0-light.webp')} data-poster-dark={asset('video/cap0-dark.webp')}
            data-end-light={asset('video/cap0-light-end.webp')} data-end-dark={asset('video/cap0-dark-end.webp')} />
          <div className="hero_scrim" />
        </div>
        <div className="hero_text">
          <Eyebrow text="Alta performance com propósito" motion="hero" />
          <h1 className="hero_h1" id="h-opening"><span className="line" data-hero-line="">Você sabe aonde</span> <span className="line gray-font" data-hero-line="">quer <span className="otherfont">chegar.</span></span></h1>
          <p className="hero_sub" data-hero-in="">O <Term entry="B1">Olimpo</Term> monta o caminho, degrau por degrau. <span className="gray-font">Se a subida travar no meio, ele chama de volta.</span></p>
          <div className="button-group" data-hero-in="">
            <a className="button" href="#plans"><span>Começar grátis</span></a>{' '}
            <a className="button is-dark" href="#method"><span>Entender o método</span></a>
          </div>
          <LearnMore entries={['B1']} motion="hero" />
        </div>
        <HeroGoalCard />
      </div>
    </section>
  );
}
