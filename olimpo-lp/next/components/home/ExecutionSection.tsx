// 7 · The execution: the text stays pinned and each step lights up with the scroll; the Focus Mode phone
// changes state with it.
import Eyebrow from './Eyebrow';
import LearnMore from './LearnMore';
import FocusMock from './FocusMock';
import { focusSteps } from '@astro/data/execution';
import { eyebrowOf } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function ExecutionSection() {
  return (
    <section className="section section_execution" id="execution" aria-labelledby="h-execution">
      <div className="section-card focus_card">
        <div className="focus_track" data-focus-track="">
          <div className="focus_sticky">
            <div className="focus_text">
              <Eyebrow text={eyebrowOf('execution')} motion="none" />
              <h2 className="focus_h2" id="h-execution">O foco começa <span className="gray-font"><span className="otherfont">antes</span> da primeira tarefa.</span></h2>
              <ol className="focus_steps">
                {focusSteps.map((title, i) => (
                  <li key={title} className="focus_step" data-step={String(i + 1)}><span className="focus_n">{String(i + 1).padStart(2, '0')}</span><p><strong className="focus_step-title">{title}</strong></p></li>
                ))}
              </ol>
              <LearnMore entries={['C4', 'B6']} />
            </div>
            <div className="focus_panel" aria-hidden="true">
              <video className="cover" muted loop playsInline preload="none" poster={asset('video/threshold-light.webp')} data-autoplay=""><source src={asset('video/threshold-light.mp4')} type="video/mp4" /></video>{' '}
              <FocusMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
