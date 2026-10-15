// What the Astro BaseLayout puts in the head besides the metadata: the font preloads and the inline script that runs
// before the first paint (the first screen starts at the first frame of its entrance and is shown after 3 s).
import { asset } from './paths';

const INLINE_SCRIPT = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('is-motion');setTimeout(function(){d.classList.add('is-ready')},3000)})()";

export function HeadExtras() {
  return (
    <>
      <link rel="preload" href={asset('fonts/newsreader-latin-400.woff2')} as="font" type="font/woff2" crossOrigin="" />
      <link rel="preload" href={asset('fonts/instrument-sans-latin-var.woff2')} as="font" type="font/woff2" crossOrigin="" />
      <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
    </>
  );
}
