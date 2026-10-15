'use client';
// Starts the behaviour of the landing after hydration: the same entry the Astro page runs (the redline.js port and
// the local Finsweet stand-in, with GSAP from npm), inside a gsap.context so leaving the page reverts every tween.
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { startHome } from '@astro/scripts/home.js';

let running = false;

export default function HomeMotion() {
  useEffect(() => {
    // guard against a second start (React strict mode runs effects twice in development)
    if (running) return;
    running = true;
    let stop: (() => void) | undefined;
    const ctx = gsap.context(() => { stop = startHome(); });
    return () => {
      stop?.();
      ctx.revert();
      running = false;
    };
  }, []);
  return null;
}
