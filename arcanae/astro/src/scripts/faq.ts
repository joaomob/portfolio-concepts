// FAQ: one answer open at a time, opening and closing with an animated height. The first question starts open (the
// open attribute in the markup). With reduced motion it opens and closes at once.
type AnimatedItem = HTMLDetailsElement & { _anim?: Animation | null };

export function initFaq(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(document.querySelectorAll<AnimatedItem>('.faq_item'));

  const animate = (item: AnimatedItem, open: boolean) => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    item._anim?.cancel();
    const from = item.offsetHeight;
    if (open) item.open = true;
    const to = open ? item.scrollHeight : summary.offsetHeight;
    item.classList.toggle('is-open', open);
    if (reduce) {
      if (!open) item.open = false;
      return;
    }
    const anim = item.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: open ? 520 : 420, easing: 'cubic-bezier(.2,.7,.2,1)' },
    );
    item._anim = anim;
    item.querySelector('.faq_answer')?.animate(
      open ? { opacity: [0, 1], transform: ['translateY(-6px)', 'none'] } : { opacity: [1, 0] },
      { duration: open ? 520 : 260, easing: 'ease-out', fill: 'both' },
    );
    anim.onfinish = () => {
      item._anim = null;
      if (!open) item.open = false;
    };
  };

  const handlers = items.map((item) => {
    if (item.open) item.classList.add('is-open');
    const summary = item.querySelector('summary');
    const onClick = (e: Event) => {
      e.preventDefault();
      const opening = !item.classList.contains('is-open');
      if (opening) items.forEach((other) => other !== item && other.classList.contains('is-open') && animate(other, false));
      animate(item, opening);
    };
    summary?.addEventListener('click', onClick);
    return () => summary?.removeEventListener('click', onClick);
  });

  return () => handlers.forEach((fn) => fn());
}
