// One legal modal (fs-modal, fade): the title, the date and the heading and text pairs, from data/legal.ts.
import { Fragment } from 'react';

interface Props {
  instance: string;
  title: string;
  date: string;
  sections: { heading: string; text: string }[];
}

export default function LegalModal({ instance, title, date, sections }: Props) {
  return (
    <div className="modal_component" fs-modal-element="modal" fs-modal-instance={instance} fs-modal-animation="fade" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal_card is-legal">
        <div className="modal_close" fs-modal-element="close" fs-modal-instance={instance} role="button" tabIndex={0} aria-label="Close">×</div>
        <p className="modal_title">{title}</p>
        <p className="legal_date">{date}</p>
        <div className="legal_body">{sections.map((s) => <Fragment key={s.heading}><p className="legal_heading">{s.heading}</p><p className="legal_text">{s.text}</p></Fragment>)}</div>
      </div>
    </div>
  );
}
