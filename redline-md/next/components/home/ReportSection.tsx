// What the report includes: three cards, each with its own mock (summary, concerns, financial impact).
// Markup ported word for word from the original index.html.

export default function ReportSection() {
  return (
    <section className="section_report">
      {' '}
      <div className="padding-global padding-section-large">
        <div className="container-large">
          {' '}
          <div className="report_heading" data-anim="">
            {' '}
            <div className="max-width-medium">
              <h2 className="heading-style-h2">
                Everything in your report
              </h2>
            </div>
            {' '}
            <a className="button" href="#sample-report" fs-modal-element="open" fs-modal-instance="report">
              <span className="button_content">
                See the full sample
              </span>
              <span className="button_hover" />
            </a>
            {' '}
          </div>
          {' '}
          <div className="report_component" data-anim-group="">
            {' '}
            <div className="report_card">
              <div className="report_card-content">
                <h3 className="heading-style-h4">
                  Contract summary
                </h3>
                <p className="text-color-secondary">
                  Every section in plain English, on one page.
                </p>
              </div>
              <div className="report_visual">
                <div className="report_mock">
                  <div className="report_mock-head">
                    <span className="art_logo" />
                    <span className="report_mock-title">
                      Contract summary
                    </span>
                  </div>
                  <div className="report_mock-row">
                    <span className="report_mock-label">
                      Offer
                    </span>
                    <span className="art_line is-width-80" />
                  </div>
                  <div className="report_mock-row">
                    <span className="report_mock-label">
                      Term
                    </span>
                    <span className="art_line is-width-60" />
                  </div>
                  <div className="report_mock-row">
                    <span className="report_mock-label">
                      Duties
                    </span>
                    <span className="art_line is-width-90" />
                  </div>
                  <div className="report_mock-row">
                    <span className="report_mock-label">
                      Bonus
                    </span>
                    <span className="art_line is-width-50" />
                  </div>
                </div>
              </div>
            </div>
            {' '}
            <div className="report_card">
              <div className="report_card-content">
                <h3 className="heading-style-h4">
                  Areas of concern
                </h3>
                <p className="text-color-secondary">
                  The risk of each term and what negotiating it saves.
                </p>
              </div>
              <div className="report_visual">
                <div className="report_mock">
                  <div className="report_mock-head">
                    <span className="art_logo" />
                    <span className="report_mock-title">
                      Areas of concern
                    </span>
                  </div>
                  <div className="report_mock-risk">
                    <span className="pill is-red">
                      High
                    </span>
                    <span className="report_mock-text">
                      Sign-on repayment
                    </span>
                  </div>
                  <div className="report_mock-risk">
                    <span className="pill is-red">
                      High
                    </span>
                    <span className="report_mock-text">
                      Non-compete radius
                    </span>
                  </div>
                  <div className="report_mock-risk">
                    <span className="pill is-amber">
                      Medium
                    </span>
                    <span className="report_mock-text">
                      Vague bonus terms
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {' '}
            <div className="report_card">
              <div className="report_card-content">
                <h3 className="heading-style-h4">
                  Financial impact
                </h3>
                <p className="text-color-secondary">
                  Conservative and aggressive savings, in dollars.
                </p>
              </div>
              <div className="report_visual">
                <div className="report_mock">
                  <div className="report_mock-head">
                    <span className="art_logo" />
                    <span className="report_mock-title">
                      Financial impact
                    </span>
                  </div>
                  <div className="report_mock-bar-row">
                    <span className="report_mock-text">
                      Conservative
                    </span>
                    <span className="report_mock-bar">
                      <span className="report_mock-bar-fill is-40" />
                    </span>
                    <span className="report_mock-value">
                      $20k to $40k
                    </span>
                  </div>
                  <div className="report_mock-bar-row">
                    <span className="report_mock-text">
                      Aggressive
                    </span>
                    <span className="report_mock-bar">
                      <span className="report_mock-bar-fill is-90" />
                    </span>
                    <span className="report_mock-value">
                      $50k to $100k
                    </span>
                  </div>
                </div>
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
