// Style guide section: Breakpoints
// Markup ported word for word from the original case-study.html.

export default function BreakpointsSection() {
  return (
    <section className="section_style-guide-breakpoints" data-pane="style-guide" id="sg-breakpoints">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              13
            </span>
            <h2 className="heading-style-h3">
              Breakpoints
            </h2>
            <p className="text-color-secondary">
              Webflow's default breakpoints, designed mobile-first for the 35% of traffic on phones.
            </p>
          </div>
          {' '}
          <div className="style-guide_attrs is-4-columns" data-anim-group="">
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Desktop
              </p>
              <p className="style-guide_code">
                992 and up
              </p>
              <p className="text-size-small text-color-secondary">
                Two-column blocks, centered section titles, hero art on both sides.
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Tablet
              </p>
              <p className="style-guide_code">
                991
              </p>
              <p className="text-size-small text-color-secondary">
                One column, titles aligned left, testimonials as a carousel, founder in two columns.
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Mobile landscape
              </p>
              <p className="style-guide_code">
                767
              </p>
              <p className="text-size-small text-color-secondary">
                Sticky CTA, full-width buttons, hero photos at the bottom, smaller type.
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Mobile portrait
              </p>
              <p className="style-guide_code">
                479
              </p>
              <p className="text-size-small text-color-secondary">
                H1 at 2.25rem and tighter cards.
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
