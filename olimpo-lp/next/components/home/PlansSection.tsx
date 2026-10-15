// 11 · Plans: the billing switch (annual by default) and the three plan cards.
import Eyebrow from './Eyebrow';
import PlanCard from './PlanCard';
import { plans } from '@astro/data/plans';
import { eyebrowOf } from '@astro/data/sections';

export default function PlansSection() {
  return (
    <section className="section section_plans" id="plans" aria-labelledby="h-plans">
      <div className="section-card is-gray">
        <div className="container">
          <Eyebrow text={eyebrowOf('plans')} variant="center dark" />
          <h2 className="h2-display" id="h-plans" data-reveal="">Com o Oráculo, ninguém sobe <span className="gray-font"><span className="otherfont">sozinho.</span></span></h2>
          <div className="divider-s" />
          <div className="annual-row" data-reveal="">
            <span className="pricing-text" data-bill-label="monthly">Mensal</span>{' '}
            <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Cobrança anual" data-billing-switch=""><span className="switch-circle" /></button>{' '}
            <span className="pricing-text is-on" data-bill-label="annual">Anual</span>{' '}
            <span className="save-badge">−17%</span>
          </div>
          <div className="divider-s" />
          <div className="pircing-wrapper" data-reveal="">
            <div className="pricing-grid">
              {plans.map((plan) => <PlanCard key={plan.name} {...plan} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
