// 6 · The follow-up: Chiron calls you back. The red-figure vase (vase.js, three.js) turns with the scroll
// and settles on each of the four scenes; the narration and Chiron's message follow the scene.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import Term from './Term';
import { vaseScenes, vaseLabel } from '@astro/data/followup';
import { eyebrowOf } from '@astro/data/sections';

export default function FollowupSection() {
  return (
    <section className="section section_followup" id="followup" aria-labelledby="h-followup">
      <div className="section-card is-gray">
        <div className="container title-grid">
          <Eyebrow text={eyebrowOf('followup')} />
          <div className="max-w _01">
            <h2 className="h2" id="h-followup" data-reveal="">O movimento parou. <span className="gray-font">Quíron chama de <span className="otherfont">volta.</span></span></h2>
            <div className="divider-s" />
            <p className="p-subhead add-max-w" data-reveal="">Quando uma meta para, <Term entry="B4">Quíron</Term> percebe e escreve. <span className="gray-font">Sem cobrança e sem recomeço do zero:</span> ele lembra o destino e oferece o menor passo possível.</p>
          </div>
        </div>
        <div className="vase_track" data-vase-track="">
          <div className="vase_sticky">
            <div className="vase" data-vase="" role="img" aria-label={vaseLabel} />
            <ol className="vase_narration">
              {vaseScenes.map((scene) => (
                <li key={scene.n}><span className="vase_n">{scene.n}</span><span className="vase_caption">{scene.caption}</span><div className="cutouts" aria-hidden="true"><div className="coach-card"><div className="msg-av">Q</div><div><div className="msg-name">Quíron · coach</div><div className="msg-txt">{scene.message}</div></div></div></div></li>
              ))}
            </ol>
          </div>
        </div>
        <div className="container followup_learn-more">
          <LearnMore entries={['B4', 'C3', 'A8']} />
        </div>
      </div>
    </section>
  );
}
