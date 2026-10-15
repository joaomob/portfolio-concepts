// 8 · Personalization: a horizontal band of the 16 types pinned to the screen; vertical scrolling moves it.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import Term from './Term';
import ArchetypeCard from './ArchetypeCard';
import { archetypes } from '@astro/data/archetypes';
import { eyebrowOf } from '@astro/data/sections';

export default function PersonalizationSection() {
  return (
    <section className="section section_personalization" id="personalization" aria-labelledby="h-personalization">
      <div className="section-card is-dark">
        <div className="brands_track" data-hscroll=""><div className="brands_sticky"><div className="container brands_inner">
          <div className="brands_heading-row">
            <Eyebrow text={eyebrowOf('personalization')} variant="is-light" />
            <h2 className="brands_heading" id="h-personalization" data-reveal="">Cada arquétipo recebe <span className="gray-font">um plano <span className="otherfont">próprio.</span></span></h2>
            <p className="brands_sub" data-reveal="">Dezesseis tipos, os do <Term entry="A6" light>MBTI</Term>. O plano muda o tamanho do degrau, o tom de Quíron e quanta estrutura chega antes de ser pedida.</p>
          </div>
          <div className="brands_viewport"><ul className="brands_grid" data-hscroll-track="" aria-label="Os 16 arquétipos">
            {archetypes.map((a) => <ArchetypeCard key={a.type} {...a} />)}
          </ul></div>
        </div></div></div>
        <div className="container brands_inner is-after">
          <LearnMore entries={['A6', 'A5', 'C10']} variant="is-light" />
        </div>
      </div>
    </section>
  );
}
