// Style guide section: Motion
// Markup ported word for word from the original case-study.html.

export default function MotionSection() {
  return (
    <section className="section_style-guide-motion" data-pane="style-guide" id="sg-motion">
      {' '}
      <div className="section-frame">
        <div className="section-card is-texture">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="heading_component is-narrow" data-anim="">
                <span className="text-style-eyebrow text-color-brand">
                  10
                </span>
                <h2 className="heading-style-h3">
                  Motion
                </h2>
                <p className="text-color-secondary">
                  Every animation is a Webflow Interaction, so timing and easing are edited in the Interactions panel. No animation lives in custom code.
                </p>
              </div>
              {' '}
              <div className="card_list" data-anim-group="">
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Fade up on scroll
                  </p>
                  <p className="style-guide_code">
                    Scroll into view · trigger element
                  </p>
                  <p className="text-color-secondary">
                    Each block rises 28px and fades in over 0.9s. Cards in a row start 80ms apart.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Hero art enter
                  </p>
                  <p className="style-guide_code">
                    Scroll into view · outQuart 1.5s
                  </p>
                  <p className="text-color-secondary">
                    The photos and contract cards slide in from the sides as the page loads, one after the other.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Bar grow on scroll
                  </p>
                  <p className="style-guide_code">
                    Scale X 0 → 1 · origin left
                  </p>
                  <p className="text-color-secondary">
                    Cost bars and report bars grow from the left in sequence.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Image reveal on scroll
                  </p>
                  <p className="style-guide_code">
                    Opacity + scale 1.06 → 1
                  </p>
                  <p className="text-color-secondary">
                    The founder photo fades in from a slight zoom.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Button hover
                  </p>
                  <p className="style-guide_code">
                    button_hover · class transition
                  </p>
                  <p className="text-color-secondary">
                    A red layer slides up behind the label on hover.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    FAQ icon
                  </p>
                  <p className="style-guide_code">
                    Finsweet accordion · is-accordion-active
                  </p>
                  <p className="text-color-secondary">
                    The plus rotates 45° into a close icon, and the answer opens with a 400ms max-height transition.
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
