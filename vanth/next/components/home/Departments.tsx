// Shop by department: four big links, each to where that kind of piece is.
import { departments } from '@shared/data/home';
import { href } from '@/lib/config';

export function Departments() {
  return (
    <section id="departments" className="section_departments">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <p className="text-style-label">Shop by&nbsp;department</p>
            <ul className="departments_list" role="list">
              {departments.map((d) => <li key={d.name} className="departments_item"><a href={href(d.page, d.hash)} className="departments_link"><span className="departments_name">{d.name}</span><span className="text-style-label">{d.text}</span></a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
