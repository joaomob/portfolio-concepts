// The house: why 21 rooms matter, with the wide gallery photo and the breakfast arch.
import { img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function HouseIntro(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="house_home_wrap u-theme-light" aria-labelledby="house-title">
  <div className="house_home_contain u-container">
    <div className="house_home_layout">
      <div className="house_home_head">
        <p className="eyebrow_text">{t("The house")}</p>
        <h2 className="house_home_title u-text-style-h2" id="house-title">{t("Small enough to know your name by the second morning")}</h2>
      </div>
      <div className="house_home_body">
        <p className="u-text-style-large">{t("Can Arbós has 21 rooms, so the team at the door is the team at breakfast. Before you arrive, we ask how you take your coffee, what you can't eat, and whether you're celebrating anything.")}</p>
        <p className="section_text_faded">{t("On your first evening, the concierge marks a walking map of Palma by hand. It shows where we eat on our nights off and the hour when the cathedral is quietest.")}</p>
        <ul className="fact_line_list"><li>{t("Adults only, 16+")}</li><li>{t("Rooms ready at 15:00")}</li></ul>
      </div>
    </div>
  </div>
  <div className="house_home_media">
    <img {...img("house/gallery-morning.webp", 2000)} className="house_home_wide" alt={t("The courtyard seen from the first-floor gallery, with green shutters on the sandstone walls and potted plants around the fountain")} width="2000" height="848" loading="lazy" />
    <img {...img("house/breakfast-gallery.webp", 900)} className="house_home_small is-arch" alt={t("A breakfast tray with coffee, an ensaïmada and orange juice on a small table in the stone gallery, beside green shutters")} width="900" height="1117" loading="lazy" />
  </div>
</section>
    </>
  );
}
