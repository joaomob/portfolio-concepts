// Case study section: Six clauses, each with a source
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function TermsSection() {
  return (
    <section className="section_case-study-terms" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                07 · Clauses
              </span>
              {' '}
              <h2 className="heading-style-h3">
                Six clauses, each with a source
              </h2>
              {' '}
              <div className="case-study_list">
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Validated against Med Contract Law's physician contract red flags and Redline's own report
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media" data-anim="">
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/terms-d.webp")} alt="Six clauses section" width="1600" height="924" />
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
