// Case study section: The sample report, on the page and protected
// Markup ported word for word from the original case-study.html.
import { asset } from '@astro/lib/site';

export default function ReportSection() {
  return (
    <section className="section_case-study-report" data-pane="case-study">
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
                    04 · Report
                  </span>
                  {' '}
                  <h2 className="heading-style-h3">
                    The sample report, on the page and protected
                  </h2>
                  {' '}
                  <div className="case-study_list">
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      The contract summary, the areas of concern and the financial impact from Redline's real report, redrawn as brand illustrations
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      The real 5-page report opens in a modal, with no trip to Google Drive
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      Redline blocked downloads of the report on Drive, so the pages stay protected on the page too: no right-click, drag, long-press save, copy or print, and a sample watermark on every page
                    </div>
                    {' '}
                    <div className="case-study_list-item">
                      <span className="case-study_list-dot" />
                      It has its own link, /#sample-report, to share in ads and emails
                    </div>
                    {' '}
                  </div>
                  {' '}
                </div>
                {' '}
                <div className="case-study_block-media is-stack is-first" data-anim-group="">
                  {' '}
                  <div className="case-study_shot">
                    <img className="case-study_shot-image" src={asset("cs/report-d.webp")} alt="Report illustrations" width="1600" height="866" />
                  </div>
                  {' '}
                  <div className="case-study_shot">
                    <img className="case-study_shot-image" src={asset("cs/modal-report-d.webp")} alt="Sample report in a modal" width="1600" height="1000" />
                  </div>
                  {' '}
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
