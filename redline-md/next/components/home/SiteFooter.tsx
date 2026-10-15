// The footer: the logo, the brand line, the product, legal and contact columns, and the disclaimer, from
// data/footer.ts. The legal links open the modals through their fs-modal and fs-cc attributes.
import { footer } from '@astro/data/footer';
import { asset } from '@astro/lib/site';

export default function SiteFooter() {
  return (
    <footer className="footer_component">
      <div className="padding-global"><div className="container-large">
        <div className="footer_top">
          <div className="footer_brand">
            <a className="brand_link" href="#top" aria-label="RedlineMD home"><img className="brand_logo" src={asset('logo-light.webp')} alt="Redline MD, Medical Contract Review" width="560" height="136" /></a>
            <p className="footer_text">{footer.text}</p>
          </div>
          {footer.columns.map((column) => (
            <div key={column.heading} className="footer_column"><p className="footer_heading">{column.heading}</p>{column.links.map((link) => <a key={link.label} className="footer_link" href={link.href} {...(link.attrs as Record<string, string>)}>{link.label}</a>)}</div>
          ))}
        </div>
        <div className="footer_bottom">
          <p className="footer_disclaimer">{footer.disclaimer}</p>
          {' '}
          <span>{footer.copyright}</span>
        </div>
      </div></div>
    </footer>
  );
}
