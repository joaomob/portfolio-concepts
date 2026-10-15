// One entry point for the browser code of every page, used by both builds: the Astro layout calls it from a
// <script>, the Next.js PageScripts client component from useEffect. The shared parts start at once; each page type
// loads its own module on demand (GSAP and three.js stay out of the pages that do not use them). The returned
// function undoes everything, which Next.js needs when a component unmounts.
import { initCart } from './cart';
import { initEffects } from './effects';
import { initSiteChrome } from './site-chrome';
import { initSmoothScroll } from './smooth-scroll';

export type PageId = 'home' | 'collection' | 'product' | 'info' | 'success';

type Cleanup = () => void;

const PAGE_MODULES: Record<PageId, () => Promise<Cleanup[]>> = {
  home: async () => {
    const [grid, motion, hero, faq] = await Promise.all([
      import('./product-grid'),
      import('./motion'),
      import('./hero-3d'),
      import('./faq'),
    ]);
    return [grid.initHomeGrid(), motion.initMotion(), hero.initHero3d(), faq.initFaq()];
  },
  collection: async () => [(await import('./product-grid')).initCollectionGrid()],
  product: async () => [(await import('./product-gallery')).initProductPage()],
  info: async () => [],
  success: async () => [],
};

export function boot(page: PageId): Cleanup {
  let disposed = false;
  /* the success page has no menu, footer or cart (the original loads only the scroll and the effects there) */
  const chrome = page === 'success' ? [] : [initSiteChrome(), initCart()];
  const cleanups: Cleanup[] = [...chrome, initSmoothScroll(), initEffects()];

  PAGE_MODULES[page]().then((pageCleanups) => {
    if (disposed) pageCleanups.forEach((fn) => fn());
    else cleanups.push(...pageCleanups);
  });

  return () => {
    disposed = true;
    cleanups.reverse().forEach((fn) => fn());
  };
}
