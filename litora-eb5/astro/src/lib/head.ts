// Runs in the head before the first paint, the same line as the original prototype. "js": JavaScript runs, so the
// fixed header may start hidden over the hero. "js-motion": the visitor accepts motion and the page is not open inside
// the HubSpot editor, so the states the motion file animates from may exist. Without it every piece of content shows.
export const INLINE_SCRIPT = "(function(d,w){d.classList.add('js');if(!w.hsInEditor&&!d.classList.contains('hs-inline-edit')&&w.matchMedia('(prefers-reduced-motion: no-preference)').matches)d.classList.add('js-motion')})(document.documentElement,window)";
