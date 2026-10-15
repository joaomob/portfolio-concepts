// Case study section: Numbers that agree with each other
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function NumbersSection() {
  return (
    <section className="section_case-study-numbers" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                03 · Proof
              </span>
              {' '}
              <h2 className="heading-style-h3">
                Numbers that agree with each other
              </h2>
              {' '}
              <div className="case-study_list">
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Only figures from the brief and the current site
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  The $10,000 risk counts up when it enters the screen
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media" data-anim="">
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/problem-d.webp")} alt="Problem section with the $10,000 card" width="1600" height="768" />
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
