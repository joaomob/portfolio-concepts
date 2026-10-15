// Case study section: Everything stays on the page
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function LegalSection() {
  return (
    <section className="section_case-study-legal" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                11 · Legal and footer
              </span>
              {' '}
              <h2 className="heading-style-h3">
                Everything stays on the page
              </h2>
              {' '}
              <div className="case-study_list">
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Terms, privacy and cookie policies open as modals
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Each one has its own URL, like /#privacy-policy, that opens the policy directly, ready for app stores, ad platforms and anyone who asks for the link
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Cookie preferences can change any time from the footer
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  A full footer with product links, legal pages, contact and a disclaimer
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media is-stack" data-anim-group="">
              {' '}
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/legal-d.webp")} alt="Privacy Policy opened from its own link" width="1600" height="1000" />
              </div>
              {' '}
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/footer-d.webp")} alt="New footer" width="1600" height="496" />
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
