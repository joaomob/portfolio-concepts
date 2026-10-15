// The sample report modal (fs-modal, fade): the five pages behind a shield, protected from copy by home.js, from
// data/report.ts.
import { report } from '@astro/data/report';
import { asset } from '@astro/lib/site';

export default function ReportModal() {
  return (
    <div className="modal_component" fs-modal-element="modal" fs-modal-instance="report" fs-modal-animation="fade" role="dialog" aria-modal="true" aria-label="Sample report">
      <div className="modal_card is-report">
        <div className="modal_close" fs-modal-element="close" fs-modal-instance="report" role="button" tabIndex={0} aria-label="Close">×</div>
        <div className="sample_head"><span className="heading-style-h4">{report.title}</span><a className="button is-small" href="#" fs-modal-element="open" fs-modal-instance="upload"><span className="button_content">{report.cta}</span></a></div>
        <div className="sample_pages">
          {report.pages.map((p) => <div key={p.src} className="sample_page-wrapper"><img className="sample_page" src={asset(p.src)} alt={p.alt} width="1200" height="1553" loading="lazy" /><div className="sample_shield" aria-hidden="true" /></div>)}
        </div>
      </div>
    </div>
  );
}
