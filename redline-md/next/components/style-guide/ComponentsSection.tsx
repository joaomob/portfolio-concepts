// Style guide section: Components
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function ComponentsSection() {
  return (
    <section className="section_style-guide-components" data-pane="style-guide" id="sg-components">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="heading_component is-narrow" data-anim="">
            <span className="text-style-eyebrow text-color-brand">
              09
            </span>
            <h2 className="heading-style-h3">
              Components
            </h2>
            <p className="text-color-secondary">
              The pieces that make the page work, shown in their real states.
            </p>
          </div>
          {' '}
          <div className="style-guide_components" data-anim-group="">
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Navbar · navbar_component › navbar_container
              </p>
              <div className="navbar_container is-static">
                <a className="brand_link" href="#">
                  <img className="brand_logo" src={asset("logo.webp")} alt="Redline MD, Medical Contract Review" width="560" height="136" />
                </a>
                <a className="button is-small" href="#">
                  <span className="button_content">
                    Upload contract
                  </span>
                  <span className="button_hover" />
                </a>
              </div>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Clause redline · demo_clause is-active · demo_strike · demo_insert
              </p>
              <p className="demo_clause is-active">
                <span className="demo_clause-number">
                  6.1
                </span>
                {"For "}
                <span className="demo_strike">
                  24 months
                </span>
                {' '}
                <span className="demo_insert">
                  12 months
                </span>
                {" after termination, Physician shall not practice within "}
                <span className="demo_strike">
                  25 miles
                </span>
                {' '}
                <span className="demo_insert">
                  10 miles
                </span>
                {" of any Practice location."}
              </p>
            </div>
            {' '}
            <div className="style-guide_component is-dark">
              <p className="style-guide_label is-light">
                Flags · demo_flag · demo_flag is-active · demo_flag-dot is-mid
              </p>
              <div className="demo_flag is-active">
                <span className="demo_flag-dot" />
                Tail coverage paid by you
                <span className="demo_flag-level">
                  High
                </span>
              </div>
              <div className="demo_flag">
                <span className="demo_flag-dot is-mid" />
                Short notice period
                <span className="demo_flag-level">
                  Medium
                </span>
              </div>
            </div>
            {' '}
            <div className="style-guide_component is-dark">
              <p className="style-guide_label is-light">
                Calculator row · demo_calc-row · demo_calc-term · demo_calc-sub · tooltip_component
              </p>
              <div className="demo_calc-row is-result">
                <span className="demo_calc-label">
                  <span className="demo_calc-term">
                    Tail coverage
                  </span>
                  <span className="demo_calc-sub">
                    What you pay when you leave, if the contract says so
                  </span>
                </span>
                <span className="demo_calc-result">
                  $30,000
                </span>
              </div>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Cost bars · pricing_row · pricing_bar is-us / is-firm / is-risk
              </p>
              <div className="pricing_row is-us">
                <div className="pricing_name">
                  Redline MD
                </div>
                <div className="pricing_track">
                  <span className="pricing_bar is-us" />
                </div>
                <div className="pricing_value">
                  $199
                </div>
              </div>
              <div className="pricing_row is-risk">
                <div className="pricing_name">
                  Tail
                </div>
                <div className="pricing_track">
                  <span className="pricing_bar is-risk" />
                </div>
                <div className="pricing_value is-risk">
                  $10,000+
                </div>
              </div>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Carousel nav · carousel_dot is-active · carousel_arrow
              </p>
              <div className="carousel_nav is-shown">
                <div className="carousel_dots">
                  <span className="carousel_dot is-active" />
                  <span className="carousel_dot" />
                  <span className="carousel_dot" />
                </div>
                <div className="carousel_arrows">
                  <div className="carousel_arrow is-off" role="button" tabIndex={0} aria-label="Previous">
                    ←
                  </div>
                  <div className="carousel_arrow" role="button" tabIndex={0} aria-label="Next">
                    →
                  </div>
                </div>
              </div>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Upload step · modal_progress · modal_dropzone · modal_foot
              </p>
              <div className="modal_progress">
                <span className="modal_progress-bar is-active" />
                <span className="modal_progress-bar" />
                <span className="modal_progress-bar" />
              </div>
              <p className="modal_step">
                Step 1 of 3
              </p>
              <div className="modal_dropzone">
                <span className="modal_dropzone-title">
                  Drop your file or tap to choose
                </span>
                <span className="text-size-small text-color-secondary">
                  PDF or Word, up to 30 pages
                </span>
              </div>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Cookie card · cookie_banner · cookie_actions
              </p>
              <div className="cookie_banner is-static">
                <p className="cookie_title">
                  Cookies
                </p>
                <p className="text-size-small text-color-secondary">
                  We use cookies to measure traffic and improve your experience.
                </p>
                <div className="cookie_actions">
                  <a className="button is-small is-secondary" href="#">
                    <span className="button_content">
                      Reject
                    </span>
                  </a>
                  <a className="button is-small" href="#">
                    <span className="button_content">
                      Accept
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {' '}
          </div>
          {' '}
          <div className="style-guide_subheading" data-anim="">
            <p className="heading-style-h4">
              Webflow components
            </p>
          </div>
          {' '}
          <div className="style-guide_components" data-anim-group="">
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Global Styles · every page · code embed
              </p>
              <p className="text-color-secondary">
                The states that JavaScript and Finsweet switch on, and the button hover. The only CSS outside the classes.
              </p>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Project Bar · every page · project-bar_component
              </p>
              <p className="text-color-secondary">
                Links the landing page, the case study and this style guide.
              </p>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Navbar · landing page · navbar_component
              </p>
              <p className="text-color-secondary">
                Logo, section links and the upload button, fixed at the top.
              </p>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Footer · landing page · footer_component
              </p>
              <p className="text-color-secondary">
                Logo, product and legal links, contact and the disclaimer.
              </p>
            </div>
            {' '}
            <div className="style-guide_component">
              <p className="style-guide_label">
                Overlays · landing page · overlays_component
              </p>
              <p className="text-color-secondary">
                Upload flow, sample report, legal modals, cookie banner and the sticky CTA on mobile.
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
