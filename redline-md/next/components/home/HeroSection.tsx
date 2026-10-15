// The hero: the tag, the H1, the two calls, the price note, the security line and the layered contract art.
// Markup ported word for word from the original index.html.
import { asset } from '@astro/lib/site';

export default function HeroSection() {
  return (
    <section className="section_hero">
      {' '}
      <div className="section-frame is-top">
        {' '}
        <div className="section-card is-hero">
          {' '}
          <div className="padding-global">
            <div className="container-large">
              <div className="hero_content">
                {' '}
                <div className="tag">
                  <span className="tag_dot" />
                  For physicians signing their first contract
                </div>
                {' '}
                <h1 className="heading-style-h1">
                  Know what your contract costs before you sign.
                </h1>
                {' '}
                <div className="max-width-small">
                  <p className="text-size-large text-color-secondary">
                    AI contract review with redlines and a financial analysis. Flat $199, report within 24 hours.
                  </p>
                </div>
                {' '}
                <div className="button-group is-center">
                  {' '}
                  <a className="button is-hero" href="#" fs-modal-element="open" fs-modal-instance="upload" data-hero-cta="">
                    <span className="button_content">
                      {"Upload your contract "}
                      <span className="button_price">
                        $199
                      </span>
                    </span>
                    <span className="button_hover" />
                  </a>
                  {' '}
                  <a className="button is-secondary is-hero" href="#sample-report" fs-modal-element="open" fs-modal-instance="report">
                    <span className="button_content">
                      See a sample report
                    </span>
                  </a>
                  {' '}
                </div>
                {' '}
                <div className="text-size-small text-color-secondary">
                  Traditional legal review costs $500 or more.
                </div>
                {' '}
                <div className="hero_trust">
                  ISO 27001 · AES256 · SOC2 · GDPR
                </div>
                {' '}
              </div>
            </div>
          </div>
          {' '}
          <div className="hero_art" aria-hidden="true">
            <div className="hero_art-layer">
              <div className="art_doc is-left">
                <div className="art_doc-head">
                  <span className="art_logo" />
                  <span className="art_line is-width-40" />
                </div>
                <span className="art_line is-title" />
                <span className="art_line is-width-90" />
                <span className="art_line is-width-80" />
                <span className="art_mark is-red">
                  <span className="art_line is-width-70" />
                </span>
                <span className="art_line is-width-90" />
                <span className="art_mark is-green">
                  <span className="art_line is-width-60" />
                </span>
                <span className="art_line is-width-80" />
                <span className="art_line is-width-50" />
              </div>
            </div>
            <div className="hero_art-layer">
              <div className="art_tile is-right">
                <span className="art_line is-width-50" />
                <span className="art_big" />
                <span className="art_meter">
                  <span className="art_meter-fill" />
                </span>
                <span className="art_line is-width-70" />
              </div>
            </div>
            <div className="hero_art-layer">
              <div className="art_photo is-left">
                <img className="art_photo-image" src={asset("hero-1.webp")} alt="" width="960" height="720" loading="eager" />
              </div>
            </div>
            <div className="hero_art-layer">
              <div className="art_photo is-right">
                <img className="art_photo-image" src={asset("hero-2.webp")} alt="" width="960" height="720" loading="eager" />
              </div>
            </div>
          </div>
          {' '}
        </div>
        {' '}
      </div>
      {' '}
    </section>
  );
}
