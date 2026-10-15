// Numbered next steps of the thank you pages (the topic row without its photo).
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';

export function StepsList({ view }: { view: ViewOf<'steps-list'> }) {
  return (
    <section className={`section_steps-list ${view.bgClass}`}>
      <div className="padding-global padding-section-small">
        <div className="container-large">
          <div className="section-header_component" data-reveal="">
            <h2><Keep text={view.heading} /></h2>
            {view.intro && <p className="text-size-large text-color-secondary">{view.intro}</p>}
          </div>
          <ol className="steps-list_list" role="list">
            {view.items.map((item) => (
              <li key={item.number} className="topic-row_component is-no-media">
                <span className="topic-row_line" aria-hidden="true" data-line=""></span>
                <span className="heading-style-h3" aria-hidden="true" data-reveal="">{item.number}</span>
                <p className="steps-list_text text-size-large" data-reveal="">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
