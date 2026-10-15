// The final call, watched by the sticky CTA script ([data-final]).
// Markup ported word for word from the original index.html.

export default function CtaSection() {
  return (
    <section className="section_cta" data-final="">
      {' '}
      <div className="section-frame">
        <div className="section-card is-cta">
          {' '}
          <div className="cta_art" aria-hidden="true">
            <div className="art_doc is-cta-left">
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
            <div className="art_tile is-cta-right">
              <span className="art_line is-width-50" />
              <span className="art_big" />
              <span className="art_meter">
                <span className="art_meter-fill" />
              </span>
              <span className="art_line is-width-70" />
            </div>
          </div>
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              <div className="cta_component" data-anim="">
                {' '}
                <div className="max-width-medium">
                  <h2 className="heading-style-h2">
                    Review your contract before you sign it.
                  </h2>
                </div>
                {' '}
                <p className="text-size-large text-color-secondary">
                  Flat $199. Report within 24 hours.
                </p>
                {' '}
                <a className="button" href="#" fs-modal-element="open" fs-modal-instance="upload">
                  <span className="button_content">
                    {"Upload your contract "}
                    <span className="button_price">
                      $199
                    </span>
                  </span>
                  <span className="button_hover" />
                </a>
                {' '}
              </div>
            </div>
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
