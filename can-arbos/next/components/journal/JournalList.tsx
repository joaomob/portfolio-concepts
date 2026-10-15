// The three guides of the hub, one row each, the photo switching side and shape from row to row.
import { img, page } from '@/lib/paths';
import { GUIDES } from '@astro/data/journal';

export default function JournalList() {
  return (
    <>
<section className="journal_list_wrap u-section u-theme-light" aria-label="Guides">
  <div className="journal_list_contain u-container">
    <ul className="journal_list_rows">
      {GUIDES.map((guide, i) => (
        <li className={`journal_list_item${i % 2 ? ' is-reverse' : ''}`}>
          <img {...img(`${guide.cover.path}.webp`, 1000)} className={`journal_list_image${i % 2 ? '' : ' is-arch'}`} alt={guide.cover.alt} width="1000" height={guide.cover.height} loading="lazy" />
          <div className="journal_list_content">
            <p className="room_list_count" data-count="">{i + 1} / {GUIDES.length}</p>
            <h2 className="journal_list_title u-text-style-h3"><a href={page(`journal-${guide.slug}`)}>{guide.h1}</a></h2>
            <p className="journal_list_text">{guide.summary}</p>
            <svg className="exp_list_arrow" viewBox="0 0 32 12" width="32" height="12" aria-hidden="true"><path d="M0 6h30M25 1l5 5-5 5" fill="none" stroke="currentColor" /></svg>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>
    </>
  );
}
