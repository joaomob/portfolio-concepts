// The privacy page: a heading, the date and plain paragraphs.
import type { ViewOf } from '@astro/lib/content';
import { Keep } from '../Keep';

export function LegalText({ view }: { view: ViewOf<'legal-text'> }) {
  return (
    <section className={`section_legal-text ${view.bgClass}`}>
      <div className="padding-global padding-section-small">
        <div className="container-small">
          <div className="legal-text_content">
            <h1><Keep text={view.heading} /></h1>
            <p className="text-size-small text-color-secondary">{view.updated}</p>
            {view.paragraphs.map((paragraph, i) => <p key={i} className="legal-text_paragraph">{paragraph.text}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
