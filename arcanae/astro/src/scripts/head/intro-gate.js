/* The intro is in the HTML as the first child of the body, drawn in the first frame. This runs before it and marks
   the page to skip it when it was already seen in this session or motion is reduced. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches, seen = false;
  try { seen = sessionStorage.getItem('arcanae_intro') === '1'; } catch (e) {}
  document.documentElement.classList.add(reduce || seen ? 'intro-skip' : 'is-loading');
})();
