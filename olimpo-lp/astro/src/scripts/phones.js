/* ==================================================================
   PHONES · the app on the Home
   1 · hero: Olimpo's goal fills with the end of the video and opens the roadmap
   5 · Oracle: the plan appears as the section passes on screen
   6 · Chiron: the screen changes with the vase scene (data-scene)
   7 · Focus Mode: the focus state follows the active step of the text
   Reduced motion: everything appears at once, in the final state.
   ================================================================== */
/** Starts the four phone mocks. No dependency: plain DOM and requestAnimationFrame. */
export function initPhones() {
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1 · hero: Olimpo's goal ----------
     the card comes in and the bar fills up to the done part (1 of 3 projects), with the
     number along; it starts when DURATION is left for the video to end, so
     it ends with it. Right after, the card opens and shows the roadmap.
     Reduced motion: already full and open. */
  (function hero() {
    const card = $('[data-hero-meta]'); if (!card) return;
    const projects = $$('.hero-goal_project', card);
    const GOAL_RATIO = projects.filter(p => p.classList.contains('is-completed')).length / projects.length;
    const num = $('[data-hero-goal-num]', card), FILL_MS = 1600, DURATION = 2.1;
    const paintGoal = p => { card.style.setProperty('--hero-goal-p', (p * GOAL_RATIO).toFixed(4)); num.textContent = Math.round(p * GOAL_RATIO * 100) + '%'; };
    card.hidden = false;
    if (reduce) { card.classList.add('is-in', 'is-expanded'); paintGoal(1); return; }
    let shown = false;
    const showCard = () => {
      if (shown) return; shown = true;
      requestAnimationFrame(() => card.classList.add('is-in'));
      setTimeout(() => {
        const t0 = performance.now();
        const frame = t => {
          const k = Math.min(1, (t - t0) / FILL_MS); paintGoal(1 - Math.pow(1 - k, 3));
          if (k < 1) requestAnimationFrame(frame); else setTimeout(() => card.classList.add('is-expanded'), 250);
        };
        requestAnimationFrame(frame);
      }, 450);
    };
    const v = $('[data-hero-video]');
    if (!v || v.dataset.end) { showCard(); return; }
    const watch = () => { if (shown) return; if (v.dataset.end || (v.duration && v.duration - v.currentTime <= DURATION)) showCard(); else requestAnimationFrame(watch); };
    requestAnimationFrame(watch);
    setTimeout(showCard, 9000); /* if the video does not play, it comes in anyway */
  })();

  /* progress from 0 to 1 of an element passing on screen */
  function scrollProgress(el, startFrac, endFrac) {
    const r = el.getBoundingClientRect(), vh = innerHeight;
    const a = vh * startFrac, b = -r.height + vh * endFrac;
    return Math.min(1, Math.max(0, (a - r.top) / (a - b)));
  }
  const scrollFns = [];
  let pending = false;
  const runAll = () => { pending = false; scrollFns.forEach(f => f()); };
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(runAll); } }, { passive: true });
  addEventListener('resize', runAll);

  /* ---------- 4 · Method: the row in the middle of the screen activates the image ---------- */
  (function methodRows() {
    const rows = $$('.method_row'); if (!rows.length) return;
    scrollFns.push(() => {
      if (!document.documentElement.classList.contains('hover-ok')) return;
      const mid = innerHeight / 2; let best = null, dist = Infinity;
      rows.forEach(l => { const r = l.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < dist) { dist = d; best = l; } });
      const sec = rows[0].closest('section').getBoundingClientRect();
      const isInside = sec.top < mid && sec.bottom > mid;
      rows.forEach(l => l.classList.toggle('is-active', isInside && l === best));
    });
    runAll();
  })();

  /* ---------- 5 · Oracle: runOracle from the original landing, ported ----------
     the track progress types the request (0 to .16), then each step with
     data-show (and data-hide) appears; the feed scrolls to always show the end */
  (function oracle() {
    const rail = $('[data-oracle-section]'), m = $('[data-oracle]'); if (!rail || !m) return;
    const goal = m.dataset.goal || '', it = $('[data-itext]', m), typed = $('[data-typed]', m);
    const feed = $('[data-feed]', m), body = $('.om-body', m), bg = $('[data-oracle-bg]');
    const ph = it.textContent, steps = $$('.om-step', m);
    const run = p => {
      const n = p < .16 ? Math.round(Math.max(0, p / .16) * goal.length) : 0;
      it.textContent = n > 0 ? goal.slice(0, n) : ph; it.classList.toggle('ph', !(n > 0));
      typed.textContent = goal;
      steps.forEach(el => {
        const on = p >= +el.dataset.show, off = el.dataset.hide ? p >= +el.dataset.hide : false;
        el.classList.toggle('is-on', on && !off); el.classList.toggle('is-hidden', off);
      });
      feed.style.transform = 'translateY(' + (-Math.max(0, feed.scrollHeight - body.clientHeight)).toFixed(0) + 'px)';
    };
    if (reduce) { run(1); return; }
    scrollFns.push(() => {
      run(scrollProgress(rail, 0, 1) * 1.08);   // the plan is complete a little before the scene lets go
      if (bg) bg.style.setProperty('--p', scrollProgress(rail, 1, 0).toFixed(3));
    });
    runAll();
  })();

  /* ---------- 7 · Focus Mode: the real mockup of the landing (runFocus ported) ----------
     the track progress moves the clock and the app phases, and lights the text step */
  (function focusMode() {
    const rail = $('[data-focus-track]'), el = $('[data-focus]'); if (!rail || !el) return;
    const steps = $$('[data-step]', rail);
    const CIRC = 2 * Math.PI * 100, total = 25 * 60, pad2 = n => (n < 10 ? '0' : '') + n;
    const set = (s, v) => { const n = $(s, el); if (n) n.textContent = v; };
    function runFocus(p) {
      let cur, phase = 'FOCO', resting = false, label = 'Pausar', icon = '❚❚', task = 'Somar os gastos fixos', meta = '🏠 Entrada do apartamento · Fase 1';
      if (p < .20) cur = Math.round(total - 40 * (p / .20));
      else if (p < .55) { cur = 24 * 60 + 20; phase = '🌿 DESCANSO'; resting = true; label = 'Retomar'; icon = '▶'; task = 'Respirar, alongar'; meta = 'Pausa curta · 2 min'; }
      else if (p < .75) cur = Math.round(24 * 60 + 20 - 40 * ((p - .55) / .20));
      else cur = Math.round(23 * 60 + 40 - 40 * ((p - .75) / .25));
      set('[data-focus-time]', pad2(Math.floor(cur / 60)) + ':' + pad2(cur % 60));
      set('[data-focus-pct]', Math.round((1 - cur / total) * 100) + '%');
      const ring = $('[data-focus-ring]', el); if (ring) ring.style.strokeDashoffset = (CIRC * (cur / total)).toFixed(1);
      set('[data-focus-phase]', phase); el.classList.toggle('is-resting', resting);
      const music = $('[data-focus-music]', el); if (music) music.classList.toggle('is-show', p >= .40);
      set('[data-focus-pauseIcon]', icon); set('[data-focus-pauseLabel]', label);
      set('[data-focus-task]', task); set('[data-focus-task-meta]', meta);
    }
    const desktop = matchMedia('(min-width: 992px)');
    if (reduce) { runFocus(1); steps.forEach(p => p.classList.add('is-on')); return; }
    scrollFns.push(() => {
      const p = desktop.matches ? scrollProgress(rail, 0, 1) : scrollProgress(el, .9, .3);
      runFocus(p);
      const n = Math.min(4, 1 + Math.floor(p * 4));
      steps.forEach(x => x.classList.toggle('is-on', desktop.matches ? +x.dataset.step === n : true));
    });
    runAll();
  })();

  window.OlimpoPhones = window.OlimpoPhones || {};
}
