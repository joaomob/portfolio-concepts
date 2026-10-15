// Six clauses we always check: one card per clause with its line icon, from data/terms.ts.
import { terms } from '@astro/data/terms';

export default function TermsSection() {
  return (
    <section className="section_terms">
      <div className="padding-global padding-section-large"><div className="container-large">
        <div className="heading_component is-center" data-anim=""><h2 className="heading-style-h2">{terms.heading}</h2></div>
        <div className="terms_component" data-anim-group="">
          {terms.items.map((item) => (
            <div key={item.title} className="terms_card"><div className="terms_icon-wrapper"><svg className="terms_icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" dangerouslySetInnerHTML={{ __html: item.icon }} /></div><div className="terms_card-content"><h3 className="heading-style-h4">{item.title}</h3><p className="text-color-secondary">{item.text}</p></div></div>
          ))}
        </div>
      </div></div>
    </section>
  );
}
