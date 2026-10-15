// The demo: the sample contract with its redlines, the four flags and the tail calculator (fs-rangeslider).
// Markup ported word for word from the original index.html.

export default function DemoSection() {
  return (
    <section className="section_demo" id="demo">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-large">
            <div className="container-large">
              {' '}
              <div className="heading_component is-center" data-anim="">
                <h2 className="heading-style-h2">
                  Try it on a sample contract
                </h2>
                <p className="text-size-large text-color-secondary">
                  Tap a flagged term to see the redline.
                </p>
              </div>
              {' '}
              <div className="demo_component" data-anim="">
                {' '}
                <article className="demo_contract" aria-label="Sample physician employment contract">
                  {' '}
                  <div className="demo_contract-head">
                    <span className="demo_contract-title">
                      Employment Agreement
                    </span>
                    <span className="pill is-gray">
                      Fictional sample
                    </span>
                  </div>
                  {' '}
                  <p className="demo_clause is-flag is-active" data-clause="tail">
                    <span className="demo_clause-number">
                      4.2
                    </span>
                    {"Upon termination, Physician shall "}
                    <span className="demo_strike">
                      pay for
                    </span>
                    <span className="demo_redline is-show" data-redline="tail">
                      {' '}
                      <span className="demo_insert">
                        share equally with the Practice the cost of
                      </span>
                    </span>
                    {" tail coverage for claims arising during employment."}
                  </p>
                  {' '}
                  <p className="demo_clause is-flag" data-clause="noncompete">
                    <span className="demo_clause-number">
                      6.1
                    </span>
                    {"For "}
                    <span className="demo_strike">
                      24 months
                    </span>
                    <span className="demo_redline" data-redline="noncompete">
                      {' '}
                      <span className="demo_insert">
                        12 months
                      </span>
                    </span>
                    {" after termination, Physician shall not practice within "}
                    <span className="demo_strike">
                      25 miles
                    </span>
                    <span className="demo_redline" data-redline="noncompete">
                      {' '}
                      <span className="demo_insert">
                        10 miles
                      </span>
                    </span>
                    {" of any Practice location."}
                  </p>
                  {' '}
                  <p className="demo_clause is-flag" data-clause="notice">
                    <span className="demo_clause-number">
                      7.3
                    </span>
                    {"Either party may terminate without cause upon "}
                    <span className="demo_strike">
                      30 days'
                    </span>
                    <span className="demo_redline" data-redline="notice">
                      {' '}
                      <span className="demo_insert">
                        90 days'
                      </span>
                    </span>
                    {" written notice."}
                  </p>
                  {' '}
                  <p className="demo_clause is-flag" data-clause="bonus">
                    <span className="demo_clause-number">
                      3.4
                    </span>
                    {"Physician may receive a productivity bonus "}
                    <span className="demo_strike">
                      at the Practice's discretion
                    </span>
                    <span className="demo_redline" data-redline="bonus">
                      {' '}
                      <span className="demo_insert">
                        of $45 per wRVU above 4,800 per year
                      </span>
                    </span>
                    .
                  </p>
                  {' '}
                </article>
                {' '}
                <aside className="demo_review" aria-label="Review summary">
                  {' '}
                  <p className="demo_review-title">
                    4 terms flagged
                  </p>
                  {' '}
                  <div className="demo_flag is-active" data-flag="tail" role="button" tabIndex={0}>
                    <span className="demo_flag-dot" />
                    Tail coverage paid by you
                    <span className="demo_flag-level">
                      High
                    </span>
                  </div>
                  {' '}
                  <div className="demo_flag" data-flag="noncompete" role="button" tabIndex={0}>
                    <span className="demo_flag-dot" />
                    Broad non-compete
                    <span className="demo_flag-level">
                      High
                    </span>
                  </div>
                  {' '}
                  <div className="demo_flag" data-flag="notice" role="button" tabIndex={0}>
                    <span className="demo_flag-dot is-mid" />
                    Short notice period
                    <span className="demo_flag-level">
                      Medium
                    </span>
                  </div>
                  {' '}
                  <div className="demo_flag" data-flag="bonus" role="button" tabIndex={0}>
                    <span className="demo_flag-dot is-mid" />
                    Undefined bonus
                    <span className="demo_flag-level">
                      Medium
                    </span>
                  </div>
                  {' '}
                  <div className="demo_calc">
                    {' '}
                    <div className="demo_range" fs-rangeslider-element="wrapper" fs-rangeslider-min="5000" fs-rangeslider-max="40000" fs-rangeslider-step="1000">
                      {' '}
                      <div className="demo_calc-row">
                        <span className="demo_calc-label">
                          <span className="demo_calc-term">
                            {"Annual malpractice "}
                            <span className="tooltip_trigger-wrapper">
                              premium
                              <span className="tooltip_component" tabIndex={0} role="button" aria-label="What does this mean?">
                                i
                                <span className="tooltip_bubble" role="tooltip">
                                  The yearly price of your malpractice insurance, which pays for your defense if a patient sues. Most policies only cover claims filed while the policy is active.
                                </span>
                              </span>
                            </span>
                          </span>
                          <span className="demo_calc-sub">
                            What your malpractice insurance costs per year
                          </span>
                        </span>
                        <span className="demo_calc-premium" data-premium-out="">
                          $15,000
                        </span>
                        <span className="demo_calc-raw" fs-rangeslider-element="display-value" data-premium="">
                          15000
                        </span>
                      </div>
                      {' '}
                      <div className="demo_range-track" fs-rangeslider-element="track">
                        <div className="demo_range-fill" fs-rangeslider-element="fill" />
                        <div className="demo_range-handle" fs-rangeslider-element="handle" fs-rangeslider-start="15000" />
                      </div>
                      {' '}
                    </div>
                    {' '}
                    <div className="demo_calc-row is-result">
                      <span className="demo_calc-label">
                        <span className="demo_calc-term">
                          {"Tail "}
                          <span className="tooltip_trigger-wrapper">
                            coverage
                            <span className="tooltip_component" tabIndex={0} role="button" aria-label="What does this mean?">
                              i
                              <span className="tooltip_bubble" role="tooltip">
                                Also called extended reporting coverage. A one-time purchase that keeps you insured for claims filed after you leave, about care you gave while employed. It can cost up to 2× your annual premium, paid once (source: AMA Insurance).
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="demo_calc-sub">
                          What you pay when you leave, if the contract says so
                        </span>
                      </span>
                      <span className="demo_calc-result" data-tail="">
                        $30,000
                      </span>
                    </div>
                    {' '}
                    <a className="button is-accent is-full" href="#" fs-modal-element="open" fs-modal-instance="upload">
                      <span className="button_content">
                        Check my contract · $199
                      </span>
                    </a>
                    {' '}
                  </div>
                  {' '}
                </aside>
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
