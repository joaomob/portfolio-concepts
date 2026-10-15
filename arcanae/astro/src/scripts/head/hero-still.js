/* Inlined in the head of the home (no-GPU devices get a still picture before the first paint). Ported from the original src/site/js/hero-still.js. */
/* Still picture of the hero instead of the 3D statue on devices without a graphics card. Runs in the head, before the
   first paint. A WebGL context that asks for no major performance caveat fails on some software renderers, but
   ANGLE's SwiftShader passes that test, so the renderer name is read too. hero-3d.ts does not load the 3D when the
   html element has no-gpu. */
(function () {
  var STILL = { desktop: '/concepts/arcanae/assets/hero-still-desktop.webp', mobile: '/concepts/arcanae/assets/hero-still-mobile.webp' };
  var slow = true;
  try {
    var c = document.createElement('canvas');
    var o = { failIfMajorPerformanceCaveat: true };
    var gl = c.getContext('webgl2', o) || c.getContext('webgl', o);
    if (gl) {
      var info = gl.getExtension('WEBGL_debug_renderer_info');
      var name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
      slow = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
      var lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
  } catch (e) {}
  if (!slow) return;
  document.documentElement.classList.add('no-gpu');
  var mobile = window.matchMedia('(max-width: 991px)').matches;
  var link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = mobile ? STILL.mobile : STILL.desktop;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
  var css = document.createElement('style');
  css.textContent = '.no-gpu .hero_3d{background:url("' + STILL.desktop + '") 70% 50%/cover no-repeat}' +
    '.no-gpu .hero_3d-canvas,.no-gpu .hero_3d-loading{display:none}' +
    '@media (max-width:991px){.no-gpu .hero_3d{background-image:url("' + STILL.mobile + '");background-position:50% 50%}}';
  document.head.appendChild(css);
})();
