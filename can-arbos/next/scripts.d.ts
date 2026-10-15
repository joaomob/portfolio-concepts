// Types of the plain JavaScript page scripts shared with the Astro build.
declare module '@astro/scripts/index.js' {
  /** Starts the site behaviour, the date fields and the selects; returns one cleanup for all three. */
  export function initPage(): () => void;
}
