// The people who speak, as photo cards with their role.
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';
import { PhotoCard } from '../PhotoCard';

export function Speakers({ view }: { view: ViewOf<'speakers'> }) {
  return (
    <section className={`section_speakers ${view.bgClass}`} id="speakers">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="speakers_layout">
            <div className="speakers_header" data-reveal="">
              <h2><Keep text={view.heading} /></h2>
              {view.note && <p className="text-size-small text-color-secondary">{view.note}</p>}
            </div>
            <ul className="speakers_list" role="list">
              {view.items.map((item) => (
                <li key={item.name} className="speakers_item" data-reveal="">
                  <PhotoCard img={item.img} alt={item.imageAlt} focusClass="is-focus-top" sizes="(min-width: 992px) 26rem, (min-width: 768px) 50vw, 27rem" heading={item.name} role={item.role} text={item.text} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
