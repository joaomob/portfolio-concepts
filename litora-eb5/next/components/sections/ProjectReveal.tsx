// The project photo that opens through a circle and the giant word that slides in over it (motion.ts, 4 and 5).
import type { ViewOf } from '@astro/lib/content';
import { ButtonLabel } from '../ButtonLabel';
import { Keep } from '../Keep';
import { Picture } from '../Picture';

export function ProjectReveal({ view }: { view: ViewOf<'project-reveal'> }) {
  return (
    <section className={`section_project-reveal ${view.bgClass}`}>
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="project-reveal_header">
            <div className="project-reveal_intro" data-reveal="">
              <p className="text-style-eyebrow text-color-secondary">{view.label}</p>
              <p className="text-size-large">{view.text}</p>
            </div>
            <div className="project-reveal_action" data-reveal=""><a className="button is-secondary" href={view.buttonTarget}><ButtonLabel label={view.buttonLabel} /></a></div>
          </div>
          <div className="project-reveal_track" id="project" data-project-track="">
            <figure className="project-reveal_figure" data-project-figure="">
              <div className="project-reveal_frame">
                <div className="project-reveal_ring" aria-hidden="true" data-project-ring=""></div>
                <div className="project-reveal_media" data-project-media="">
                  <Picture className="project-reveal_image" wide={view.wide} tall={view.tall} alt={view.imageAlt} tallMedia="(max-width: 479px)" sizes="(min-width: 1440px) 80rem, 100vw" lazy />
                  <div className="project-reveal_veil" aria-hidden="true"></div>
                </div>
                <h2 className="project-reveal_title">
                  <span className="visually-hidden"><Keep text={view.name} /></span>
                  <span className="project-reveal_word text-style-display-large" aria-hidden="true" data-project-word="">{view.word}</span>
                </h2>
              </div>
              <figcaption className="project-reveal_caption text-size-small text-color-secondary">{view.caption}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
