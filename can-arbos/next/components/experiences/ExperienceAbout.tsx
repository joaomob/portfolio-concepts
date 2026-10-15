// The text of an experience (the first sentence as the lead, the rest in two paragraphs) and who leads it, and when.
import { splitText, type Experience } from '@astro/data/experiences';

export interface Props {
  experience: Experience;
}

export default function ExperienceAbout(props: Props) {
  const { experience } = props;
  const [lead, first, second] = splitText(experience.text);
  const facts: [string, string][] = [
    ['Led by', experience.guide],
    ['When', experience.days],
  ];
  return (
    <>
<section className="room_page_wrap u-section u-theme-light" aria-label={`About ${experience.name}`}>
  <div className="room_page_contain u-container">
    <div className="room_page_layout">
      <div className="exp_page_body"><p className="exp_page_lead u-text-style-large">{lead}</p><div className="exp_page_rich"><p className="exp_page_text">{first}</p><p className="exp_page_text">{second}</p></div></div>
      <dl className="fact_table_wrap">
        {facts.map(([name, value]) => (
          <div className="fact_table_row"><dt className="fact_table_name">{name}</dt><dd className="fact_table_value">{value}</dd></div>
        ))}
      </dl>
    </div>
  </div>
</section>
    </>
  );
}
