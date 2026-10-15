// Security is our core: one card per standard with its line icon, from data/security.ts.
import { security } from '@astro/data/security';

export default function SecuritySection() {
  return (
    <section className="section_security">
      <div className="padding-global padding-section-large"><div className="container-large">
        <div className="heading_component is-center" data-anim=""><h2 className="heading-style-h2">{security.heading}</h2></div>
        <div className="security_component" data-anim-group="">
          {security.items.map((item) => (
            <div key={item.title} className="security_card"><div className="security_icon-wrapper"><svg className="security_icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: item.icon }} /></div><div className="security_card-content"><h3 className="heading-style-h4">{item.title}</h3><p className="text-color-secondary">{item.text}</p></div></div>
          ))}
        </div>
      </div></div>
    </section>
  );
}
