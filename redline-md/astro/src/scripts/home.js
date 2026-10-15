// Redline MD landing: the behaviour of the original redline.js, ported to a module that returns its cleanup, on
// top of the local Finsweet stand-in (finsweet-lite.js). The original also stops Webflow Interactions with reduced
// motion; there are none outside Webflow, so that part is left out.
import { startAccordion, startCookieConsent, startModals, startNumberCount, startRangeSlider } from './finsweet-lite.js';
import { startReveal } from './reveal.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const isKey = (e) => e.key === 'Enter' || e.key === ' ';

/** Starts every behaviour of the landing and returns the function that stops them. */
export function startHome() {
  const ac = new AbortController();
  const signal = ac.signal;
  const observers = [];
  const timers = new Set();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stops = [startReveal(), startModals(), startAccordion(), startNumberCount(), startRangeSlider(), startCookieConsent()];

  /* ---------- 3-step upload (inside the "upload" modal) ---------- */
  const goToStep = (n) => {
    $$('[data-step]').forEach((s) => s.classList.toggle('is-active', s.getAttribute('data-step') === String(n)));
    $$('[data-bar]').forEach((b) => b.classList.toggle('is-active', +b.getAttribute('data-bar') <= +n));
  };
  $$('[fs-modal-element="open"][fs-modal-instance="upload"]').forEach((b) => b.addEventListener('click', () => goToStep(1), { signal }));

  /* errors are written out in text next to the field (WCAG 1.4.1 and 3.3.1), not shown by color only */
  const showError = (field, id, message) => {
    let error = document.getElementById(id);
    if (!error) {
      error = document.createElement('p');
      error.id = id;
      error.setAttribute('role', 'alert');
      error.style.cssText = 'margin: 0.5rem 0 1rem; font-size: 0.875rem; font-weight: 600; color: var(--_theme---text-color--text-error, #b42320);';
      field.insertAdjacentElement('afterend', error);
    }
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', id);
    field.style.borderColor = 'var(--_theme---text-color--text-error, #b42320)';
  };
  const clearError = (field, id) => {
    document.getElementById(id)?.remove();
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    field.style.borderColor = '';
  };

  const fileInput = $('[data-file]'), dropzone = $('[data-drop]'), dropzoneText = $('[data-drop-text]');
  const onFileSelected = (f) => { if (!f) return; dropzone.classList.add('is-filled'); dropzoneText.textContent = f.name; clearError(dropzone, 'upload-file-error'); };
  fileInput?.addEventListener('change', () => onFileSelected(fileInput.files[0]), { signal });
  if (dropzone) {
    dropzone.addEventListener('click', (e) => { if (dropzone.tagName !== 'LABEL' && fileInput && e.target !== fileInput) fileInput.click(); }, { signal });
    ['dragover', 'dragenter'].forEach((t) => dropzone.addEventListener(t, (e) => e.preventDefault(), { signal }));
    dropzone.addEventListener('drop', (e) => { e.preventDefault(); onFileSelected(e.dataTransfer.files[0]); }, { signal });
  }
  $$('[data-next]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    const n = b.getAttribute('data-next');
    if (n === '2' && !dropzone?.classList.contains('is-filled')) { showError(dropzone, 'upload-file-error', 'Choose your contract file to continue.'); return; }
    if (n === '3') {
      const email = $('[data-email]');
      if (!email.value || email.value.indexOf('@') < 1) { showError(email, 'upload-email-error', 'Enter a valid email address.'); email.focus(); return; }
    }
    goToStep(n);
  }, { signal }));
  const emailField = $('[data-email]');
  emailField?.addEventListener('input', () => clearError(emailField, 'upload-email-error'), { signal });
  const payButton = $('[data-pay]');
  payButton?.addEventListener('click', (e) => { e.preventDefault(); $('.button_content', payButton).textContent = 'Prototype: checkout connects here'; }, { signal });

  /* ---------- demo: highlight a clause and show its redline ---------- */
  const showClause = (id) => {
    $$('[data-flag]').forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-flag') === id));
    $$('[data-clause]').forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-clause') === id));
    $$('[data-redline]').forEach((r) => r.classList.toggle('is-show', r.getAttribute('data-redline') === id));
    const clause = $(`[data-clause="${id}"]`);
    if (clause && window.innerWidth < 992) clause.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  $$('[data-flag]').forEach((b) => {
    b.addEventListener('click', () => showClause(b.getAttribute('data-flag')), { signal });
    b.addEventListener('keydown', (e) => { if (isKey(e)) { e.preventDefault(); showClause(b.getAttribute('data-flag')); } }, { signal });
  });
  $$('[data-clause]').forEach((c) => c.addEventListener('click', () => showClause(c.getAttribute('data-clause')), { signal }));

  /* ---------- calculator: the slider writes the premium, tail = 2x premium (AMA Insurance) ---------- */
  const premiumRaw = $('[data-premium]'), tailOutput = $('[data-tail]'), premiumOutput = $('[data-premium-out]');
  if (premiumRaw && tailOutput) {
    const updateCalculator = () => {
      const value = parseInt(String(premiumRaw.textContent).replace(/[^0-9]/g, ''), 10);
      if (!value) return;
      if (premiumOutput) premiumOutput.textContent = `$${value.toLocaleString('en-US')}`;
      tailOutput.textContent = `$${(value * 2).toLocaleString('en-US')}`;
    };
    const mo = new MutationObserver(updateCalculator);
    mo.observe(premiumRaw, { childList: true, characterData: true, subtree: true });
    observers.push(mo);
    updateCalculator();
  }

  /* ---------- mobile sticky CTA: shows after the hero CTA leaves the screen, hides at the final CTA ---------- */
  const sticky = $('[data-sticky]'), heroCta = $('[data-hero-cta]'), finalCta = $('[data-final]');
  if (sticky && heroCta && 'IntersectionObserver' in window) {
    let heroOut = false, finalIn = false;
    const updateSticky = () => sticky.classList.toggle('is-show', heroOut && !finalIn);
    const a = new IntersectionObserver((e) => { heroOut = !e[0].isIntersecting && e[0].boundingClientRect.top < 0; updateSticky(); });
    a.observe(heroCta);
    observers.push(a);
    if (finalCta) {
      const b = new IntersectionObserver((e) => { finalIn = e[0].isIntersecting; updateSticky(); });
      b.observe(finalCta);
      observers.push(b);
    }
  }

  /* ---------- testimonials carousel (tablet and mobile): dots and arrows ---------- */
  const track = $('[data-carousel]'), carouselNav = $('[data-carousel-nav]');
  if (track && carouselNav) {
    const cards = [...track.children];
    const dots = $$('[data-dot]', carouselNav);
    const arrows = $$('[data-dir]', carouselNav);
    const currentIndex = () => {
      const x = track.scrollLeft;
      let best = 0, distance = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - cards[0].offsetLeft - x); if (d < distance) { distance = d; best = i; } });
      if (x + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1;
      return best;
    };
    const updateNav = () => {
      const i = currentIndex();
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
      arrows[0].classList.toggle('is-off', i === 0);
      arrows[1].classList.toggle('is-off', i === cards.length - 1);
    };
    const scrollToCard = (i) => { i = Math.max(0, Math.min(cards.length - 1, i)); track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' }); };
    track.addEventListener('scroll', () => window.requestAnimationFrame(updateNav), { passive: true, signal });
    arrows.forEach((b) => {
      const go = () => scrollToCard(currentIndex() + Number(b.getAttribute('data-dir')));
      b.addEventListener('click', go, { signal });
      b.addEventListener('keydown', (e) => { if (isKey(e)) { e.preventDefault(); go(); } }, { signal });
    });
    dots.forEach((d, k) => d.addEventListener('click', () => scrollToCard(k), { signal }));
  }

  /* ---------- deep links for modals: /#privacy-policy opens the policy directly ---------- */
  const routes = { 'terms-of-service': 'terms', 'privacy-policy': 'privacy', 'cookie-policy': 'cookies', 'sample-report': 'report', 'cookie-settings': 'cc' };
  const modalFor = (instance) => (instance === 'cc' ? $('[fs-cc="preferences"]') : $(`[fs-modal-element="modal"][fs-modal-instance="${instance}"]`));
  const triggerFor = (instance) => (instance === 'cc' ? $('[fs-cc="open-preferences"]') : $(`[fs-modal-element="open"][fs-modal-instance="${instance}"]`));
  const isOpen = (el) => !!el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
  const clearHash = () => { if (location.hash) history.replaceState(null, '', location.pathname + location.search); };
  const openRoute = () => {
    const instance = routes[location.hash.slice(1)];
    if (!instance) return;
    let attempts = 0;
    const tryOpen = () => {
      const modal = modalFor(instance), trigger = triggerFor(instance);
      if (isOpen(modal)) return;
      if (trigger && attempts % 3 === 0) trigger.click();
      if (++attempts < 40) { const t = setTimeout(() => { timers.delete(t); tryOpen(); }, 250); timers.add(t); }
    };
    tryOpen();
  };
  Object.keys(routes).forEach((slug) => {
    const modal = modalFor(routes[slug]);
    if (!modal) return;
    let wasOpen = false;
    const mo = new MutationObserver(() => { const open = isOpen(modal); if (wasOpen && !open && location.hash === `#${slug}`) clearHash(); wasOpen = open; });
    mo.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
    observers.push(mo);
  });
  $$('[fs-modal-element="open"], [fs-cc="open-preferences"]').forEach((a) => a.addEventListener('click', () => {
    const href = a.getAttribute('href');
    if (href && routes[href.slice(1)]) history.replaceState(null, '', href);
    else clearHash();
  }, { signal }));
  window.addEventListener('hashchange', openRoute, { signal });
  if (document.readyState === 'complete') openRoute();
  else window.addEventListener('load', openRoute, { signal });

  /* ---------- protected sample report: no right-click, drag, copy, save or print ---------- */
  const samplePages = $('.sample_pages');
  if (samplePages) {
    $$('img', samplePages).forEach((img) => img.setAttribute('draggable', 'false'));
    ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach((type) => samplePages.addEventListener(type, (e) => e.preventDefault(), { signal }));
    document.addEventListener('keydown', (e) => {
      if (!isOpen(modalFor('report'))) return;
      const key = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'c', 'a'].includes(key)) e.preventDefault();
    }, { signal });
  }

  /* ---------- project bar: mark the landing page tab as active ---------- */
  const tabs = $$('[data-review="landing"]');
  tabs.forEach((a) => a.classList.add('is-active'));

  return () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
    timers.forEach((t) => clearTimeout(t));
    tabs.forEach((a) => a.classList.remove('is-active'));
    stops.forEach((stop) => stop());
  };
}
