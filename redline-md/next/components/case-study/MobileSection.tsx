// Case study section: Built for the phone first
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function MobileSection() {
  return (
    <section className="section_case-study-mobile" data-pane="case-study">
      {' '}
      <div className="section-frame">
        <div className="section-card is-texture">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="case-study_block-content is-wide" data-anim="">
                {' '}
                <span className="text-style-eyebrow text-color-brand">
                  10 · Mobile
                </span>
                {' '}
                <h2 className="heading-style-h3">
                  Built for the phone first
                </h2>
                {' '}
                <div className="case-study_list is-grid">
                  {' '}
                  <div className="case-study_list-item">
                    <span className="case-study_list-dot" />
                    A fixed CTA that appears after the hero and hides at the final CTA
                  </div>
                  {' '}
                  <div className="case-study_list-item">
                    <span className="case-study_list-dot" />
                    Upload in 3 steps (file, email, payment), with no account
                  </div>
                  {' '}
                  <div className="case-study_list-item">
                    <span className="case-study_list-dot" />
                    Testimonials as a carousel with dots and arrows
                  </div>
                  {' '}
                  <div className="case-study_list-item">
                    <span className="case-study_list-dot" />
                    A small opt-in cookie card with preferences
                  </div>
                  {' '}
                </div>
                {' '}
              </div>
              {' '}
              <div className="case-study_phones" data-anim-group="">
                {' '}
                <div className="case-study_phone">
                  <img className="case-study_shot-image" src={asset("cs/sticky-m.webp")} alt="Fixed CTA on mobile" width="780" height="1688" />
                </div>
                {' '}
                <div className="case-study_phone">
                  <img className="case-study_shot-image" src={asset("cs/upload-m.webp")} alt="Upload modal on mobile" width="780" height="1688" />
                </div>
                {' '}
                <div className="case-study_phone">
                  <img className="case-study_shot-image" src={asset("cs/testimonials-m.webp")} alt="Testimonials carousel on mobile" width="780" height="1442" />
                </div>
                {' '}
                <div className="case-study_phone">
                  <img className="case-study_shot-image" src={asset("cs/cookie-m.webp")} alt="Cookie card on mobile" width="780" height="1688" />
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
