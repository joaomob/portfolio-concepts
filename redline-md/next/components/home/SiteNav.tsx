// The navbar: the logo, the three section links and the upload button.
// Markup ported word for word from the original index.html.
import { asset } from '@astro/lib/site';

export default function SiteNav() {
  return (
    <header className="navbar_component">
      {' '}
      <div className="navbar_container">
        {' '}
        <a className="brand_link" href="#top" aria-label="RedlineMD home">
          <img className="brand_logo" src={asset("logo.webp")} alt="Redline MD, Medical Contract Review" width="560" height="136" />
        </a>
        {' '}
        <nav className="navbar_menu" aria-label="Main">
          {' '}
          <a className="navbar_link" href="#how">
            How it works
          </a>
          {' '}
          <a className="navbar_link" href="#pricing">
            Pricing
          </a>
          {' '}
          <a className="navbar_link" href="#faq">
            FAQ
          </a>
          {' '}
          <a className="button is-small" href="#" fs-modal-element="open" fs-modal-instance="upload">
            <span className="button_content">
              Upload contract
            </span>
            <span className="button_hover" />
          </a>
          {' '}
        </nav>
        {' '}
      </div>
      {' '}
    </header>
  );
}
