// The other two offers at the end of an offer page.
import { page } from '@/lib/paths';
import { OFFERS, type Offer } from '@astro/data/offers';

export interface Props {
  current: Offer;
}

export default function OtherOffers(props: Props) {
  const { current } = props;
  return (
    <>
<section className="offer_list_wrap u-section u-theme-light u-background-2" aria-labelledby="other-title">
  <div className="offer_list_contain u-container">
    <div className="every_room_layout">
      <h2 className="every_room_title u-text-style-h2" id="other-title">Other offers</h2>
      <ul className="offer_list_rows">
        {OFFERS.filter((offer) => offer.slug !== current.slug).map((offer) => (
          <li className="exp_list_item">
            <h3 className="exp_list_name u-text-style-h4"><a href={page(`offer-${offer.slug}`)}>{offer.name}</a></h3>
            <p className="exp_list_facts">{offer.summary}</p>
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
