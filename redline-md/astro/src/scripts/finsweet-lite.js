// A local stand-in for the two Finsweet scripts the original loads from jsDelivr (Attributes v2 with fs-accordion,
// fs-modal, fs-numbercount and fs-rangeslider, and Cookie Consent v1 in opt-in mode). The CSP of /concepts allows no
// other host and no Finsweet package is installed, so this module reads the same fs-* attributes and leaves the page
// in the state measured on the original after load: the first FAQ item open, the cookie banner shown, the slider at
// its start value and every counter at its end value. Motion runs on GSAP; with reduced motion every change is
// instant. Each start function returns the function that removes its listeners and observers.
import { gsap } from 'gsap';

const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isKey = (e) => e.key === 'Enter' || e.key === ' ';

/** fs-accordion: one group, single mode, the first item open on load, the panel height animated. */
export function startAccordion() {
  const ac = new AbortController();
  const tweens = [];
  for (const group of $$('[fs-accordion-element="group"]')) {
    const single = group.getAttribute('fs-accordion-single') === 'true';
    const items = $$('[fs-accordion-element="accordion"]', group);
    const parts = (item) => ({
      trigger: item.querySelector('[fs-accordion-element="trigger"]'),
      arrow: item.querySelector('[fs-accordion-element="arrow"]'),
      content: item.querySelector('[fs-accordion-element="content"]'),
    });
    const setActive = (item, on) => {
      const { trigger, arrow, content } = parts(item);
      for (const el of [item, trigger, arrow, content]) el?.classList.toggle('is-accordion-active', on);
      trigger?.setAttribute('aria-expanded', String(on));
    };
    const open = (item, instant) => {
      const { content } = parts(item);
      setActive(item, true);
      content.style.display = 'block';
      const height = content.scrollHeight;
      if (instant || reduceMotion()) { content.style.maxHeight = `${height}px`; return; }
      tweens.push(gsap.fromTo(content, { maxHeight: 0 }, { maxHeight: height, duration: 0.4, ease: 'power2.out' }));
    };
    const close = (item) => {
      const { content } = parts(item);
      setActive(item, false);
      const done = () => { content.style.display = 'none'; };
      if (reduceMotion()) { content.style.maxHeight = '0px'; done(); return; }
      tweens.push(gsap.to(content, { maxHeight: 0, duration: 0.3, ease: 'power2.in', onComplete: done }));
    };
    items.forEach((item, index) => {
      const { trigger, content } = parts(item);
      if (!trigger || !content) return;
      const id = `fs-accordion-${index}`;
      trigger.id = `${id}-trigger`;
      content.id = `${id}-content`;
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-controls', content.id);
      content.setAttribute('aria-labelledby', trigger.id);
      if (index === 0) open(item, true);
      else { setActive(item, false); content.style.maxHeight = '0px'; content.style.display = 'none'; }
      const toggle = () => {
        const isOpen = item.classList.contains('is-accordion-active');
        if (isOpen) { close(item); return; }
        if (single) items.filter((other) => other !== item && other.classList.contains('is-accordion-active')).forEach(close);
        open(item, false);
      };
      trigger.addEventListener('click', toggle, { signal: ac.signal });
      trigger.addEventListener('keydown', (e) => { if (isKey(e)) { e.preventDefault(); toggle(); } }, { signal: ac.signal });
    });
  }
  return () => { ac.abort(); tweens.forEach((t) => t.kill()); };
}

/** fs-modal: open and close triggers by instance, fade or slide-up, Escape closes, focus goes to the close button. */
export function startModals() {
  const ac = new AbortController();
  const modals = new Map($$('[fs-modal-element="modal"]').map((m) => [m.getAttribute('fs-modal-instance'), m]));
  let lastTrigger = null;
  const show = (instance) => {
    const modal = modals.get(instance);
    if (!modal) return;
    gsap.killTweensOf(modal);
    modal.style.display = 'flex';
    const slide = modal.getAttribute('fs-modal-animation') === 'slide-up';
    if (reduceMotion()) gsap.set(modal, { opacity: 1, y: 0 });
    else gsap.fromTo(modal, { opacity: 0, y: slide ? 100 : 0 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    modal.querySelector('[fs-modal-element="close"]')?.focus({ preventScroll: true });
  };
  const hide = (modal) => {
    gsap.killTweensOf(modal);
    const done = () => { modal.style.display = 'none'; lastTrigger?.focus({ preventScroll: true }); lastTrigger = null; };
    if (reduceMotion()) { done(); return; }
    gsap.to(modal, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: done });
  };
  const isOpen = (modal) => modal.style.display === 'flex';
  for (const [instance, modal] of modals) modal.id ||= `fs-modal-${instance}`;
  for (const trigger of $$('[fs-modal-element="open"]')) {
    const instance = trigger.getAttribute('fs-modal-instance');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-haspopup', 'dialog');
    if (modals.get(instance)) trigger.setAttribute('aria-controls', modals.get(instance).id);
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // a trigger inside another open modal (the sample report's "Get yours") swaps one modal for the other
      for (const m of modals.values()) if (isOpen(m) && m.getAttribute('fs-modal-instance') !== instance) { gsap.killTweensOf(m); m.style.display = 'none'; }
      lastTrigger = trigger;
      show(instance);
    }, { signal: ac.signal });
  }
  for (const closer of $$('[fs-modal-element="close"]')) {
    const run = (e) => { e.preventDefault(); const m = modals.get(closer.getAttribute('fs-modal-instance')); if (m) hide(m); };
    closer.addEventListener('click', run, { signal: ac.signal });
    closer.addEventListener('keydown', (e) => { if (isKey(e)) run(e); }, { signal: ac.signal });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const m of modals.values()) if (isOpen(m)) hide(m);
  }, { signal: ac.signal });
  return () => { ac.abort(); modals.forEach((m) => gsap.killTweensOf(m)); };
}

/** fs-numbercount: counts from 0 to the end value when the number scrolls into view. Finsweet writes the end value
 *  with the locale when one is set (10,000) and as a plain number when not (3000); the same here. */
export function startNumberCount() {
  const numbers = $$('[fs-numbercount-element="number"]');
  const tweens = [];
  const format = (el, value) => {
    const locale = el.getAttribute('fs-numbercount-locale');
    const n = Math.round(value);
    return locale ? n.toLocaleString(locale) : String(n);
  };
  const run = (el) => {
    const end = Number(el.getAttribute('fs-numbercount-end'));
    if (reduceMotion()) { el.textContent = format(el, end); return; }
    // the original sets 1600 ms on one counter and nothing on the others; 1000 ms for those is this port's choice
    const duration = Number(el.getAttribute('fs-numbercount-duration') || 1000) / 1000;
    const state = { value: 0 };
    tweens.push(gsap.to(state, { value: end, duration, ease: 'power1.out', onUpdate: () => { el.textContent = format(el, state.value); } }));
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) { observer.unobserve(entry.target); run(entry.target); }
  });
  numbers.forEach((el) => observer.observe(el));
  return () => { observer.disconnect(); tweens.forEach((t) => t.kill()); };
}

/** fs-rangeslider: one handle dragged along the track or moved with the arrow keys, by step, from min to max. The
 *  display-value element gets the plain number (redline.js formats it). */
export function startRangeSlider() {
  const ac = new AbortController();
  const observers = [];
  for (const wrapper of $$('[fs-rangeslider-element="wrapper"]')) {
    const track = wrapper.querySelector('[fs-rangeslider-element="track"]');
    const fill = wrapper.querySelector('[fs-rangeslider-element="fill"]');
    const handle = wrapper.querySelector('[fs-rangeslider-element="handle"]');
    const display = wrapper.querySelector('[fs-rangeslider-element="display-value"]');
    if (!track || !handle) continue;
    const min = Number(wrapper.getAttribute('fs-rangeslider-min') ?? 0);
    const max = Number(wrapper.getAttribute('fs-rangeslider-max') ?? 100);
    const step = Number(wrapper.getAttribute('fs-rangeslider-step') ?? 1);
    let value = Number(handle.getAttribute('fs-rangeslider-start') ?? min);
    track.style.position = 'relative';
    Object.assign(handle.style, { position: 'absolute', right: 'unset', top: '50%', transform: 'translate(-50%, -50%)' });
    if (fill) Object.assign(fill.style, { position: 'absolute', right: 'unset', left: '0px' });
    handle.setAttribute('role', 'slider');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-valuemin', String(min));
    handle.setAttribute('aria-valuemax', String(max));
    const render = () => {
      const x = ((value - min) / (max - min)) * track.clientWidth;
      handle.style.left = `${x}px`;
      if (fill) fill.style.width = `${x}px`;
      handle.setAttribute('aria-valuenow', String(value));
      if (display) display.textContent = String(value);
    };
    const set = (next) => {
      const snapped = Math.round((Math.min(max, Math.max(min, next)) - min) / step) * step + min;
      if (snapped !== value) { value = snapped; render(); }
    };
    const fromPointer = (e) => {
      const box = track.getBoundingClientRect();
      set(min + ((e.clientX - box.left) / box.width) * (max - min));
    };
    handle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      const move = (ev) => fromPointer(ev);
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
      handle.addEventListener('pointermove', move, { signal: ac.signal });
      handle.addEventListener('pointerup', up, { signal: ac.signal });
      handle.addEventListener('pointercancel', up, { signal: ac.signal });
    }, { signal: ac.signal });
    handle.addEventListener('keydown', (e) => {
      const delta = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step }[e.key];
      if (!delta) return;
      e.preventDefault();
      set(value + delta);
    }, { signal: ac.signal });
    const resize = new ResizeObserver(render);
    resize.observe(track);
    observers.push(resize);
    render();
  }
  return () => { ac.abort(); observers.forEach((o) => o.disconnect()); };
}

/** Cookie Consent in opt-in mode: the banner shows until a choice is made; the preferences panel holds one checkbox
 *  per category. The choice is kept in localStorage (key redline-cc) when the browser allows it. */
export function startCookieConsent() {
  const ac = new AbortController();
  const KEY = 'redline-cc';
  const banner = document.querySelector('[fs-cc="banner"]');
  const preferences = document.querySelector('[fs-cc="preferences"]');
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) ?? 'null'); } catch { return null; } };
  const save = (choice) => { try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch { /* storage blocked: the choice lasts for this page */ } };
  const checkboxes = $$('[fs-cc-checkbox]');
  let choice = read();
  const showBanner = (on) => { if (banner) { banner.style.display = on ? 'flex' : 'none'; banner.style.opacity = on ? '1' : '0'; } };
  const showPreferences = (on) => {
    if (!preferences) return;
    preferences.style.display = on ? 'flex' : 'none';
    if (on) {
      checkboxes.forEach((c) => { c.checked = !!choice?.[c.getAttribute('fs-cc-checkbox')]; });
      preferences.querySelector('[fs-cc="close"]')?.focus({ preventScroll: true });
    }
  };
  const decide = (next) => { choice = next; save(next); showBanner(false); showPreferences(false); };
  const all = (on) => Object.fromEntries(checkboxes.map((c) => [c.getAttribute('fs-cc-checkbox'), on]));
  const on = (selector, handler) => $$(selector).forEach((el) => {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    const run = (e) => { e.preventDefault(); handler(); };
    el.addEventListener('click', run, { signal: ac.signal });
    el.addEventListener('keydown', (e) => { if (isKey(e)) run(e); }, { signal: ac.signal });
  });
  on('[fs-cc="allow"]', () => decide(all(true)));
  on('[fs-cc="deny"]', () => decide(all(false)));
  on('[fs-cc="submit"]', () => decide(Object.fromEntries(checkboxes.map((c) => [c.getAttribute('fs-cc-checkbox'), c.checked]))));
  on('[fs-cc="open-preferences"]', () => { showBanner(false); showPreferences(true); });
  on('[fs-cc="close"]', () => { showPreferences(false); showBanner(!choice); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && preferences?.style.display === 'flex') { showPreferences(false); showBanner(!choice); }
  }, { signal: ac.signal });
  showBanner(!choice);
  return () => ac.abort();
}
