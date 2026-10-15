// Case study section: Trust before the payment
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function TrustSection() {
  return (
    <section className="section_case-study-trust" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                09 · Trust
              </span>
              {' '}
              <h2 className="heading-style-h3">
                Trust before the payment
              </h2>
              {' '}
              <div className="case-study_list">
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Testimonials with photo, specialty and the result in numbers
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  A physician founder with his own tail clause story
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  A security section right after the price, where "is my contract safe?" is the last doubt before paying
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  An FAQ that answers turnaround, security, refund and the lawyer question
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media is-stack" data-anim-group="">
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/security-d.webp")} alt="Security section" width="1600" height="752" />
              </div>
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/founder-d.webp")} alt="Founder section" width="1600" height="810" />
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
