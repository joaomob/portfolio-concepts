// Aljub: two round photos, the restaurant text and three dishes with their prices.
import Button from '@/components/ui/Button';
import { page, img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';
import { HOME_DISHES, dishByName } from '@astro/data/dining';

export interface Props {
  lang: Lang;
}

export default function DiningIntro(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="dining_home_wrap u-section u-theme-dark" aria-labelledby="dining-title">
  <div className="dining_home_contain u-container">
    <div className="dining_home_layout">
      <div className="dining_home_media">
        <div className="dining_home_circle"><img {...img("dining/aljub-night.webp", 1400)} alt={t("Tables with linen and candles under stone vaults, around an old cistern with an iron well head")} width="1400" height="781" loading="lazy" /></div>
        <div className="dining_home_circle is-small"><img {...img("dining/wine-courtyard.webp", 700)} alt={t("A glass of red wine and a bottle on a stone table in the courtyard at dusk")} width="700" height="869" loading="lazy" /></div>
      </div>
      <div className="dining_home_content">
        <p className="eyebrow_text">{t("Dining")}</p>
        <h2 className="dining_home_title u-text-style-h2" id="dining-title">{t("Aljub, a Mallorcan restaurant under the old vaults")}</h2>
        <p className="dining_home_text">{t("Aljub serves dinner around the house's old cistern, and in the courtyard from May to October. The menu cooks with island produce, like red prawns from Sóller and Mallorcan black pig. Order à la carte or the tasting menu of seven courses. You can view every price and allergen before you book.")}</p>
        <ul className="dish_list_wrap">
{HOME_DISHES.map(dishByName).map((dish) => (
          <li className="dish_list_item"><h3 className="dish_list_name u-text-style-h4">{t(dish.name)}</h3><span className="dish_list_line" aria-hidden="true"></span><p className="dish_list_price u-text-style-h4">{t(`€${dish.price}`)}</p>
            <p className="dish_list_text">{t(dish.description)}</p></li>
        ))}
        </ul>
        <p className="dining_home_note">{t("Hotel guests and members can book 60 days ahead. Everyone else, 30 days.")}</p>
        <div className="u-button-wrapper">
          <Button label={t("Book a table")} modal="table-modal" />
          <Button label={t("See the menu")} variant="secondary" href={page("aljub")} />
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
