// The final call over a photo that moves with the scroll (motion.ts, 11); the header hides its own button over it (23).
import type { ViewOf } from '@astro/lib/content';
import { ButtonLabel } from '../ButtonLabel';
import { Keep } from '../Keep';
import { Picture } from '../Picture';

export function CtaBand({ view }: { view: ViewOf<'cta-band'> }) {
  return (
    <section className="section_cta-band" id="cta" data-cta="" data-nav-theme="inverse">
      <div className="cta-band_background">
        <Picture className="cta-band_image" wide={view.wide} tall={view.tall} alt={view.imageAlt} sizes="100vw" lazy data={{ 'data-cta-image': '' }} />
        <div className="cta-band_veil" aria-hidden="true"></div>
      </div>
      <div className="padding-global padding-section-small">
        <div className="container-large">
          <div className="cta-band_layout">
            <div className="cta-band_top">
              <p className="cta-band_text text-size-large" data-reveal="">{view.text}</p>
              <div className="cta-band_action" data-reveal=""><a className="button" href={view.buttonTarget}><ButtonLabel label={view.buttonLabel} /></a></div>
            </div>
            <h2 className="cta-band_heading" data-reveal=""><Keep text={view.heading} /></h2>
          </div>
        </div>
      </div>
    </section>
  );
}
