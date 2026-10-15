// The page shown after a paid checkout (Success.astro).
import { NEXT_BASE, page } from '../../astro/src/lib/site';

export default function Success() {
  return (
    <section className="section_success theme-inverse">
      <div className="success_glow"></div>
      <div className="padding-global"><div className="container-small"><div className="success_content">
        <p className="text-style-eyebrow">Order received</p>
        <h1 className="heading-style-h2 text-color-marble">Thank you.</h1>
        <p className="success_text">Your Arcanum is being prepared and hand-finished. A confirmation is on its way to your inbox.</p>
        <a className="button is-gold" href={page(NEXT_BASE, 'collection')}>Continue the collection</a>
      </div></div></div>
    </section>
  );
}
