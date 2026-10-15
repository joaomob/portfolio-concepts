// The questions (one open at a time, height animated: motion.ts, 24 and 25) next to the timeline of the process.
// Native <details name="faq"> keeps one open at a time without React state; the motion script only animates it.
import type { ViewOf } from '@astro/lib/content';
import { Icon } from '../Icon';
import { Keep } from '../Keep';

export function FaqAccordion({ view }: { view: ViewOf<'faq-accordion'> }) {
  return (
    <section className={`section_faq-accordion ${view.bgClass}`} id="faq">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <span className="faq-accordion_line" aria-hidden="true" data-line=""></span>
          <div className="faq-accordion_layout">
            <div className="faq-accordion_header" data-reveal="">
              <h2><Keep text={view.heading} /></h2>
              {view.intro && <p className="faq-accordion_intro">{view.intro}</p>}
              <div className="faq_timeline">
                <ol className="faq_timeline-list" role="list" data-timeline="">
                  {view.timeline.items.map((item) => (
                    <li key={item.title} className="faq_timeline-item">
                      <span className={['faq_timeline-trace', item.dashed && 'is-dashed', item.open && 'is-open'].filter(Boolean).join(' ')}
                        aria-hidden="true" data-timeline-trace={item.dashed ? 'dashed' : 'solid'}></span>
                      {!item.open && <span className="faq_timeline-point" aria-hidden="true"></span>}
                      <span className="heading-style-h3">{item.title}</span>
                      <p>{item.text}{item.trace && <>{' '}<span className="visually-hidden">({item.trace})</span></>}</p>
                    </li>
                  ))}
                </ol>
                <p className="text-size-small text-color-secondary">{view.timeline.legend}</p>
              </div>
            </div>
            <div className="faq-accordion_list">
              {view.items.map((item, i) => (
                <details key={item.question} className="faq_item" name="faq" open={i === 0} data-reveal="">
                  <summary className="faq_question"><h3><Keep text={item.question} /></h3><Icon name="chevron" /></summary>
                  <div className="faq_answer">
                    {item.answer.map((block, j) => (block.list
                      ? <ul key={j} className="faq_answer-list">{block.list.map((line) => <li key={line}>{line}</li>)}</ul>
                      : <p key={j}>{block.text}</p>))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
