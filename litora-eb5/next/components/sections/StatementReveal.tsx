// One sentence whose words light up with the scroll (motion.ts, 3).
import type { ViewOf } from '@astro/lib/content';

export function StatementReveal({ view }: { view: ViewOf<'statement-reveal'> }) {
  return (
    <section className={`section_statement-reveal ${view.bgClass}`}>
      <div className="padding-global padding-section-large">
        <div className="container-small">
          <div className="statement-reveal_component">
            <p className="text-style-eyebrow text-color-secondary">{view.label}</p>
            <p className="heading-style-h2 text-style-statement" data-statement="">{view.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
