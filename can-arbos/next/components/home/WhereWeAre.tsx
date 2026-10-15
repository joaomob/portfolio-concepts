// The walking times to nine places and the paper map; a place in the list lights its route on the map.
import { useTranslate, type Lang } from '@astro/i18n/index';
import { PLACES } from '@astro/data/experiences';
import { oldTownMap as map } from '@/lib/map';
import { translateMarkup } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function WhereWeAre(props: Props) {
  const t = useTranslate(props.lang);
  return (
    <>
<section className="where_home_wrap u-section u-theme-light u-background-2" aria-labelledby="where-title" data-map="">
  <div className="where_home_contain u-container">
    <div className="where_home_layout">
      <div className="where_home_content">
        <p className="eyebrow_text">{t("Where we are")}</p>
        <h2 className="where_home_title u-text-style-h2" id="where-title">{t("Walk everywhere in the old town")}</h2>
        <ul className="walk_list_wrap">
{PLACES.map((place) => (
          <li><button className="walk_list_item" type="button" data-place={place.number}><span className="walk_list_number">{place.number}</span><span className="walk_list_place">{t(place.name)}</span><span className="walk_list_time">{t(`${place.minutes} min`)}</span></button></li>
        ))}
        </ul>
        <h3 className="where_home_subtitle u-text-style-h3">{t("Arriving by taxi or car")}</h3>
        <p className="where_home_text">{t("Taxis can't turn into our lane. Tell us your arrival time and we'll meet you at the corner with a trolley for the bags. If you drive, our valet takes the car to a garage 400 metres away, for €32 a day.")}</p>
      </div>
      <div className="where_home_map" dangerouslySetInnerHTML={{ __html: translateMarkup(map, t) }} />
    </div>
  </div>
</section>
    </>
  );
}
