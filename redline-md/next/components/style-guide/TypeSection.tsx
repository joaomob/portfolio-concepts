// Style guide section: Typography
// Markup ported word for word from the original case-study.html.

export default function TypeSection() {
  return (
    <section className="section_style-guide-type" data-pane="style-guide" id="sg-type">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  02
                </span>
                <h2 className="heading-style-h3">
                  Typography
                </h2>
                <p className="text-color-secondary">
                  Figtree from Google Fonts in 4 weights, with tight tracking on every heading. Sizes shown as desktop / tablet / mobile.
                </p>
              </div>
              {' '}
              <div className="style-guide_font" data-anim="">
                {' '}
                <p className="style-guide_font-sample">
                  Aa
                </p>
                {' '}
                <div className="style-guide_font-info">
                  <p className="heading-style-h4">
                    Figtree
                  </p>
                  <p className="text-color-secondary">
                    Regular 400 · Medium 500 · Semibold 600 · Bold 700
                  </p>
                  <p className="style-guide_code">
                    body: 1.125rem / 1.5, letter-spacing -0.02em, color #0a0a0a
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_subheading" data-anim="">
                <p className="heading-style-h4">
                  Tag styles
                </p>
                <p className="text-size-small text-color-secondary">
                  The tag sets the SEO level and the class sets the look, so an h2 can look like an H3 when the layout asks for it. Every heading on these pages has a heading-style class, and the tag styles below are the base for any heading added without one.
                </p>
              </div>
              {' '}
              <div className="style-guide_links" data-anim-group="">
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    Body
                  </p>
                  <p className="style-guide_code">
                    Figtree · 1.125rem / 1.5 · #0a0a0a · letter-spacing -0.02em
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    Paragraph
                  </p>
                  <p className="style-guide_code">
                    margin 0 · size and color from the body
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H1
                  </p>
                  <p className="style-guide_code">
                    3.75 / 3 / 2.5 / 2.25rem · 600 · 1.15 · margin 0
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H2
                  </p>
                  <p className="style-guide_code">
                    3 / 2.5 / 2.125rem · 600 · 1.15 · balance · margin 0
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H3
                  </p>
                  <p className="style-guide_code">
                    2.5 / 2 / 1.75rem · 600 · 1.15 · balance · margin 0
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H4
                  </p>
                  <p className="style-guide_code">
                    1.5rem · 600 · 1.2 · margin 0
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H5
                  </p>
                  <p className="style-guide_code">
                    1.25rem · 600 · 1.3 · margin 0
                  </p>
                </div>
                {' '}
                <div className="style-guide_link-row">
                  <p className="style-guide_label">
                    H6
                  </p>
                  <p className="style-guide_code">
                    1.125rem · 600 · 1.4 · margin 0
                  </p>
                </div>
                {' '}
              </div>
              {' '}
              <div className="style-guide_subheading" data-anim="">
                <p className="heading-style-h4">
                  Heading and text classes
                </p>
              </div>
              {' '}
              <div className="style-guide_rows" data-anim-group="">
                {' '}
                <div className="style-guide_row">
                  <p className="heading-style-h1">
                    Know what it costs
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      heading-style-h1 · H1
                    </p>
                    <p className="style-guide_code">
                      3.75 / 3 / 2.5 / 2.25rem · 600 · 1.15
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="heading-style-h2">
                    The costly clauses
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      heading-style-h2 · H2
                    </p>
                    <p className="style-guide_code">
                      3 / 2.5 / 2.125rem · 600 · 1.15 · balance
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="heading-style-h3">
                    Try it before you pay
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      heading-style-h3 · case study titles
                    </p>
                    <p className="style-guide_code">
                      2.5 / 2 / 1.75rem · 600 · 1.15
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="heading-style-h4">
                    Contract summary
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      heading-style-h4 · card titles
                    </p>
                    <p className="style-guide_code">
                      1.5rem · 600 · 1.2
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <div className="problem_number">
                    $10,000+
                  </div>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      problem_number
                    </p>
                    <p className="style-guide_code">
                      6 / 4.25rem · 600 · red light
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <div className="problem_stat-number">
                    3,000+
                  </div>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      problem_stat-number
                    </p>
                    <p className="style-guide_code">
                      2.75 / 1.625rem · 600 · tabular numbers
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="founder_quote">
                    "It cost me $22,000 when I changed jobs."
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      founder_quote
                    </p>
                    <p className="style-guide_code">
                      1.875 / 1.5 / 1.375rem · 500 · 1.35
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="testimonials_quote">
                    "The practice agreed to split it."
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      testimonials_quote
                    </p>
                    <p className="style-guide_code">
                      1.25rem · 500 · 1.45
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="text-size-large text-color-secondary">
                    AI contract review with redlines and a financial analysis.
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      text-size-large
                    </p>
                    <p className="style-guide_code">
                      1.25 / 1.125rem · 1.5 · color from text-color-secondary
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="text-color-secondary">
                    Every section in plain English, on one page.
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      p tag · no size class
                    </p>
                    <p className="style-guide_code">
                      1.125rem · 1.5 · inherits the body
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="text-size-small text-color-secondary">
                    PDF or Word, up to 30 pages
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      text-size-small
                    </p>
                    <p className="style-guide_code">
                      0.9375rem · 1.45 · color from text-color-secondary
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="demo_review-title">
                    4 terms flagged
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      demo_review-title · eyebrow
                    </p>
                    <p className="style-guide_code">
                      0.875rem · 700 · uppercase · 0.06em
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <div>
                    <p className="person_name">
                      Dr. Emily Hart
                    </p>
                    <p className="person_role">
                      Family Medicine · 2025
                    </p>
                  </div>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      person_name · person_role
                    </p>
                    <p className="style-guide_code">
                      1.0625rem · 600 / 0.9375rem · gray 600
                    </p>
                  </div>
                </div>
                {' '}
                <div className="style-guide_row">
                  <p className="pricing_source">
                    Firm pricing: Contract Diagnostics published packages.
                  </p>
                  <div className="style-guide_meta">
                    <p className="style-guide_label">
                      pricing_source
                    </p>
                    <p className="style-guide_code">
                      0.8125rem · gray 500
                    </p>
                  </div>
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
