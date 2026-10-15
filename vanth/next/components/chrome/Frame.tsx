// The frame of every page: its style sheets, the menu, the main area, the footer, what sits after the footer (the size
// guide, the order dialog) and the browser code. Each page renders its own frame, because the menu marks the current
// page, the footer wordmark moves only on the pages with motion and the shop pages fill the screen.
import type { ReactNode } from 'react';
import { Nav, type Current } from './Nav';
import { Footer } from './Footer';
import { PageScripts, type Motion } from './PageScripts';
import { css, type Sheets } from '@/lib/styles';

// photograph placeholders: a frame pulses until its photograph arrives, then a lazy one fades in. It runs as the
// page is parsed, before React hydrates, as in the Astro build.
const PLACEHOLDERS = `(function(){var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var io='IntersectionObserver'in window&&new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('is-img-pulse',e.isIntersecting)})},{rootMargin:'200px'});document.querySelectorAll('img').forEach(function(i){if(i.complete&&i.naturalWidth)return;var f=i.parentElement;if(!f)return;f.classList.add('is-img-wait');if(io)io.observe(f);else f.classList.add('is-img-pulse');var fade=!r&&i.loading==='lazy';if(fade)i.classList.add('is-img-fade');function done(){if(io)io.unobserve(f);f.classList.remove('is-img-wait','is-img-pulse');if(fade){i.classList.add('is-img-in');requestAnimationFrame(function(){i.classList.remove('is-img-fade')})}}i.addEventListener('load',done,{once:true});i.addEventListener('error',done,{once:true})})})();`;

interface Props {
  /** the style sheets of the page type */
  sheets: Sheets;
  current: Current;
  /** the animation of the page type (null: the shop pages and the 404 page run none) */
  motion: Motion;
  /** the main area fills the screen (bag and checkout) */
  fill?: boolean;
  after?: ReactNode;
  children: ReactNode;
}

export function Frame({ sheets, current, motion, fill = false, after, children }: Props) {
  return (
    <>
      {/* React places the sheet in the head, once */}
      <style href={`vanth-${sheets}`} precedence="vanth">{css(sheets)}</style>
      <div className="page-wrapper background-color-black">
        <Nav current={current} />
        <main className={fill ? 'main-wrapper is-fill' : 'main-wrapper'}>{children}</main>
        <Footer onHome={current === 'home'} motion={motion !== null} />
        {after}
      </div>
      <script dangerouslySetInnerHTML={{ __html: PLACEHOLDERS }} />
      <PageScripts motion={motion} />
    </>
  );
}
