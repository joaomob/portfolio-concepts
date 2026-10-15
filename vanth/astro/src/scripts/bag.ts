// The bag. A concept store: nothing is charged. The bag is a list kept in this browser (localStorage), shared by every
// page: the buy blocks add a piece and change its quantity, the count in the menu follows, the bag page lists the
// pieces, and the checkout shows the order with its details already filled in and confirms it in a dialog.
// It works without the animation library. Also here: the Menu button of a phone.
import { readBag, writeBag, money, type BagLine } from '../lib/bag';

interface Options {
  /** the base path of the build ("/concepts/vanth") */
  base: string;
  /** where the photographs are ("/concepts/vanth/assets") */
  media: string;
}

const off = (el: Element | null, state: boolean) => {
  if (!el) return;
  if (state) el.setAttribute('data-off', '');
  else el.removeAttribute('data-off');
};

export function initBag({ base, media }: Options): () => void {
  const listeners = new AbortController();
  const on = { signal: listeners.signal };
  let items: BagLine[] = readBag();
  const total = () => items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const units = () => items.reduce((sum, item) => sum + item.qty, 0);
  const find = (key: string) => items.find((item) => item.key === key);
  const change = (key: string, by: number) => {
    const item = find(key);
    if (!item) return;
    item.qty += by;
    if (item.qty < 1) items = items.filter((other) => other !== item);
    writeBag(items);
    show();
  };

  // one buy block: the button, and the quantity once the piece is in the bag; another size is another line
  const blockKey = (block: HTMLElement) => {
    const size = document.querySelector<HTMLInputElement>('.product_size input:checked');
    return { size: size ? size.value : '', key: block.dataset.bagId + (size ? '-' + size.value : '') };
  };
  const showBlocks = () =>
    document.querySelectorAll<HTMLElement>('[data-bag-item]').forEach((block) => {
      const item = find(blockKey(block).key);
      off(block.querySelector('[data-bag-stepper]'), !item);
      off(block.querySelector('[data-bag-add]'), !!item);
      const qty = block.querySelector('[data-bag-qty]');
      if (item && qty) qty.textContent = String(item.qty);
    });

  // the bag page and the summary of the checkout: each line is a copy of the row that waits, switched off, in the list
  const showLists = () => {
    document.querySelectorAll('[data-bag-list]').forEach((list) => {
      const model = list.querySelector('[data-line-model]');
      if (!model) return;
      list.querySelectorAll('[data-line]').forEach((row) => row.remove());
      items.forEach((item) => {
        const row = model.cloneNode(true) as HTMLElement;
        row.removeAttribute('data-line-model');
        row.setAttribute('data-line', '');
        off(row, false);
        row.querySelectorAll<HTMLAnchorElement>('[data-line-link]').forEach((link) => { link.href = item.href; });
        row.querySelector<HTMLImageElement>('[data-line-image]')!.src = `${media}/images/${item.image}.webp`;
        row.querySelector('[data-line-name]')!.textContent = item.name;
        row.querySelector('[data-line-size]')!.textContent = item.size ? 'Size EU ' + item.size : 'One size';
        row.querySelectorAll<HTMLElement>('[data-line-qty]').forEach((el) => { el.textContent = (el.dataset.lineQty || '') + item.qty; });
        row.querySelector('[data-line-price]')!.textContent = money(item.price * item.qty);
        row.querySelectorAll<HTMLElement>('[data-line-act]').forEach((button) => {
          button.dataset.lineKey = item.key;
          button.setAttribute('aria-label', `${button.dataset.lineLabel} ${item.name}`);
        });
        list.appendChild(row);
      });
    });
    document.querySelectorAll('[data-bag-total]').forEach((el) => { el.textContent = money(total()); });
    document.querySelectorAll('[data-bag-filled]').forEach((el) => off(el, !items.length));
    document.querySelectorAll('[data-bag-empty]').forEach((el) => off(el, !!items.length));
  };
  const show = () => {
    document.querySelectorAll('[data-bag-count]').forEach((el) => { el.textContent = String(units()); });
    showBlocks();
    if (!document.querySelector('[data-order-done]')) showLists();
  };

  // the menu of a phone: the Menu button opens the three links as a panel and Escape or a link closes it
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (toggle) {
    const set = (open: boolean) => {
      document.documentElement.toggleAttribute('data-menu', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', () => set(!document.documentElement.hasAttribute('data-menu')), on);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') set(false); }, on);
    document.querySelectorAll('.nav_menu a').forEach((link) => link.addEventListener('click', () => set(false), on));
  }

  // a checkout with nothing to pay for is the empty bag
  if (document.querySelector('[data-order-form]') && !items.length) {
    window.location.replace(`${base}/bag`);
    return () => listeners.abort();
  }
  show();

  document.querySelectorAll<HTMLElement>('[data-bag-item]').forEach((block) => {
    const data = block.dataset;
    const say = (text: string) => {
      const status = document.querySelector('[data-bag-status]');
      if (status) status.textContent = text;
    };
    block.querySelector('[data-bag-add]')!.addEventListener('click', () => {
      const { size, key } = blockKey(block);
      items = [...items, { key, id: data.bagId!, name: data.bagName!, price: Number(data.bagPrice), image: data.bagImage!, href: data.bagHref!, size, qty: 1 }];
      writeBag(items);
      show();
      say(`${data.bagName}${size ? ', size EU ' + size : ''}, is in your bag.`);
      block.querySelector<HTMLElement>('[data-bag-more]')!.focus();
    }, on);
    block.querySelector('[data-bag-more]')!.addEventListener('click', () => change(blockKey(block).key, 1), on);
    block.querySelector('[data-bag-less]')!.addEventListener('click', () => {
      const key = blockKey(block).key;
      const last = find(key)?.qty === 1;
      change(key, -1);
      if (last) {
        say(`${data.bagName} left your bag.`);
        block.querySelector<HTMLElement>('[data-bag-add]')!.focus();
      }
    }, on);
  });
  document.querySelectorAll('.product_size input').forEach((input) => input.addEventListener('change', showBlocks, on));
  document.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[data-line-act]');
    if (!button || !button.dataset.lineKey) return;
    const by = { more: 1, less: -1, remove: -Infinity }[button.dataset.lineAct as 'more' | 'less' | 'remove'];
    change(button.dataset.lineKey, by);
  }, on);

  // checkout: the details are already filled in; placing the order empties the bag and thanks the visitor
  const form = document.querySelector('[data-order-form]');
  const thanks = document.querySelector<HTMLDialogElement>('[data-order-thanks]');
  if (form && thanks) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!items.length) return;
      thanks.querySelector('[data-order-number]')!.textContent = 'VN-' + String(Date.now()).slice(-6);
      thanks.querySelector('[data-order-total]')!.textContent = money(total());
      thanks.setAttribute('data-order-done', '');
      items = [];
      writeBag(items);
      document.querySelectorAll('[data-bag-count]').forEach((el) => { el.textContent = '0'; });
      thanks.showModal();
    }, on);
    thanks.addEventListener('close', () => { window.location.href = base; }, on);
  }
  return () => listeners.abort();
}
