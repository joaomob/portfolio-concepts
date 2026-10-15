'use client';
// The browser code of a page, shared with the Astro build (../astro/src/scripts): the smooth scroll (Lenis) and the
// bag on every page, then the animation of the page type (GSAP, asked for after the load event). Each init returns
// the function that undoes it, and the effect calls them all when the page unmounts.
import { useEffect } from 'react';
import { initSmooth } from '@shared/scripts/smooth';
import { initBag } from '@shared/scripts/bag';
import { initHome } from '@shared/scripts/home';
import { initCollection } from '@shared/scripts/collection';
import { initFragrance } from '@shared/scripts/fragrance';
import { initList } from '@shared/scripts/list';
import { initSizes } from '@shared/scripts/sizes';
import { MEDIA } from '@shared/lib/photos';
import { BASE } from '@/lib/config';

export type Motion = 'home' | 'collection' | 'fragrance' | 'list' | 'product' | null;

export function PageScripts({ motion }: { motion: Motion }) {
  useEffect(() => {
    const undo = [initSmooth(), initBag({ base: BASE, media: MEDIA })];
    if (motion === 'home') undo.push(initHome());
    if (motion === 'collection') undo.push(initCollection());
    if (motion === 'fragrance') undo.push(initFragrance());
    if (motion === 'list' || motion === 'product') undo.push(initList());
    if (motion === 'product' && document.querySelector('[data-guide]')) undo.push(initSizes());
    return () => undo.forEach((stop) => stop());
  }, [motion]);
  return null;
}
