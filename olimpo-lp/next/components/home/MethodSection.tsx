// 4 · The method: goal, project, task. Each row carries a light and a dark illustration; the theme shows one.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import { methodRows } from '@astro/data/method';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function MethodSection() {
  return (
    <section className="section section_method" id="method" aria-labelledby="h-method">
      <div className="section-card is-dark">
        <div className="container">
          <Eyebrow text={eyebrowOf('method')} variant="center" />
          <h2 className="h2-display is-light" id="h-method" data-reveal="">O dia de hoje <span className="gray-font">cabe num <span className="otherfont">degrau.</span></span></h2>
          <div className="method_stage">
            <ol className="method_rows">
              {methodRows.map((row, tier) => (
                <li key={row.n} className="method_row" data-tier={String(tier)}>
                  <figure className="method_illustration" aria-hidden="true"><img className="th-l" src={asset(`img/${row.image}-light.webp`)} alt="" width="823" height="1100" loading="lazy" /><img className="th-d" src={asset(`img/${row.image}-dark.webp`)} alt="" width="823" height="1100" loading="lazy" /></figure>{' '}
                  <span className="service-index">{row.n}</span>{' '}
                  <h3 className="service-name">{row.name}</h3>
                  <p className="service-title">{row.line}</p>
                </li>
              ))}
            </ol>
          </div>
          <LearnMore entries={['C1', 'A4']} variant="center is-light" />
        </div>
      </div>
    </section>
  );
}
