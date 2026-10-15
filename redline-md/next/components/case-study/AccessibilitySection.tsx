// Case study section: Checked against WCAG AA
// Markup ported word for word from the original case-study.html.

export default function AccessibilitySection() {
  return (
    <section className="section_case-study-accessibility" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block-content is-wide" data-anim="">
            {' '}
            <span className="text-style-eyebrow text-color-brand">
              13 · Accessibility
            </span>
            {' '}
            <h2 className="heading-style-h3">
              Checked against WCAG AA
            </h2>
            {' '}
          </div>
          {' '}
          <div className="card_list" data-anim-group="">
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                Contrast on every text
              </p>
              <p className="text-color-secondary">
                Every text on both pages, on its real background, at all 4 breakpoints, including modals, the cookie card and the fixed CTA. All at 4.5:1 or more, even large text.
              </p>
            </div>
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                A darker red for text
              </p>
              <p className="text-color-secondary">
                Brand red on the gray cards reached only 4.25:1. Text now uses a darker red at 6.1:1, and buttons keep the brand red.
              </p>
            </div>
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                Fields you can see
              </p>
              <p className="text-color-secondary">
                Input borders went from 1.4:1 to 5.5:1, and text stays at 16px so iPhones don't zoom in on focus.
              </p>
            </div>
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                Errors in words
              </p>
              <p className="text-color-secondary">
                Upload errors are written next to the field and read by screen readers, not shown by a red border alone.
              </p>
            </div>
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                Works with a keyboard
              </p>
              <p className="text-color-secondary">
                The demo flags, the carousel arrows and the tooltips all respond to Tab and Enter.
              </p>
            </div>
            {' '}
            <div className="card_component is-gray">
              <p className="heading-style-h4">
                Motion you can turn off
              </p>
              <p className="text-color-secondary">
                With reduced motion on, entrance, scroll and hover animations stop, and every element shows at rest.
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
