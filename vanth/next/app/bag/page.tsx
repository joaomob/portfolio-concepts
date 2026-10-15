// The bag: the pieces the visitor added, kept in the browser, with the quantity of each one and the total.
import { ShopPage } from '@/components/templates/ShopPage';
import { BagLine, EmptyBag, ShopTotals } from '@/components/shop/Shop';
import { href } from '@/lib/config';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('Your bag | Vanth', 'The pieces in your bag at Vanth, with the quantity of each one and the total of the order.', 'bag');

export default function Bag() {
  return (
    <ShopPage>
      <h1 className="heading-style-h1">Your bag</h1>
      <EmptyBag />
      <div className="shop_layout" data-bag-filled="" data-off="">
        <ul className="bag_list" role="list" data-bag-list="edit" aria-live="polite"><BagLine editable /></ul>
        <aside className="shop_summary" aria-label="Order summary">
          <ShopTotals />
          <a href={href('checkout')} className="button is-brand">Go to checkout</a>
          <a href={href('collections')} className="bag-buy_link text-style-label">See the collections</a>
        </aside>
      </div>
    </ShopPage>
  );
}
