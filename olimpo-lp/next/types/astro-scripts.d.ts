// The behavior scripts of the Astro build are plain JavaScript; this is the one entry the Next client component calls.
declare module '@astro/scripts/home.js' {
  /** Starts every behavior of the home and returns the function that stops them. */
  export function startHome(): () => void;
}
