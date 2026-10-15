// The cart (the original store.js): items kept in localStorage, the drawer with its shipping estimate, and the
// checkout call. The drawer markup comes from the CartDrawer component; this module fills it and wires it.
import { getCard, money } from '../lib/catalog';
import { DEFAULT_COUNTRY, shippingEUR } from '../data/shipping';
import { trapFocus } from './focus-trap';
import { pauseScroll, resumeScroll } from './smooth-scroll';

interface CartItem {
  k: string;
  id: string;
  finish: string;
  qty: number;
}

const CART_KEY = 'arcanae_cart_v1';
const COUNTRY_KEY = 'arcanae_ship_country';
/* the message shown when checkout is not available has no approved copy yet in the original, so it stays empty */
const CHECKOUT_UNAVAILABLE = '';

const readItems = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? 'null') ?? [];
  } catch {
    return [];
  }
};

const getCountry = (): string => {
  try {
    return localStorage.getItem(COUNTRY_KEY) ?? DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
};

let items: CartItem[] = [];
let releaseFocus: (() => void) | null = null;

const count = () => items.reduce((n, i) => n + i.qty, 0);
const subtotal = () => items.reduce((s, i) => s + (getCard(i.id)?.price ?? 0) * i.qty, 0);
const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

function save(): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    /* storage blocked: the cart lives for this page only */
  }
  render();
}

function itemMarkup(item: CartItem): string {
  const card = getCard(item.id);
  if (!card) return '';
  return `
        <div class="cart-item_component">
          <div class="cart-item_thumbnail">${card.roman || '·'}</div>
          <div class="cart-item_content">
            <div class="cart-item_row">
              <strong class="text-font-secondary text-weight-bold">${card.name}</strong>
              <span>${money(card.price * item.qty)}</span>
            </div>
            <div class="cart-item_meta">${item.finish === 'black' ? 'Black' : 'White'} · Qty ${item.qty}</div>
            <button class="cart-item_remove" data-key="${item.k}">Remove</button>
          </div>
        </div>`;
}

function render(): void {
  document.querySelectorAll('[data-cart-count]').forEach((n) => (n.textContent = String(count())));
  /* the cart button is named "Cart" plus the number of items */
  document.querySelectorAll('.nav_cart').forEach((b) => b.setAttribute('aria-label', `Cart ${count()}`));
  const body = byId('cart-items');
  if (!body) return;
  body.innerHTML = items.length ? items.map(itemMarkup).join('') : '<p class="cart-drawer_empty">Your cart is empty.</p>';

  const has = items.length > 0;
  const ship = has ? shippingEUR(getCountry()) : null;
  const sub = byId('cart-subtotal');
  if (sub) sub.textContent = has ? money(subtotal()) : '-';
  const shipEl = byId('cart-ship');
  if (shipEl) shipEl.textContent = has && ship != null ? money(ship) : '-';
  const total = byId('cart-total');
  if (total) total.textContent = money(has ? subtotal() + (ship ?? 0) : 0);
  const checkoutBtn = byId<HTMLButtonElement>('checkout-btn');
  if (checkoutBtn) checkoutBtn.disabled = !has;
}

export function openDrawer(): void {
  const drawer = byId('cart');
  if (!drawer) return;
  drawer.setAttribute('aria-hidden', 'false');
  pauseScroll();
  if (!releaseFocus) releaseFocus = trapFocus(drawer.querySelector<HTMLElement>('.cart-drawer_panel'), closeDrawer);
}

export function closeDrawer(): void {
  byId('cart')?.setAttribute('aria-hidden', 'true');
  resumeScroll();
  if (releaseFocus) {
    const release = releaseFocus;
    releaseFocus = null;
    release();
  }
}

export function addToCart(id: string, finish = 'white'): void {
  const k = `${id}:${finish}`;
  const hit = items.find((i) => i.k === k);
  if (hit) hit.qty++;
  else items.push({ k, id, finish, qty: 1 });
  save();
  openDrawer();
}

async function checkout(): Promise<void> {
  if (!items.length) return;
  const btn = byId<HTMLButtonElement>('checkout-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Redirecting…';
  }
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map(({ id, finish, qty }) => ({ id, finish, qty })), country: getCountry() }),
    });
    if (!res.ok) throw new Error('checkout unavailable');
    const { url } = (await res.json()) as { url: string };
    window.location.href = url;
  } catch {
    const status = byId('checkout-status');
    if (status) status.textContent = CHECKOUT_UNAVAILABLE;
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Proceed to Checkout';
    }
  }
}

export function initCart(): () => void {
  items = readItems();
  const drawer = byId('cart');
  const listeners: [EventTarget, string, EventListener][] = [];
  const on = (el: EventTarget | null | undefined, type: string, fn: EventListener) => {
    if (!el) return;
    el.addEventListener(type, fn);
    listeners.push([el, type, fn]);
  };

  document.querySelectorAll('.nav_cart').forEach((b) => on(b, 'click', () => openDrawer()));
  on(drawer?.querySelector('.cart-drawer_overlay'), 'click', () => closeDrawer());
  on(drawer?.querySelector('.cart-drawer_close'), 'click', () => closeDrawer());
  on(byId('checkout-btn'), 'click', () => void checkout());
  on(byId('cart-items'), 'click', (e) => {
    const remove = (e.target as Element).closest<HTMLElement>('.cart-item_remove');
    if (!remove) return;
    items = items.filter((i) => i.k !== remove.dataset.key);
    save();
    drawer?.querySelector<HTMLElement>('.cart-drawer_close')?.focus();
  });
  const select = byId<HTMLSelectElement>('ship-country');
  if (select) {
    select.value = getCountry();
    on(select, 'change', () => {
      try {
        localStorage.setItem(COUNTRY_KEY, select.value);
      } catch {
        /* storage blocked: the choice lives for this page only */
      }
      render();
    });
  }

  render();
  return () => {
    listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
    if (releaseFocus) closeDrawer();
  };
}
