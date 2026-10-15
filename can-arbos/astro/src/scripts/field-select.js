/* Own select, ported from the prototype's js/field-select.js as a module. Every <select class="field_input"> becomes a
   read-only field with the chevron in the stroke of the calendar icon, opening a list in the site's colours. The native
   select stays in the page, hidden, and keeps the value and the change event for the form and the other scripts.
   Pattern: WAI-ARIA APG "Select-Only Combobox" (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/):
   Enter, Space, Alt+Down or Down open; Up and Down move; Home and End; Enter or Space choose; Esc closes; typing a letter
   jumps to the option that starts with it. initFieldSelect() returns a cleanup that gives the page its native selects back. */
export function initFieldSelect() {
  const controller = new AbortController();
  const { signal } = controller;
  const selects = [...document.querySelectorAll('select.field_input')];
  const undo = [];
  if (!selects.length) return () => {};
  const CHEVRON = '<svg class="field_select_icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';
  let count = 0;

  selects.forEach((select) => {
    count += 1;
    const id = select.id || `field-select-${count}`;
    const listId = `${id}-list`;
    const box = document.createElement('span');
    box.className = 'field_select_wrap';
    const field = document.createElement('input');
    field.type = 'text';
    field.readOnly = true;
    field.className = 'field_input field_select';
    field.id = id;
    field.autocomplete = 'off';
    field.setAttribute('role', 'combobox');
    field.setAttribute('aria-haspopup', 'listbox');
    field.setAttribute('aria-expanded', 'false');
    field.setAttribute('aria-controls', listId);
    if (select.required) field.setAttribute('aria-required', 'true');
    const list = document.createElement('ul');
    list.className = 'field_select_list';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    list.dataset.open = 'false';
    const label = document.querySelector(`label[for="${select.id}"]`);
    if (label) { label.id = label.id || `${id}-label`; list.setAttribute('aria-labelledby', label.id); }
    const options = [...select.options].map((o, i) => {
      const li = document.createElement('li');
      li.className = 'field_select_option';
      li.id = `${id}-option-${i}`;
      li.setAttribute('role', 'option');
      li.textContent = o.text;
      li.addEventListener('mousedown', (e) => e.preventDefault());
      li.addEventListener('mousemove', () => { if (active !== i) move(i); });
      li.addEventListener('click', () => { choose(i); close(); });
      list.append(li);
      return li;
    });
    select.removeAttribute('id');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    select.classList.add('field_select_native');
    select.after(box);
    box.append(field);
    box.insertAdjacentHTML('beforeend', CHEVRON);
    box.append(list);

    let active = select.selectedIndex;
    const paint = () => {
      field.value = select.selectedIndex >= 0 ? select.options[select.selectedIndex].text : '';
      options.forEach((li, i) => li.setAttribute('aria-selected', String(i === select.selectedIndex)));
    };
    const move = (i) => {
      active = Math.max(0, Math.min(options.length - 1, i));
      options.forEach((li, j) => li.classList.toggle('is-active', j === active));
      field.setAttribute('aria-activedescendant', options[active].id);
      options[active].scrollIntoView({ block: 'nearest' });
    };
    // the list opens downwards, or upwards when the screen or a box that clips (the hero of the Home) ends below the field
    const roomBelow = () => {
      let bottom = window.innerHeight;
      for (let n = box.parentElement; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.overflowY !== 'visible' || cs.overflowX !== 'visible') bottom = Math.min(bottom, n.getBoundingClientRect().bottom);
      }
      return bottom - field.getBoundingClientRect().bottom;
    };
    const open = () => {
      list.dataset.up = 'false';
      list.dataset.open = 'true';
      if (roomBelow() < list.offsetHeight + 8) list.dataset.up = 'true';
      field.setAttribute('aria-expanded', 'true');
      move(Math.max(0, select.selectedIndex));
    };
    const close = () => { list.dataset.open = 'false'; field.setAttribute('aria-expanded', 'false'); field.removeAttribute('aria-activedescendant'); };
    const isOpen = () => list.dataset.open === 'true';
    const choose = (i) => {
      if (select.selectedIndex !== i) { select.selectedIndex = i; select.dispatchEvent(new Event('change', { bubbles: true })); }
      paint();
    };
    field.addEventListener('click', () => (isOpen() ? close() : open()));
    field.addEventListener('blur', close);
    field.addEventListener('keydown', (e) => {
      const k = e.key;
      if (!isOpen()) {
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) { e.preventDefault(); open(); if (k === 'ArrowUp') move(active - 1); if (k === 'Home') move(0); if (k === 'End') move(options.length - 1); }
        return;
      }
      if (k === 'ArrowDown') { e.preventDefault(); move(active + 1); }
      else if (k === 'ArrowUp' && e.altKey) { e.preventDefault(); choose(active); close(); }
      else if (k === 'ArrowUp') { e.preventDefault(); move(active - 1); }
      else if (k === 'Home') { e.preventDefault(); move(0); }
      else if (k === 'End') { e.preventDefault(); move(options.length - 1); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); choose(active); close(); }
      else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (k === 'Tab') { choose(active); close(); }
      else if (k.length === 1) { const n = options.findIndex((li) => li.textContent.toLowerCase().startsWith(k.toLowerCase())); if (n >= 0) move(n); }
    });
    // a value set by another script (the booking bar, "Book this room") shows at once
    select.addEventListener('change', paint, { signal });
    select.addEventListener('input', paint, { signal });
    // the form error marks the field the visitor sees
    const observer = new MutationObserver(() => field.setAttribute('aria-invalid', select.getAttribute('aria-invalid') || 'false'));
    observer.observe(select, { attributes: true, attributeFilter: ['aria-invalid'] });
    paint();
    // the cleanup gives the page its native select back
    undo.push(() => { observer.disconnect(); box.remove(); select.id = id; select.removeAttribute('tabindex'); select.removeAttribute('aria-hidden'); select.classList.remove('field_select_native'); });
  });
  return () => { controller.abort(); undo.forEach((fn) => fn()); };
}
