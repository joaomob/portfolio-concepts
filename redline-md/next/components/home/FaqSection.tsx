// The FAQ: a single mode accordion (fs-accordion, run by finsweet-lite.js), the first item open, from data/faq.ts.
import { faq } from '@astro/data/faq';

export default function FaqSection() {
  return (
    <section className="section_faq" id="faq">
      <div className="padding-global padding-section-large"><div className="container-small">
        <div className="heading_component is-center" data-anim=""><h2 className="heading-style-h2">{faq.heading}</h2></div>
        <div className="faq_list" data-anim="" fs-accordion-element="group" fs-accordion-single="true">
          {faq.items.map((item) => (
            <div key={item.question} className="faq_item" fs-accordion-element="accordion">
              <div className="faq_question" fs-accordion-element="trigger">{item.question}<div className="faq_icon" fs-accordion-element="arrow">+</div></div>
              <div className="faq_answer-wrapper" fs-accordion-element="content"><div className="faq_answer">{item.answer.map((text) => <p key={text} className="faq_answer-text">{text}</p>)}</div></div>
            </div>
          ))}
        </div>
      </div></div>
    </section>
  );
}
