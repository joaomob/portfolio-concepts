// Case study section: A site that made physicians doubt it
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function FoundSection() {
  return (
    <section className="section_case-study-found" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                01 · What I found
              </span>
              {' '}
              <h2 className="heading-style-h3">
                A site that made physicians doubt it
              </h2>
              {' '}
              <div className="case-study_issues">
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  A typo in the logo: "Medical Contract Reiew"
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  Savings of $50,000, $10,000 and $6,000 in different sections, and a salary counter stuck at 0%
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  Blurry, invented product screens
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  The sample report was a Google Drive link
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  $199 never shown next to the $500 lawyer, and the $10,000 risk buried mid-page
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  On mobile, a cookie banner covering a third of the screen and no fixed CTA
                </div>
                {' '}
                <div className="case-study_issue">
                  <span className="case-study_issue-icon">
                    ✕
                  </span>
                  A footer with only the name and the copyright
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media is-pair" data-anim-group="">
              {' '}
              <div className="case-study_phone">
                <img className="case-study_shot-image" src={asset("cs/before-rl-m-1.webp")} alt="The current site on mobile, with the cookie banner" width="780" height="1688" />
              </div>
              {' '}
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/before-rl-d-5.webp")} alt="The current site footer" width="1440" height="900" />
                <span className="case-study_label">
                  Before
                </span>
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
