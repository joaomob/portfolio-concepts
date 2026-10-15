// The registration form (FormCard): validation written in text next to each field, in the visitor's language (every
// message comes from data-error-* attributes of the markup, so nothing here is in a language), and every hook is a
// data attribute, never a class.
//
// The original prototype posted to the HubSpot Forms API at api.hsforms.com. The Content Security Policy of
// joaomob.com/concepts/** allows only api-eu1.hsforms.com for forms, so this concept build never posts: once every
// field passes, it takes the path the original takes while no form id is set, straight to the thank you page
// (data-redirect). The HubSpot portal and form ids of the original stay out of this public repository.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const digits = (value: string) => value.replace(/\D/g, '');
// the country code and the area code: a leading + and 10 to 15 digits (E.164 allows 15)
const validPhone = (value: string) => { const n = digits(value).length; return /^\s*\+/.test(value) && n >= 10 && n <= 15; };

function show(controls: HTMLInputElement[], errorEl: Element | null, message: string): boolean {
  if (errorEl) errorEl.textContent = message;
  controls.forEach((c) => (message ? c.setAttribute('aria-invalid', 'true') : c.removeAttribute('aria-invalid')));
  return !message;
}

function checkText(input: HTMLInputElement): boolean {
  const value = input.value.trim();
  let message = '';
  if (!value) message = input.dataset.errorRequired ?? '';
  else if (input.type === 'email' && !EMAIL.test(value)) message = input.dataset.errorInvalid ?? '';
  else if (input.type === 'tel' && !validPhone(value)) message = input.dataset.errorInvalid ?? '';
  return show([input], document.getElementById(`${input.id}-error`), message);
}

function checkBox(box: HTMLInputElement): boolean {
  return show([box], document.getElementById(`${box.id}-error`), box.checked ? '' : box.dataset.errorRequired ?? '');
}

function checkGroup(group: HTMLElement): boolean {
  const radios = [...group.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
  return show(radios, group.querySelector('[data-form-error]'), radios.some((r) => r.checked) ? '' : group.dataset.errorRequired ?? '');
}

interface Check { run: () => boolean; focus: HTMLElement | null; watch: HTMLElement }

// each check with the control that takes the focus when it fails, in the order of the page
function checks(form: HTMLFormElement): Check[] {
  return [...form.querySelectorAll<HTMLElement>('[data-form-text], [data-form-group], [data-form-check]')].map((el) => {
    if (el.hasAttribute('data-form-group')) return { run: () => checkGroup(el), focus: el.querySelector('input'), watch: el };
    if (el.hasAttribute('data-form-check')) return { run: () => checkBox(el as HTMLInputElement), focus: el, watch: el };
    return { run: () => checkText(el as HTMLInputElement), focus: el, watch: el };
  });
}

/** Wires every form[data-hubspot-form] of the page and returns the function that unwires them. */
export function initForms(scope: ParentNode = document): () => void {
  const undo: (() => void)[] = [];
  const on = (el: EventTarget, type: string, fn: EventListener) => { el.addEventListener(type, fn); undo.push(() => el.removeEventListener(type, fn)); };

  scope.querySelectorAll<HTMLFormElement>('form[data-hubspot-form]').forEach((form) => {
    const list = checks(form);
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    let tried = false;
    // the messages of this file replace the bubbles of the browser
    form.noValidate = true;
    undo.push(() => { form.noValidate = false; });

    // after the first attempt, each field checks itself again as the visitor fixes it
    list.forEach((item) => ['input', 'change'].forEach((type) => on(item.watch, type, () => { if (tried) item.run(); })));

    on(form, 'submit', (event) => {
      event.preventDefault();
      tried = true;
      if (status) status.textContent = '';
      let firstInvalid: HTMLElement | null = null;
      list.forEach((item) => { if (!item.run() && !firstInvalid) firstInvalid = item.focus; });
      if (firstInvalid) { (firstInvalid as HTMLElement).focus(); return; }
      window.location.assign(new URL(form.dataset.redirect ?? form.action, window.location.href).href);
    });
  });

  return () => undo.forEach((fn) => fn());
}
