// Case study section: The ROI before the scroll
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function HeroBlockSection() {
  return (
    <section className="section_case-study-hero-block" data-pane="case-study">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="case-study_block is-reverse">
                {' '}
                <div className="case-study_block-content" data-anim="">
                  {' '}
                  <span className="text-style-eyebrow text-color-brand">
                    02 · Hero
                  </span>
                  {' '}
                  <h2 className="heading-style-h3">
                    The ROI before the scroll
                  </h2>
                  {' '}
                  <div className="case-study_list">
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      A headline about money and timing: "Know what your contract costs before you sign."
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      The price inside the button, and "$500 or more" right under it
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Physician photos in the brand colors next to contract cards drawn in code, so the page reads as medical in the first second
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      A full-screen hero on every device
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Redline's own logo, with the tagline typo fixed from "Reiew" to "Review" using the letters of the original file
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      ISO 27001, SOC 2, AES-256 and GDPR right under the buttons
                    </div>
                    {' '}
                  </div>
                  {' '}
                </div>
                {' '}
                <div className="case-study_block-media is-first" data-anim="">
                  <div className="case-study_shot">
                    <img className="case-study_shot-image" src={asset("cs/after-hero-d.webp")} alt="New hero" width="1600" height="1000" />
                  </div>
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
