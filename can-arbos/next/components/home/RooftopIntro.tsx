// The rooftop plunge pool and the spa in the old cellar.
import { page, img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function RooftopIntro(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="roof_home_wrap u-section u-theme-light" aria-labelledby="roof-title">
  <div className="roof_home_contain u-container">
    <div className="roof_home_layout">
      <figure className="roof_home_media"><img {...img("rooftop/pool-sunset.webp", 1600)} className="roof_home_image" alt={t("A small plunge pool on the roof at sunset, with a wooden pergola, loungers and the cathedral on the skyline")} width="1600" height="893" loading="lazy" /></figure>
      <div className="roof_home_content">
        <p className="eyebrow_text">{t("Rooftop & Spa")}</p>
        <h2 className="roof_home_title u-text-style-h2" id="roof-title">{t("A rooftop plunge pool")}</h2>
        <p className="roof_home_text">{t("It's 6 by 3 metres and 1.4 metres deep. A pergola shades half the deck from noon. Open 9:00 to 20:00, with drinks from the bar until 23:00.")}</p>
      </div>
      <div className="roof_home_spa">
        <img {...img("rooftop/spa-steam-room.webp", 900)} className="roof_home_arch is-arch" alt={t("A small steam room with stone benches under a vaulted ceiling, lit from a niche")} width="900" height="1117" loading="lazy" />
        <div className="roof_home_block">
          <h3 className="roof_home_subtitle u-text-style-h3">{t("Spa in the old cellar")}</h3>
          <p className="roof_home_text">{t("Two treatment rooms and a steam room. Book a treatment at reception or from My stay.")}</p>
          <a className="link_arrow_wrap" href={page("rooftop-spa")}>{t("See rooftop and spa")}</a>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
