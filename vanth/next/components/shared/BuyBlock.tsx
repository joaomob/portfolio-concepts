// The buy block of a piece or a fragrance: the red button and, once the thing is in the bag, its quantity with the
// buttons to take one out or add one more. The shared bag code (../astro/src/scripts/bag.ts) keeps the bag in the
// browser (localStorage); nothing is sent anywhere.
import { thumb } from '@shared/lib/photos';
import { amount } from '@shared/lib/bag';
import { href as link } from '@/lib/config';

interface Props {
  id: string;
  name: string;
  price: string;
  /** the photograph the bag shows (its small copy is used) */
  image: string;
  /** the page of the thing, without the base path */
  page: string;
}

export function BuyBlock({ id, name, price, image, page }: Props) {
  return (
    <div className="bag-buy" data-bag-item="" data-bag-id={id} data-bag-name={name} data-bag-price={amount(price)} data-bag-image={thumb(image)} data-bag-href={link(page)}>
      <button type="button" className="button is-brand" data-bag-add="">Add to bag</button>
      <div className="bag-stepper" data-bag-stepper="" data-off="">
        <button type="button" className="bag-stepper_button" data-bag-less="" aria-label={`Remove one ${name}`}>−</button>
        <span className="bag-stepper_count" data-bag-qty="">1</span>
        <button type="button" className="bag-stepper_button" data-bag-more="" aria-label={`Add one more ${name}`}>+</button>
        <a href={link('bag')} className="bag-buy_link text-style-label">View bag</a>
      </div>
    </div>
  );
}
