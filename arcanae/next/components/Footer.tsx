// The site footer (Footer.astro): brand column, links, copyright and the scrolling logo band.
import { Fragment } from 'react';
import { asset, page } from '../../astro/src/lib/site';

const INFO = [
  { path: 'shipping', label: 'Shipping & Returns' },
  { path: 'terms', label: 'Terms' },
  { path: 'privacy', label: 'Privacy' },
  { path: 'legal-notice', label: 'Legal Notice' },
];

export default function Footer({ base, onHome = false }: { base: string; onHome?: boolean }) {
  return (
    <footer className="footer_component theme-inverse">
      <div className="padding-global"><div className="container-large">
        <div className="footer_grid">
          <div className="footer_column">
            <img className="footer_logo" src={asset('brand/wordmark-h-marble.svg')} alt="Arcanae Craft" />
            <p className="footer_description">Hand-painted tarot figurines and statues of the 22 Major Arcana. Made in A Coruña, Spain.</p>
          </div>
          <div className="footer_column"><div className="footer_heading">Shop</div>
            <div className="footer_link-list">
              <a className="footer_link" href={page(base, 'collection')}>The Collection</a>
              <a className="footer_link" href={onHome ? '#craft' : `${page(base)}#craft`}>The Craft</a>
            </div>
          </div>
          <div className="footer_column"><div className="footer_heading">Info</div>
            <div className="footer_link-list">
              {INFO.map((l) => <a key={l.path} className="footer_link" href={page(base, l.path)}>{l.label}</a>)}
            </div>
          </div>
        </div>
        <p className="footer_copyright-text">© <span id="yr"></span> Arcanae Craft · Made in Spain</p>
      </div></div>
      <div className="footer_marquee" aria-hidden="true"><div className="footer_marquee-track">{[1, 2, 3, 4].map((n) => (
        <Fragment key={n}><img className="footer_marquee-logo" src={asset('brand/wordmark-h-marble.svg')} alt="" /><img className="footer_marquee-emblem" src={asset('brand/emblem-gold.svg')} alt="" /></Fragment>
      ))}</div></div>
    </footer>
  );
}
