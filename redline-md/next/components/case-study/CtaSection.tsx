// Case study section: See the landing page live
// Markup ported word for word from the original case-study.html.
import { page } from '@/lib/links';

export default function CtaSection() {
  return (
    <section className="section_case-study-cta" data-pane="case-study">
      {' '}
      <div className="section-frame is-bottom">
        <div className="section-card is-cta">
          {' '}
          <div className="padding-global padding-section-medium">
            <div className="container-large">
              <div className="cta_component" data-anim="">
                {' '}
                <div className="max-width-medium">
                  <h2 className="heading-style-h2">
                    See the landing page live
                  </h2>
                </div>
                {' '}
                <p className="text-size-large text-color-secondary">
                  Designed and implemented in Webflow by João Marcos Oliveira.
                </p>
                {' '}
                <div className="button-group is-center">
                  <a className="button" href={page("")}>
                    <span className="button_content">
                      Open the landing page
                    </span>
                    <span className="button_hover" />
                  </a>
                  <a className="button is-secondary" href="https://joaomob.com" target="_blank" rel="noopener">
                    <span className="button_content">
                      joaomob.com
                    </span>
                  </a>
                </div>
                {' '}
              </div>
            </div>
          </div>
          {' '}
        </div>
      </div>
      {' '}
    </section>
  );
}
