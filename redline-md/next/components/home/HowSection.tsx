// Three steps to a better contract: one numbered card per step, from data/how.ts.
import { how } from '@astro/data/how';

export default function HowSection() {
  return (
    <section className="section_how" id="how">
      <div className="section-frame"><div className="section-card is-texture">
        <div className="padding-global padding-section-large"><div className="container-large">
          <div className="heading_component is-center" data-anim=""><h2 className="heading-style-h2">{how.heading}</h2></div>
          <div className="how_component" data-anim-group="">
            {how.steps.map((step) => (
              <div key={step.number} className="how_card"><div className="how_number">{step.number}</div><div className="how_card-content"><h3 className="heading-style-h4">{step.title}</h3><p className="text-color-secondary">{step.text}</p></div></div>
            ))}
          </div>
        </div></div>
      </div></div>
    </section>
  );
}
