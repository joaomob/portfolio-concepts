/* Date picker, ported from the prototype's js/date-picker.js as a module. Every <input type="date"> becomes a field
   that opens one dialog with the calendar of the brand: arrival and departure of the same form share one range calendar
   (two months on a computer, one on a phone), every other date has a single calendar. The calendar is Cally (MIT,
   https://wicky.nillia.ms/cally/), which the prototype loaded from a CDN. The CSP of /concepts/** allows scripts from
   the site only and the package is not installed in this repository, so initDatePicker() takes the loader as an
   option: without one, the browser's own date fields stay, which is the prototype's own fallback when the calendar
   does not load. Once cally is installed: initDatePicker({ loadCalendar: () => import('cally') }). */
import { pageLang } from './lang.js';

/** @param {{ loadCalendar?: () => Promise<unknown> }} [options] */
export function initDatePicker({ loadCalendar } = {}) {
  // every text of the picker, one block per language; the month and day names follow the page's language too
  const LANG = pageLang();
  const TEXTS = {
    en: {
      rangeTitle: 'Your dates', singleTitle: 'Choose a date', close: 'Close', clear: 'Clear', done: 'Done',
      previous: 'Previous month', next: 'Next month', addDate: 'Add date',
      pickBoth: 'Choose the arrival, then the departure.', pickDeparture: 'Now choose the departure.',
      arrival: 'Arrival on', departure: 'Departure on', night: 'night', nights: 'nights',
      tableDays: 'Aljub serves dinner Tuesday to Saturday.',
    },
    es: {
      rangeTitle: 'Tus fechas', singleTitle: 'Elige una fecha', close: 'Cerrar', clear: 'Borrar', done: 'Listo',
      previous: 'Mes anterior', next: 'Mes siguiente', addDate: 'Añadir fecha',
      pickBoth: 'Elige la llegada y después la salida.', pickDeparture: 'Ahora elige la salida.',
      arrival: 'Llegada el', departure: 'Salida el', night: 'noche', nights: 'noches',
      tableDays: 'Aljub sirve cenas de martes a sábado.',
    },
  };
  const TEXT = TEXTS[LANG] || TEXTS.en;
  const LOCALE = LANG === 'es' ? 'es-ES' : 'en-GB';
  const controller = new AbortController();
  const { signal } = controller;
  const inputs = [...document.querySelectorAll('input[type="date"]')];
  if (!inputs.length || !loadCalendar) return () => {};
  let dialogRef = null;

  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fromIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = iso(new Date());
  const long = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const show = (s) => (s ? long.format(fromIso(s)) : '');
  const nights = (a, b) => Math.round((fromIso(b) - fromIso(a)) / 86400000);
  // Aljub serves dinner Tuesday to Saturday: a table cannot be booked on Sunday or Monday
  const closed = (input) => input.name === 'date' && input.closest('[data-demo-form="table"]');
  const ARROW = (d) => `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;

  loadCalendar().then(() => {
    if (signal.aborted) return;
    // one dialog for the whole page
    const dialog = document.createElement('dialog');
    dialog.className = 'modal_dialog date_dialog';
    dialog.setAttribute('aria-labelledby', 'date-dialog-title');
    dialog.innerHTML = `<div class="modal_inner date_inner">
        <div class="modal_head date_head"><h2 class="u-text-style-h4 u-margin-bottom-0" id="date-dialog-title"></h2><button type="button" class="modal_close" data-date-close>${TEXT.close}</button></div>
        <div class="date_calendar" data-date-slot></div>
        <p class="date_summary" aria-live="polite" data-date-summary></p>
        <div class="date_actions">
          <button type="button" class="date_clear" data-date-clear>${TEXT.clear}</button>
          <div data-trigger="hover focus" class="button_main_wrap"><button type="button" class="button_main_element" data-date-done><span class="button_main_text u-text-style-main">${TEXT.done}</span></button></div>
        </div>
      </div>`;
    document.body.append(dialog);
    dialogRef = dialog;
    const slot = dialog.querySelector('[data-date-slot]');
    const title = dialog.querySelector('#date-dialog-title');
    const summary = dialog.querySelector('[data-date-summary]');
    const phone = window.matchMedia('(max-width: 767px)');
    let active = null; // { kind, fields: [{ input, button }], trigger }

    const paint = (field) => {
      const v = field.input.value;
      field.input.dataset.display = show(v);
      field.button.value = show(v);
    };
    const say = () => {
      if (!active) return;
      const [a, b] = active.fields.map((f) => f.input.value);
      if (active.kind === 'range') {
        summary.textContent = a && b ? `${TEXT.arrival} ${show(a)}. ${TEXT.departure} ${show(b)}. ${nights(a, b)} ${nights(a, b) === 1 ? TEXT.night : TEXT.nights}.`
          : a ? `${TEXT.arrival} ${show(a)}. ${TEXT.pickDeparture}` : TEXT.pickBoth;
        // a single date: the line says the chosen date, or why some days are struck out; it never repeats the title
      } else summary.textContent = a ? `${show(a)}.` : (closed(active.fields[0].input) ? TEXT.tableDays : '');
    };
    const build = () => {
      const range = active.kind === 'range';
      const months = range && !phone.matches ? 2 : 1;
      const cal = document.createElement(range ? 'calendar-range' : 'calendar-date');
      cal.className = 'date_cally';
      cal.setAttribute('months', String(months));
      cal.setAttribute('locale', LOCALE);
      cal.setAttribute('first-day-of-week', '1');
      cal.setAttribute('min', today);
      cal.innerHTML = `<span slot="previous">${ARROW('M10 3 5 8l5 5')}<span class="u-sr-only">${TEXT.previous}</span></span>
        <span slot="next">${ARROW('M6 3l5 5-5 5')}<span class="u-sr-only">${TEXT.next}</span></span>
        <div class="date_months">${Array.from({ length: months }, (_, i) => `<calendar-month offset="${i}"></calendar-month>`).join('')}</div>`;
      const [a, b] = active.fields.map((f) => f.input.value);
      const shut = closed(active.fields[0].input) ? (d) => d.getDay() === 0 || d.getDay() === 1 : () => false;
      cal.isDateDisallowed = shut;
      if (range && a && b) cal.value = `${a}/${b}`;
      else if (!range && a) cal.value = a;
      const focus = (active.trigger === active.fields[1]?.button && b) ? b : a;
      if (focus) cal.focusedDate = focus;
      if (range) {
        // at least one night: while the arrival is chosen, the same day cannot be the departure
        cal.addEventListener('rangestart', (e) => { const start = iso(e.detail); cal.isDateDisallowed = (d) => shut(d) || iso(d) === start; active.fields[0].input.value = start; active.fields[1].input.value = ''; active.fields.forEach(paint); say(); });
        cal.addEventListener('rangeend', () => { cal.isDateDisallowed = shut; });
      }
      cal.addEventListener('change', () => {
        const parts = range ? cal.value.split('/') : [cal.value];
        active.fields.forEach((f, i) => { f.input.value = parts[i] || ''; paint(f); });
        say();
      });
      slot.replaceChildren(cal);
      return cal;
    };
    const open = (group, trigger) => {
      active = { ...group, trigger };
      title.textContent = group.kind === 'range' ? TEXT.rangeTitle : TEXT.singleTitle;
      dialog.classList.toggle('is-single', group.kind !== 'range');
      const cal = build();
      say();
      dialog.showModal();
      // the focus goes to the chosen date, or to today (WAI-ARIA APG, Date Picker Dialog)
      requestAnimationFrame(() => { if (typeof cal.focus === 'function') cal.focus(); });
    };
    const close = () => { dialog.close(); };
    dialog.addEventListener('close', () => { if (active) { active.trigger.focus(); active = null; } });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    dialog.querySelector('[data-date-close]').addEventListener('click', close);
    dialog.querySelector('[data-date-done]').addEventListener('click', close);
    dialog.querySelector('[data-date-clear]').addEventListener('click', () => {
      active.fields.forEach((f) => { f.input.value = ''; paint(f); });
      build(); say();
    });

    // turn each date input into a field button, pairing arrival and departure of the same form
    const handled = new Set();
    inputs.forEach((input) => {
      if (handled.has(input)) return;
      const form = input.form || input.closest('form, dialog') || document;
      const pair = input.name === 'arrival' ? form.querySelector('input[type="date"][name="departure"]') : null;
      const group = { kind: pair ? 'range' : 'single', fields: [] };
      [input, pair].filter(Boolean).forEach((el) => {
        handled.add(el);
        const button = document.createElement('input');
        button.type = 'text';
        button.readOnly = true;
        button.className = 'field_input date_field';
        button.id = el.id;
        button.setAttribute('aria-haspopup', 'dialog');
        button.autocomplete = 'off';
        // the label above says arrival or departure; the field only says what to do (a longer text did not fit on a phone)
        button.placeholder = TEXT.addDate;
        const box = document.createElement('span');
        box.className = 'date_field_wrap';
        box.innerHTML = '<svg class="date_field_icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><rect x="3" y="4.5" width="14" height="12.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 8.5h14M7 2.5v4M13 2.5v4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';
        box.prepend(button);
        el.removeAttribute('id');
        el.type = 'hidden';
        el.after(box);
        const field = { input: el, button };
        group.fields.push(field);
        paint(field);
        // the form error marks the field the visitor sees
        new MutationObserver(() => button.setAttribute('aria-invalid', el.getAttribute('aria-invalid') || 'false')).observe(el, { attributes: true, attributeFilter: ['aria-invalid'] });
        // a value set by another script (the booking bar copies its dates into the room modal) is shown at once
        el.addEventListener('input', () => paint(field));
        button.addEventListener('click', () => open(group, button));
        button.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); open(group, button); } });
      });
    });
  }).catch(() => { /* the calendar did not load: the browser's own date fields stay */ });
  return () => { controller.abort(); dialogRef?.remove(); };
}
