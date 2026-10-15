// The eight lines of the season: the section is pinned on a desktop and the campaign photographs pass sideways.
import { Photo } from '../shared/Photo';
import { lines, collectionPage } from '@shared/lib/catalog';
import { tie } from '@shared/lib/text';
import { TAGS } from '@shared/data/tags';
import { trackAlts, hero } from '@shared/data/home';
import { href } from '@/lib/config';

export function LinesTrack() {
  return (
    <section id="collection" className="section_collection" data-collection="">
      <div className="collection_pin">
        <div className="collection_header padding-global">
          <div>
            <p className="text-style-label">{hero.tag}</p>
            <h2 className="heading-style-h2">The eight lines</h2>
          </div>
          <a href={href('collections')} className="button is-alternate">See all collections</a>
        </div>
        <ul className="collection_track" role="list" data-collection-track="">
          {lines.map((line) => (
            <li key={line.slug} className="look_item"><a href={href(collectionPage(line))} className="look_link"><div className="look_photo"><Photo name={line.campaign.image} frame="look" loading="lazy" alt={trackAlts[line.slug]} /></div><div className="look_caption"><span className="look_number">{line.number}</span><span><span className="look_name heading-style-h5">{line.name}</span><span className="text-style-label">{tie(TAGS[line.slug])}</span></span></div></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
