// Weddings and private dinners over the courtyard dinner photo.
import Button from '@/components/ui/Button';
import { page, img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function CelebrationsBand(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="fest_home_wrap u-theme-brand" aria-labelledby="fest-title">
  <img {...img("celebrations/courtyard-dinner.webp", 1920)} className="fest_home_image" alt={t("Long tables with candles and olive branches under the courtyard arches at night, with guests seated")} width="1920" height="1072" loading="lazy" />
  <div className="fest_home_contain u-container">
    <div className="fest_home_layout">
      <div className="fest_home_panel">
        <p className="eyebrow_text">{t("Celebrations")}</p>
        <h2 className="fest_home_title u-text-style-h2" id="fest-title">{t("Small weddings and private dinners")}</h2>
        <p className="fest_home_text">{t("Up to 40 guests can dine in the courtyard, and up to 30 can watch a ceremony on the roof. Book all 21 rooms and the house is yours. Tell us the date and how many people, and our events team replies within two working days.")}</p>
        <div className="u-button-wrapper">
          <Button label={t("Plan a celebration")} href={page("celebrations", "event-form")} />
        </div>
      </div>
      <img {...img("celebrations/roof-ceremony.webp", 900)} className="fest_home_small is-arch" alt={t("Two blocks of white chairs on the roof terrace at sunset, with a tiled aisle between them that leads to an arch of olive branches and white flowers, and the cathedral behind")} width="900" height="1117" loading="lazy" />
    </div>
  </div>
</section>
    </>
  );
}
