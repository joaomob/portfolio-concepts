// The experiences hub: the list of the Home made larger, a filter by type, and the photo in an arch that follows the
// item in focus (the photos on the right are decorative, since every row carries its own).
import SaveButton from '@/components/ui/SaveButton';
import { img, page } from '@/lib/paths';
import { experiences, experiencesHub, EXPERIENCE_ALT } from '@astro/data/experiences';

export default function ExperienceHub() {
  const TYPES = ['On the water', 'Food and wine', 'Culture'];
  return (
    <>
<section className="exp_hub_wrap u-section u-theme-light" aria-label="Experiences">
  <div className="exp_hub_contain u-container">
    <form className="filter_bar_wrap" data-filter-list="experience-list" aria-label="Filter experiences">
      <fieldset className="filter_group"><legend className="field_label">Type</legend>
        <label className="filter_chip"><input type="radio" name="type" value="" defaultChecked /> All</label>
        {TYPES.map((type) => <label className="filter_chip"><input type="radio" name="type" value={type} /> {type}</label>)}
      </fieldset>
    </form>
    <p className="filter_empty" data-filter-empty="" data-visible="false">{experiencesHub.empty}</p>
    <div className="exp_hub_layout">
      <ul className="exp_hub_list" id="experience-list">
        {experiences.map((exp, i) => (
          <li className="exp_hub_item" data-exp={i} data-filter-type={exp.type}>
            <img {...img(`experiences/${exp.slug}.webp`, 1000)} className="exp_hub_thumb is-arch" alt={EXPERIENCE_ALT[exp.slug]} width="1000" height="1241" loading="lazy" />
            <div className="exp_hub_content">
              <p className="eyebrow_text">{exp.type}</p>
              <h2 className="exp_hub_name u-text-style-h3"><a href={page(`experience-${exp.slug}`)}>{exp.name}</a></h2>
              <p className="exp_hub_text">{exp.summary}</p>
              <p className="exp_list_facts">{exp.duration} · {exp.price}</p>
              <SaveButton kind="experience" item={exp.slug} name={exp.name} />
            </div>
            <svg className="exp_list_arrow exp_hub_arrow" viewBox="0 0 32 12" width="32" height="12" aria-hidden="true"><path d="M0 6h30M25 1l5 5-5 5" fill="none" stroke="currentColor" /></svg>
          </li>
        ))}
      </ul>
      <div className="exp_hub_media exp_home_media" aria-hidden="true">
        {experiences.map((exp, i) => (
          <img className={`exp_home_image is-arch${i === 0 ? ' is-active' : ''}`} data-exp-image={i} {...img(`experiences/${exp.slug}.webp`, 1000)} alt="" width="1000" height="1241" loading="lazy" />
        ))}
      </div>
    </div>
  </div>
</section>
    </>
  );
}
