// The text of a guide in two parts around its photo, so the photo stays beside the passage it shows, and the link to
// the experience the guide ends on.
import { img, page } from '@/lib/paths';
import GuideBlocks from './GuideBlocks';
import { splitGuide, photoHeight, type Guide } from '@astro/data/journal';

export interface Props {
  guide: Guide;
}

export default function GuideBody(props: Props) {
  const { guide } = props;
  const { before, photo, after } = splitGuide(guide);
  return (
    <>
<section className="journal_page_wrap u-section u-theme-light" aria-label="Guide">
  <div className="journal_page_contain u-container">
    <div className="journal_page_layout">
      <div className="journal_page_body">
        <GuideBlocks blocks={before} />
        <img {...img(`${photo.path}.webp`, 900)} className={`journal_page_image ${photo.shape}`} alt={photo.alt} width="900" height={photoHeight(photo)} loading="lazy" />
        <GuideBlocks blocks={after} />
        <a className="link_arrow_wrap" href={page(`experience-${guide.end.slug}`)}>{guide.end.label}</a>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
