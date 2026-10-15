// The page hero: the small nav, the title, the intro and the numbered index of the six sections.
import { heroNav, sectionIndex } from '@astro/data/style-guide-nav';

export default function SgHero() {
  return (
    <section className="section_page-hero" id="content"><div className="padding-global is-large"><div className="container-large"><div className="page-hero_component padding-section-medium">
      <div className="nav_component margin-bottom margin-xlarge">
        <div className="nav_logo">Olimpo</div>
        <nav className="nav_menu">{heroNav.map((l) => <a key={l.href} href={l.href} className="nav_menu-link">{l.label}</a>)}</nav>
      </div>
      <div className="page-hero_eyebrow">Olimpo · Design System</div>
      <h1 className="page-hero_title">Style Guide</h1>
      <p className="page-hero_intro">The foundations behind every screen: type, color, spacing and components.
        Built on Finsweet Client First, with a fluid root scale and a two-layer color model.</p>
      <div className="spacer-large" />
      <nav className="sg-nav">
        {sectionIndex.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
    </div></div></div></section>
  );
}
