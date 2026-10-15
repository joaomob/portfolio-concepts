// The site header (Nav.astro): logo, section links, cart button and mobile menu toggle.
import { asset, page } from '../../astro/src/lib/site';

const LINKS = [
  { id: 'collection', label: 'The Collection' },
  { id: 'craft', label: 'The Craft' },
  { id: 'story', label: 'Our Story' },
  { id: 'faq', label: 'FAQ' },
];

export default function Nav({ base, onHome = false }: { base: string; onHome?: boolean }) {
  const home = page(base);
  const section = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  return (
    <header className="nav_component" id="nav">
      <div className="nav_backdrop" aria-hidden="true"></div>
      <div className="padding-global"><div className="container-large">
        <div className="nav_inner">
          <a className="nav_brand" href={home} aria-label="Arcanae Craft"><img className="nav_logo" src={asset('brand/wordmark-h-ink.svg')} alt="Arcanae Craft" /></a>
          <nav className="nav_menu" id="nav-menu">
            {LINKS.map((l) => <a key={l.id} className="nav_link" href={section(l.id)}>{l.label}</a>)}
          </nav>
          <div className="nav_actions">
            <button className="nav_cart" aria-label="Cart"><svg className="nav_cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 8h11l-1 11.4a1.5 1.5 0 0 1-1.5 1.35H9a1.5 1.5 0 0 1-1.5-1.35L6.5 8Z" /><path d="M9 8.5V6.2a3 3 0 0 1 6 0v2.3" /></svg><span className="nav_cart-count" data-cart-count="">0</span></button>
            <button className="nav_toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu"><span className="nav_toggle-line"></span><span className="nav_toggle-line"></span><span className="nav_toggle-line"></span></button>
          </div>
        </div>
      </div></div>
    </header>
  );
}
