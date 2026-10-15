// The opening screen: the wordmark behind a campaign photograph that grows to the whole screen as the page scrolls,
// and the paper wordmark that comes in over it at the end.
import { Photo } from '../shared/Photo';
import { hero } from '@shared/data/home';

export function HomeHero() {
  return (
    <section className="section_hero" data-hero="">
      <div className="hero_stage">
        <h1 className="hero_wordmark" aria-label="Vanth, concept couture house"><span aria-hidden="true">Vanth</span></h1>
        <div className="hero_photo" data-hero-photo="">
          <Photo className="hero_image" name={hero.image} frame="homeHero" fetchPriority="high" alt={hero.alt} />
        </div>
        <p className="hero_wordmark is-over" aria-hidden="true" data-hero-over="">Vanth</p>
        <div className="hero_meta" data-hero-meta="">
          <span className="hero_tag text-style-label">{hero.tag}</span>
          <p className="hero_collection heading-style-h3">{hero.title}</p>
          <p className="text-style-label">{hero.departments}</p>
        </div>
        <div className="hero_index" data-hero-meta="">
          <span className="hero_number">{hero.count}</span>
          <span className="text-style-label">{hero.countLabel}</span>
        </div>
      </div>
    </section>
  );
}
