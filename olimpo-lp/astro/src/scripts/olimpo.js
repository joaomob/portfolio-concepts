/* =====================================================================
   OLIMPO · Home · behavior
   Applies pesquisa/JULGAMENTO-DESIGN.md. GSAP (ScrollTrigger, Flip,
   DrawSVG, ScrambleText) is imported from npm by the page entry; without it the page
   stays whole, only without the motion that depends on it.
   Guards on everything that moves: prefers-reduced-motion and pointer: coarse.
   ===================================================================== */
import { ASSETS } from '../lib/site';

/**
 * Starts every behavior of the home. GSAP and its plugins come in as arguments (imported from npm by the
 * caller, registered once), so the same code runs in the Astro entry and in the Next client component.
 */
export function initOlimpo({ gsap = null, ScrollTrigger = null, Flip = null, DrawSVGPlugin = null, ScrambleTextPlugin = null, codex = {} } = {}) {

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqCoarse = matchMedia('(pointer: coarse)');
  const mqFine = matchMedia('(pointer: fine)');
  const mqMobile = matchMedia('(max-width: 767px)');
  let reduce = mqReduce.matches;
  mqReduce.addEventListener && mqReduce.addEventListener('change', e => { reduce = e.matches; });
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const live = $('[data-live]');
  const say = msg => { if (live) { live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 30); } };

  const ST = ScrollTrigger;
  if (gsap) gsap.registerPlugin(...[ST, Flip, DrawSVGPlugin, ScrambleTextPlugin].filter(Boolean));
  const hasDraw = !!DrawSVGPlugin, hasScramble = !!ScrambleTextPlugin;

  /* ------------------------------------------------------------------
     Codex data: ARQUITETURA-INFORMACAO.md, "The 29 articles",
     the 16 archetypes and the 3 legal documents.
     ------------------------------------------------------------------ */
  const FAMILIES = {
    A: { name: 'Fundamentos', desc: 'A psicologia e a filosofia por trás do método' },
    B: { name: 'O panteão', desc: 'De onde vem cada nome do produto' },
    C: { name: 'O método', desc: 'Como o produto funciona, por dentro' },
    D: { name: 'A origem', desc: 'Quem fez o Olimpo, por quê e para onde ele vai' },
    T: { name: 'Arquétipos', desc: 'Os 16 tipos do MBTI' },
    P: { name: 'Temperamentos', desc: 'Os quatro ritmos de reação' },
    L: { name: 'Legal', desc: 'Termos, privacidade e cookies' },
    I: { name: 'Códex', desc: '' }
  };
  const ARTICLES = [
    ['A1', 'Pirâmide de Maslow', 'Maslow'], ['A2', 'Esteira hedônica', 'Esteira hedônica'], ['A3', 'Hubris', 'Hubris'], ['A4', 'Metas SMART', 'Metas SMART'],
    ['A5', 'Os quatro temperamentos', 'Temperamentos'], ['A6', 'Os 16 tipos do MBTI', 'MBTI'], ['A7', 'Propósito e telos', 'Telos'],
    ['A8', 'Motivação intrínseca e extrínseca', 'Motivação'], ['A9', 'Formação de hábito', 'Hábito'], ['A10', 'Constância contra intensidade', 'Constância'],
    ['B1', 'O Olimpo', 'O Olimpo'], ['B2', 'O Oráculo de Delfos', 'Delfos'], ['B4', 'Quíron, o mentor', 'Quíron'],
    ['B5', 'Cérbero, o guardião', 'Cérbero'], ['B6', 'O limiar', 'O limiar'], ['B7', 'A jornada do herói', 'Jornada do herói'], ['B8', 'Morfeu, o senhor dos sonhos', 'Morfeu'],
    ['C1', 'Meta, projeto, tarefa', 'Meta, projeto, tarefa'], ['C2', 'Como o Oráculo monta um plano', 'O plano do Oráculo'], ['C3', 'Como Quíron decide intervir', 'Quíron intervém'],
    ['C4', 'O Modo Foco', 'Modo Foco'], ['C7', 'Streak e recomeço sem culpa', 'Streak'],
    ['C8', 'Troféus e marcos', 'Troféus'], ['C9', 'Ranking por regularidade', 'Ranking'], ['C10', 'Como o plano se adapta ao arquétipo', 'Plano e arquétipo'],
    ['D1', 'Quem sou eu', 'Quem sou eu'], ['D2', 'Por que criei o Olimpo', 'Por que criei'], ['D3', 'A meta do Olimpo', 'A meta do Olimpo']
  ];
  const ARCHETYPES = [
    ['INTJ', 'O Arquiteto', 'Mente estratégica que transforma visões em sistemas.'],
    ['INTP', 'O Lógico', 'Mergulha fundo em ideias que a maioria nem percebe.'],
    ['ENTJ', 'O Comandante', 'Lidera com visão, força e uma clareza quase implacável.'],
    ['ENTP', 'O Inovador', 'Adora desafiar ideias e encontrar soluções inesperadas.'],
    ['INFJ', 'O Advogado', 'Insight profundo com propósito de impactar o mundo.'],
    ['INFP', 'O Mediador', 'Guiado por valores profundos e uma empatia rara.'],
    ['ENFJ', 'O Protagonista', 'Inspira, conecta e eleva as pessoas ao redor.'],
    ['ENFP', 'O Ativista', 'Enxerga potencial em tudo e em todos, inclusive em si.'],
    ['ISTJ', 'O Logístico', 'Confiável, metódico e comprometido com o que promete.'],
    ['ISFJ', 'O Defensor', 'Cuida dos outros com lealdade silenciosa e constante.'],
    ['ESTJ', 'O Executivo', 'Organiza o caos com eficiência, lógica e disciplina.'],
    ['ESFJ', 'O Provedor', 'Constrói laços duradouros com cuidado e generosidade.'],
    ['ISTP', 'O Virtuoso', 'Resolve problemas práticos com elegância e precisão.'],
    ['ISFP', 'O Aventureiro', 'Sensível, presente e com um gosto estético único.'],
    ['ESTP', 'O Empreendedor', 'Age primeiro, pensa depois, e quase sempre funciona.'],
    ['ESFP', 'O Animador', 'Vive intensamente o presente e arrasta os outros junto.']
  ];
  const LEGAL = [['L1', 'Termos de uso', 'Termos'], ['L2', 'Privacidade e cookies', 'Privacidade']];
  /* 21:9 image header of the articles (review, "The Codex reader") */
  /* 21:9 cover of each article: [image, focal point]. The focal point was chosen looking at each image, so the
     crop keeps the subject (the hero, the heads, the temple). */
  const COVERS = {
    B1: [ASSETS + 'codex/summit-dark.webp', '50% 40%'], B2: [ASSETS + 'codex/oracle-light.webp', '50% 60%'],
    B4: [ASSETS + 'codex/chiron-light.webp', '50% 70%'], B6: [ASSETS + 'codex/threshold-light.webp', '50% 55%'],
    B7: [ASSETS + 'codex/s5-call-light.webp', '50% 90%'], A2: [ASSETS + 'codex/s3-horizon-light.webp', '50% 54%'],
    A3: [ASSETS + 'codex/s4-battle-light.webp', '50% 88%'],
    A7: [ASSETS + 'img/s1-traveler-light.webp', '50% 60%'], A8: [ASSETS + 'video/glory-podium-light.webp', '50% 55%'],
    A9: [ASSETS + 'img/chiron-training-light.webp', '50% 45%'], A10: [ASSETS + 'codex/quiz-10-light.webp', '50% 60%'],
    C1: [ASSETS + 'img/ms-project-light.webp', '50% 40%'], C3: [ASSETS + 'img/chiron-plan-light.webp', '50% 12%'],
    C10: [ASSETS + 'codex/quiz-03-light.webp', '50% 50%'],
    D1: [ASSETS + 'img/ms-goal-light.webp', '50% 40%'],
    D2: [ASSETS + 'codex/quiz-02-light.webp', '50% 50%'], D3: [ASSETS + 'img/summit-light.webp', '50% 60%']
  };
  /* deity names, for the portrait captions (archetypes) and the MBTI grid */
  const DEITIES = { hades: 'Hades', athena: 'Atena', prometheus: 'Prometeu', metis: 'Métis', zeus: 'Zeus', nike: 'Nice', hermes: 'Hermes', eris: 'Éris',
    morpheus: 'Morfeu', psyche: 'Psiquê', eros: 'Eros', persephone: 'Perséfone', apollo: 'Apolo', harmonia: 'Harmonia', dionysus: 'Dioniso', iris: 'Íris',
    atlas: 'Atlas', themis: 'Têmis', asclepius: 'Asclépio', hestia: 'Héstia', poseidon: 'Poseidon', hera: 'Hera', helios: 'Hélio', demeter: 'Deméter',
    hephaestus: 'Hefesto', artemis: 'Ártemis', adonis: 'Adônis', aphrodite: 'Afrodite', ares: 'Ares', enyo: 'Ênio', pan: 'Pã', hebe: 'Hebe' };
  /* MBTI: the 16 best known of the pantheon, god and goddess alternating */
  const GRID_MBTI = ['zeus', 'hera', 'poseidon', 'athena', 'apollo', 'artemis', 'ares', 'aphrodite',
    'hermes', 'demeter', 'hades', 'persephone', 'dionysus', 'hestia', 'hephaestus', 'nike'];
  const portrait = slug => '<figure class="deity"><img src="' + ASSETS + 'deities/' + slug + '-light.webp" style="object-position: ' + ((typeof DEITY_POS !== 'undefined' && DEITY_POS[slug]) || '50%') + ' 50%" alt="" loading="lazy"><figcaption>' + DEITIES[slug] + '</figcaption></figure>';
  /* the modal image of each subject on the original landing, in two widths, with the focal point of the 21:9 crop */
  const MODALS = {
    A1: ['maslow', '50% 30%'], A4: ['modal-smart', '50% 50%'], A5: ['modal-archetypes', '50% 70%'],
    B5: ['modal-cerberus', '50% 30%'], C2: ['modal-oracle', '50% 50%'], B8: ['rest', '50% 70%'], C4: ['modal-focus', '50% 0%'],
    C7: ['modal-streak', '50% 50%'], C8: ['modal-trophies', '50% 75%'],
    C9: ['modal-ranking', '50% 55%']
  };

  const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const ENTRIES = new Map();
  ARTICLES.forEach(([code, title, short]) => ENTRIES.set(code, { code, title, short, fam: code.replace(/\d+/g, ''), slug: slugify(title) }));
  ARCHETYPES.forEach(([code, title, phrase]) => ENTRIES.set(code, { code, title, short: title, phrase, fam: 'T', slug: slugify(title) }));
  /* the four temperaments, with the app's own phrase (constants/index.js) */
  const TEMPERAMENTS = [
    ['MEL', 'Melancólico', 'Você pensa antes de sentir, sente antes de agir.'],
    ['CHO', 'Colérico', 'Você age para transformar, o movimento é sua linguagem.'],
    ['SAN', 'Sanguíneo', 'Você brilha em conexão, pessoas são seu combustível.'],
    ['PHL', 'Fleumático', 'Você sustenta, sua força está na constância silenciosa.']
  ];
  TEMPERAMENTS.forEach(([code, title, phrase]) => ENTRIES.set(code, { code, title, short: title, phrase, fam: 'P', slug: slugify(title) }));
  LEGAL.forEach(([code, title, short]) => ENTRIES.set(code, { code, title, short, fam: 'L', slug: slugify(title) }));
  ENTRIES.set('IDX', { code: 'IDX', title: 'Índice', short: 'Índice', fam: 'I', slug: 'indice' });
  const BY_SLUG = new Map(Array.from(ENTRIES.values()).map(e => [e.slug, e]));
  /* body and summary of each entry: js/codex-content.js, generated from CODEX.md (producao/codex-build.mjs) */
  const CONTENT = codex;

  /* ------------------------------------------------------------------
     PRELOADER: the logo, then the prelude alone.
     Once per session.
     ------------------------------------------------------------------ */
  const pre = $('.preloader');
  const startPage = () => document.documentElement.classList.add('is-loaded');
  (function preloader() {
    const seen = document.documentElement.classList.contains('pre-seen');
    if (!pre || reduce || seen) { if (pre) pre.classList.add('is-gone'); startPage(); return; }
    try { sessionStorage.setItem('olimpo-pre', '1'); } catch (_) {}
    requestAnimationFrame(() => requestAnimationFrame(() => pre.classList.add('is-run')));
    setTimeout(() => { pre.classList.add('is-done'); startPage(); }, 1400);
    setTimeout(() => pre.classList.add('is-gone'), 1950);
  })();

  /* ------------------------------------------------------------------
     Visibility
     ------------------------------------------------------------------ */
  const onceVisible = (els, cb, opts = { rootMargin: '0px 0px -8% 0px', threshold: 0 }) => {
    if (!('IntersectionObserver' in window)) { els.forEach(cb); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { io.unobserve(en.target); cb(en.target); }
    }), opts);
    els.forEach(el => io.observe(el));
  };
  $$('[data-reveal]').forEach(el => {
    const sibs = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [el];
    const idx = sibs.indexOf(el);
    if (idx > 0) el.style.setProperty('--d', Math.min(idx, 6) * 0.06 + 's');
  });
  onceVisible($$('[data-reveal]'), el => el.classList.add('is-in'));
  $$('[data-stagger]').forEach(g => { Array.from(g.children).forEach((c, i) => c.style.setProperty('--i', i)); });
  onceVisible($$('[data-stagger]'), el => el.classList.add('is-in'));

  /* ------------------------------------------------------------------
     NAVIGATION: numbered index, scroll-spy, background on scroll, dark card
     ------------------------------------------------------------------ */
  const nav = $('[data-nav]');
  const navLinks = $$('[data-nav-list] a');
  const SECTIONS = navLinks.map(a => ({ id: a.dataset.sec, el: document.getElementById(a.dataset.sec), a, n: $('.nav_n', a).textContent, name: $('.nav_nm span', a).textContent }));
  let secIdx = 0;
  function setSection(i) {
    secIdx = i;
    SECTIONS.forEach((s, k) => {
      s.a.classList.toggle('is-active', k === i);
      if (k === i) s.a.setAttribute('aria-current', 'true'); else s.a.removeAttribute('aria-current');
    });
    const s = SECTIONS[i];
    const lab = $('[data-sec-label]');
    if (lab && s) { lab.href = '#' + s.id; $('[data-sec-n]', lab).textContent = s.n; $('[data-sec-name]', lab).textContent = s.name; }
  }
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { const i = SECTIONS.findIndex(s => s.el === e.target); if (i >= 0) setSection(i); }
    }), { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    SECTIONS.forEach(s => s.el && spy.observe(s.el));
  }
  setSection(0);
  const goSection = d => {
    const s = SECTIONS[clamp(secIdx + d, 0, SECTIONS.length - 1)];
    if (s && s.el) s.el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  $$('[data-sec-prev]').forEach(b => b.addEventListener('click', () => goSection(-1)));
  $$('[data-sec-next]').forEach(b => b.addEventListener('click', () => goSection(1)));

  const darkCards = $$('.section-card.is-dark, .section-card.footer, .section-card.cta');
  let navRaf = 0;
  function navTick() {
    navRaf = 0;
    nav.classList.toggle('is-scrolled', scrollY > 40);
    const y = (nav.offsetHeight || 64) / 2;
    nav.classList.toggle('is-dark', darkCards.some(c => { const r = c.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
  }
  addEventListener('scroll', () => { if (!navRaf) navRaf = requestAnimationFrame(navTick); }, { passive: true });
  navTick();

  /* ------------------------------------------------------------------
     Problem marquee (queue: the only sideways motion of the page)
     ------------------------------------------------------------------ */
  function makeLoop(wrap, track, speed) {
    const orig = Array.from(track.children);
    let guard = 0;
    const base = track.scrollWidth;
    while (track.scrollWidth < wrap.clientWidth * 2 + base && guard++ < 12) {
      orig.forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });
    }
    let period = 0;
    const measure = () => { const nx = track.children[orig.length]; period = nx ? nx.offsetLeft - orig[0].offsetLeft : base; };
    measure(); addEventListener('resize', measure);
    let pos = 0, last = 0, visible = false, raf = 0;
    const step = t => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0; last = t;
      if (!reduce && visible && period > 0) { pos = (pos + speed * dt) % period; track.style.transform = `translate3d(${-pos}px,0,0)`; }
      raf = visible ? requestAnimationFrame(step) : 0;
    };
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(step); } }).observe(wrap);
  }
  addEventListener('load', () => {
    $$('[data-marquee]').forEach(w => { const t = $('[data-marquee-list]', w); if (t) makeLoop(w, t, parseFloat(w.dataset.marqueeSpeed) || 25); });
  });

  /* ------------------------------------------------------------------
     3 · the sentence that lights up word by word (scrub)
     ------------------------------------------------------------------ */
  $$('[data-text-fade]').forEach(root => {
    const words = [];
    const walk = node => {
      Array.from(node.childNodes).forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            const s = document.createElement('span'); s.className = 'fade-word'; s.textContent = p; frag.appendChild(s); words.push(s);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) {
          if (ch.classList.contains('otherfont') || ch.classList.contains('statement_image-wrap')) { ch.classList.add('fade-word'); words.push(ch); }
          else if (!ch.classList.contains('statement_break')) walk(ch);
        }
      });
    };
    walk(root);
    const img = $('.statement_image-wrap', root);
    if (img) onceVisible([img], el => el.classList.add('is-open'), { rootMargin: '0px 0px -15% 0px' });
    let cur = 0, raf = 0;
    const update = () => {
      raf = 0;
      if (reduce) { words.forEach(w => { w.style.opacity = 1; }); return; }
      const r = root.getBoundingClientRect();
      const start = innerHeight * 0.85, end = innerHeight * 0.35;
      const p = clamp((start - r.top) / (start - end + r.height * 0.6), 0, 1);
      cur += (p - cur) * 0.35;
      const n = words.length;
      words.forEach((w, i) => { w.style.opacity = (0.15 + 0.85 * clamp(cur * (n + 3) - i, 0, 1)).toFixed(3); });
      if (Math.abs(p - cur) > 0.002) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);
    update();
  });

  /* ------------------------------------------------------------------
     Meander: the band between sections slides with the scroll, as on the landing
     (mask-position-x from 0 to ±320px, alternating direction on each band)
     ------------------------------------------------------------------ */
  if (gsap && ST && !reduce) {
    $$('[data-frieze]').forEach((f, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      ST.create({ trigger: f, start: 'top bottom', end: 'bottom top', scrub: true, onUpdate: s => {
        const x = (dir * s.progress * 320).toFixed(1) + 'px';
        f.style.webkitMaskPositionX = x; f.style.maskPositionX = x;
      } });
    });
  }

  /* ------------------------------------------------------------------
     1 · OPENING: the opening video plays by itself, once
     (clouds parting over the temple). Light theme uses cap0-light,
     dark uses cap0-dark. Plays once and stops on the last frame.
     Reduced motion or a weak device: only the poster of the last frame.
     ------------------------------------------------------------------ */
  (function heroVideo() {
    const v = $('[data-hero-video]');
    if (!v) return;
    const themeName = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const c = navigator.connection;
    const lowPower = (c && c.saveData) || (navigator.deviceMemory && navigator.deviceMemory < 4) || (mqCoarse.matches && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (reduce || lowPower) {
      document.documentElement.classList.add('hero-static');
      v.removeAttribute('preload'); v.preload = 'none';
      v.poster = v.dataset['end' + (themeName === 'dark' ? 'Dark' : 'Light')];
      window.OlimpoHero = { mode: 'poster' };
      return;
    }
    v.poster = v.dataset['poster' + (themeName === 'dark' ? 'Dark' : 'Light')];
    v.src = v.dataset[themeName];
    v.muted = true;
    // plays once and stops on the last frame, with Olimpo revealed; the hero phone builds with it (js/phones.js)
    v.loop = false; v.autoplay = true;
    const play = () => { const p = v.play(); p && p.catch(() => {}); };
    if (v.readyState >= 2) play(); else v.addEventListener('loadeddata', play, { once: true });
    document.addEventListener('touchstart', play, { once: true, passive: true });
    /* pauses a moment before the end: some browsers go back to frame 0 on ended */
    /* the easing is in the video itself (interpolated frames at the end); here it only holds the last frame */
    const hold = () => {
      const remaining = (v.duration || 5) - v.currentTime;
      if (v.duration && remaining <= .06) { v.pause(); v.dataset.end = '1'; v.dispatchEvent(new Event('settled')); return; }
      requestAnimationFrame(hold);
    };
    v.addEventListener('play', () => requestAnimationFrame(hold), { once: true });
    v.addEventListener('ended', () => { v.currentTime = Math.max(0, (v.duration || 5) - .06); if (!v.dataset.end) { v.dataset.end = '1'; v.dispatchEvent(new Event('settled')); } });
    window.OlimpoHero = { mode: 'uma vez', streakState: () => ({ t: +v.currentTime.toFixed(2), d: v.duration, ended: v.ended || v.currentTime >= v.duration - .06, paused: v.paused, src: v.currentSrc }) };
  })();

  /* 4 · The method: on desktop with a mouse, the image of each level grows on hover.
     On touch and with reduced motion, it stays in the row and shows on scroll. */
  if (mqFine.matches && !mqCoarse.matches && !reduce && matchMedia('(min-width: 992px)').matches) document.documentElement.classList.add('hover-ok');  /* below 992 the hover image covered the titles */
  else onceVisible($$('.method_illustration'), el => el.closest('.method_row').classList.add('is-in'));

  /* 6 · Chiron speaks; when he is done, the image changes (crossfade .5s) */
  onceVisible($$('[data-chat]'), card => {
    const typing = $('[data-chat-typing]', card);
    const bubbles = $$('[data-chat-bubble]', card);
    const fig = $('.chat_img');
    if (reduce) { typing && typing.classList.add('is-gone'); bubbles.forEach(b => b.classList.add('is-in')); fig && fig.classList.add('is-swapped'); return; }
    setTimeout(() => {
      typing && typing.classList.add('is-gone');
      bubbles.forEach((b, i) => setTimeout(() => b.classList.add('is-in'), i * 650));
      setTimeout(() => fig && fig.classList.add('is-swapped'), bubbles.length * 650 + 450);
    }, 1300);
  }, { rootMargin: '0px 0px -25% 0px' });

  /* 7 · the Focus Mode screen */
  (function focusMode() {
    const time = $('[data-focus-time]'), ring = $('[data-focus-ring]');
    if (!time || !ring) return;
    const total = 25 * 60, C = 339.3;
    let left = total, timer = 0;
    const paint = () => { const m = Math.floor(left / 60), s = left % 60; time.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); ring.style.strokeDashoffset = (C * (1 - left / total)).toFixed(1); };
    paint();
    new IntersectionObserver(([en]) => { clearInterval(timer); if (en.isIntersecting && !reduce) timer = setInterval(() => { left = left > 0 ? left - 1 : total; paint(); }, 1000); }).observe(time);
  })();

  /* videos: play only when visible, never with reduced motion (the poster stays) */
  $$('video[data-autoplay]').forEach(v => {
    v.muted = true;
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !reduce) { if (v.preload === 'none') v.preload = 'auto'; const p = v.play(); p && p.catch(() => {}); } else v.pause();
    }, { rootMargin: '100px 0px' }).observe(v);
  });

  /* 11 · monthly / annual switch: the price counts to the other value */
  (function plans() {
    const sw = $('[data-billing-switch]');
    if (!sw) return;
    const fmt = (v, dec) => dec ? v.toFixed(2).replace('.', ',') : String(Math.round(v));
    const setBill = annual => {
      sw.setAttribute('aria-checked', String(annual));
      $$('[data-bill-label]').forEach(l => l.classList.toggle('is-on', (l.dataset.billLabel === 'annual') === annual));
      $$('[data-price]').forEach(el => {
        const to = parseFloat(annual ? el.dataset.annual : el.dataset.monthly), dec = !Number.isInteger(to);
        const periodEl = el.parentElement.querySelector('[data-period]');
        if (periodEl) periodEl.textContent = annual ? 'por ano' : 'por mês';
        const from = parseFloat(el.textContent.replace(',', '.')) || to;
        if (!gsap || reduce) { el.textContent = fmt(to, dec); return; }
        const o = { v: from };
        gsap.to(o, { v: to, duration: .5, ease: 'power2.out', snap: { v: dec ? .01 : 1 }, onUpdate: () => { el.textContent = fmt(o.v, dec); }, onComplete: () => { el.textContent = fmt(to, dec); } });
      });
    };
    sw.addEventListener('click', () => setBill(sw.getAttribute('aria-checked') !== 'true'));
    $$('[data-bill-label]').forEach(l => l.addEventListener('click', () => setBill(l.dataset.billLabel === 'annual')));
  })();

  /* 12 · the summit image goes from 1.06 to 1 on entry */
  (function closing() {
    const bg = $('[data-cta-bg]');
    if (!bg || !gsap || !ST || reduce) return;
    gsap.fromTo(bg, { scale: 1.06 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'top 25%', scrub: true } });
  })();

  /* ------------------------------------------------------------------
     8 · Personalization: each type is a panel with its deity.
     The images load when the section gets close; god and goddess
     take turns in the background, in a loop.
     ------------------------------------------------------------------ */
  const DEITY_POS = { adonis: '35%', ares: '34%', artemis: '48%', enyo: '60%', hestia: '47%', iris: '46%', morpheus: '42%', prometheus: '65%' };
  const TEMPERAMENT_OF = t => /S.J$/.test(t) ? 'mel' : /S.P$/.test(t) ? 'san' : /NF/.test(t) ? 'cho' : 'phl';
  const typeCards = $$('.brands_card');
  typeCards.forEach(card => {
    card.style.setProperty('--tint', 'var(--' + TEMPERAMENT_OF(card.dataset.codex) + ')');
    const layer = document.createElement('span');
    layer.className = 'brands_deities'; layer.setAttribute('aria-hidden', 'true');
    card.prepend(layer);
  });
  onceVisible($$('[data-hscroll]'), () => typeCards.forEach(card => {
    const layer = $('.brands_deities', card);
    let n = 0;
    [card.dataset.god, card.dataset.goddess].forEach(slug => {
      const img = new Image();
      img.alt = ''; img.decoding = 'async';
      img.style.objectPosition = (DEITY_POS[slug] || '50%') + ' 50%';
      img.onload = img.onerror = () => { if (++n === 2) layer.classList.add('is-ready'); };
      img.src = ASSETS + 'deities/' + slug + '-dark.webp';
      layer.appendChild(img);
    });
  }), { rootMargin: '100% 0px 100% 0px' });
  /* god and goddess take turns by themselves, in a loop: each panel changes every
     3.2 s, out of step (0.8 s between neighbors), so they never
     all change together. Only with the section on screen; reduced motion: the god stays. */
  (function rotateDeities() {
    const section = $('[data-hscroll]');
    if (!section || reduce) return;
    let onScreen = false;
    new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; }).observe(section);
    typeCards.forEach((card, i) => {
      setTimeout(() => setInterval(() => { if (onScreen) card.classList.toggle('is-b'); }, 3200), (i % 4) * 800);
    });
  })();

  /* ------------------------------------------------------------------
     8 · horizontal band: the track gets the height of the sideways path,
     the stage stays pinned (sticky) and the vertical scroll becomes a shift.
     Reduced motion: the native sideways scroll stays, with snapping.
     Keyboard focus brings the band to the focused panel.
     ------------------------------------------------------------------ */
  $$('[data-hscroll]').forEach(rail => {
    const track = $('[data-hscroll-track]', rail);
    const vp = track && track.parentElement;
    if (!track || reduce) return;
    rail.classList.add('is-hscroll');
    let dist = 0, raf = 0;
    const measureAll = () => {
      dist = Math.max(0, track.scrollWidth - vp.clientWidth);
      rail.style.height = `calc(100vh + ${dist}px)`;
      move();
    };
    const move = () => {
      raf = 0;
      const top = rail.getBoundingClientRect().top;
      const x = clamp(-top, 0, dist);
      track.style.transform = `translate3d(${-x}px,0,0)`;
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(move); }, { passive: true });
    addEventListener('resize', measureAll);
    addEventListener('load', measureAll);
    measureAll();
    track.addEventListener('focusin', e => {
      const li = e.target.closest('li');
      if (!li) return;
      const targetPos = clamp(li.offsetLeft - (vp.clientWidth - li.offsetWidth) / 2, 0, dist);
      scrollTo({ top: rail.getBoundingClientRect().top + scrollY + targetPos, behavior: 'instant' });
    });
  });

  /* ------------------------------------------------------------------
     THE THREE DEPTHS · 1 term → 2 summary in the paragraph → 3 tab
     ------------------------------------------------------------------ */
  function famLine(e) { const f = FAMILIES[e.fam]; return f ? f.name : ''; }
  function closeSummary(res, focusTerm) {
    if (!res) return;
    const term = res._term;
    res.classList.remove('is-open');
    if (term) term.setAttribute('aria-expanded', 'false');
    const card = res.closest('.why-card');
    const done = () => { res.remove(); if (card && !$('.summary', card)) card.classList.remove('has-summary'); };
    reduce ? done() : setTimeout(done, 520);
    if (focusTerm && term) term.focus();
  }
  function openSummary(term) {
    const code = term.dataset.term, e = ENTRIES.get(code);
    if (!e) return;
    const host = term.closest('p') || term.parentElement;
    const next = host.nextElementSibling;
    if (next && next.classList.contains('summary')) { if (next._term === term) { closeSummary(next, false); return; } closeSummary(next, false); }
    const id = 'summary-' + code + '-' + Math.random().toString(36).slice(2, 7);
    const res = document.createElement('div');
    res.className = 'summary'; res.id = id;
    res.setAttribute('role', 'region'); res.setAttribute('aria-label', 'Resumo: ' + e.title);
    res.innerHTML = '<div class="summary_clip"><div class="summary_in">' +
      '<p class="summary_meta">' + famLine(e) + '</p><p class="summary_title">' + e.title + '</p>' +
      '<p class="summary_text">' + (CONTENT[code] ? CONTENT[code].summary : '') + '</p>' +
      '<button class="summary_more" type="button" data-codex="' + code + '">Ler mais no Códex</button>' +
      '<button class="summary_close" type="button" aria-label="Fechar o resumo">×</button></div></div>';
    res._term = term;
    host.after(res);
    const card = host.closest('.why-card'); if (card) card.classList.add('has-summary');
    term.setAttribute('aria-expanded', 'true'); term.setAttribute('aria-controls', id);
    $('.summary_close', res).addEventListener('click', () => closeSummary(res, true));
    requestAnimationFrame(() => requestAnimationFrame(() => res.classList.add('is-open')));
  }
  $$('.term[data-term]').forEach(t => t.setAttribute('aria-expanded', 'false'));
  document.addEventListener('click', ev => { const t = ev.target.closest('.term[data-term]'); if (t) { ev.preventDefault(); openSummary(t); } });

  /* ==================================================================
     THE CODEX · the reader and the dock (review 2.2)
     Two states: open and minimized (in the dock). There is no "closed":
     the × closes a tab. The dock is always visible; with zero tabs it shows
     only "Códex". The tab strip lives in the dock in both states.
     ================================================================== */
  const root = $('[data-codex-root]');
  const panel = $('[data-codex-panel]');
  const backdrop = $('[data-codex-backdrop]');
  const dock = $('[data-dock]');
  const tabsEl = $('[data-codex-tabs]');
  const panesEl = $('[data-codex-panes]');
  const indexEl = $('[data-codex-index]');
  const dockHome = $('[data-dock-home]');
  const dockCount = $('[data-dock-count]');
  const dockMore = $('[data-dock-more]');
  const dockMin = $('[data-codex-min]');
  const navCount = $('[data-nav-count]');
  const inertTargets = [nav, $('main'), $('footer'), $('.skip')];
  const MAX_CHIPS = 4;

  const tabs = [];
  let active = null, isOpen = false, opener = null, anim = null;

  const scrollZones = new Set();
  function preventScroll(e) { for (const z of scrollZones) if (z.contains(e.target)) return; e.preventDefault(); }
  function lockScroll(...zones) {
    zones.forEach(z => scrollZones.add(z));
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
  }
  function unlockScroll() {
    scrollZones.clear();
    document.documentElement.style.overflow = '';
    document.removeEventListener('touchmove', preventScroll);
    document.removeEventListener('wheel', preventScroll);
  }
  /* one icon per Codex entry (Lucide, ISC). In Webflow it becomes the "icon" field of the CMS */
  const CODEX_ICO = {"MEL":"<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>",
    "CHO":"<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/>",
    "SAN":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/>",
    "PHL":"<path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\"/><path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"/>",
    "A1":"<path d=\"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z\"/><path d=\"M12 2v20\"/>",
    "A2":"<path d=\"m17 2 4 4-4 4\"/><path d=\"M3 11v-1a4 4 0 0 1 4-4h14\"/><path d=\"m7 22-4-4 4-4\"/><path d=\"M21 13v1a4 4 0 0 1-4 4H3\"/>",
    "A3":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>",
    "A4":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>",
    "A5":"<path d=\"M12 3v18\"/><path d=\"M3 12h18\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/>",
    "A6":"<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/>",
    "A7":"<path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/>",
    "A8":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/>",
    "A9":"<path d=\"M18 6 7 17l-5-5\"/><path d=\"m22 10-7.5 7.5L13 16\"/>",
    "A10":"<path d=\"m12 14 4-4\"/><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"/>",
    "B1":"<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\"/><line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\"/><line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\"/><line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\"/><line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\"/><polygon points=\"12 2 20 7 4 7\"/>",
    "B2":"<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
    "B4":"<path d=\"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14\"/><path d=\"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9\"/><path d=\"m2 13 6 6\"/>",
    "B5":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/>",
    "B6":"<path d=\"M13 4h3a2 2 0 0 1 2 2v14\"/><path d=\"M2 20h3\"/><path d=\"M13 20h9\"/><path d=\"M10 12v.01\"/><path d=\"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z\"/>",
    "B7":"<circle cx=\"6\" cy=\"19\" r=\"3\"/><path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\"/><circle cx=\"18\" cy=\"5\" r=\"3\"/>",
    "B8":"<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/>",
    "C1":"<path d=\"M21 12h-8\"/><path d=\"M21 6H8\"/><path d=\"M21 18h-8\"/><path d=\"M3 6v4c0 1.1.9 2 2 2h3\"/><path d=\"M3 10v6c0 1.1.9 2 2 2h3\"/>",
    "C2":"<path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\"/><path d=\"M15 5.764v15\"/><path d=\"M9 3.236v15\"/>",
    "C3":"<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/>",
    "C4":"<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M3 7V5a2 2 0 0 1 2-2h2\"/><path d=\"M17 3h2a2 2 0 0 1 2 2v2\"/><path d=\"M21 17v2a2 2 0 0 1-2 2h-2\"/><path d=\"M7 21H5a2 2 0 0 1-2-2v-2\"/>",
    "C7":"<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/>",
    "C8":"<path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/>",
    "C9":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>",
    "C10":"<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\"/><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\"/><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\"/><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\"/><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\"/><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\"/><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\"/><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\"/><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\"/>",
    "D2":"<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/>",
    "D3":"<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"/><line x1=\"4\" x2=\"4\" y1=\"22\" y2=\"15\"/>",
    "D1":"<path d=\"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z\"/><path d=\"M16 8 2 22\"/><path d=\"M17.5 15H9\"/>"};
  /* one icon per Codex family (Lucide, ISC), for the index cards */
  const FAM_ICO = {
    A: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    B: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    C: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    D: '<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>',
    P: '<path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
    T: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    L: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    IDX: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>'
  };
  const FAM_UNIT = { P: ['temperamento', 'temperamentos'], A: ['artigo', 'artigos'], B: ['artigo', 'artigos'], C: ['artigo', 'artigos'], D: ['artigo', 'artigos'], T: ['arquétipo', 'arquétipos'], L: ['documento', 'documentos'] };
  const svgIco = (paths, cls) => '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true">' + paths + '</svg>';
  const ico = (c, cls) => CODEX_ICO[c] ? '<svg class="' + (cls || 'codex-door_icon') + '" viewBox="0 0 24 24" aria-hidden="true">' + CODEX_ICO[c] + '</svg>' : '';
  const plural = n => n + (n === 1 ? ' aba' : ' abas');

  indexEl.innerHTML = '<button class="codex_link codex_link-idx" type="button" data-codex="IDX"><span class="codex_link-code">' + svgIco(FAM_ICO.IDX, 'codex_ico') + '</span><span>Índice</span></button>' +
    ['A', 'B', 'C', 'D', 'T', 'P', 'L'].map(g => {
    const items = Array.from(ENTRIES.values()).filter(e => e.fam === g);
    return '<div class="codex_fam"><p class="codex_fam-title">' + FAMILIES[g].name + '</p><div class="codex_fam-list">' +
      items.map(e => '<button class="codex_link" type="button" data-codex="' + e.code + '"><span class="codex_link-code">' + (ico(e.code, 'codex_ico') || (e.fam === 'T' ? e.code : '')) + '</span><span>' + e.title + '</span></button>').join('') + '</div></div>';
  }).join('');

  const doors = list => '<div class="learn-more">' + list.map(c => { const e = ENTRIES.get(c); return e ? '<button class="codex-door" type="button" data-codex="' + c + '">' + ico(c) + e.title + '</button>' : ''; }).join('') + '</div>';

  function articleHTML(e) {
    const f = FAMILIES[e.fam];
    if (e.code === 'IDX') {
      return '<article class="article"><div class="article_meta"><span class="small-dot"></span><span>Códex · índice</span></div>' +
        '<h1 class="article_title" tabindex="-1">Índice</h1>' +
        '<p class="article_index-intro">Tudo o que está no Códex: fundamentos, panteão, método, origem, arquétipos e documentos legais. Cada item abre como aba neste mesmo leitor.</p>' +
        '<div class="index-grid">' + ['A', 'B', 'C', 'D', 'T', 'P', 'L'].map(g => {
          const items = Array.from(ENTRIES.values()).filter(x => x.fam === g).map(x => x.code);
          const u = FAM_UNIT[g], n = items.length;
          /* accordion: closed shows only the group; open, the links (details/summary, keyboard accessible) */
          return '<details class="fam_card"><summary class="fam_head"><span class="fam_ico">' + svgIco(FAM_ICO[g], 'fam_svg') + '</span>' +
            '<span class="fam_txt"><span class="fam_name">' + FAMILIES[g].name + '</span><span class="fam_desc">' + FAMILIES[g].desc + '</span></span>' +
            '<span class="fam_count">' + n + ' ' + (n === 1 ? u[0] : u[1]) + '</span><span class="fam_chev" aria-hidden="true"></span></summary>' + doors(items) + '</details>';
        }).join('') + '</div></article>';
    }
    let head = '<div class="article_meta"><span class="small-dot"></span><span>' + f.name + '</span>' + (f.desc ? '<span>' + f.desc + '</span>' : '') + '</div>';
    let title = '<h1 class="article_title" tabindex="-1">' + e.title + '</h1>';
    let extra = '', related = '';
    /* temperament covers: the statue of each one, cut from the modal image and upscaled by AI (Pixelcut, 2x) */
    const TEMPERAMENT_SLUG = { MEL: 'melancholic', PHL: 'phlegmatic', CHO: 'choleric', SAN: 'sanguine' };
    const md = MODALS[e.code], cv = COVERS[e.code];
    const card = e.fam === 'T' ? document.querySelector('.brands_card[data-codex="' + e.code + '"]') : null;
    const src = md ? ASSETS + 'codex/modals/' + md[0] + '-light' : '';
    const cover = md ? '<figure class="media article_cover"><img src="' + src + '-d.webp" srcset="' + src + '-m.webp 728w, ' + src + '-d.webp 1456w" sizes="(max-width: 767px) 100vw, 720px" style="object-position: ' + md[1] + '" alt="" loading="lazy"></figure>'
      : cv ? '<figure class="media article_cover"><img src="' + cv[0] + '" style="object-position: ' + cv[1] + '" alt="" loading="lazy"></figure>'
      : TEMPERAMENT_SLUG[e.code] ? '<figure class="media article_cover"><img src="' + ASSETS + 'codex/temperaments/statue-' + TEMPERAMENT_SLUG[e.code] + '.webp" alt="" loading="lazy"></figure>'
      : e.code === 'A6' ? '<div class="article_cover deities_grid" aria-hidden="true">' + GRID_MBTI.map(portrait).join('') + '</div>'
      : card ? '<div class="deities_duo" aria-hidden="true">' + portrait(card.dataset.god) + portrait(card.dataset.goddess) + '</div>' : '';
    if (e.fam === 'P') {
      head = '<div class="article_meta"><span class="small-dot"></span><span>Temperamento</span></div>';
      extra = '<p class="article_phrase">' + e.phrase + '</p>';
    }
    if (e.fam === 'T') {
      head = '<div class="article_meta"><span class="small-dot"></span><span>Arquétipo</span></div>';
      title = '<p class="article_type">' + e.code + '</p><h1 class="article_title" tabindex="-1">' + e.title + '</h1>';
      extra = '<p class="article_phrase">' + e.phrase + '</p>';
      related = '<div class="article_related"><h3>Ligados a este perfil</h3>' + doors(['A6', 'A5', 'C10']) + '</div>' +
        '<div class="article_related"><h3>Os outros arquétipos</h3>' + doors(ARCHETYPES.map(a => a[0]).filter(c => c !== e.code)) + '</div>';
    } else if (e.fam === 'L') {
      related = '<div class="article_related"><h3>Documentos legais</h3>' + doors(LEGAL.map(l => l[0]).filter(c => c !== e.code)) + '</div>';
    } else {
      const same = Array.from(ENTRIES.values()).filter(x => x.fam === e.fam && x.code !== e.code).map(x => x.code);
      if (same.length) related = '<div class="article_related"><h3>Relacionados · abrem em aba nova</h3>' + doors(same) + '</div>';
    }
    const body = CONTENT[e.code] ? '<div class="article_body">' + CONTENT[e.code].bodyHtml + '</div>' : '';
    return '<article class="article">' + cover + head + title + extra + body + related + '</article>';
  }

  function layoutChips() {
    // minimized on desktop: up to 4 chips (the most recent) and then "+N"
    const limit = !isOpen && !mqMobile.matches;
    const hidden = limit ? Math.max(0, tabs.length - MAX_CHIPS) : 0;
    tabs.forEach((t, i) => t.tab.classList.toggle('is-overflow', i < hidden));
    dockMore.hidden = !hidden;
    dockMore.textContent = '+' + hidden;
    dockMore.setAttribute('aria-label', 'Mais ' + plural(hidden) + ' no Códex');
  }
  function updateCounts() {
    const n = tabs.length;
    navCount.hidden = !n; navCount.textContent = n;
    dockCount.hidden = !n; dockCount.textContent = n;
    dockHome.setAttribute('aria-label', n ? 'Abrir o Códex no índice, ' + plural(n) + ' abertas' : 'Abrir o Códex no índice');
    $$('.brands_card').forEach(c => c.classList.toggle('is-open-tab', tabs.some(t => t.code === c.dataset.codex)));
    $$('main .codex-door[data-codex]').forEach(p => p.classList.toggle('is-open', tabs.some(t => t.code === p.dataset.codex)));
    $$('.codex_link', indexEl).forEach(l => l.classList.toggle('is-current', l.dataset.codex === active));
    layoutChips();
  }
  const isTabOpen = code => tabs.some(t => t.code === code);

  function setHash(e, replace) {
    const want = '#codex/' + e.slug;
    if (location.hash === want) return;
    try { history[replace ? 'replaceState' : 'pushState']({ codex: e.code }, '', want); } catch (_) { location.hash = want; }
  }
  function clearHash() { if (!location.hash) return; try { history.replaceState(null, '', location.pathname + location.search); } catch (_) {} }

  function createTab(code) {
    const e = ENTRIES.get(code);
    const tab = document.createElement('div');
    tab.className = 'codex_tab';
    tab.dataset.code = code;
    tab.innerHTML = '<button class="codex_tab-btn" type="button" role="tab" id="tab-' + code + '" aria-controls="pane-' + code + '" aria-selected="false" title="' + e.title.replace(/"/g, '') + '">' +
      '<span class="codex_tab-code">' + (code === 'IDX' ? svgIco(FAM_ICO.IDX, 'codex_ico') : (ico(code, 'codex_ico') || (e.fam === 'T' ? code : ''))) + '</span><span class="codex_tab-title">' + e.short + '</span></button>' +
      '<button class="codex_tab-x" type="button" aria-label="Fechar a aba ' + e.title.replace(/"/g, '') + '">×</button>';
    const pane = document.createElement('div');
    pane.className = 'codex_pane'; pane.id = 'pane-' + code;
    pane.setAttribute('role', 'tabpanel'); pane.setAttribute('aria-labelledby', 'tab-' + code);
    pane.hidden = true;
    pane.innerHTML = articleHTML(e);
    $('.codex_tab-btn', tab).addEventListener('click', () => { if (!isOpen) show(tab); activate(code, { focus: isOpen }); });
    $('.codex_tab-x', tab).addEventListener('click', ev => { ev.stopPropagation(); closeTab(code); });
    tabsEl.appendChild(tab);
    panesEl.appendChild(pane);
    const rec = { code, tab, pane, scroll: 0 };
    tabs.push(rec);
    return rec;
  }

  function activate(code, opts = {}) {
    const rec = tabs.find(t => t.code === code);
    if (!rec) return;
    const prev = tabs.find(t => t.code === active);
    if (prev && prev !== rec) { prev.scroll = prev.pane.scrollTop; prev.pane.hidden = true; prev.tab.classList.remove('is-active'); $('.codex_tab-btn', prev.tab).setAttribute('aria-selected', 'false'); }
    active = code;
    rec.pane.hidden = false;
    rec.pane.scrollTop = rec.scroll;
    rec.tab.classList.add('is-active');
    $('.codex_tab-btn', rec.tab).setAttribute('aria-selected', 'true');
    const strip = tabsEl, tr = rec.tab.getBoundingClientRect(), sr = strip.getBoundingClientRect();
    if (tr.left < sr.left || tr.right > sr.right) strip.scrollLeft += (tr.left - sr.left) - 8;
    if (isOpen && !opts.noHash) setHash(ENTRIES.get(code), opts.replace);
    if (opts.focus) { const h = $('.article_title', rec.pane); h && h.focus({ preventScroll: true }); }
    updateCounts();
  }

  /* the chip is born at the click point and flies to the dock (Flip, .5s, power2.inOut),
     while the reader rises. With reduced motion, it appears right away. */
  function fly(rec, pt) {
    if (reduce || !gsap || !pt) return;
    const chip = rec.tab;
    const w = chip.offsetWidth, h = chip.offsetHeight;
    if (!w) return;
    if (Flip) {
      const end = Flip.getState(chip);
      chip.classList.add('is-flying');
      chip.style.left = (pt.x - w / 2) + 'px'; chip.style.top = (pt.y - h / 2) + 'px'; chip.style.width = w + 'px';
      const start = Flip.getState(chip);
      chip.classList.remove('is-flying'); chip.style.left = chip.style.top = chip.style.width = '';
      Flip.from(start, { duration: window.OlimpoFlyDur || .5, ease: 'power2.inOut', absolute: true, zIndex: 2300, scale: false });
      void end;
    } else {
      const r = chip.getBoundingClientRect();
      gsap.from(chip, { x: pt.x - (r.left + w / 2), y: pt.y - (r.top + h / 2), duration: .5, ease: 'power2.inOut' });
    }
  }

  /* link to a part of the article ([[C4#pomodoro-adaptativo]]): finds the subheading (or the clause
     in bold, in the legal documents) by its text, scrolls the reader to it and focuses it */
  function scrollToSection(rec, section) {
    const targetPos = $$('.article_body h2, .article_body h3, .article_body strong', rec.pane).find(h => slugify(h.textContent) === section);
    if (!targetPos) return;
    const pane = rec.pane;
    pane.scrollTop += targetPos.getBoundingClientRect().top - pane.getBoundingClientRect().top - 24;
    targetPos.setAttribute('tabindex', '-1');
    targetPos.focus({ preventScroll: true });
  }

  function openTab(code, from, opts = {}) {
    const e = ENTRIES.get(code);
    if (!e) return;
    let rec = tabs.find(t => t.code === code);
    const isNew = !rec;
    if (isNew) rec = createTab(code);
    const wasOpen = isOpen;
    if (!isOpen) show(from, true);
    activate(code, { replace: opts.replace, noHash: opts.noHash, focus: true });
    if (!wasOpen && !opts.noHash) setHash(e, opts.replace);
    if (isNew) { tabsEl.scrollLeft = tabsEl.scrollWidth; fly(rec, opts.pt); }
    if (opts.section) scrollToSection(rec, opts.section);
    say(isNew ? 'Aba aberta: ' + e.title + '. ' + plural(tabs.length) + ' no Códex.' : 'Aba já aberta, em foco: ' + e.title + '.');
  }

  function show(from, skipActivate) {
    if (!isOpen) opener = from || document.activeElement;
    isOpen = true;
    anim && anim.kill();
    panel.hidden = false; backdrop.hidden = false;
    dock.classList.add('is-open'); dockMin.hidden = false;
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'codex-title');
    inertTargets.forEach(el => el && (el.inert = true));
    lockScroll(panel, tabsEl);
    const a = tabs.find(t => t.code === active);
    if (a) a.pane.scrollTop = a.scroll;
    if (gsap && !reduce) {
      anim = gsap.timeline()
        .fromTo(panel, { clipPath: 'inset(100% 0% 0% 0% round 20px)', y: 24 }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', y: 0, duration: .5, ease: 'power2.inOut' }, 0)
        .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.inOut' }, 0);
    } else { panel.style.clipPath = ''; backdrop.style.opacity = 1; }
    updateCounts();
    if (!skipActivate && a) { setHash(ENTRIES.get(a.code)); const h = $('.article_title', a.pane); h && h.focus({ preventScroll: true }); }
  }

  function hide() {
    if (!isOpen) return;
    const a = tabs.find(t => t.code === active);
    if (a) a.scroll = a.pane.scrollTop;
    isOpen = false;
    root.removeAttribute('role'); root.removeAttribute('aria-modal'); root.removeAttribute('aria-labelledby');
    unlockScroll();
    inertTargets.forEach(el => el && (el.inert = false));
    clearHash();
    dock.classList.remove('is-open'); dockMin.hidden = true;
    const done = () => { panel.hidden = true; backdrop.hidden = true; };
    anim && anim.kill();
    // the reader goes back down into the dock
    if (gsap && !reduce) {
      anim = gsap.timeline({ onComplete: done })
        .to(panel, { clipPath: 'inset(100% 0% 0% 0% round 20px)', y: 24, duration: .5, ease: 'power2.inOut' }, 0)
        .to(backdrop, { opacity: 0, duration: .5, ease: 'power2.inOut' }, 0);
    } else done();
    updateCounts();
    const back = opener && document.contains(opener) && !opener.closest('[data-codex-panel]') ? opener : dockHome;
    back && back.focus({ preventScroll: true });
    opener = null;
  }
  function minimize() { hide(); say('Códex minimizado, ' + plural(tabs.length) + ' guardadas no dock.'); }

  function closeTab(code) {
    const i = tabs.findIndex(t => t.code === code);
    if (i < 0) return;
    const rec = tabs[i];
    rec.tab.remove(); rec.pane.remove();
    tabs.splice(i, 1);
    const title = ENTRIES.get(code).title;
    if (!tabs.length) {
      active = null;
      hide();
      updateCounts();
      say('Última aba fechada: ' + title + '. O dock volta a mostrar só o Códex.');
      return;
    }
    if (active === code) {
      active = null;
      const next = tabs[Math.min(i, tabs.length - 1)];
      if (isOpen) { activate(next.code, { replace: true }); const b = $('.codex_tab-btn', next.tab); b && b.focus(); }
      else activate(next.code, { noHash: true });
    }
    updateCounts();
    say('Aba fechada: ' + title + '. ' + plural(tabs.length) + ' no Códex.');
  }

  // any [data-codex] opens (or focuses) its tab
  document.addEventListener('click', ev => {
    const t = ev.target.closest('[data-codex]');
    if (!t) return;
    ev.preventDefault();
    let pt = null;
    if (ev.clientX || ev.clientY) pt = { x: ev.clientX, y: ev.clientY };
    else { const r = t.getBoundingClientRect(); pt = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
    openTab(t.dataset.codex, t, { pt, section: t.dataset.section });
  });
  dockHome.addEventListener('click', ev => {
    const r = dockHome.getBoundingClientRect();
    openTab('IDX', dockHome, { pt: { x: ev.clientX || r.left + r.width / 2, y: ev.clientY || r.top } });
  });
  dockMore.addEventListener('click', () => show(dockMore));
  dockMin.addEventListener('click', minimize);
  backdrop.addEventListener('click', minimize);
  mqMobile.addEventListener && mqMobile.addEventListener('change', layoutChips);

  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') {
      if (isOpen) { ev.preventDefault(); minimize(); return; }
      const open = $('.summary.is-open'); if (open) closeSummary(open, true);
      return;
    }
    if (!isOpen) return;
    if (ev.key === 'Tab') {
      const f = [panel, dock].flatMap(z => $$('button, a[href], [tabindex]:not([tabindex="-1"])', z)).filter(el => !el.closest('[hidden]') && el.offsetParent !== null && !el.hidden);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1], inside = f.includes(document.activeElement);
      if (ev.shiftKey && (document.activeElement === first || !inside)) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && (document.activeElement === last || !inside)) { ev.preventDefault(); first.focus(); }
    }
    if ((ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') && ev.target.matches('.codex_tab-btn')) {
      const i = tabs.findIndex(t => t.code === active);
      const n = tabs[(i + (ev.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      activate(n.code); $('.codex_tab-btn', n.tab).focus();
    }
  });

  function fromHash() {
    const m = location.hash.match(/^#codex\/([a-z0-9-]+)$/);
    if (m) { const e = BY_SLUG.get(m[1]); if (e) { openTab(e.code, null, { replace: true }); return; } }
    if (isOpen && !m) hide();
  }
  addEventListener('popstate', fromHash);
  if (/^#codex\//.test(location.hash)) setTimeout(fromHash, reduce ? 0 : 300);
  updateCounts();

  window.OlimpoCodex = {
    open: code => openTab(code, null), close: closeTab, minimize,
    state: () => ({ open: isOpen, active, tabs: tabs.map(t => t.code), hash: location.hash, dockVisible: getComputedStyle(dock).display !== 'none', chipsVisible: tabs.filter(t => !t.tab.classList.contains('is-overflow')).length, more: dockMore.hidden ? 0 : parseInt(dockMore.textContent.slice(1), 10) })
  };

  /* ------------------------------------------------------------------
     CURSOR (2.3): brackets that open over the target and say which
     depth the click opens. Only with pointer: fine and no reduced motion.
     ------------------------------------------------------------------ */
  const CURSOR_I18N = {
    pt: { summary: 'resumo', openLabel: 'abrir aba', openedLabel: 'aba aberta', codex: 'abrir no Códex', newTabLabel: 'nova aba' },
    en: { summary: 'summary', openLabel: 'open tab', openedLabel: 'tab open', codex: 'open in the Códex', newTabLabel: 'new tab' },
    es: { summary: 'resumen', openLabel: 'abrir pestaña', openedLabel: 'pestaña abierta', codex: 'abrir en el Códex', newTabLabel: 'nueva pestaña' }
  };
  (function cursor() {
    if (!mqFine.matches || mqCoarse.matches || reduce || !gsap) return;
    const L = CURSOR_I18N[(document.documentElement.lang || 'pt').slice(0, 2)] || CURSOR_I18N.pt;
    const el = document.createElement('div');
    el.className = 'cursor'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span class="cursor_dot"></span><span class="cursor_box"><span class="cursor_corner tl"></span><span class="cursor_corner br"></span><span class="cursor_label"></span></span>';
    document.body.appendChild(el);
    document.documentElement.classList.add('has-cursor');
    const dot = $('.cursor_dot', el), box = $('.cursor_box', el), label = $('.cursor_label', el);
    const dx = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power2.out' }), dy = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power2.out' });
    const bx = gsap.quickTo(box, 'x', { duration: .12, ease: 'power2.out' }), by = gsap.quickTo(box, 'y', { duration: .12, ease: 'power2.out' });
    const bw = gsap.quickTo(box, 'width', { duration: .25, ease: 'power2.out' }), bh = gsap.quickTo(box, 'height', { duration: .25, ease: 'power2.out' });
    let px = -100, py = -100, current = null, text = '';
    const DARK = '.is-dark, .footer, .cta, .dock, .codex_tab, .why-card, .why-card_large, .bento_vertical, .bento_top, .bento_bottom, .card-design.is-ink, .plan-1.white, .nav.is-dark.is-scrolled';
    function info(t) {
      if (!t || !t.closest) return null;
      let m;
      if ((m = t.closest('.term'))) return { el: m, label: L.summary };
      if ((m = t.closest('.summary_more'))) return { el: m, label: m.dataset.codex + ' · ' + L.openLabel };
      if ((m = t.closest('[data-codex-panel] [data-codex]'))) return { el: m, label: isTabOpen(m.dataset.codex) ? m.dataset.codex + ' · ' + L.openedLabel : L.newTabLabel };
      if ((m = t.closest('.brands_card'))) return { el: m, label: m.dataset.codex + ' · ' + L.codex };
      if ((m = t.closest('.codex-door[data-codex]'))) return { el: m, label: m.dataset.codex + ' · ' + (isTabOpen(m.dataset.codex) ? L.openedLabel : L.openLabel) };
      if ((m = t.closest('a[href], button, [role="switch"]'))) return { el: m, label: '' };
      if ((m = t.closest('img, video, canvas, .media'))) return { media: true };
      return null;
    }
    function tone(t) {
      if (!t || !t.closest) return '';
      const d = t.closest(DARK), o = t.closest('.is-orange');
      if (d && (!o || o.contains(d))) return 'on-dark';
      if (o) return 'on-orange';
      return '';
    }
    /* the bracket color comes from the background around the target (where they are drawn): goes up until it finds an
       opaque background, measures the luminance and picks cream, ink or cream on bronze,
       always with a contrast of 3:1 or more against that background */
    const INK = [27, 23, 19], CREAM = [243, 236, 225];
    const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce((a, v, i) => a + v * [.2126, .7152, .0722][i], 0);
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
    function backgroundOf(node) {
      for (let n = node; n && n.nodeType === 1; n = n.parentElement) {
        const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || +m[3] >= .5)) return m.slice(0, 3).map(Number);
      }
      return [244, 238, 227];
    }
    function bracketTint(node) {
      const bg = backgroundOf(node);
      const bronze = bg[0] > 180 && bg[1] < 140 && bg[2] < 90;
      const tint = bronze ? CREAM : (ratio(CREAM, bg) >= ratio(INK, bg) ? CREAM : INK);
      return { tint, textTint: tint === CREAM ? INK : CREAM, contrast: +ratio(tint, bg).toFixed(2), bg };
    }
    const rgb = a => 'rgb(' + a.join(',') + ')';
    function setLabel(s) {
      if (s === text) return;
      text = s;
      el.classList.toggle('has-label', !!s);
      if (!s) return;
      if (hasScramble) gsap.to(label, { duration: .4, scrambleText: { text: s, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', speed: .6 }, overwrite: true });
      else label.textContent = s;
    }
    function update(t) {
      const i = info(t);
      el.classList.remove('on-dark', 'on-orange');
      const tn = tone(t); if (tn) el.classList.add(tn);
      el.classList.toggle('is-media', !!(i && i.media));
      if (i && i.el) {
        current = i.el;
        const r = i.el.getBoundingClientRect();
        el.classList.add('is-framing');
        // the brackets sit 6px OUTSIDE the target: the contrast that matters is against the surface around it
        const k = bracketTint(i.el.parentElement || i.el);
        el.style.setProperty('--cur', rgb(k.tint)); el.style.setProperty('--cur-text', rgb(k.textTint));
        el.dataset.contrast = k.contrast;
        bx(r.left - 6); by(r.top - 6); bw(r.width + 12); bh(r.height + 12);
        setLabel(i.label);
        el.dataset.label = i.label;
      } else {
        current = null;
        el.classList.remove('is-framing');
        el.style.removeProperty('--cur'); el.style.removeProperty('--cur-text'); el.dataset.contrast = '';
        bx(px); by(py); bw(0); bh(0);
        setLabel('');
        el.dataset.label = '';
      }
    }
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY; dx(px); dy(py);
      update(e.target);
    }, { passive: true });
    addEventListener('scroll', () => { if (px > 0) update(document.elementFromPoint(px, py)); }, { passive: true });
    document.addEventListener('pointerleave', () => { el.style.opacity = 0; });
    document.addEventListener('pointerenter', () => { el.style.opacity = 1; });
    document.addEventListener('click', () => setTimeout(() => { text = ''; update(document.elementFromPoint(px, py)); }, 60));
    window.OlimpoCursor = { state: () => ({ label: el.dataset.label || '', framing: el.classList.contains('is-framing'), tint: el.style.getPropertyValue('--cur'), contrast: +el.dataset.contrast || null, tone: el.classList.contains('on-dark') ? 'dark' : el.classList.contains('on-orange') ? 'orange' : 'light', target: current ? (current.dataset.codex || current.dataset.term || current.className) : null }) };
  })();

  /* ------------------------------------------------------------------
     STAYING POWER · Lottie in the streak
     assets/lottie/streak.json: the Greek key draws itself, one piece per day of
     streak, and the counter rises with it, read from the Lottie frame.
     ------------------------------------------------------------------ */
  // The prototype loaded lottie-web 5.13.0 from jsDelivr. The CSP of /concepts/** allows no CDN and the package is not
  // installed in this repository, so the player is off and the counter shows the final value, the original fallback.
  const LOTTIE_SRC = null;
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.async = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  (function streak() {
    const host = $('[data-lottie-streak]'), count = $('[data-streak-count]');
    if (!host) return;
    const DAYS = 7, START_FRAME = 6, PER_DAY = 9; // from streak.json itself (markers "inicio" and "sete dias")
    onceVisible([host.closest('article')], () => {
      (LOTTIE_SRC ? loadScript(LOTTIE_SRC) : Promise.reject(new Error('no Lottie player'))).then(() => {
        const a = window.lottie.loadAnimation({ container: host, renderer: 'svg', loop: false, autoplay: false, path: ASSETS + 'lottie/streak.json', rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
        const paint = f => { count.textContent = clamp(Math.floor((f - START_FRAME + .5) / PER_DAY), 0, DAYS); };
        a.addEventListener('enterFrame', e => paint(e.currentTime));
        a.addEventListener('DOMLoaded', () => {
          if (reduce) { a.goToAndStop(a.totalFrames - 1, true); paint(a.totalFrames); return; }
          onceVisible([host], () => a.play(), { threshold: .6 });
        });
        window.OlimpoStreak = { anim: a, state: () => ({ frame: Math.round(a.currentFrame), total: a.totalFrames, days: +count.textContent, playing: !a.isPaused, svg: !!host.querySelector('svg') }) };
      }).catch(() => { count.textContent = DAYS; });
    }, { rootMargin: '300px 0px' });
  })();

  /* ------------------------------------------------------------------
     STAYING POWER · Rive in the Curfew
     Loads assets/rive/curfew.riv IF the file exists, with the
     @rive-app/canvas runtime. While it does not exist, the same state
     machine runs in GSAP and SVG.
     Contract of the .riv, for whoever draws it in the Rive editor:
       artboard:          Curfew (or the file default)
       state machine:     curfew
       inputs:
         streak     Number   days in a row before 11 pm (0 to 90)
         complete   Trigger  the day closed before 11 pm: streak goes up
         break      Trigger  past the time: resets, and the day is marked
       expected states: idle, completed, broken, celestial
         celestial is reached when complete fires with streak >= 90
     ------------------------------------------------------------------ */
  const RIVE = {
    enabled: false,   // the .riv does not exist yet; turn on when the file is added to assets/rive (avoids the 404)
    src: ASSETS + 'rive/curfew.riv',
    runtime: 'https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.42.2/rive.js',
    stateMachine: 'curfew',
    inputs: { streakDays: 'streak', completeDay: 'complete', breakDay: 'break' }
  };
  (function tapCheck() {
    const host = $('[data-tap]');
    if (!host) return;
    const svg = $('.tap_svg', host), canvas = $('.tap_rive', host);
    const num = $('.tap_num', svg), arc = $('.tap_arc', svg), hand = $('.tap_hand', svg), mark = $('.tap_mark', svg), check = $('.tap_check', svg), strike = $('.tap_strike', svg);
    const ticks = $('.tap_ticks', svg);
    // 12 marks; the top one is 11 pm
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2, r1 = i === 0 ? 86 : 92, r2 = 100;
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', 120 + Math.sin(a) * r1); l.setAttribute('y1', 120 - Math.cos(a) * r1);
      l.setAttribute('x2', 120 + Math.sin(a) * r2); l.setAttribute('y2', 120 - Math.cos(a) * r2);
      if (i === 0) l.setAttribute('class', 'is-23');
      ticks.appendChild(l);
    }
    const C = 628.3;
    let seq = 29, streakState = 'idle', rive = null, riveInputs = null, tl = null;
    const arcFor = n => C * (1 - clamp(n / 90, 0, 1));
    function paintStatic(st, n) {
      num.textContent = n;
      arc.style.strokeDashoffset = arcFor(n);
      hand.style.transform = 'rotate(' + (st === 'broken' ? 40 : st === 'idle' ? 200 : 350) + 'deg)';
      check.style.strokeDashoffset = (st === 'completed' || st === 'celestial') ? 0 : 48;
      strike.style.strokeDashoffset = st === 'broken' ? 0 : 56;
      mark.style.opacity = st === 'broken' ? 1 : 0;
      if (st === 'broken') { mark.setAttribute('cx', 120 + Math.sin(40 * Math.PI / 180) * 100); mark.setAttribute('cy', 120 - Math.cos(40 * Math.PI / 180) * 100); }
    }
    function setStreakState(st) { streakState = st; host.dataset.state = st; }

    /* the GSAP + SVG version of the same states */
    const svgMachine = {
      set(st) {
        tl && tl.kill();
        const from = seq;
        if (st === 'completed') seq = Math.min(90, seq + 1);
        if (st === 'broken') seq = 0;
        if (st === 'celestial') seq = 90;
        const to = seq;
        const final = st === 'completed' && to >= 90 ? 'celestial' : st;
        if (!gsap || reduce) { setStreakState(final); paintStatic(final, to); return Promise.resolve(); }
        return new Promise(res => {
          const o = { n: from };
          tl = gsap.timeline({ onComplete: res });
          if (st === 'completed' || st === 'celestial') {
            strike.style.strokeDashoffset = 56; mark.style.opacity = 0;
            tl.set(check, { strokeDashoffset: 48 })
              .fromTo(hand, { rotation: 200, transformOrigin: '120px 120px' }, { rotation: 350, duration: .8, ease: 'power2.inOut' })
              .add(() => setStreakState(final))
              .to(check, { strokeDashoffset: 0, duration: .5, ease: 'power2.out' })
              .to(o, { n: to, duration: .5, ease: 'power2.out', snap: { n: 1 }, onUpdate: () => { num.textContent = o.n; } }, '<')
              .to(arc, { strokeDashoffset: arcFor(to), duration: .5, ease: 'power2.inOut' }, '<');
          } else if (st === 'broken') {
            tl.set(check, { strokeDashoffset: 48 })
              .fromTo(hand, { rotation: 300, transformOrigin: '120px 120px' }, { rotation: 400, duration: .9, ease: 'power2.in' })
              .add(() => { setStreakState('broken'); mark.setAttribute('cx', 120 + Math.sin(40 * Math.PI / 180) * 100); mark.setAttribute('cy', 120 - Math.cos(40 * Math.PI / 180) * 100); })
              .to(mark, { opacity: 1, duration: .2 })
              .to(strike, { strokeDashoffset: 0, duration: .35, ease: 'power2.out' })
              .to(o, { n: 0, duration: .5, ease: 'power2.in', snap: { n: 1 }, onUpdate: () => { num.textContent = o.n; } })
              .to(arc, { strokeDashoffset: C, duration: .5, ease: 'power2.in' }, '<');
          } else { setStreakState(st); paintStatic(st, seq); res(); }
        });
      }
    };
    /* the same API on top of Rive */
    const riveMachine = {
      set(st) {
        const I = riveInputs;
        if (st === 'completed') { seq = Math.min(90, seq + 1); I.streakDays.value = seq; I.completeDay.fire(); }
        if (st === 'broken') { seq = 0; I.breakDay.fire(); I.streakDays.value = 0; }
        if (st === 'celestial') { seq = 89; I.streakDays.value = 89; seq = 90; I.streakDays.value = 90; I.completeDay.fire(); }
        setStreakState(st === 'completed' && seq >= 90 ? 'celestial' : st);
        return new Promise(r => setTimeout(r, 1200));
      }
    };
    let machine = svgMachine;
    paintStatic('idle', seq);

    async function demo() {
      // one pass through the three states, stopping on celestial
      if (reduce) { await machine.set('celestial'); return; }
      await machine.set('completed');
      await new Promise(r => setTimeout(r, 900));
      await machine.set('broken');
      await new Promise(r => setTimeout(r, 900));
      seq = 89; num.textContent = 89; arc.style.strokeDashoffset = arcFor(89);
      await machine.set('completed');
    }

    async function startRive() {
      let hasRiv = false;
      if (RIVE.enabled) try { const r = await fetch(RIVE.src, { method: 'HEAD', cache: 'no-store' }); hasRiv = r.ok; } catch (_) {}
      if (hasRiv) {
        try {
          await loadScript(RIVE.runtime);
          await new Promise((res, rej) => {
            canvas.hidden = false;
            rive = new window.rive.Rive({
              src: RIVE.src, canvas, stateMachines: RIVE.stateMachine, autoplay: !reduce,
              onLoad: () => {
                rive.resizeDrawingSurfaceToCanvas();
                const list = rive.stateMachineInputs(RIVE.stateMachine) || [];
                const by = n => list.find(i => i.name === n);
                riveInputs = { streakDays: by(RIVE.inputs.streakDays), completeDay: by(RIVE.inputs.completeDay), breakDay: by(RIVE.inputs.breakDay) };
                if (!riveInputs.streakDays || !riveInputs.completeDay || !riveInputs.breakDay) return rej(new Error('inputs do .riv não batem com o contrato'));
                riveInputs.streakDays.value = seq;
                host.classList.add('is-rive'); machine = riveMachine; res();
              },
              onLoadError: rej
            });
          });
        } catch (err) { canvas.hidden = true; host.classList.remove('is-rive'); machine = svgMachine; }
      }
      window.OlimpoTap = { mode: machine === riveMachine ? 'rive' : 'svg', set: st => machine.set(st), streakState: () => ({ streakState, streakDays: seq, numberText: num.textContent, mode: machine === riveMachine ? 'rive' : 'svg' }), contract: RIVE };
      onceVisible([host], demo, { threshold: .5 });
    }
    onceVisible([host.closest('article')], startRive, { rootMargin: '300px 0px' });
  })();

  // In Next the effect can run after the load event, so refresh right away in that case.
  if (document.readyState === 'complete') ST && ST.refresh();
  else addEventListener('load', () => { ST && ST.refresh(); }, { once: true });
}
