// The light opening of a list page (experiences, journal) or, small, of a legal page.


export interface Props {
  title: string;
  eyebrow?: string;
  text?: string;
  /** the legal pages: a small title and no eyebrow */
  small?: boolean;
}

export default function PageIntro(props: Props) {
  const { title, eyebrow, text, small = false } = props;
  return (
    <>
<section className={`page_intro_wrap${small ? ' is-small' : ''} u-theme-light`} aria-labelledby="page-title">
  <div className="page_intro_contain u-container">
    <div className="page_intro_layout">
      {eyebrow && <p className="eyebrow_text">{eyebrow}</p>}
      <h1 className={`page_intro_title u-text-style-${small ? 'h3' : 'h1'}`} id="page-title">{title}</h1>
      {text && <p className="page_intro_text">{text}</p>}
    </div>
  </div>
</section>
    </>
  );
}
