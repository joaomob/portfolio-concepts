// The first screen: the title, the two booking buttons, the courtyard photo and the availability bar.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function HomeHero(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="hero_home_wrap u-theme-dark" aria-labelledby="hero-title" data-hero="">
  <div className="hero_home_contain u-container">
    <div className="hero_home_content">
      <p className="eyebrow_text">{t("La Calatrava · Palma, Mallorca")}</p>
      <h1 className="hero_home_title u-text-style-display" id="hero-title">{t("A boutique hotel in Palma's old town, on a quiet square")}</h1>
      <p className="hero_home_text u-text-style-large">{t("21 rooms around a courtyard from the 1600s, in a residential corner of the old town. At night you hear the fountain. The cathedral is ten minutes on foot.")}</p>
      <div className="u-button-wrapper">
        <Button label={t("Book a room")} modal="room-modal" />
        <Button label={t("Book a table")} variant="secondary" modal="table-modal" />
      </div>
    </div>
  </div>
  <div className="hero_home_arch">
    <img {...img("hero/courtyard-dusk.webp", 1920, { hero: true })} className="hero_home_image" alt={t("The stone courtyard of the house at dusk, with lit lanterns, round arches, a stone staircase and a small fountain among potted trees")} width="1920" height="1072" fetchPriority="high" />
  </div>
  <form className="stay_bar_wrap u-theme-light u-background-2" aria-label={t("Check availability")} data-stay-bar="">
    <div className="stay_bar_contain u-container">
      <div className="stay_bar_layout">
        <div className="field_wrap"><label className="field_label" htmlFor="stay-arrival">{t("Arrival")}</label><input className="field_input" id="stay-arrival" name="arrival" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor="stay-departure">{t("Departure")}</label><input className="field_input" id="stay-departure" name="departure" type="date" /></div>
        <div className="field_wrap is-full"><label className="field_label" htmlFor="stay-guests">{t("Guests")}</label><select defaultValue="2" className="field_input" id="stay-guests" name="guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
        <Button label={t("Check availability")} type="submit" wrapClass="is-full" />
      </div>
    </div>
  </form>
</section>
    </>
  );
}
