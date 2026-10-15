// Full screen photos that stack over each other; the covered one grows a little (motion.ts, 9).
import { Fragment } from 'react';
import type { ViewOf } from '@astro/lib/content';
import { Picture } from '../Picture';

export function ProjectStack({ view }: { view: ViewOf<'project-stack'> }) {
  return (
    <section className="section_project-stack" aria-label={view.label} id="inside" data-nav-theme="inverse">
      {view.items.map((item) => (
        <figure key={item.id} className="project-stack_panel" id={item.id} data-stack-panel="">
          <Picture className="project-stack_image" wide={item.wide} tall={item.tall} alt={item.imageAlt} sizes="100vw" lazy data={{ 'data-stack-image': '' }} />
          <div className="project-stack_veil" aria-hidden="true"></div>
          <div className="project-stack_index" aria-hidden="true">
            {item.marks.map((mark, i) => (
              <Fragment key={i}>
                {mark.line && <span className="project-stack_index-line"></span>}
                <span className={mark.current ? 'project-stack_index-mark is-current' : 'project-stack_index-mark'}></span>
              </Fragment>
            ))}
          </div>
          <figcaption className="project-stack_caption">
            <span className="text-style-eyebrow">{item.label}</span>
            <span className="heading-style-h2">{item.name}</span>
            <span className="text-style-eyebrow">{item.caption}</span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
