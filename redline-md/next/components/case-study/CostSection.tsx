// Case study section: The cost, side by side
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function CostSection() {
  return (
    <section className="section_case-study-cost" data-pane="case-study">
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
                    08 · Pricing
                  </span>
                  {' '}
                  <h2 className="heading-style-h3">
                    The cost, side by side
                  </h2>
                  {' '}
                  <div className="case-study_list">
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      $199 vs. $480 to $1,950 at a contract firm vs. $10,000+ for a tail nobody negotiated
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Firm prices from Contract Diagnostics' published packages
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Redline in black with a green savings badge, and red kept for the risk
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      One product, one price, one CTA
                    </div>
                    {' '}
                  </div>
                  {' '}
                </div>
                {' '}
                <div className="case-study_block-media is-first" data-anim="">
                  <div className="case-study_shot">
                    <img className="case-study_shot-image" src={asset("cs/compare-d.webp")} alt="Cost comparison" width="1600" height="874" />
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
