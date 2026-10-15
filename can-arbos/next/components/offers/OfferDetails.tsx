// What an offer includes, what to know, the rooms it applies to and the booking button. On the members' offer the
// details stay hidden behind the sign-in panel until the visitor signs in.
import Button from '@/components/ui/Button';
import { page } from '@/lib/paths';
import type { Offer } from '@astro/data/offers';

export interface Props {
  offer: Offer;
}

export default function OfferDetails({ offer }: Props) {
  const locked = offer.members ? { 'data-member-only': '', 'data-visible': 'false' } : {};
  return (
    <section className="offer_page_wrap u-section u-theme-light" aria-label="About this offer">
      <div className="offer_page_contain u-container">
        {offer.members && (
          <div className="offer_lock_wrap" data-member-locked="">
            <p className="offer_lock_text u-text-style-large">Sign in or create a free account to see what&#x27;s included.</p>
            <div className="u-button-wrapper"><Button label="Create an account" href={page('members')} /><Button label="Sign in" variant="secondary" href={page('members')} /></div>
          </div>
        )}
        <div className="offer_page_layout" {...locked}>
          <div className="offer_page_block">
            <h2 className="offer_page_title u-text-style-h3">What&#x27;s included</h2>
            <div className="offer_page_rich"><ul className="offer_page_list">{offer.included.map((item) => <li key={item} className="offer_page_item">{item}</li>)}</ul></div>
          </div>
          <div className="offer_page_block is-second">
            <h2 className="offer_page_title u-text-style-h3">Good to know</h2>
            <p className="offer_page_text">{offer.know}</p>
            {offer.rooms && <ul className="fact_line_list"><li>Rooms: {offer.rooms}</li></ul>}
            <div className="u-button-wrapper"><Button label="Book this offer" modal="room-modal" data-offer={offer.name} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
