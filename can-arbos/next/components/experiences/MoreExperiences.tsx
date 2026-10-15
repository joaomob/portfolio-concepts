// Three more experiences at the end of an experience page: the same type first, then the others in the house's order.
import { img, page } from '@/lib/paths';
import { moreExperiences, EXPERIENCE_ALT, type Experience } from '@astro/data/experiences';

export interface Props {
  current: Experience;
  /** the band changes tone when no map section sits between the text and this list */
  tinted: boolean;
}

export default function MoreExperiences(props: Props) {
  const { current, tinted } = props;
  return (
    <>
<section className={`other_room_wrap u-section u-theme-light${tinted ? ' u-background-2' : ''}`} aria-labelledby="more-title">
  <div className="other_room_contain u-container">
    <div className="other_room_head"><h2 className="other_room_title u-text-style-h2" id="more-title">More experiences</h2><a className="link_arrow_wrap" href={page('explore-experiences')}>See all experiences</a></div>
    <ul className="other_room_list is-stack">
      {moreExperiences(current).map((exp) => (
        <li className="room_card_wrap">
          <img {...img(`experiences/${exp.slug}.webp`, 1000)} className="room_card_image" alt={EXPERIENCE_ALT[exp.slug]} width="1000" height="1241" loading="lazy" />
          <h3 className="room_card_title u-text-style-h3"><a href={page(`experience-${exp.slug}`)}>{exp.name}</a></h3>
          <p className="room_card_facts"><span>{exp.duration}</span> · <span>{exp.price}</span></p>
          <p className="room_card_text">{exp.summary}</p>
        </li>
      ))}
    </ul>
  </div>
</section>
    </>
  );
}
