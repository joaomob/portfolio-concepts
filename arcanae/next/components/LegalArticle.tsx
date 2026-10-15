// One info page (LegalArticle.astro).
import { infoBody, type InfoPage } from '../../astro/src/data/pages';
import { NEXT_BASE } from '../../astro/src/lib/site';

export default function LegalArticle({ info }: { info: InfoPage }) {
  return (
    <section className="section_legal"><div className="padding-global padding-section-large"><div className="container-large">
      <article className="legal_component">
        <p className="legal_eyebrow">Info</p>
        <h1 className="legal_heading">{info.heading}</h1>
        <p className="legal_updated">{info.updated}</p>
        <div className="legal_rich-text" dangerouslySetInnerHTML={{ __html: infoBody(info, NEXT_BASE) }} />
      </article>
    </div></div></section>
  );
}
