// Style guide section: Buttons
// Markup ported word for word from the original case-study.html.

export default function ButtonsSection() {
  return (
    <section className="section_style-guide-buttons" data-pane="style-guide" id="sg-buttons">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  04
                </span>
                <h2 className="heading-style-h3">
                  Buttons
                </h2>
                <p className="text-color-secondary">
                  Black pills. On hover a red layer (button-hover) slides up from the bottom and the button scales to 0.98.
                </p>
              </div>
              {' '}
              <div className="style-guide_panel" data-anim-group="">
                {' '}
                <div className="style-guide_item">
                  <a className="button" href="#">
                    <span className="button_content">
                      {"Upload your contract "}
                      <span className="button_price">
                        $199
                      </span>
                    </span>
                    <span className="button_hover" />
                  </a>
                  <p className="style-guide_code">
                    button · button_price
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <a className="button is-secondary" href="#">
                    <span className="button_content">
                      See a sample report
                    </span>
                  </a>
                  <p className="style-guide_code">
                    button is-secondary
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <a className="button is-accent" href="#">
                    <span className="button_content">
                      Check my contract · $199
                    </span>
                  </a>
                  <p className="style-guide_code">
                    button is-accent
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <a className="button is-small" href="#">
                    <span className="button_content">
                      Upload contract
                    </span>
                    <span className="button_hover" />
                  </a>
                  <p className="style-guide_code">
                    button is-small
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_panel is-dark" data-anim="">
                {' '}
                <div className="style-guide_item is-full">
                  <a className="button is-accent is-full" href="#">
                    <span className="button_content">
                      {"Upload contract "}
                      <span className="button_price">
                        $199
                      </span>
                    </span>
                  </a>
                  <p className="style-guide_code is-light">
                    button is-accent is-full · sticky CTA on mobile
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_panel" data-anim-group="">
                {' '}
                <div className="style-guide_item">
                  <div className="carousel_arrows">
                    <div className="carousel_arrow is-off" role="button" tabIndex={0} aria-label="Previous">
                      ←
                    </div>
                    <div className="carousel_arrow" role="button" tabIndex={0} aria-label="Next">
                      →
                    </div>
                  </div>
                  <p className="style-guide_code">
                    carousel_arrow · is-off
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <div className="modal_close is-static" role="button" tabIndex={0} aria-label="Close">
                    ×
                  </div>
                  <p className="style-guide_code">
                    modal_close
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <span className="tooltip_component is-light" tabIndex={0} role="button" aria-label="What does this mean?">
                    i
                  </span>
                  <p className="style-guide_code">
                    tooltip_component is-light
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <a className="navbar_link" href="#">
                    How it works
                  </a>
                  <p className="style-guide_code">
                    navbar_link
                  </p>
                </div>
                {' '}
                <div className="style-guide_item">
                  <div className="style-guide_on-dark">
                    <a className="footer_link" href="#">
                      Privacy Policy
                    </a>
                  </div>
                  <p className="style-guide_code">
                    footer_link
                  </p>
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
