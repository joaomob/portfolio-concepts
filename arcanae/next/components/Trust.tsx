// The four reassurance items (Trust.astro).
import type { TrustItem } from '../../astro/src/data/home';

export default function Trust({ items }: { items: TrustItem[] }) {
  return (
    <div className="trust_grid">
      {items.map((item) => (
        <div key={item.title} className="trust_item"><svg className="trust_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap={item.icon.linecap ? 'round' : undefined} strokeLinejoin="round" aria-hidden="true">{item.icon.shapes.map((s, i) => ('path' in s ? <path key={i} d={s.path} /> : 'rect' in s ? <rect key={i} {...s.rect} /> : <circle key={i} {...s.circle} />))}</svg><p className="trust_title">{item.title}</p><p className="trust_text">{item.text}</p></div>
      ))}
    </div>
  );
}
