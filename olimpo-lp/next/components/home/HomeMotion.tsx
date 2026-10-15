'use client';
// Starts the behavior of the home after hydration: the same entry the Astro page runs (GSAP from npm, the Codex,
// the phones and the vase), inside a gsap.context so leaving the page reverts every tween and ScrollTrigger.
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startHome } from '@astro/scripts/home.js';

let running = false;

export default function HomeMotion() {
  useEffect(() => {
    // React sets muted as a property, so the attribute can be missing on the first frame; autoplay needs it.
    document.querySelectorAll('video').forEach((v) => { v.muted = true; v.defaultMuted = true; });
    // guard against a second start (React strict mode runs effects twice in development)
    if (running) return;
    running = true;
    let stop: (() => void) | undefined;
    const ctx = gsap.context(() => { stop = startHome(); });
    return () => {
      stop?.();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      running = false;
    };
  }, []);
  return null;
}
