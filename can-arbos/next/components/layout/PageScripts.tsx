'use client';
// The page scripts of the Astro build (../astro/src/scripts: menu, dialogs, forms, filters, GSAP motion, date fields
// and selects), started after hydration. initPage() returns a cleanup that removes their listeners, observers and
// GSAP contexts, so a remount starts clean.
import { useEffect } from 'react';
import { initPage } from '@astro/scripts/index.js';

export default function PageScripts() {
  useEffect(() => initPage(), []);
  return null;
}
