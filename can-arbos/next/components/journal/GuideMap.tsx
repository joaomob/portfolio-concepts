// The paper map of the Home inside the guide of things to do: the nine places in walking order, each lighting its route.
import { oldTownMap as map } from '@/lib/map';
import { PLACES } from '@astro/data/experiences';

export default function GuideMap() {
  return (
    <>
<section className="where_home_wrap u-section u-theme-light u-background-2" aria-labelledby="walk-title" data-map="">
  <div className="where_home_contain u-container">
    <div className="where_home_layout">
      <div className="where_home_content">
        <h2 className="where_home_title u-text-style-h2" id="walk-title">The nine places on one map</h2>
        <ul className="walk_list_wrap">
          {PLACES.map((place) => (
            <li><button className="walk_list_item" type="button" data-place={place.number}><span className="walk_list_number">{place.number}</span><span className="walk_list_place">{place.name}</span><span className="walk_list_time">{place.minutes} min</span></button></li>
          ))}
        </ul>
      </div>
      <div className="where_home_map" dangerouslySetInnerHTML={{ __html: map }} />
    </div>
  </div>
</section>
    </>
  );
}
