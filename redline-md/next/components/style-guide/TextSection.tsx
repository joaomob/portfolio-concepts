// Style guide section: Text utilities
// Markup ported word for word from the original case-study.html.

export default function TextSection() {
  return (
    <section className="section_style-guide-text" data-pane="style-guide" id="sg-text">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              03
            </span>
            <h2 className="heading-style-h3">
              Text utilities
            </h2>
            <p className="text-color-secondary">
              Client-First utility classes to adjust one property without a new class.
            </p>
          </div>
          {' '}
          <div className="style-guide_utils" data-anim-group="">
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Weight
              </p>
              <p className="text-weight-normal">
                text-weight-normal · 400
              </p>
              <p className="text-weight-medium">
                text-weight-medium · 500
              </p>
              <p className="text-weight-semibold">
                text-weight-semibold · 600
              </p>
              <p className="text-weight-bold">
                text-weight-bold · 700
              </p>
            </div>
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Color
              </p>
              <p className="text-color-black">
                text-color-black
              </p>
              <p className="text-color-secondary">
                text-color-secondary
              </p>
              <p className="text-color-brand">
                text-color-brand
              </p>
              <p className="text-color-red">
                text-color-red
              </p>
              <p className="text-color-green">
                text-color-green
              </p>
            </div>
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Align
              </p>
              <p className="text-align-left">
                text-align-left
              </p>
              <p className="text-align-center">
                text-align-center
              </p>
              <p className="text-align-right">
                text-align-right
              </p>
            </div>
            {' '}
            <div className="style-guide_util">
              <p className="style-guide_label">
                Style
              </p>
              <p className="text-style-allcaps">
                text-style-allcaps
              </p>
              <p className="text-style-eyebrow text-color-brand">
                text-style-eyebrow
              </p>
              <p className="text-style-balance">
                text-style-balance keeps titles free of orphans
              </p>
              <p>
                <span className="text-style-nowrap">
                  text-style-nowrap keeps words together
                </span>
              </p>
              <div className="style-guide_on-dark">
                <p className="text-color-white">
                  text-color-white on black
                </p>
              </div>
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
