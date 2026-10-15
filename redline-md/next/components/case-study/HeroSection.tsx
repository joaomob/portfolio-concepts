// Case study section: Redline MD, a landing page built for Google Ads
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function HeroSection() {
  return (
    <section className="section_case-study-hero" data-pane="case-study">
      {' '}
      <div className="section-frame is-top">
        <div className="section-card is-page-hero">
          {' '}
          <div className="padding-global padding-section-small">
            <div className="container-large">
              {' '}
              <div className="page-hero_content" data-anim="">
                {' '}
                <div className="tag">
                  <span className="tag_dot" />
                  Case study
                </div>
                {' '}
                <h1 className="heading-style-h2">
                  Redline MD, a landing page built for Google Ads
                </h1>
                {' '}
                <div className="max-width-medium">
                  <p className="text-size-large text-style-balance text-color-secondary">
                    The goal is to turn ad clicks into contract uploads. 35% of the traffic is mobile, and mobile brings less than 10% of the revenue.
                  </p>
                </div>
                {' '}
                <div className="page-hero_tags">
                  <span className="pill is-gray">
                    Mobile-first
                  </span>
                  <span className="pill is-gray">
                    Webflow
                  </span>
                  <span className="pill is-gray">
                    Client-First
                  </span>
                  <span className="pill is-gray">
                    Finsweet
                  </span>
                </div>
                {' '}
              </div>
              {' '}
              <div className="case-study_compare" data-anim-group="">
                {' '}
                <div className="case-study_shot">
                  <img className="case-study_shot-image" loading="eager" src={asset("cs/before-rl-d-1.webp")} alt="The current Redline MD site" width="1440" height="900" />
                  <span className="case-study_label">
                    Before
                  </span>
                </div>
                {' '}
                <div className="case-study_shot">
                  <img className="case-study_shot-image" loading="eager" src={asset("cs/after-hero-d.webp")} alt="The new Redline MD landing page" width="1600" height="1000" />
                  <span className="case-study_label is-after">
                    After
                  </span>
                </div>
                {' '}
              </div>
              {' '}
            </div>
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
