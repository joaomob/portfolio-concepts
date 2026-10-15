// Style guide section: Custom code and links
// Markup ported word for word from the original case-study.html.

export default function CodeSection() {
  return (
    <section className="section_style-guide-code" data-pane="style-guide" id="sg-code">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  12
                </span>
                <h2 className="heading-style-h3">
                  Custom code and links
                </h2>
                <p className="text-color-secondary">
                  Only what classes can't express lives in custom code, and every modal has its own link.
                </p>
              </div>
              {' '}
              <div className="style-guide_utils is-3-columns" data-anim-group="">
                {' '}
                <div className="style-guide_util is-card">
                  <p className="style-guide_label">
                    Site head
                  </p>
                  <p className="style-guide_code">
                    Figtree and the Finsweet scripts
                  </p>
                  <p className="style-guide_code">
                    Rules classes can't hold: tag styles, state selectors, embed SVG sizes, print
                  </p>
                </div>
                {' '}
                <div className="style-guide_util is-card">
                  <p className="style-guide_label">
                    Landing body
                  </p>
                  <p className="style-guide_code">
                    Upload steps, demo redlines, calculator, carousel
                  </p>
                  <p className="style-guide_code">
                    Sticky CTA, modal links, report protection
                  </p>
                </div>
                {' '}
                <div className="style-guide_util is-card">
                  <p className="style-guide_label">
                    Case study body
                  </p>
                  <p className="style-guide_code">
                    Tabs between case study and style guide, each with its own link
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_links" data-anim-group="">
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /#terms-of-service
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens the Terms of Service
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /#privacy-policy
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens the Privacy Policy
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /#cookie-policy
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens the Cookie Policy
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /#cookie-settings
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens the cookie preferences
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /#sample-report
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens the protected sample report
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_code">
                    /case-study#style-guide
                  </p>
                  <p className="text-size-small text-color-secondary">
                    Opens this style guide
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
