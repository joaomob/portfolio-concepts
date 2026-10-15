// Module declarations shared by both builds.
/// <reference types="vite/client" />

// three.js is vendored without its type package, so the hero code treats it as untyped.
declare module 'three';
declare module 'three/addons/*';

declare module '*?raw' {
  const content: string;
  export default content;
}
