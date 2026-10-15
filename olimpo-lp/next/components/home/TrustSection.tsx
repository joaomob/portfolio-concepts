// 10 · Trust: Cerberus guards what you write, and the three layers of privacy.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import { trustLayers, lockIcon } from '@astro/data/trust';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function TrustSection() {
  return (
    <section className="section section_trust" id="trust" aria-labelledby="h-trust">
      <div className="section-card">
        <div className="container faq-grid">
          <div className="max-w-left">
            <Eyebrow text={eyebrowOf('trust')} />
            <div className="divider-s" />
            <h2 className="h2" id="h-trust" data-reveal="">O que se escreve aqui <span className="gray-font"><span className="otherfont">fica</span> com quem escreveu.</span></h2>
            <div className="divider-s" />
            <div className="trust_scene" data-reveal="">
              <figure className="media trust_video">
                <video className="cover" muted loop playsInline preload="none" poster={asset('img/cerberus.webp')} data-autoplay="" aria-hidden="true"><source src={asset('video/cerberus-light.mp4')} type="video/mp4" /></video>
              </figure>{' '}
              <span className="trust_seal" aria-hidden="true"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: lockIcon }} /></span>
            </div>
            <div className="divider-s" />
            <LearnMore entries={['B5']} />
          </div>
          <ol className="layers" data-reveal="">
            {trustLayers.map((layer) => (
              <li key={layer.text} className="layer"><span className="layer_icon" aria-hidden="true"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: layer.icon }} /></span><p>{layer.text}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
