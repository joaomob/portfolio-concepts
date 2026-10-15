// The cart drawer (CartDrawer.astro), filled in by the shared cart script.
import { SHIP_COUNTRIES } from '../../astro/src/data/shipping';

export default function CartDrawer({ note = false }: { note?: boolean }) {
  return (
    <div className="cart-drawer_component" id="cart" aria-hidden="true">
      <div className="cart-drawer_overlay"></div>
      <aside className="cart-drawer_panel" role="dialog" aria-modal="true" aria-label="Cart">
        <div className="cart-drawer_header"><div className="heading-style-h3">Your Cart</div><button className="cart-drawer_close">Close</button></div>
        <div className="cart-drawer_items" id="cart-items"></div>
        <div className="cart-drawer_footer">
          <label className="cart-drawer_shipping"><span className="cart-drawer_shipping-label">Ship to</span><select className="cart-drawer_select" id="ship-country">{SHIP_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</select></label>
          <div className="cart-drawer_line"><span>Subtotal</span><span id="cart-subtotal">-</span></div>
          <div className="cart-drawer_line"><span>Shipping</span><span id="cart-ship">-</span></div>
          <div className="cart-drawer_total"><span>Total</span><span id="cart-total">€0</span></div>
          <button className="button is-gold is-full" id="checkout-btn" disabled>Proceed to Checkout</button>
          <p className="cart-drawer_status" id="checkout-status" role="status" aria-live="polite"></p>
          {note && <p className="cart-drawer_note">VAT calculated at checkout. Home pickup, tracked.</p>}
        </div>
      </aside>
    </div>
  );
}
