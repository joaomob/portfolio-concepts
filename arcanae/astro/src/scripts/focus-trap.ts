// Keeps keyboard focus inside a dialog (the cart drawer, the product lightbox): focus moves to its first control, Tab
// and Shift+Tab loop, Escape calls onEscape. The returned function releases the trap and gives focus back to the
// element that had it before.
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function trapFocus(box: HTMLElement | null, onEscape: () => void): () => void {
  if (!box) return () => {};
  const opener = document.activeElement as HTMLElement | null;
  const focusables = () =>
    Array.from(box.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onEscape();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (!box.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKey, true);
  requestAnimationFrame(() => focusables()[0]?.focus());
  return () => {
    document.removeEventListener('keydown', onKey, true);
    if (opener && document.contains(opener)) opener.focus();
  };
}
