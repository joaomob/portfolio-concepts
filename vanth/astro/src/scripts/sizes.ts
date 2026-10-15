// The sizes of a piece page: the country picked rewrites the size labels (the value sent to the bag stays the
// European one), and the size guide opens as a dialog with its measurements in centimetres or inches.

export function initSizes(): () => void {
  const listeners = new AbortController();
  const on = { signal: listeners.signal };

  // the first country and the second size start marked; where the markup lost the checked attribute, they are marked here
  ([['size-system', 0], ['size', 1]] as const).forEach(([name, first]) => {
    const group = [...document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)];
    if (group.length && !group.some((input) => input.checked)) (group[first] || group[0]).checked = true;
  });
  const labels = document.querySelectorAll<HTMLElement>('[data-size]');
  document.querySelectorAll<HTMLInputElement>('input[name="size-system"]').forEach((input) => {
    input.addEventListener('change', () => labels.forEach((label) => { label.textContent = label.dataset[input.value] || ''; }), on);
  });

  const guide = document.querySelector<HTMLDialogElement>('[data-guide]');
  if (guide) {
    document.querySelectorAll('[data-guide-open]').forEach((button) => button.addEventListener('click', () => guide.showModal(), on));
    guide.querySelectorAll('[data-guide-close]').forEach((button) => button.addEventListener('click', () => guide.close(), on));
    // a click on the backdrop lands on the dialog itself
    guide.addEventListener('click', (event) => { if (event.target === guide) guide.close(); }, on);
    const units = guide.querySelectorAll<HTMLElement>('[data-guide-unit]');
    units.forEach((button) => {
      button.addEventListener('click', () => {
        units.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        guide.querySelectorAll<HTMLElement>('[data-cm]').forEach((cell) => {
          const cm = Number(cell.dataset.cm);
          cell.textContent = button.dataset.guideUnit === 'in' ? (cm / 2.54).toFixed(1) : String(cm);
        });
      }, on);
    });
  }
  return () => listeners.abort();
}
