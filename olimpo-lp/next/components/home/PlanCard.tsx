// One plan. The price shows the annual value first; olimpo.js swaps data-annual and data-monthly with the switch.
import type { Plan } from '@astro/data/plans';

export default function PlanCard({ name, tag, featured, price, freeNote, cta, features }: Plan) {
  return (
    <article className={featured ? 'plan-1 white' : 'plan-1 no-bg'}>
      <div className="plan-head"><h3 className="card-title">{name}</h3>{tag && <span className="plan-tag">{tag}</span>}</div>
      {price ? (
        <p className="pricing-title" aria-live="polite"><span className="dollar">$</span><span data-price="" data-annual={String(price.annual)} data-monthly={String(price.monthly)}>{price.annual}</span> <span className="month-gray" data-period="">por ano</span></p>
      ) : (
        <p className="pricing-title">Grátis <span className="month-gray">{freeNote}</span></p>
      )}
      <a className={cta.dark ? 'button is-dark' : 'button'} href="#plans"><span>{cta.label}</span></a>
      <div className="line-divider-gray" />
      <ul className="plan-feats">
        {features.map((f) => f.state === 'off' ? (
          <li key={f.text} className="is-off"><span className="minus-icon" aria-hidden="true" /><span className="sr-only">Não inclui: </span>{f.text}</li>
        ) : (
          <li key={f.text} className={f.state === 'key' ? 'is-key' : undefined}><span className="plus-icon" aria-hidden="true" />{f.text}</li>
        ))}
      </ul>
    </article>
  );
}
