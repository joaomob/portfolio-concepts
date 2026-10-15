// Style guide section: Finsweet
// Markup ported word for word from the original case-study.html.

export default function FinsweetSection() {
  return (
    <section className="section_style-guide-finsweet" data-pane="style-guide" id="sg-finsweet">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              11
            </span>
            <h2 className="heading-style-h3">
              Finsweet
            </h2>
            <p className="text-color-secondary">
              Interactions set with attributes in the Designer, so the team edits them without code. Scripts load once in the site head.
            </p>
          </div>
          {' '}
          <div className="style-guide_attrs" data-anim-group="">
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Accordion
              </p>
              <p className="text-size-small text-color-secondary">
                FAQ, one item open at a time
              </p>
              <p className="style-guide_code">
                fs-accordion-element="group" · fs-accordion-single="true"
              </p>
              <p className="style-guide_code">
                accordion · trigger · content · arrow
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Modal
              </p>
              <p className="text-size-small text-color-secondary">
                Upload, sample report, terms, privacy and cookie policy
              </p>
              <p className="style-guide_code">
                fs-modal-element="modal · open · close"
              </p>
              <p className="style-guide_code">
                fs-modal-instance="upload · report · terms · privacy · cookies"
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Number count
              </p>
              <p className="text-size-small text-color-secondary">
                The $10,000 card and the 3 stats
              </p>
              <p className="style-guide_code">
                fs-numbercount-element="number"
              </p>
              <p className="style-guide_code">
                fs-numbercount-end · locale="en-US" · duration
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Range slider
              </p>
              <p className="text-size-small text-color-secondary">
                The malpractice premium in the calculator
              </p>
              <p className="style-guide_code">
                fs-rangeslider-element="wrapper · track · fill · handle · display-value"
              </p>
              <p className="style-guide_code">
                min 5000 · max 40000 · step 1000 · start 15000
              </p>
            </div>
            {' '}
            <div className="style-guide_attr">
              <p className="heading-style-h4">
                Cookie Consent
              </p>
              <p className="text-size-small text-color-secondary">
                Opt-in banner and preferences
              </p>
              <p className="style-guide_code">
                fs-cc="banner · allow · deny · open-preferences · preferences · submit"
              </p>
              <p className="style-guide_code">
                fs-cc-checkbox="analytics · marketing"
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
