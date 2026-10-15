// Six photographs of line 01; each drifts inside its frame at its own speed as the page scrolls.
import { Photo } from '../shared/Photo';
import { lookbook } from '@shared/data/home';
import { href } from '@/lib/config';

export function Lookbook() {
  return (
    <section id="lookbook" className="section_lookbook">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="lookbook_header">
              <h2 className="heading-style-h1">Lookbook</h2>
              <a href={href('collection')} className="button is-alternate">See Iron Court</a>
            </div>
            <div className="lookbook_grid">
              {lookbook.map((item, i) => <figure key={item.image} className={`lookbook_item is-${i + 1}`} data-speed={String(item.speed)}><Photo name={item.image} loading="lazy" alt={item.alt} /></figure>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
