// Case study section: A calculator anyone understands
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function CalcSection() {
  return (
    <section className="section_case-study-calc" data-pane="case-study">
      {' '}
      <div className="section-frame">
        <div className="section-card">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              {' '}
              <div className="case-study_block is-reverse is-phone">
                {' '}
                <div className="case-study_block-content" data-anim="">
                  {' '}
                  <span className="text-style-eyebrow text-color-brand">
                    06 · Calculator
                  </span>
                  {' '}
                  <h2 className="heading-style-h3">
                    A calculator anyone understands
                  </h2>
                  {' '}
                  <div className="case-study_list">
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      The physician sets the malpractice premium and sees what tail coverage would cost
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Based on AMA Insurance: tail can cost up to 2× the annual premium
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      The technical terms stay, because they're the words in the contract, and each one has a plain description and a tooltip
                    </div>
                    {' '}
                  </div>
                  {' '}
                </div>
                {' '}
                <div className="case-study_block-media is-first" data-anim="">
                  <div className="case-study_phone is-single">
                    <img className="case-study_shot-image" src={asset("cs/calc-m.webp")} alt="Calculator with tooltip on mobile" width="652" height="1398" />
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
