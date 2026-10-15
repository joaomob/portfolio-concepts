// Case study section: Try it before you pay
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function DemoSection() {
  return (
    <section className="section_case-study-demo" data-pane="case-study">
      {' '}
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          {' '}
          <div className="case-study_block">
            {' '}
            <div className="case-study_block-content" data-anim="">
              {' '}
              <span className="text-style-eyebrow text-color-brand">
                05 · Demo
              </span>
              {' '}
              <h2 className="heading-style-h3">
                Try it before you pay
              </h2>
              {' '}
              <div className="case-study_list">
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  A sample contract with 4 flagged clauses
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Tap a flag to see the redline, with the original text struck through and the fix in green
                </div>
                {' '}
                <div className="case-study_list-item">
                  <span className="case-study_list-dot" />
                  Each clause reads as a full sentence before and after the redline
                </div>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
            <div className="case-study_block-media" data-anim="">
              <div className="case-study_shot">
                <img className="case-study_shot-image" src={asset("cs/demo-d.webp")} alt="Interactive sample contract" width="1600" height="794" />
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
