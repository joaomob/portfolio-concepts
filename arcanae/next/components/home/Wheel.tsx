// Home wheel (Wheel.astro): every arcana with a render once around a circle.
import { CARDS } from '../../../astro/src/data/catalog';
import { cardImage } from '../../../astro/src/lib/catalog';
import { NEXT_BASE, page } from '../../../astro/src/lib/site';

export default function Wheel() {
  const items = CARDS.filter((c) => c.image).map((card, i, list) => {
    const angle = (i / list.length) * 360;
    return {
      id: card.id,
      image: cardImage(card)!,
      transform: `rotate(${angle}deg) translateY(calc(var(--ring) / -2)) rotate(${-angle}deg) rotate(calc(var(--spin, 0deg) * -1))`,
    };
  });
  return (
    <section className="section_wheel" id="wheel"><div className="wheel_sticky">
      <div className="wheel_ring" id="wheel-ring" aria-hidden="true">{items.map((item) => <div key={item.id} className="wheel_item" style={{ transform: item.transform }}><img className="wheel_image" src={item.image} alt="" loading="lazy" /></div>)}</div>
      <div className="wheel_center">
        <p className="text-style-eyebrow">The Collection</p>
        <h2 data-split="">The 22 Major Arcana</h2>
        <a className="button is-gold" href={page(NEXT_BASE, 'collection')}>Explore the Collection →</a>
      </div>
    </div></section>
  );
}
