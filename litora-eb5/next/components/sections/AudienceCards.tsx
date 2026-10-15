// Who the program is for: three photo cards.
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';
import { PhotoCard } from '../PhotoCard';

export function AudienceCards({ view }: { view: ViewOf<'audience-cards'> }) {
  return (
    <section className={`section_audience-cards ${view.bgClass}`} id="audience">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="section-header_component" data-reveal="">
            <h2><Keep text={view.heading} /></h2>
          </div>
          <ul className="audience-cards_list" role="list">
            {view.items.map((item) => (
              <li key={item.heading} className="audience-cards_item" data-reveal="">
                <PhotoCard img={item.img} alt={item.imageAlt} focusClass={item.focusClass} sizes="(min-width: 992px) 26rem, (min-width: 768px) 33vw, 100vw" heading={item.heading} text={item.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
