'use client';
// Starts the tabs and the reveals of the case study page after hydration, the same entry the Astro page runs, and
// stops them when the page unmounts.
import { useEffect } from 'react';
import { startCaseStudy } from '@astro/scripts/case-study.js';

let running = false;

export default function CaseStudyMotion() {
  useEffect(() => {
    if (running) return;
    running = true;
    const stop = startCaseStudy();
    return () => {
      stop();
      running = false;
    };
  }, []);
  return null;
}
