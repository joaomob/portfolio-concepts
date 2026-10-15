// The status tabs above a product grid (StatusFilter.astro).
import { STATUS_FILTERS, statusCount } from '../../astro/src/lib/catalog';

export default function StatusFilter() {
  return (
    <div className="collection-filter_component" data-status-filter="">
      {STATUS_FILTERS.map((f) => (
        <button key={f.id} className={`collection-filter_button${f.id === 'all' ? ' is-active' : ''}`} type="button" data-status={f.id} aria-pressed={f.id === 'all'}>{f.label} <span className="collection-filter_count" data-status-count={f.id}>{statusCount(f.id)}</span></button>
      ))}
    </div>
  );
}
