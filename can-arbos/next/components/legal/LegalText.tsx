// The text of a legal page, one paragraph per entry (some carry a link), and the date when the page shows one.
import { UPDATED, type LegalPage } from '@astro/data/legal';

export interface Props {
  legal: LegalPage;
}

export default function LegalText(props: Props) {
  const { legal } = props;
  return (
    <>
<section className="legal_page_wrap u-section u-theme-light" aria-label={legal.h1}>
  <div className="legal_page_contain u-container">
    <div className="legal_page_layout">
      {legal.body.map((html) => <p className="legal_page_text" dangerouslySetInnerHTML={{ __html: html }} />)}
      {legal.updated && <p className="legal_page_date">{UPDATED}</p>}
    </div>
  </div>
</section>
    </>
  );
}
