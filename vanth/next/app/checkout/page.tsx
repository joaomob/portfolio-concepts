// The test checkout of the concept store: the details are filled in and read only, and nothing is charged.
import { ShopPage } from '@/components/templates/ShopPage';
import { BagLine, EmptyBag, OrderThanks, ShopField, ShopTotals } from '@/components/shop/Shop';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('Checkout | Vanth', 'The checkout of the Vanth concept store, with the details of a test order already filled in. Nothing is charged.', 'checkout');

export default function Checkout() {
  return (
    <ShopPage after={<OrderThanks />}>
      <h1 className="heading-style-h1">Checkout</h1>
      <EmptyBag />
      <div className="shop_layout" data-bag-filled="" data-off="">
        <form className="shop_form" data-order-form="" data-wf-custom="">
          <p className="shop_notice">Concept store. The details below are filled in for the test, and nothing is&nbsp;charged.</p>
          <fieldset className="shop_group">
            <legend className="heading-style-h5">Contact</legend>
            <ShopField label="Email" name="email" value="guest@vanth.example" type="email" wide />
          </fieldset>
          <fieldset className="shop_group">
            <legend className="heading-style-h5">Delivery</legend>
            <ShopField label="Name" name="name" value="Guest of the house" wide />
            <ShopField label="Address" name="address" value="Musterstrasse 1" wide />
            <ShopField label="Postcode" name="postcode" value="10119" />
            <ShopField label="City" name="city" value="Berlin" />
            <ShopField label="Country" name="country" value="Germany" wide />
          </fieldset>
          <fieldset className="shop_group">
            <legend className="heading-style-h5">Payment</legend>
            <ShopField label="Card number" name="card" value="4242 4242 4242 4242" wide />
            <ShopField label="Expiry" name="expiry" value="12 / 29" />
            <ShopField label="Security code" name="code" value="123" />
          </fieldset>
          <button type="submit" className="button is-brand">Place the test order</button>
        </form>
        <aside className="shop_summary" aria-label="Order summary">
          <h2 className="heading-style-h5">Your order</h2>
          <ul className="bag_list is-compact" role="list" data-bag-list="read"><BagLine editable={false} /></ul>
          <ShopTotals />
          <a href={href('bag')} className="bag-buy_link text-style-label">Back to the bag</a>
        </aside>
      </div>
    </ShopPage>
  );
}
