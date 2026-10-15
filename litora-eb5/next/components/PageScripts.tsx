'use client';
// The page scripts of the Astro build (form checks and GSAP motion, ../astro/src/scripts), started after hydration.
// Both return a cleanup that removes their listeners, observers and GSAP contexts, so a remount starts clean.
import { useEffect } from 'react';
import { initForms } from '@astro/scripts/form';
import { initMotion } from '@astro/scripts/motion';

export function PageScripts() {
  useEffect(() => {
    const stopForms = initForms();
    const stopMotion = initMotion();
    return () => { stopMotion(); stopForms(); };
  }, []);
  return null;
}
