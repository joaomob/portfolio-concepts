// Home FAQ (Faq.astro): the first question starts open.
import { FAQ } from '../../../astro/src/data/home';

export default function Faq() {
  return (
    <section className="section_faq" id="faq"><div className="padding-global padding-section-large"><div className="container-large">
      <div className="faq_layout">
        <div className="faq_head" data-reveal=""><p className="text-style-eyebrow">FAQ</p><h2>Before your order</h2></div>
        <div className="faq_list" data-reveal="">
          {FAQ.map((item, i) => (
            <details key={item.question} className="faq_item" open={i === 0}><summary className="faq_question"><h3 className="faq_question-text">{item.question}</h3><span className="faq_icon" aria-hidden="true"></span></summary><p className="faq_answer">{item.answer}</p></details>
          ))}
        </div>
      </div>
    </div></div></section>
  );
}
