// The other two guides at the end of a guide.
import { page } from '@/lib/paths';
import { GUIDES, type Guide } from '@astro/data/journal';

export interface Props {
  current: Guide;
  /** the band changes tone when no map section sits between the text and this list */
  tinted: boolean;
}

export default function MoreGuides(props: Props) {
  const { current, tinted } = props;
  return (
    <>
<section className={`offer_list_wrap u-section u-theme-light${tinted ? ' u-background-2' : ''}`} aria-labelledby="other-title">
  <div className="offer_list_contain u-container">
    <div className="every_room_layout">
      <h2 className="every_room_title u-text-style-h2" id="other-title">More from the journal</h2>
      <ul className="offer_list_rows">
        {GUIDES.filter((guide) => guide.slug !== current.slug).map((guide) => (
          <li className="exp_list_item">
            <h3 className="exp_list_name u-text-style-h4"><a href={page(`journal-${guide.slug}`)}>{guide.h1}</a></h3>
            <p className="exp_list_facts">{guide.summary}</p>
            <svg className="exp_list_arrow" viewBox="0 0 32 12" width="32" height="12" aria-hidden="true"><path d="M0 6h30M25 1l5 5-5 5" fill="none" stroke="currentColor" /></svg>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
    </>
  );
}
