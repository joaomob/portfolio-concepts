// The numbers of the program on a ruler that draws itself (motion.ts, 15), then the cost table.
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';

export function StatRow({ view }: { view: ViewOf<'stat-row'> }) {
  return (
    <section className={`section_stat-row ${view.bgClass}`} id="numbers" data-nav-theme="inverse">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="section-header_component" data-reveal="">
            <h2><Keep text={view.heading} /></h2>
          </div>
          <div className="stat-ruler_component" data-ruler="">
            <span className="stat-ruler_line" aria-hidden="true" data-ruler-line=""></span>
            <span className="stat-ruler_ticks" aria-hidden="true" data-ruler-ticks=""></span>
            <ul className="stat-ruler_list" role="list">
              {view.items.map((item) => (
                <li key={item.value} className="stat-ruler_item">
                  <span className="stat-ruler_mark" aria-hidden="true"></span>
                  <p className="stat-ruler_value text-style-display-medium" data-reveal="">{item.value}</p>
                  <p className="stat-ruler_caption text-color-secondary" data-reveal="">{item.caption}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="stat-row_source text-size-small text-color-secondary">{view.source}</p>
          <div className="stat-row_cost" data-reveal="">
            <h3><Keep text={view.cost.heading} /></h3>
            <dl className="cost-list_component">
              {view.cost.rows.map((row) => (
                <div key={row.label} className="cost-list_row">
                  <dt className="cost-list_label">{row.label}</dt>
                  {row.values.map((value, i) => (
                    <dd key={i} className="cost-list_value">
                      <span className="text-weight-semibold">{value.amount}</span>{value.when && <span className="text-color-secondary">{value.when}</span>}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
            <p className="text-size-small text-color-secondary">{view.cost.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
