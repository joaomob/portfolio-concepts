// The opening of an offer: the light intro with its photo in an arch, and the badge on the members' offer.
import { img } from '@/lib/paths';
import type { Offer } from '@astro/data/offers';

export interface Props {
  offer: Offer;
}

export default function OfferIntro(props: Props) {
  const { offer } = props;
  const { path, alt, width, height } = offer.photo;
  return (
    <>
<section className="page_intro_wrap u-theme-light" aria-labelledby="page-title">
  <div className="page_intro_contain u-container">
    <div className="page_intro_layout is-photo">
      <div className="page_intro_content">
        <p className="eyebrow_text">Offer{offer.members && <> <span className="offer_badge_text">Members only</span></>}</p>
        <h1 className="page_intro_title u-text-style-h1" id="page-title">{offer.h1}</h1>
        <p className="page_intro_text">{offer.summary}</p>
      </div>
      <img {...img(`${path}.webp`, width)} className="page_intro_image is-arch" alt={alt} width={width} height={height} fetchPriority="high" />
    </div>
  </div>
</section>
    </>
  );
}
