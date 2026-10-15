// What the house is, in one sentence whose words light up with the scroll.
import { manifesto } from '@shared/data/home';

export function Manifesto() {
  return (
    <section className="section_manifesto">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <p className="text-style-label manifesto_label">{manifesto.label}</p>
            <h2 className="manifesto_text heading-style-h1" data-manifesto="">{manifesto.before}<span className="text-color-brand">{manifesto.accent}</span>{manifesto.after}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
