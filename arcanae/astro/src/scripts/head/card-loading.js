/* Inlined in the head of the pages with product cards. Ported from the original src/site/js/card-loading.js; window.ARCANAE_MASKS is written by the layout just before it. */
/* Card photo loading state: while a card photo loads, the card shows the statue's shape in gold dots instead of a
   broken image icon and its alt text.
   Runs in the head: marks the html with cards-js, so the CSS in embed.css hides every card photo until it has loaded
   and shows three gold dots in its place; the photo fades in when it loads. Lazy loading stays. Cards added later (the
   status filter, the list pagination) are watched too. Without this script the CSS does nothing and the photos show
   as before.
   Speed (03/10/2026, PageSpeed, the collection at 71 on a phone): the first card photo of a page is its largest paint,
   and hidden until the script saw its load event it waited for the page's JavaScript (loaded at 3.0 s, painted at
   6.2 s in the lab). So the first card photo is never hidden (class is-first): the browser paints it as it arrives,
   over its dot shape. And the dot shapes of the other cards are only fetched when the card comes near the screen
   (22 masks of 5 KB were downloaded together with that first photo). */
(function () {
  var root = document.documentElement;
  root.classList.add('cards-js');
  function settle(img, ok) {
    img.classList.add(ok ? 'is-loaded' : 'is-failed');
    var media = img.parentNode;
    if (media && media.classList) { media.classList.remove('is-loading'); media.classList.add(ok ? 'is-loaded' : 'is-failed'); }
    if (img === first) afterFirst();
  }
  /* the statue's shape in gold dots under the photo (css/embed.css), when the page lists a mask for this product:
     window.ARCANAE_MASKS, product slug to mask picture, read from the card link (/product/<slug> or ?card=<slug>) */
  function silhouette(img, media) {
    var masks = window.ARCANAE_MASKS, link = img.closest('a');
    if (!masks || !link || media.querySelector('.product-card_silhouette')) return;
    var m = (link.getAttribute('href') || '').match(/(?:\/product\/|card=)([a-z0-9-]+)/);
    if (!m || !masks[m[1]] || media.getAttribute('data-mask')) return;
    /* the layer goes in only once its mask has arrived: in the page the layer takes the place of the three dots, and a
       layer whose mask is still on its way showed nothing at all (empty cards on a fast scroll, 04/10/2026) */
    var url = masks[m[1]], probe = new Image();
    media.setAttribute('data-mask', 'loading');
    probe.crossOrigin = 'anonymous';
    probe.onload = function () {
      media.setAttribute('data-mask', 'ready');
      if (img.classList.contains('is-loaded') || media.querySelector('.product-card_silhouette')) return;
      var layer = document.createElement('div');
      layer.className = 'product-card_silhouette';
      layer.setAttribute('aria-hidden', 'true');
      layer.style.webkitMaskImage = layer.style.maskImage = 'url("' + url + '")';
      media.insertBefore(layer, img);
    };
    probe.src = url;
  }
  /* the dot shape of a card is made when the card is within 300 px of the screen (its mask is fetched then) */
  var near = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      near.unobserve(e.target);
      var img = e.target.querySelector('img.product-card_image');
      if (img && !img.classList.contains('is-loaded')) silhouette(img, e.target);
    });
  }, { rootMargin: '300px' }) : null;
  /* the width a card photo is drawn at, for the browser to pick the right file of its srcset: the cards sit in
     .collection_grid, one column up to 479 px, two up to 991 px, three above (css/classes.css). Webflow writes
     sizes="98vw" for these photos (they are position: absolute, which it does not measure), and a computer then
     downloaded the 1040 px file for a 411 px card (PageSpeed, 03/10/2026: 1.5 MB more on the collection). A lazy
     photo also gets "auto", so a browser that knows it uses the real width. Set before the photo is fetched. */
  var CARD_SIZES = '(max-width: 479px) 97vw, (max-width: 991px) 48vw, 31vw';
  function resize(img, eager) {
    if (!img.hasAttribute('srcset') && !img.hasAttribute('data-held-srcset')) return;
    /* ("auto" only counts on a lazy photo; the first card photo of a category page is turned eager by the page code) */
    var lazy = !eager && img.getAttribute('loading') === 'lazy';
    img.setAttribute('sizes', (lazy ? 'auto, ' : '') + CARD_SIZES);
  }
  /* once the first card photo has arrived, every other card gets its dot shape at once (22 masks of about 5 KB): made
     only near the screen, the shape of a card further down was fetched after its photo had started, and a fast scroll
     showed empty cards with no shape (The Magician, The High Priestess, Wheel of Fortune, The Star, measured on
     04/10/2026). Before that, only the cards near the screen get it,
     so the first photo keeps the bandwidth */
  var firstDone = false, waiting = [];
  function afterFirst() {
    if (firstDone) return;
    firstDone = true;
    waiting.forEach(function (w) { if (!w[0].classList.contains('is-loaded')) silhouette(w[0], w[1]); });
    waiting = [];
  }
  window.addEventListener('load', afterFirst);
  var first = null;
  function track(img) {
    if (img.classList.contains('is-loaded')) return;
    var media = img.parentNode;
    /* the first card photo of the page is shown as it arrives (see the note at the top) */
    if (!first) { first = img; img.classList.add('is-first'); }
    resize(img, img === first);
    if (media && media.classList) {
      if (img === first || !near || firstDone) silhouette(img, media);
      else { near.observe(media); waiting.push([img, media]); }
    }
    /* an image with no src (held back by the category page code) counts as complete, so it also needs a width */
    if (img.complete && img.naturalWidth > 0) { settle(img, true); return; }
    if (media && media.classList) media.classList.add('is-loading');
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('img.product-card_image')) track(node);
    else if (node.firstElementChild) [].forEach.call(node.querySelectorAll('img.product-card_image'), track);
  }
  document.addEventListener('load', function (e) {
    var t = e.target;
    if (t.nodeName === 'IMG' && t.classList.contains('product-card_image') && t.naturalWidth > 0) settle(t, true);
  }, true);
  document.addEventListener('error', function (e) {
    var t = e.target;
    /* an image whose src was removed fires no error; one with a broken address keeps the dots off and the photo hidden */
    if (t.nodeName === 'IMG' && t.classList.contains('product-card_image') && t.getAttribute('src')) settle(t, false);
  }, true);
  new MutationObserver(function (list) {
    list.forEach(function (m) { m.addedNodes.forEach(scan); });
  }).observe(root, { childList: true, subtree: true });
})();
