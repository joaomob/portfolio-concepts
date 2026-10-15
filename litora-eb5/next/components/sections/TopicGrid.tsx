// What the webinar covers: numbered rows, each with a thumbnail that straightens with the scroll (motion.ts, 6).
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';

export function TopicGrid({ view }: { view: ViewOf<'topic-grid'> }) {
  return (
    <section className={`section_topic-grid ${view.bgClass}`} id="topics" data-nav-theme="inverse">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="topic-grid_header" data-reveal="">
            <div className="topic-grid_heading">
              <h2><Keep text={view.heading} /></h2>
              {view.intro && <p className="text-size-large text-color-secondary">{view.intro}</p>}
            </div>
          </div>
          <ol className="topic-grid_list" role="list">
            {view.items.map((item) => (
              <li key={item.number} className="topic-row_component">
                <span className="topic-row_line is-bleed" aria-hidden="true" data-line=""></span>
                <span className="topic-row_number heading-style-h3" aria-hidden="true" data-reveal="">{item.number}</span>
                <h3 className="topic-row_title" data-reveal=""><Keep text={item.heading} /></h3>
                <p className="topic-row_text text-color-secondary" data-reveal="">{item.text}</p>
                <div className="topic-row_media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="topic-row_image" data-topic-image="" src={item.img.src} width={item.img.width} height={item.img.height} alt={item.imageAlt} loading="lazy" decoding="async" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
