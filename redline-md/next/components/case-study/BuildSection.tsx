// Case study section: Easy for the team to edit
// Markup ported word for word from the original case-study.html.

export default function BuildSection() {
  return (
    <section className="section_case-study-build" data-pane="case-study">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="case-study_block-content is-wide" data-anim="">
                {' '}
                <span className="text-style-eyebrow text-color-brand">
                  12 · Build
                </span>
                {' '}
                <h2 className="heading-style-h3">
                  Easy for the team to edit
                </h2>
                {' '}
              </div>
              {' '}
              <div className="card_list" data-anim-group="">
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Webflow and Client-First
                  </p>
                  <p className="text-color-secondary">
                    Every class follows the Client-First naming, from the page structure to the components.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Finsweet
                  </p>
                  <p className="text-color-secondary">
                    Attributes for the accordion, modals, counter and slider, and Cookie Consent for the banner, all editable without code.
                  </p>
                </div>
                {' '}
                <div className="card_component">
                  <p className="heading-style-h4">
                    Motion
                  </p>
                  <p className="text-color-secondary">
                    Entrances, hero art, bars and the founder photo are Webflow Interactions, editable in the Designer with no custom code.
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
