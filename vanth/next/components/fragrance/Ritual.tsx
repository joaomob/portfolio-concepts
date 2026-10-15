// Two photographs of the fragrance worn, each drifting at its own speed as the page scrolls.
import { Photo } from '../shared/Photo';
import type { FragranceView } from '@shared/lib/fragrance';
import { tie } from '@shared/lib/text';

export function Ritual({ view }: { view: FragranceView }) {
  const { ritual } = view;
  return (
    <section className="section_ritual">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="ritual_header">
              <p className="text-style-label">{ritual.label}</p>
              <h2 className="ritual_title heading-style-h2" data-words="">{ritual.title}</h2>
            </div>
            <div className="ritual_layout">
              {ritual.items.map((item, i) => (
                <figure key={i} className={`ritual_item is-${i + 1}`} data-speed={i === 0 ? '-10' : '10'}>
                  <div className="ritual_photo"><Photo name={item.image} loading="lazy" alt={item.alt} /></div>
                  <div className="ritual_caption"><span className="ritual_number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span><span className="heading-style-h5">{item.title}</span><span className="ritual_text">{tie(item.body)}</span></span></div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
