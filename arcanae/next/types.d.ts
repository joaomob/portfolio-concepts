// Module declarations for the shared code in ../astro/src (Vite gives the Astro build the same ones).

// three.js is vendored without its type package, so the hero code treats it as untyped.
declare module 'three';
declare module 'three/addons/*';

declare module '*?raw' {
  const content: string;
  export default content;
}
