// The menu of every page: the house, the three links (a panel behind the Menu button on a phone) and the bag count.
import { homeAnchor } from '@shared/lib/links';
import { BASE, href } from '@/lib/config';

export type Current = 'home' | 'collections' | 'fragrances' | null;

export function Nav({ current }: { current: Current }) {
  const onHome = current === 'home';
  const mark = (name: Current) => (current === name ? 'page' : undefined);
  return (
    <header className="nav_component">
      <a href={href('')} className="nav_brand text-style-label" aria-current={mark('home')}>Vanth</a>
      <nav className="nav_menu" id="nav-menu" aria-label="Main">
        <a href={href('collections')} className="nav_link text-style-label" aria-current={mark('collections')}>Collections</a>
        <a href={href('fragrances')} className="nav_link text-style-label" aria-current={mark('fragrances')}>Fragrances</a>
        <a href={homeAnchor(BASE, onHome, 'lookbook')} className="nav_link text-style-label">Lookbook</a>
      </nav>
      <div className="nav_side">
        <button type="button" className="nav_toggle text-style-label" aria-expanded="false" aria-controls="nav-menu" data-menu-toggle="">Menu</button>
        <a href={homeAnchor(BASE, onHome, 'departments')} className="nav_link text-style-label">Shop</a>
        <a href={href('bag')} className="nav_link nav_bag text-style-label">Bag <span data-bag-count="">0</span></a>
      </div>
    </header>
  );
}
