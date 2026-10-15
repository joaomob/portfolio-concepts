/* Behaviour of every page of Can Arbós, ported from the prototype's js/site.js. The prototype ran one IIFE with GSAP
   from a CDN; here it is a module with GSAP from npm, started once per page by initSite(), which returns a cleanup
   (every listener is tied to one AbortController, every tween to one gsap.context) so the Next.js build can call it
   from a client component's effect. The DOM changes the script makes on purpose (no-break spaces, the member state,
   the lines of SplitText) belong to the page load and are not undone. Forms are demos: nothing is sent. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { pageLang } from './lang.js';

// The texts the script writes on the page, one block per language. The Spanish Home says es on its page wrapper.
const UI = {
  en: {
    menu: 'Menu', close: 'Close', save: 'Save', saved: 'Saved', guest: 'guest', myStay: 'My stay', signIn: 'Sign in',
    contact: {
      'Stay': (n, m) => `Thank you, ${n}. This is a portfolio demo, so no one will reply. A real hotel would answer ${m} within one working day.`,
      'Celebration': (n, m) => `Thank you, ${n}. This is a portfolio demo, so no one will reply. A real events team would write to ${m} within two working days.`,
      'Experience': (n, m) => `Thank you, ${n}. This is a portfolio demo, so nothing gets booked. A real concierge would confirm your date at ${m} within the day.`,
      'Spa treatment': (n, m) => `Thank you, ${n}. This is a portfolio demo, so nothing gets booked. A real spa would confirm your time at ${m} within the day.`,
      'Rooftop table': (n, m) => `Thank you, ${n}. This is a portfolio demo, so nothing gets booked. A real hotel would confirm your table at ${m} within the day.`,
      'Press': (n, m) => `Thank you, ${n}. This is a portfolio demo, so no one will reply. A real press office would answer ${m} within one working day.`,
      'Something else': (n, m) => `Thank you, ${n}. This is a portfolio demo, so no one will reply. A real hotel would answer ${m} within one working day.`,
    },
    table: (date, time, guests, email) => `Your table is booked for ${date} at ${time}, for ${guests}. We've sent the details to ${email}.`,
  },
  es: {
    menu: 'Menú', close: 'Cerrar', save: 'Guardar', saved: 'Guardado', guest: 'huésped', myStay: 'Mi estancia', signIn: 'Entrar',
    contact: {
      'Stay': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que nadie va a responder. Un hotel de verdad respondería a ${m} en un día laborable.`,
      'Celebration': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que nadie va a responder. Un equipo de eventos de verdad escribiría a ${m} en dos días laborables.`,
      'Experience': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que no se reserva nada. Un conserje de verdad confirmaría tu fecha a ${m} ese mismo día.`,
      'Spa treatment': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que no se reserva nada. Un spa de verdad confirmaría tu hora a ${m} ese mismo día.`,
      'Rooftop table': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que no se reserva nada. Un hotel de verdad confirmaría tu mesa a ${m} ese mismo día.`,
      'Press': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que nadie va a responder. Una oficina de prensa de verdad respondería a ${m} en un día laborable.`,
      'Something else': (n, m) => `Gracias, ${n}. Esto es una demo de portfolio, así que nadie va a responder. Un hotel de verdad respondería a ${m} en un día laborable.`,
    },
    table: (date, time, guests, email) => `Tu mesa está reservada para el ${date} a las ${time}, para ${guests}. Te hemos enviado los detalles a ${email}.`,
  },
};

/** A clean path for comparing addresses: no .html, no trailing slash, the Home of a base as the base itself. */
const cleanPath = (path) => path.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';

/** Last two words of every text block joined by a no-break space when they fit, so no line ends on one word. */
function joinOrphans() {
  const measure = document.createElement('canvas').getContext('2d');
  document.querySelectorAll('main p, main li, main h1, main h2, main h3, main h4, main figcaption, footer p, dialog p').forEach((el) => {
    if (el.querySelector('p, li, ul, ol, h1, h2, h3, h4, h5, h6')) return;
    // a closed FAQ answer or a closed dialog has no width yet: the nearest box that has one stands in for it
    let width = el.clientWidth;
    for (let a = el.parentElement; !width && a; a = a.parentElement) width = a.clientWidth;
    if (!width) return;
    const texts = [];
    const walk = (n) => {
      for (const c of n.childNodes) {
        if (c.nodeType === 3) texts.push(c);
        else if (c.nodeType === 1 && !['SCRIPT', 'STYLE', 'svg', 'BR'].includes(c.nodeName)) walk(c);
      }
    };
    walk(el);
    const all = texts.map((n) => n.data).join('');
    const m = all.match(/(\S+)[ \t\n]+(\S+)\s*$/);
    if (!m) return;
    const cs = getComputedStyle(el);
    measure.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if (measure.measureText(m[1] + ' ' + m[2]).width > width * 0.9) return;
    let pos = all.length - m[0].length + m[1].length;
    for (const n of texts) {
      if (pos < n.data.length) {
        const k = n.data.slice(pos).search(/[ \t\n]/);
        if (k >= 0) n.data = n.data.slice(0, pos + k) + ' ' + n.data.slice(pos + k).replace(/^[ \t\n]+/, '');
        return;
      }
      pos -= n.data.length;
    }
  });
}

export function initSite() {
  const controller = new AbortController();
  const { signal } = controller;
  const timers = new Set();
  const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
  const cancel = (id) => { clearTimeout(id); timers.delete(id); };
  let ctx = null;
  let mm = null;
  const cleanup = () => {
    controller.abort();
    timers.forEach(clearTimeout);
    mm?.revert();
    ctx?.revert();
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = UI[pageLang()] || UI.en;

  joinOrphans();

  // Nav: it takes the theme of the section under it, so the menu changes colour with the page.
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    const THEMES = ['u-theme-light', 'u-theme-dark', 'u-theme-brand', 'u-background-2'];
    const themed = [...document.querySelectorAll('.page_main > section, .footer_wrap')];
    const setTheme = () => {
      const line = nav.getBoundingClientRect().bottom;
      const under = themed.find((el) => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
      if (!under) return;
      THEMES.forEach((t) => nav.classList.toggle(t, under.classList.contains(t)));
    };
    setTheme();
    window.addEventListener('scroll', setTheme, { passive: true, signal });
    const toggle = nav.querySelector('[data-nav-toggle]');
    const menu = document.getElementById(toggle ? toggle.getAttribute('aria-controls') : '');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? T.close : T.menu;
        menu.dataset.open = String(open);
      }, { signal });
    }

    // The page the visitor is on is marked in every menu link that points to it (links to a section are not the page).
    const here = cleanPath(location.pathname);
    nav.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href.includes('#') || /^[a-z]+:/i.test(href)) return;
      if (cleanPath(new URL(href, location.href).pathname) === here) a.setAttribute('aria-current', 'page');
    });

    // Groups: the disclosure pattern of the WAI-ARIA APG. A click or Enter opens, Esc closes and gives the focus back,
    // one group open at a time. With a mouse the item opens its panel after 0.12 s and closes 0.3 s after leaving.
    const groups = [...nav.querySelectorAll('[data-nav-group]')];
    const backdrop = nav.querySelector('[data-nav-backdrop]');
    const panelOf = (btn) => document.getElementById(btn.getAttribute('aria-controls'));
    let openTimer;
    let closeTimer;
    const current = () => groups.find((g) => g.getAttribute('aria-expanded') === 'true');
    const setGroup = (btn, open) => {
      const swap = open && !!current() && current() !== btn;
      nav.dataset.swap = String(swap);
      groups.forEach((g) => { const on = open && g === btn; g.setAttribute('aria-expanded', String(on)); panelOf(g).dataset.open = String(on); });
      if (backdrop) backdrop.dataset.open = String(open);
    };
    groups.forEach((btn) => {
      const panel = panelOf(btn);
      const item = btn.closest('[data-nav-item]') || btn;
      btn.addEventListener('click', () => { cancel(openTimer); setGroup(btn, btn.getAttribute('aria-expanded') !== 'true'); }, { signal });
      [item, panel].forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cancel(closeTimer);
          if (el === item && current() !== btn) { cancel(openTimer); openTimer = later(() => setGroup(btn, true), current() ? 0 : 120); }
        }, { signal });
        el.addEventListener('mouseleave', () => { cancel(openTimer); closeTimer = later(() => { if (current() === btn) setGroup(btn, false); }, 300); }, { signal });
      });
    });
    document.addEventListener('keydown', (e) => {
      const open = current();
      if (e.key === 'Escape' && open) { setGroup(open, false); open.focus(); }
    }, { signal });
    document.addEventListener('click', (e) => { const open = current(); if (open && !e.target.closest('[data-nav-group], [data-nav-panel]')) setGroup(open, false); }, { signal });
    // a link or button inside a panel that opens a modal closes the panel first
    nav.querySelectorAll('[data-nav-panel] [data-modal-open]').forEach((b) => b.addEventListener('click', () => { const open = current(); if (open) setGroup(open, false); }, { signal }));
    // the focus leaving a group and its panel closes it
    nav.addEventListener('focusout', (e) => {
      const open = current();
      if (open && e.relatedTarget && !open.contains(e.relatedTarget) && !panelOf(open).contains(e.relatedTarget)) setGroup(open, false);
    }, { signal });

    // Phone and tablet: each group is an accordion inside the Menu panel.
    nav.querySelectorAll('.nav_mobile_toggle').forEach((btn) => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).dataset.open = String(open);
    }, { signal }));
  }

  // FAQ: the first question of each list is open, and opening one closes the one that was open.
  document.querySelectorAll('.faq_list_wrap').forEach((list) => {
    const items = [...list.querySelectorAll('details.faq_item')];
    items.forEach((d, i) => {
      d.open = i === 0;
      d.addEventListener('toggle', () => { if (d.open) items.forEach((o) => { if (o !== d) o.open = false; }); }, { signal });
    });
  });

  // Band of the day (Rooftop & Spa): each span and hour mark takes its place from data-from, data-to and data-at.
  document.querySelectorAll('[data-from], [data-at]').forEach((el) => {
    ['from', 'to', 'at'].forEach((k) => { if (el.dataset[k] !== undefined) el.style.setProperty('--' + k, el.dataset[k] + '%'); });
  });

  // Modals: native <dialog>, opened by any [data-modal-open="<id>"].
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
      const dialog = document.getElementById(opener.dataset.modalOpen);
      if (dialog && typeof dialog.showModal === 'function') { e.preventDefault(); dialog.showModal(); }
      return;
    }
    const closer = e.target.closest('[data-modal-close]');
    if (closer) closer.closest('dialog').close();
  }, { signal });
  document.querySelectorAll('dialog.modal_dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }, { signal }));

  // "Book this room": the room modal opens with that room type chosen.
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-room-type]');
    const select = b && document.querySelector('#room-modal [name="room"]');
    if (select) { select.value = b.dataset.roomType; select.dispatchEvent(new Event('change', { bubbles: true })); }
  }, { capture: true, signal });

  // Filters: each radio group narrows the list by the data-filter-<name> of each item.
  document.querySelectorAll('[data-filter-list],[data-filter-scope]').forEach((form) => {
    // data-filter-list: the children of one list; data-filter-scope: every [data-filter-item] of the section.
    const items = () => (form.dataset.filterList
      ? [...document.getElementById(form.dataset.filterList).children]
      : [...form.closest('section').querySelectorAll('[data-filter-item]')]);
    const empty = form.closest('section').querySelector('[data-filter-empty]');
    const apply = () => {
      const want = Object.fromEntries(new FormData(form));
      let shown = 0;
      items().forEach((item) => {
        const ok = Object.entries(want).every(([k, v]) => !v || (item.dataset['filter' + k[0].toUpperCase() + k.slice(1)] || '').split('|').includes(v));
        if (form.dataset.filterMode === 'dim') item.classList.toggle('is-dim', !ok); else item.dataset.visible = String(ok);
        if (ok) shown++;
      });
      if (empty) empty.dataset.visible = String(shown === 0);
    };
    form.addEventListener('change', apply, { signal });
  });

  // Save: a demo kept in this browser only. The key is the kind and the item ("room:courtyard-room").
  const saved = (() => { try { return JSON.parse(localStorage.getItem('can-arbos-saved') || '[]'); } catch { return []; } })();
  const keyOf = (btn) => (btn.dataset.saveItem ? btn.dataset.save + ':' + btn.dataset.saveItem : btn.dataset.save);
  const paint = (btn) => {
    const on = saved.includes(keyOf(btn));
    btn.setAttribute('aria-pressed', String(on));
    const label = btn.querySelector('[data-save-label]');
    if (label) label.textContent = on ? T.saved : T.save;
  };
  document.querySelectorAll('[data-save]').forEach((btn) => {
    paint(btn);
    btn.addEventListener('click', () => {
      const i = saved.indexOf(keyOf(btn));
      if (i >= 0) saved.splice(i, 1); else saved.push(keyOf(btn));
      try { localStorage.setItem('can-arbos-saved', JSON.stringify(saved)); } catch { /* private mode: the button still toggles */ }
      paint(btn);
    }, { signal });
  });

  // Booking bar on the hero: opens the room modal with the same dates and guests.
  const bar = document.querySelector('[data-stay-bar], [data-booking-bar]');
  if (bar) bar.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.getElementById('room-modal');
    ['arrival', 'departure', 'guests'].forEach((n) => { const f = modal.querySelector(`[name="${n}"]`); if (f) { f.value = bar.elements[n].value; f.dispatchEvent(new Event('input')); } });
    modal.showModal();
  }, { signal });

  // Sliders: arrow buttons scroll the list by one card.
  document.querySelectorAll('[data-slider-prev],[data-slider-next]').forEach((btn) => btn.addEventListener('click', () => {
    const list = document.getElementById(btn.dataset.sliderPrev || btn.dataset.sliderNext);
    const card = list && list.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap || 0);
    list.scrollBy({ left: btn.dataset.sliderPrev ? -step : step, behavior: reduce ? 'auto' : 'smooth' });
  }, { signal }));

  // Contact form by type: only the fieldset of the chosen type shows; an opener can preset the type and the detail.
  const showType = (form) => {
    const sw = form.querySelector('[data-contact-switch]');
    if (!sw) return;
    form.querySelectorAll('[data-contact-type]').forEach((fs) => {
      const on = fs.dataset.contactType === sw.value;
      fs.dataset.visible = String(on);
      fs.disabled = !on;
    });
  };
  document.querySelectorAll('[data-contact-switch]').forEach((sw) => {
    const form = sw.closest('form');
    // an inline form with one fixed type (the celebrations page) presets it and hides the type question
    if (form.dataset.contactPreset) { sw.value = form.dataset.contactPreset; sw.closest('.field_wrap').dataset.visible = 'false'; }
    showType(form);
    sw.addEventListener('change', () => showType(form), { signal });
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-contact]');
    if (!b) return;
    const form = document.querySelector('#contact-modal form');
    const sw = form && form.querySelector('[data-contact-switch]');
    if (!sw) return;
    sw.value = b.dataset.contact;
    showType(form);
    const detail = form.querySelector(`[data-contact-type="${b.dataset.contact}"] [data-contact-detail]`);
    if (detail && b.dataset.contactDetail) detail.value = b.dataset.contactDetail;
  }, { capture: true, signal });

  // Demo forms: check the required fields, then show the demo message.
  const fieldOk = (f) => (f.type === 'email' ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value) : f.value.trim() !== '');
  const needed = (form) => {
    const sw = form.querySelector('[data-contact-switch]');
    return [...form.querySelectorAll('[required]')].concat(sw ? [...form.querySelectorAll(`[data-required-for="${sw.value}"]`)] : []);
  };
  const valid = (form) => needed(form).every(fieldOk);
  const messages = {
    contact: (f) => T.contact[f.elements.type.value](f.elements.name.value, f.elements.email.value),
    event: (f) => T.contact.Celebration(f.elements.name.value, f.elements.email.value),
    table: (f) => T.table(f.elements.date.dataset.display || f.elements.date.value, f.elements.time.value, f.elements.guests.value, f.elements.email.value),
  };
  document.querySelectorAll('[data-demo-form]').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = valid(form);
    const error = form.querySelector('[data-form-error], .field_error');
    const success = form.querySelector('[data-form-success]');
    if (error) error.dataset.visible = String(!ok);
    needed(form).forEach((f) => f.setAttribute('aria-invalid', String(!fieldOk(f))));
    if (!ok || !success) return;
    const make = messages[form.dataset.demoForm];
    if (make) success.textContent = make(form);
    success.dataset.visible = 'true';
  }, { signal }));

  // Members: a demo member kept in this browser only. Nothing is sent and the password is never stored; the first name
  // is all the demo keeps, to greet the member on My stay.
  const memberKey = 'can-arbos-member';
  const member = () => { try { return localStorage.getItem(memberKey); } catch { return null; } };
  const paintMember = () => {
    const name = member();
    // the members page keeps one state in the page, as gated content does: the other one leaves the DOM
    document.querySelectorAll(name ? '[data-member-out]' : '[data-member-in]').forEach((el) => el.remove());
    document.querySelectorAll('[data-member-in]').forEach((el) => { el.dataset.visible = 'true'; });
    document.querySelectorAll('[data-member-locked]').forEach((el) => { el.dataset.visible = String(!name); });
    document.querySelectorAll('[data-member-only]').forEach((el) => { el.dataset.visible = String(!!name); });
    document.querySelectorAll('[data-member-name]').forEach((el) => { el.textContent = name || T.guest; });
    // the menu says where the link goes: Sign in for a visitor, My stay for a member
    document.querySelectorAll('[data-member-nav]').forEach((el) => { el.textContent = name ? T.myStay : T.signIn; });
    const list = document.querySelector('[data-saved-list]');
    if (list) {
      const names = JSON.parse(list.dataset.names);
      const items = saved.filter((key) => names[key]);
      list.innerHTML = '';
      items.forEach((key) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'member_link_button';
        link.href = names[key][1];
        link.textContent = names[key][0];
        li.append(link);
        list.append(li);
      });
      const none = document.querySelector('[data-saved-empty]');
      if (none) none.dataset.visible = String(items.length === 0);
    }
  };
  document.querySelectorAll('[data-member-form]').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const kind = form.dataset.memberForm;
    const error = form.querySelector('[data-form-error]');
    if (kind === 'prefs') { form.querySelector('[data-form-success]').dataset.visible = 'true'; return; }
    const ok = form.checkValidity();
    if (error) error.dataset.visible = String(!ok);
    if (!ok) return;
    const name = kind === 'signup' ? form.elements.first_name.value.trim() : (member() || 'guest');
    try { localStorage.setItem(memberKey, name); } catch { /* private mode: the demo member lasts for this page only */ }
    form.reset();
    form.closest('dialog').close();
    // the members page reloads into its signed-in state; any other page goes to it, by the address the menu links to
    if (document.querySelector('[data-member-out]')) window.location.reload();
    else window.location.href = document.querySelector('[data-member-nav]')?.getAttribute('href') || window.location.href;
  }, { signal }));
  document.querySelectorAll('[data-member-signout]').forEach((b) => b.addEventListener('click', () => {
    try { localStorage.removeItem(memberKey); } catch { /* nothing kept */ }
    window.location.reload();
  }, { signal }));
  paintMember();

  // Lists that number their items ("1 / 3"): the count comes from the list.
  document.querySelectorAll('[data-count]').forEach((el) => {
    const item = el.closest('li, .w-dyn-item');
    if (!item) return;
    const items = [...item.parentElement.children];
    el.textContent = `${items.indexOf(item) + 1} / ${items.length}`;
  });

  // Experiences: the photo follows the item in focus.
  const expRows = [...document.querySelectorAll('[data-exp]')];
  const expImages = [...document.querySelectorAll('[data-exp-image]')];
  const showExp = (i) => expImages.forEach((img) => img.classList.toggle('is-active', img.dataset.expImage === String(i)));
  expRows.forEach((row) => {
    row.addEventListener('mouseenter', () => showExp(row.dataset.exp), { signal });
    row.addEventListener('focusin', () => showExp(row.dataset.exp), { signal });
  });
  if (expRows.length && !expImages.some((img) => img.classList.contains('is-active'))) showExp(expRows[0].dataset.exp);
  // on the hub, after a filter the photo goes to the first item left in the list
  const expFilter = document.querySelector('[data-filter-list="experience-list"]');
  if (expFilter) expFilter.addEventListener('change', () => { const first = expRows.find((row) => row.dataset.visible !== 'false'); if (first) showExp(first.dataset.exp); }, { signal });

  // Map: a place in focus shows its route and its label; the list and the pins drive the same state.
  const map = document.querySelector('.where_home_map');
  if (map) {
    const placeRows = [...document.querySelectorAll('[data-place]')];
    const pins = [...map.querySelectorAll('[data-pin]')];
    const routes = [...map.querySelectorAll('.map_route')];
    const focusPlace = (i) => {
      map.classList.toggle('is-focused', i !== null);
      placeRows.forEach((r) => r.classList.toggle('is-active', r.dataset.place === String(i)));
      pins.forEach((p) => p.classList.toggle('is-active', p.dataset.pin === String(i)));
      routes.forEach((r) => r.classList.toggle('is-active', r.dataset.route === String(i)));
      const route = i !== null && routes.find((r) => r.dataset.route === String(i));
      if (route && !reduce) gsap.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', overwrite: true });
    };
    placeRows.forEach((r) => ['mouseenter', 'focus', 'click'].forEach((ev) => r.addEventListener(ev, () => focusPlace(r.dataset.place), { signal })));
    pins.forEach((p) => ['mouseenter', 'click'].forEach((ev) => p.addEventListener(ev, () => focusPlace(p.dataset.pin), { signal })));
    // data-map-fixed: an experience page keeps the walk to its place in focus
    const fixed = map.dataset.mapFixed || null;
    map.closest('.where_home_layout').addEventListener('mouseleave', () => focusPlace(fixed), { signal });
    if (fixed) focusPlace(fixed);
  }

  // Motion. With reduced motion the page is simply there: every starting state below is set by the script itself.
  // The first screen waits hidden for its entrance (the head script); without motion it shows at once.
  const ready = () => document.documentElement.classList.add('is-ready');
  if (reduce) { ready(); return cleanup; }
  gsap.registerPlugin(ScrollTrigger, SplitText);
  mm = gsap.matchMedia();
  ctx = gsap.context(() => {});

  // Hero: the courtyard opens from the arch to the whole screen while the section stays pinned.
  mm.add('(min-width: 992px)', () => {
    const hero = document.querySelector('[data-hero]');
    if (hero) gsap.to(hero, { '--p': 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '+=90%', pin: true, pinSpacing: true, scrub: 0.4 } });
  });

  // Rooms: the row moves sideways while the page scrolls down.
  mm.add('(min-width: 992px)', () => {
    const wrap = document.querySelector('[data-rooms]');
    if (!wrap) return undefined;
    const track = wrap.querySelector('[data-rooms-track]');
    const fill = wrap.querySelector('[data-rooms-fill]');
    const viewport = wrap.querySelector('[data-rooms-viewport], .rooms_home_viewport');
    viewport.style.overflowX = 'hidden';
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: wrap, start: () => (wrap.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'), end: () => '+=' + distance(),
        pin: true, pinSpacing: true, scrub: 0.4, invalidateOnRefresh: true,
        onUpdate: (self) => { fill.style.transform = `translateX(${self.progress * 400}%)`; },
      },
    });
    return () => { viewport.style.overflowX = ''; tween.kill(); };
  });

  ctx.add(() => {
    // Rooftop page: the round mark crosses the band of the day, from morning to night, while the page scrolls.
    const day = document.querySelector('[data-day-band]');
    if (day) gsap.fromTo(day, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: day, start: 'top 90%', end: 'bottom 35%', scrub: 0.4 } });

    // Map: the nine routes draw themselves when the map enters the screen.
    if (map) {
      gsap.from('.map_route', { strokeDashoffset: 1, duration: 1.4, ease: 'power2.out', stagger: 0.14, scrollTrigger: { trigger: '[data-map]', start: 'top 55%' } });
      gsap.from('.map_pin', { opacity: 0, duration: 0.5, stagger: 0.14, delay: 0.9, scrollTrigger: { trigger: '[data-map]', start: 'top 55%' } });
      gsap.from(map, { rotate: 2, y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-map]', start: 'top 75%' } });
    }
  });

  // Entrances wait for the fonts, so SplitText cuts the lines the visitor will see.
  document.fonts.ready.then(() => {
    if (signal.aborted) return;
    ctx.add(entrances);
    ScrollTrigger.refresh();
    // the starting states are set: the first screen can be drawn
    ready();
  });

  return cleanup;
}

/** The entrances: one easing and one rhythm for the whole site, each type of element with a movement of its own. */
function entrances() {
  const EASE = 'power3.out';
  const enter = (trigger) => ({ trigger, start: 'top 82%', once: true });
  // aria none: SplitText would put aria-label on a <p>, which ARIA forbids; whole lines read as they are
  const lines = (el) => new SplitText(el, { type: 'lines', mask: 'lines', aria: 'none' }).lines;
  const all = (sel) => gsap.utils.toArray(sel);

  if (document.querySelector('[data-hero]')) {
    gsap.timeline({ defaults: { ease: EASE } })
      .from('[data-hero] .eyebrow_text', { opacity: 0, y: 12, duration: 0.6 })
      .from(lines('.hero_home_title'), { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.1)
      .from('.hero_home_text', { opacity: 0, y: 18, duration: 0.8 }, 0.55)
      .from('.hero_home_content .button_main_wrap', { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, 0.7)
      .from('.hero_home_image', { scale: 1.18, duration: 1.8, ease: 'power2.out' }, 0)
      .from('.stay_bar_wrap', { yPercent: 100, duration: 0.9 }, 0.6);
  }
  // Nothing already on the screen when the page opens is hidden and shown again. Titles and eyebrows wait hidden for
  // their entrance on every page (CSS, html.is-motion); every other piece on the first screen stays as it is drawn.
  const atLoad = (el) => el.getBoundingClientRect().top < window.innerHeight;
  const later = (sel) => all(sel).filter((el) => !atLoad(el));
  all('.page_main section:not([data-hero]) .u-text-style-h2, .page_main section:not([data-hero]) .u-text-style-h1').forEach((title) =>
    gsap.from(lines(title), { yPercent: 110, duration: 1, ease: EASE, stagger: 0.08, scrollTrigger: enter(title) }));
  all('.page_main section:not([data-hero]) .eyebrow_text').forEach((el) => gsap.from(el, { opacity: 0, x: -16, duration: 0.7, ease: EASE, scrollTrigger: enter(el) }));
  later('.house_home_body, .rooms_home_aside, .dining_home_text, .roof_home_content .roof_home_text, .roof_home_block, .exp_home_text, .fest_home_text, .where_home_text, .where_home_subtitle').forEach((el) =>
    gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: EASE, scrollTrigger: enter(el) }));
  // photos open from the bottom and settle
  later('.house_home_wide, .roof_home_image, .fest_home_image').forEach((img) => {
    gsap.from(img, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut', scrollTrigger: enter(img) });
    gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  later('.house_home_small, .roof_home_arch, .fest_home_small, .exp_home_media').forEach((img) => {
    gsap.from(img, { y: 70, opacity: 0, duration: 1.1, ease: EASE, scrollTrigger: enter(img) });
    gsap.to(img, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  // Aljub: the cistern opens like a lens, the small circle follows
  later('.dining_home_media').forEach((media) => {
    gsap.from(media.querySelectorAll('.dining_home_circle:not(.is-small)'), { scale: 0.82, opacity: 0, duration: 1.3, ease: EASE, scrollTrigger: enter(media) });
    gsap.from(media.querySelectorAll('.dining_home_circle:not(.is-small) img'), { scale: 1.3, duration: 1.8, ease: 'power2.out', scrollTrigger: enter(media) });
    gsap.from(media.querySelectorAll('.dining_home_circle.is-small'), { scale: 0, duration: 0.9, ease: 'back.out(1.4)', delay: 0.5, scrollTrigger: enter(media) });
  });
  // lists, row by row
  [['.exp_list_item', '.exp_list_wrap'], ['.walk_list_wrap li', '.walk_list_wrap'], ['.room_card_wrap', '.rooms_home_track'], ['.fact_line_list li', '.fact_line_list']].forEach(([rows, list]) => {
    later(list).forEach((l) => gsap.from(l.querySelectorAll(rows.split(' ').pop()), { opacity: 0, y: 22, duration: 0.7, ease: EASE, stagger: 0.07, scrollTrigger: enter(l) }));
  });
  later('.fest_home_panel').forEach((el) => gsap.from(el, { yPercent: 18, opacity: 0, duration: 1, ease: EASE, scrollTrigger: enter(el) }));

  // The same entrances on every page, by type of element. What is already on the first screen at load stays in place,
  // so nothing on screen blinks out and in again, and the footer never moves.
  const firstScreen = (el) => el.getBoundingClientRect().top < window.innerHeight;
  const moving = (el) => { for (let n = el; n && n !== document.body; n = n.parentElement) if (gsap.getTweensOf(n).length) return true; return false; };
  const free = (el) => !firstScreen(el) && !moving(el) && !el.closest('.footer_wrap, dialog, [data-map], [data-nav]');
  const CLEAR = 'opacity,transform,clipPath,filter';
  const on = (trigger) => ({ trigger, start: 'top 85%', once: true });
  // cards rise and settle from a slight tilt, one after the other
  const CARDS = '.room_card_wrap, .space_card_wrap, .member_card_wrap, .journal_list_item, .dish_feature_item';
  // rows of a list are drawn from the left, as a line is written
  const ROWS = '.room_list_item, .every_room_item, .exp_hub_item, .offer_page_item, .exp_list_item, .member_out_item, .tasting_menu_item, .team_list_item, .treatment_list_item, .fact_table_row, .dish_list_item';
  const byParent = (sel) => {
    const m = new Map();
    all(sel).filter(free).forEach((el) => { const k = el.parentElement; if (!m.has(k)) m.set(k, []); m.get(k).push(el); });
    return m;
  };
  byParent(CARDS).forEach((els, list) => gsap.from(els, { opacity: 0, y: 70, rotation: 1.5, transformOrigin: '0% 100%', duration: 1.1, ease: 'power3.out', stagger: 0.12, clearProps: CLEAR, scrollTrigger: on(list) }));
  // (from transparent, not half: text caught half faded fails the contrast measure)
  byParent(ROWS).forEach((els, list) => gsap.fromTo(els, { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power3.inOut', stagger: 0.08, clearProps: CLEAR, scrollTrigger: on(list) }));
  // questions drop in one by one
  byParent('.faq_item').forEach((els, list) => gsap.from(els, { opacity: 0, y: -16, duration: 0.6, ease: 'power2.out', stagger: 0.1, clearProps: CLEAR, scrollTrigger: on(list) }));
  // the paragraph that opens a block comes into focus under its title
  all('.page_main h1, .page_main h2').forEach((title) => {
    const next = title.nextElementSibling;
    if (next && next.tagName === 'P' && free(next)) gsap.from(next, { opacity: 0, y: 24, filter: 'blur(8px)', duration: 1, ease: EASE, delay: 0.15, clearProps: CLEAR, scrollTrigger: on(next) });
  });
  // photos by shape: a circle turns into place like a plate set on the table, an arch opens upwards like a door, a
  // rectangle is uncovered from the left
  all('.page_main img').filter(free).forEach((img) => {
    const frame = img.parentElement;
    const round = [img, frame].some((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius) >= el.getBoundingClientRect().width / 2 - 1);
    const arch = !!img.closest('.is-arch') || /arch/.test(img.className + ' ' + frame.className);
    if (round) gsap.from(img, { opacity: 0, scale: 0.6, rotation: -30, duration: 1.2, ease: 'back.out(1.4)', clearProps: CLEAR, scrollTrigger: on(img) });
    // (no zoom: a scaled photo reaches past the edge of a phone screen while it settles)
    else gsap.fromTo(img, { clipPath: arch ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', clearProps: CLEAR, scrollTrigger: on(img) });
  });
  // buttons spring up with their block, a beat after the text
  all('.page_main .button_main_wrap').filter(free).forEach((btn) => gsap.from(btn, { opacity: 0, y: 22, duration: 0.7, ease: 'back.out(2.2)', delay: 0.25, clearProps: CLEAR, scrollTrigger: on(btn) }));
}
