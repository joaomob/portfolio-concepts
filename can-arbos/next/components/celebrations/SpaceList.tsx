// The three places of a celebration; each photo takes one of the three shapes of the house (arch, rectangle, circle).
import { img } from '@/lib/paths';
import { SPACES } from '@astro/data/celebrations';

export default function SpaceList() {
  return (
    <>
<section className="space_page_wrap u-section u-theme-light" aria-labelledby="spaces-title">
  <div className="space_page_contain u-container">
    <h2 className="space_page_title u-text-style-h2" id="spaces-title">Three places for a small wedding</h2>
    <ul className="space_card_list">
      {SPACES.map((space) => (
        <li className="space_card_wrap">
          <div className="space_card_media"><img {...img(`celebrations/${space.image}.webp`, 900)} className={`space_card_image ${space.shape}`} alt={space.alt} width="900" height="1117" loading="lazy" /></div>
          <p className="space_card_count">{space.count}</p>
          <h3 className="space_card_title u-text-style-h3">{space.name}</h3>
          <p className="space_card_text">{space.text}</p>
        </li>
      ))}
    </ul>
  </div>
</section>
    </>
  );
}
