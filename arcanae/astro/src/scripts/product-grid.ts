// The product grids. Every card is rendered on the server; the browser only shows and hides them.
// - Home: the status tabs and six cards per page with a numbered pagination.
// - Collection: the status tabs plus the category views (?status=in-stock or made-to-order), which change the heading,
//   lead, title and description, as in the original.
import { CARDS } from '../data/catalog';
import { CATEGORY_VIEWS } from '../data/pages';
import { isStatusFilter, matchesStatus, type StatusFilter } from '../lib/catalog';

const PER_PAGE = 6;

interface GridOptions {
  root: HTMLElement;
  initial: StatusFilter;
  onStatus?: (status: StatusFilter) => void;
  paginate: boolean;
}

function initGrid({ root, initial, onStatus, paginate }: GridOptions): () => void {
  const filter = root.querySelector<HTMLElement>('[data-status-filter]');
  const grid = root.querySelector<HTMLElement>('[data-grid]');
  const pagination = root.querySelector<HTMLElement>('[data-pagination]');
  if (!filter || !grid) return () => {};
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card]'));
  const buttons = Array.from(filter.querySelectorAll<HTMLButtonElement>('[data-status]'));
  let status: StatusFilter = initial;
  let page = 1;

  const visible = () => cards.filter((el) => matchesStatus(CARDS.find((c) => c.id === el.dataset.card)!, status));
  const pages = () => Math.max(1, Math.ceil(visible().length / PER_PAGE));

  const renderPagination = () => {
    if (!pagination) return;
    const n = pages();
    let html = `<button class="pagination_button is-arrow" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''} aria-label="Previous">&larr;</button>`;
    for (let i = 1; i <= n; i++) {
      html += `<button class="pagination_button${i === page ? ' is-current' : ''}" data-page="${i}" aria-current="${i === page}">${i}</button>`;
    }
    html += `<button class="pagination_button is-arrow" data-page="${page + 1}" ${page === n ? 'disabled' : ''} aria-label="Next">&rarr;</button>`;
    pagination.innerHTML = html;
  };

  const show = () => {
    const list = visible();
    const start = (page - 1) * PER_PAGE;
    const shown = new Set(paginate ? list.slice(start, start + PER_PAGE) : list);
    cards.forEach((el) => (el.hidden = !shown.has(el)));
    if (paginate) renderPagination();
  };

  const goPage = (p: number) => {
    page = Math.max(1, Math.min(pages(), p));
    show();
  };

  const setStatus = (next: StatusFilter) => {
    status = next;
    buttons.forEach((b) => {
      const on = b.dataset.status === next;
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-active', on);
    });
    onStatus?.(next);
    goPage(1);
  };

  const onFilter = (e: Event) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-status]');
    if (b && isStatusFilter(b.dataset.status)) setStatus(b.dataset.status);
  };
  const onPage = (e: Event) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button[data-page]');
    if (b && !b.disabled) goPage(Number(b.dataset.page));
  };
  filter.addEventListener('click', onFilter);
  pagination?.addEventListener('click', onPage);
  if (status !== 'all') setStatus(status);

  return () => {
    filter.removeEventListener('click', onFilter);
    pagination?.removeEventListener('click', onPage);
  };
}

export function initHomeGrid(): () => void {
  const root = document.getElementById('collection');
  return root ? initGrid({ root, initial: 'all', paginate: true }) : () => {};
}

export function initCollectionGrid(): () => void {
  const root = document.querySelector<HTMLElement>('[data-collection]');
  if (!root) return () => {};
  const title = document.getElementById('collection-title');
  const lead = document.getElementById('collection-lead');

  const showCategory = (status: StatusFilter) => {
    const view = CATEGORY_VIEWS[status];
    if (title) title.textContent = view.h1;
    if (lead) {
      lead.textContent = view.lead;
      lead.hidden = !view.lead;
    }
    document.title = view.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (view.meta) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = view.meta;
    } else meta?.remove();
    const url = new URL(location.href);
    if (status === 'all') url.searchParams.delete('status');
    else url.searchParams.set('status', status);
    history.replaceState(history.state, '', url);
  };

  const requested = new URLSearchParams(location.search).get('status');
  return initGrid({ root, initial: isStatusFilter(requested) ? requested : 'all', onStatus: showCategory, paginate: false });
}
