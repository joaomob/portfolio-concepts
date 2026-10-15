// Home hero (Hero.astro).
import { asset } from '../../../astro/src/lib/site';

export default function Hero() {
  return (
    <section className="section_hero theme-inverse">
      <div className="hero_3d" id="hero-3d" aria-hidden="true" data-model={asset('the-fool-wash.glb')} data-points={asset('the-fool-wash.points.bin')}><canvas className="hero_3d-canvas"></canvas><p className="hero_3d-hint">0 · The Fool</p><p className="hero_3d-loading" data-loading="">Loading The Fool <span data-loading-pct="">0%</span></p></div>
      <div className="padding-global"><div className="container-large">
        <div className="hero_content">
          <h1 className="text-style-eyebrow" data-hero="1">Hand-painted tarot statues</h1>
          <p className="heading-style-h1 text-color-marble" data-hero="2" data-split="">The Arcana,<em className="hero_title-line text-color-brand">made to keep.</em></p>
          <p className="hero_lede" data-hero="3">Resin statues of the 22 Major Arcana, painted by hand.</p>
          <a className="button is-gold" href="#collection" data-hero="4">Explore the Collection →</a>
        </div>
      </div></div>
    </section>
  );
}
