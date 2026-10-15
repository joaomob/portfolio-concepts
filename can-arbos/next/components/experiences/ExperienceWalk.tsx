// For an experience that starts on foot: the paper map of the Home with only the walk from our door to its place, and
// a label that says so to a screen reader.
import { oldTownMap as map } from '@/lib/map';
import { PLACES } from '@astro/data/experiences';

export interface Props {
  /** the number of the place on the map */
  place: number;
  heading: string;
}

export default function ExperienceWalk(props: Props) {
  const { place, heading } = props;
  const { name, minutes } = PLACES.find((p) => p.number === place)!;
  const ownMap = map.replace('the walking routes to nine places', `the walk to ${name.replace(/'/g, '&#x27;')}`);
  return (
    <>
<section className="where_home_wrap u-section u-theme-light u-background-2" aria-labelledby="walk-title" data-map="">
  <div className="where_home_contain u-container">
    <div className="where_home_layout is-single">
      <div className="where_home_content">
        <h2 className="where_home_title u-text-style-h2" id="walk-title">{heading}</h2>
        <p className="walk_single_text"><span className="walk_single_place">{name}</span><span className="walk_list_time">{minutes} min on foot</span></p>
      </div>
      <div className="where_home_map is-single" data-map-fixed={place} dangerouslySetInnerHTML={{ __html: ownMap }} />
    </div>
  </div>
</section>
    </>
  );
}
