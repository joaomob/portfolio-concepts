// Style guide section: Layout
// Markup ported word for word from the original case-study.html.

export default function LayoutSection() {
  return (
    <section className="section_style-guide-layout" data-pane="style-guide" id="sg-layout">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              07
            </span>
            <h2 className="heading-style-h3">
              Layout
            </h2>
            <p className="text-color-secondary">
              Client-First structure on every section. Horizontal padding lives only in padding-global, and containers only set the max width.
            </p>
          </div>
          {' '}
          <div className="style-guide_structure" data-anim="">
            {' '}
            <div className="style-guide_box">
              <p className="style-guide_code">
                page-wrapper · overflow clip
              </p>
              {' '}
              <div className="style-guide_box is-main-wrapper">
                <p className="style-guide_code">
                  main-wrapper
                </p>
                {' '}
                <div className="style-guide_box is-section">
                  <p className="style-guide_code">
                    section_[name] › section-frame (1.25 / 0.5rem) › section-card (radius 2.5rem)
                  </p>
                  {' '}
                  <div className="style-guide_box is-padding-global">
                    <p className="style-guide_code">
                      padding-global padding-section-large · one div: 1.5rem sides, 8 / 6 / 4.5rem top and bottom
                    </p>
                    {' '}
                    <div className="style-guide_box is-container">
                      <p className="style-guide_code">
                        container-large · 79.5rem · container-small · 51.25rem
                      </p>
                      {' '}
                      <div className="style-guide_box is-content">
                        <p className="style-guide_code">
                          content · padding-section-medium 6 / 3.5rem · padding-section-small 3.5 / 3 / 2.5rem
                        </p>
                      </div>
                      {' '}
                    </div>
                    {' '}
                  </div>
                  {' '}
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
          </div>
          {' '}
          <div className="style-guide_utils is-3-columns" data-anim-group="">
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Max width
              </p>
              <p className="style-guide_code">
                max-width-small · 34rem
              </p>
              <p className="style-guide_code">
                max-width-medium · 44rem
              </p>
              <div className="max-width-large">
                <p className="style-guide_code">
                  max-width-large · 54rem
                </p>
              </div>
              <div className="max-width-full">
                <p className="style-guide_code">
                  max-width-full · none
                </p>
              </div>
            </div>
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Heading blocks
              </p>
              <p className="style-guide_code">
                heading_component · gap 1.25rem, margin-bottom 3.5rem
              </p>
              <p className="style-guide_code">
                heading_component is-center · left on tablet and mobile
              </p>
              <p className="style-guide_code">
                heading_component is-flush · no margin
              </p>
            </div>
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Grids
              </p>
              <p className="style-guide_code">
                report_component · terms_component · how_component · testimonials_component
              </p>
              <p className="style-guide_code">
                problem_component · demo_component · founder_component
              </p>
              <p className="style-guide_code">
                1 column on tablet, carousel for testimonials
              </p>
            </div>
            {' '}
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
