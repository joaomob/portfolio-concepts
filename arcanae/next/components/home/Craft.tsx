// Home craft section (Craft.astro).
import { CRAFT_INTRO, CRAFT_NOTE, CRAFT_STEPS } from '../../../astro/src/data/home';
import { asset } from '../../../astro/src/lib/site';

export default function Craft() {
  return (
    <section className="section_craft" id="craft"><div className="padding-global padding-section-large"><div className="container-large">
      <div className="section-heading_component" data-reveal="">
        <div className="section-heading_content"><p className="text-style-eyebrow">The Craft</p><h2>How each piece is made</h2><p className="section-heading_text">{CRAFT_INTRO}</p></div>
      </div>
      <div className="craft_grid" data-reveal="">
        {CRAFT_STEPS.map((step) => (
          <div key={step.number} className="craft_step">
            <div className="craft_step-media"><img className="craft_step-image" src={asset(step.image)} alt={step.alt} loading="lazy" /><span className="craft_step-number">{step.number}</span></div>
            <div className="craft_step-body"><h3 className="heading-style-h4">{step.title}</h3><p className="craft_step-text">{step.text}</p></div>
          </div>
        ))}
      </div>
      <p className="craft_note" data-reveal="">{CRAFT_NOTE}</p>
    </div></div></section>
  );
}
