// The parts of the shop pages (the bag, the checkout). The shared bag code (../astro/src/scripts/bag.ts) fills them in
// from the bag kept in this browser (localStorage): it copies the model row for each piece, switches the empty state
// and the totals, and confirms the test order in its dialog. Nothing is charged and nothing is sent anywhere.
import { MEDIA } from '@shared/lib/photos';
import { href } from '@/lib/config';

/** The row of one piece in the bag, switched off in the page. The bag page lets the visitor change the quantity or
 * remove the piece; the checkout only reads it. */
export function BagLine({ editable }: { editable: boolean }) {
  const collections = href('collections');
  return (
    <li className="bag_item" data-line-model="" data-off="">
      <a href={collections} className="bag_photo" data-line-link="" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- a model the bag code copies and fills in */}
        <img src={`${MEDIA}/images/grain.png`} alt="" width="160" height="200" loading="lazy" data-line-image="" />
      </a>
      <div className="bag_info">
        <a href={collections} className="bag_name heading-style-h5" data-line-link="" data-line-name="">Piece</a>
        <span className="text-style-label" data-line-size="">One size</span>
        {editable
          ? <button type="button" className="bag_remove text-style-label" data-line-act="remove" data-line-label="Remove">Remove</button>
          : <span className="text-style-label" data-line-qty="Quantity ">Quantity 1</span>}
      </div>
      {editable && (
        <div className="bag-stepper">
          <button type="button" className="bag-stepper_button" data-line-act="less" data-line-label="Remove one">−</button>
          <span className="bag-stepper_count" data-line-qty="">1</span>
          <button type="button" className="bag-stepper_button" data-line-act="more" data-line-label="Add one more">+</button>
        </div>
      )}
      <span className="bag_price" data-line-price="">EUR 0</span>
    </li>
  );
}

/** What the bag and the checkout show when nothing is in the bag. */
export function EmptyBag() {
  return (
    <div className="shop_empty" data-bag-empty="" data-off="">
      <p className="shop_lead">Your bag is empty.</p>
      <a href={href('collections')} className="button is-alternate">See the collections</a>
    </div>
  );
}

/** The shipping and the total of the order. */
export function ShopTotals() {
  return (
    <dl className="shop_totals">
      <div className="shop_total-row"><dt className="text-style-label">Shipping</dt><dd>Complimentary</dd></div>
      <div className="shop_total-row is-total"><dt className="text-style-label">Total</dt><dd className="shop_total" data-bag-total="">EUR 0</dd></div>
    </dl>
  );
}

/** One field of the test checkout, filled in and read only: nothing typed here leaves the page. */
export function ShopField({ label, name, value, type = 'text', wide = false }: { label: string; name: string; value: string; type?: string; wide?: boolean }) {
  return (
    <label className={wide ? 'shop_field is-wide' : 'shop_field'}><span className="text-style-label">{label}</span><input type={type} name={name} value={value} autoComplete="off" readOnly /></label>
  );
}

/** The dialog that confirms the test order, with its number and total. */
export function OrderThanks() {
  return (
    <dialog className="size-guide order-thanks" aria-labelledby="order-thanks-title" data-order-thanks="">
      <p className="text-style-label">Order <span data-order-number=""></span></p>
      <h2 className="heading-style-h2" id="order-thanks-title">Thank you.</h2>
      <p className="size-guide_note">Your test order is confirmed. Nothing was charged and nothing will be sent.</p>
      <p className="size-guide_note">Total <span data-order-total=""></span></p>
      <form method="dialog" data-wf-custom=""><button type="submit" className="button">Back to the house</button></form>
    </dialog>
  );
}
