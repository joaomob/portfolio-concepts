// The footer of every page: the links of the menu, the credit and the giant wordmark (it rises with the scroll on the
// pages that carry the animation library, so it is marked for the script there).
import { homeAnchor } from '@shared/lib/links';
import { BASE, href } from '@/lib/config';

export function Footer({ onHome = false, motion = false }: { onHome?: boolean; motion?: boolean }) {
  return (
    <footer className="footer_component background-color-paper">
      <div className="padding-global">
        <div className="footer_top">
          <nav className="footer_links" aria-label="Footer">
            <a href={href('collections')} className="nav_link text-style-label">Collections</a>
            <a href={href('fragrances')} className="nav_link text-style-label">Fragrances</a>
            <a href={homeAnchor(BASE, onHome, 'lookbook')} className="nav_link text-style-label">Lookbook</a>
            <a href={homeAnchor(BASE, onHome, 'departments')} className="nav_link text-style-label">Shop</a>
          </nav>
          <p className="text-style-label">Concept site. Design and development by <a href="https://joaomob.com" className="footer_credit">joaomob.com</a></p>
        </div>
      </div>
      <p className="footer_wordmark" aria-hidden="true" data-footer-wordmark={motion ? '' : undefined}>Vanth</p>
    </footer>
  );
}
