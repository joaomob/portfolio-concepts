// Style guide section: Spacing and utilities
// Markup ported word for word from the original case-study.html.

export default function SpacingSection() {
  return (
    <section className="section_style-guide-spacing" data-pane="style-guide" id="sg-spacing">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  08
                </span>
                <h2 className="heading-style-h3">
                  Spacing and utilities
                </h2>
                <p className="text-color-secondary">
                  Spacers add vertical space between blocks without margins, and the hide classes remove an element per breakpoint.
                </p>
              </div>
              {' '}
              <div className="style-guide_spacers" data-anim-group="">
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-tiny" />
                  </div>
                  <p className="style-guide_code">
                    spacer-tiny · 0.125rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-xxsmall" />
                  </div>
                  <p className="style-guide_code">
                    spacer-xxsmall · 0.25rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-xsmall" />
                  </div>
                  <p className="style-guide_code">
                    spacer-xsmall · 0.5rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-small" />
                  </div>
                  <p className="style-guide_code">
                    spacer-small · 1rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-medium" />
                  </div>
                  <p className="style-guide_code">
                    spacer-medium · 2rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-large" />
                  </div>
                  <p className="style-guide_code">
                    spacer-large · 3rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-xlarge" />
                  </div>
                  <p className="style-guide_code">
                    spacer-xlarge · 4rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-xxlarge" />
                  </div>
                  <p className="style-guide_code">
                    spacer-xxlarge · 5rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-huge" />
                  </div>
                  <p className="style-guide_code">
                    spacer-huge · 6rem
                  </p>
                </div>
                {' '}
                <div className="style-guide_spacer">
                  <div className="style-guide_bar">
                    <div className="spacer-xhuge" />
                  </div>
                  <p className="style-guide_code">
                    spacer-xhuge · 8rem
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_utils is-3-columns" data-anim-group="">
                {' '}
                <div className="style-guide_util">
                  <p className="style-guide_label">
                    Hide
                  </p>
                  <p className="style-guide_code">
                    hide · always
                  </p>
                  <p className="style-guide_code">
                    hide-tablet · 991 and below
                  </p>
                  <p className="style-guide_code">
                    hide-mobile-landscape · 767 and below
                  </p>
                  <p className="style-guide_code">
                    hide-mobile-portrait · 479 and below
                  </p>
                  <div className="hide" />
                  <div className="hide-tablet" />
                  <div className="hide-mobile-landscape" />
                  <div className="hide-mobile-portrait" />
                </div>
                {' '}
                <div className="style-guide_util overflow-hidden">
                  <p className="style-guide_label">
                    Overflow
                  </p>
                  <p className="style-guide_code">
                    overflow-hidden
                  </p>
                  <p className="style-guide_code">
                    overflow-visible
                  </p>
                  <p className="style-guide_code">
                    page-wrapper uses overflow clip, so sticky still works
                  </p>
                </div>
                {' '}
                <div className="style-guide_util overflow-visible">
                  <p className="style-guide_label">
                    Shadows
                  </p>
                  <p className="style-guide_code">
                    cards · 0 0 0 1px #eeeeee
                  </p>
                  <p className="style-guide_code">
                    floating · 0 40px 80px -30px red 35%
                  </p>
                  <p className="style-guide_code">
                    shots · 0 30px 60px -30px black 28%
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
