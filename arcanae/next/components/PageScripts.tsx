'use client';
// Starts the browser code of the page (the same boot() the Astro build calls) and undoes it on unmount.
import { useEffect } from 'react';
import { boot, type PageId } from '../../astro/src/scripts/boot';

export default function PageScripts({ page }: { page: PageId }) {
  useEffect(() => boot(page), [page]);
  return null;
}
