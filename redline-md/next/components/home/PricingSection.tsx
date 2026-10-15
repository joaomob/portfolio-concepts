// Pricing: the three bars (Redline MD, a contract firm, an unnegotiated tail) and the source line.
// Markup ported word for word from the original index.html.

export default function PricingSection() {
  return (
    <section className="section_pricing" id="pricing">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-large">
            <div className="container-large">
              {' '}
              <div className="heading_component is-center" data-anim="">
                <h2 className="heading-style-h2">
                  What a contract review costs
                </h2>
              </div>
              {' '}
              <div className="pricing_component" data-anim="">
                {' '}
                <div className="pricing_row is-us">
                  <div className="pricing_name">
                    {"Redline MD "}
                    <span className="pill is-green">
                      Save up to $1,751
                    </span>
                  </div>
                  <div className="pricing_track">
                    <span className="pricing_bar is-us" />
                  </div>
                  <div className="pricing_value">
                    $199
                  </div>
                </div>
                {' '}
                <div className="pricing_row">
                  <div className="pricing_name">
                    Physician contract firm
                  </div>
                  <div className="pricing_track">
                    <span className="pricing_bar is-firm" />
                  </div>
                  <div className="pricing_value">
                    $480 to $1,950
                  </div>
                </div>
                {' '}
                <div className="pricing_row is-risk">
                  <div className="pricing_name">
                    {"Tail you didn't "}
                    <span className="tooltip_trigger-wrapper">
                      negotiate
                      <span className="tooltip_component is-light" tabIndex={0} role="button" aria-label="What does this mean?">
                        i
                        <span className="tooltip_bubble" role="tooltip">
                          Also called extended reporting coverage. A one-time purchase that keeps you insured for claims filed after you leave, about care you gave while employed. It can cost up to 2× your annual premium, paid once (source: AMA Insurance).
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="pricing_track">
                    <span className="pricing_bar is-risk" />
                  </div>
                  <div className="pricing_value is-risk">
                    $10,000+
                  </div>
                </div>
                {' '}
              </div>
              {' '}
              <div className="pricing_cta" data-anim="">
                {' '}
                <a className="button" href="#" fs-modal-element="open" fs-modal-instance="upload">
                  <span className="button_content">
                    {"Upload your contract "}
                    <span className="button_price">
                      $199
                    </span>
                  </span>
                  <span className="button_hover" />
                </a>
                {' '}
                <p className="pricing_source">
                  Firm pricing: Contract Diagnostics published packages, September 2026.
                </p>
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
