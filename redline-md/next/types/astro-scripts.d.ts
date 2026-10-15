// The behaviour scripts of the Astro build are plain JavaScript; these are the entries the Next client components call.
declare module '@astro/scripts/home.js' {
  /** Starts every behaviour of the landing and returns the function that stops them. */
  export function startHome(): () => void;
}

declare module '@astro/scripts/case-study.js' {
  /** The head line that switches to the style guide tab before the first paint. */
  export const SG_HEAD_SCRIPT: string;
  /** Starts the tabs and the reveals of the case study page and returns the function that stops them. */
  export function startCaseStudy(): () => void;
}

declare module '@astro/scripts/reveal.js' {
  /** The head line that turns the reveals on unless the visitor asks for reduced motion. */
  export const ANIM_ON_SCRIPT: string;
  export function startReveal(): () => void;
}
