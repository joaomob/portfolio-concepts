// Three experiences in a list; the photo on the right follows the row under the pointer.
import { page, img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';
import { experiences, EXPERIENCE_ALT } from '@astro/data/experiences';
import { HOME_EXPERIENCES } from '@astro/data/home';

export interface Props {
  lang: Lang;
}

export default function ExperiencesList(props: Props) {
  const t = useTranslate(props.lang);
  const homeExperiences = HOME_EXPERIENCES.map((slug) => experiences.find((e) => e.slug === slug)!);
  return (
    <>
<section className="exp_home_wrap u-section u-theme-light" aria-labelledby="exp-title">
  <div className="exp_home_contain u-container">
    <div className="exp_home_layout">
      <div className="exp_home_content">
        <p className="eyebrow_text">{t("Experiences")}</p>
        <h2 className="exp_home_title u-text-style-h2" id="exp-title">{t("Palma with someone who lives here")}</h2>
        <p className="exp_home_text">{t("Our concierge books six experiences, and our own team leads two of them.")}</p>
        <ul className="exp_list_wrap">
{homeExperiences.map((exp, i) => (
          <li className="exp_list_item" data-exp={i}><h3 className="exp_list_name u-text-style-h4"><a href={page(`experience-${exp.slug}`)}>{t(exp.name)}</a></h3><p className="exp_list_facts">{t(`${exp.type} · ${exp.duration} · ${exp.price}`)}</p><svg className="exp_list_arrow" viewBox="0 0 32 12" width="32" height="12" aria-hidden="true"><path d="M0 6h30M25 1l5 5-5 5" fill="none" stroke="currentColor" /></svg></li>
        ))}
        </ul>
        <a className="link_arrow_wrap" href={page("explore-experiences")}>{t("See all experiences")}</a>
      </div>
      <div className="exp_home_media">
{homeExperiences.map((exp, i) => (
          <img className={`exp_home_image is-arch${i === 0 ? ' is-active' : ''}`} data-exp-image={i} {...img(`experiences/${exp.slug}.webp`, 1000)} alt={t(EXPERIENCE_ALT[exp.slug])} width="1000" height="1241" loading="lazy" />
        ))}
      </div>
    </div>
  </div>
</section>
    </>
  );
}
