// The problem: the costly clauses, the $10,000+ card and the three counters (fs-numbercount).
// Markup ported word for word from the original index.html.

export default function ProblemSection() {
  return (
    <section className="section_problem">
      {' '}
      <div className="padding-global padding-section-large">
        <div className="container-large">
          {' '}
          <div className="problem_component">
            {' '}
            <div className="heading_component is-flush" data-anim="">
              {' '}
              <h2 className="heading-style-h2">
                The costly clauses show up when you leave.
              </h2>
              {' '}
              <p className="text-size-large text-color-secondary">
                Most first contracts are signed without a line-by-line review. Tail insurance and unnegotiated terms become the bill for your next job change.
              </p>
              {' '}
              <div className="button-group">
                <a className="button" href="#" fs-modal-element="open" fs-modal-instance="upload">
                  <span className="button_content">
                    {"Check my contract "}
                    <span className="button_price">
                      $199
                    </span>
                  </span>
                  <span className="button_hover" />
                </a>
              </div>
              {' '}
            </div>
            {' '}
            <div>
              {' '}
              <div className="problem_card" data-anim="">
                {' '}
                <div className="problem_number">
                  $
                  <span fs-numbercount-element="number" fs-numbercount-end="10000" fs-numbercount-locale="en-US" fs-numbercount-duration="1600">
                    10,000
                  </span>
                  +
                </div>
                {' '}
                <p className="problem_caption">
                  What tail insurance and unnegotiated liabilities can cost a new physician.
                </p>
                {' '}
              </div>
              {' '}
              <div className="problem_stats" data-anim-group="">
                {' '}
                <div className="problem_stat">
                  <div className="problem_stat-number">
                    <span fs-numbercount-element="number" fs-numbercount-end="30">
                      30
                    </span>
                    %
                  </div>
                  <div className="problem_stat-label">
                    Higher salary negotiated
                  </div>
                </div>
                {' '}
                <div className="problem_stat">
                  <div className="problem_stat-number">
                    $
                    <span fs-numbercount-element="number" fs-numbercount-end="10000" fs-numbercount-locale="en-US">
                      10,000
                    </span>
                  </div>
                  <div className="problem_stat-label">
                    Less liability exposure
                  </div>
                </div>
                {' '}
                <div className="problem_stat">
                  <div className="problem_stat-number">
                    <span fs-numbercount-element="number" fs-numbercount-end="3000">
                      3,000
                    </span>
                    +
                  </div>
                  <div className="problem_stat-label">
                    Contracts reviewed
                  </div>
                </div>
                {' '}
              </div>
              {' '}
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
