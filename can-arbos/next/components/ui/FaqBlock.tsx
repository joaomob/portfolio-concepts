// A block of questions: the first one opens with the page, and opening another closes it (site.js animates the height).
import type { FaqItem } from '@astro/data/types';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  title: string;
  items: FaqItem[];
  lang?: Lang;
}

export default function FaqBlock(props: Props) {
  const { title, items, lang = 'en' } = props;
  const t = useTranslate(lang);
  return (
    <>
<section className="faq_home_wrap u-section u-theme-light" aria-labelledby="faq-title">
  <div className="faq_home_contain u-container">
    <div className="faq_home_layout">
      <div className="faq_home_head">
        <p className="eyebrow_text">{t('Questions')}</p>
        <h2 className="faq_home_title u-text-style-h2" id="faq-title">{t(title)}</h2>
      </div>
      <div className="faq_list_wrap">
        {items.map((item, i) => (
          <details className="faq_item" open={i === 0}><summary className="faq_question"><h3 className="faq_question_text u-text-style-h4">{t(item.question)}</h3><span className="faq_icon" aria-hidden="true"></span></summary><p className="faq_answer">{t(item.answer)}</p></details>
        ))}
      </div>
    </div>
  </div>
</section>
    </>
  );
}
