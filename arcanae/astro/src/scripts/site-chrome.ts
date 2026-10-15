// Behaviour every page shares (the original site.js): the year in the footer, the mobile menu and the email form.
export function initSiteChrome(): () => void {
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Document | null, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    if (!el) return;
    el.addEventListener(type, fn as EventListener);
    cleanups.push(() => el.removeEventListener(type, fn as EventListener));
  };

  const year = document.getElementById('yr');
  if (year) year.textContent = String(new Date().getFullYear());

  /* mobile menu: data-open drives the CSS (states.css), aria-expanded tells assistive tech */
  const nav = document.getElementById('nav');
  const toggle = document.querySelector<HTMLElement>('.nav_toggle');
  const menu = document.querySelector<HTMLElement>('.nav_menu');
  const setNav = (open: boolean) => {
    nav?.setAttribute('data-open', String(open));
    toggle?.setAttribute('aria-expanded', String(open));
  };
  on(toggle, 'click', () => setNav(nav?.getAttribute('data-open') !== 'true'));
  on(menu, 'click', () => setNav(false));
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && nav?.getAttribute('data-open') === 'true') {
      setNav(false);
      toggle?.focus();
    }
  });

  /* email form: plays the part of Webflow's Form Block, which hides the form and shows the success message */
  const form = document.getElementById('newsletter-form') as HTMLFormElement | null;
  on(form, 'submit', (e) => {
    e.preventDefault();
    if (!form) return;
    const done = form.parentElement?.querySelector<HTMLElement>('[data-wf-form="success"]');
    form.style.display = 'none';
    if (done) done.style.display = 'block';
  });

  return () => cleanups.forEach((fn) => fn());
}
