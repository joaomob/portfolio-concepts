// The campaign photograph of a line under its giant name; a name longer than ten letters sets each word on its own line.
import { Photo } from '../shared/Photo';
import { Words } from '../shared/Words';
import type { Line } from '@shared/lib/types';
import { tie } from '@shared/lib/text';

export function CollectionHero({ line }: { line: Line }) {
  const long = line.name.length > 10;
  // the part of the wide photograph the hero keeps: the faces (focus_x matters on a phone, cut at the sides)
  const focus = `${line.campaign.focus_x ?? 50} ${line.campaign.focus ?? 20}`;
  return (
    <section className="section_collection-hero" data-collection-hero="">
      <div className="collection-hero_photo"><Photo name={line.campaign.image} frame="hero" data-focus={focus} fetchPriority="high" alt={line.campaign.alt} /></div>
      <div className="collection-hero_content padding-global">
        <span className="hero_tag text-style-label">Autumn Winter 2026</span>
        <h1 className={long ? 'collection-hero_title is-long' : 'collection-hero_title'}>{long ? <Words text={line.name} /> : line.name}</h1>
        <div className="collection-hero_meta">
          <p className="text-style-label">{`Line ${line.number} of\u00a008`}</p>
          <p className="text-style-label">{tie(line.meta)}</p>
        </div>
      </div>
    </section>
  );
}
