// Entry of the home behavior. GSAP and its plugins come from npm (bundled and served from joaomob.com, as the CSP
// of /concepts allows scripts from the site only). The vase scene loads with a dynamic import, so three.js is a
// separate chunk. Returns a cleanup, which the Next.js client component calls on unmount.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import codex from '../data/codex-content.json';
import { initOlimpo } from './olimpo.js';
import { initPhones } from './phones.js';

export function startHome() {
  const cleanups = [];
  const out = initOlimpo({ gsap, ScrollTrigger, Flip, DrawSVGPlugin, ScrambleTextPlugin, codex });
  if (typeof out === 'function') cleanups.push(out);
  const phones = initPhones();
  if (typeof phones === 'function') cleanups.push(phones);
  let alive = true;
  import('./vase.js').then(({ initVase }) => {
    if (!alive) return;
    const stop = initVase({ ScrollTrigger });
    if (typeof stop === 'function') cleanups.push(stop);
  });
  return () => {
    alive = false;
    while (cleanups.length) cleanups.pop()();
  };
}
