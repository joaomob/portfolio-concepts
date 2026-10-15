// The footer: the section list, the legal documents and the Codex (both open in the reader), the language
// switcher and the credit.
import { sections } from '@astro/data/sections';
import { legalLinks, codexLinks, languages } from '@astro/data/footer';
import { asset } from '@astro/lib/site';

export default function SiteFooter() {
  return (
    <footer className="section section_footer">
      <div className="section-card footer">
        <img className="footer_logo" src={asset('logo-white.svg')} alt="Olimpo" width="103" height="32" loading="lazy" />
        <div className="footer-grid">
          <div className="footer-column">
            <p className="text-footer light">Navegação</p>
            <ul className="footer-nav">
              {sections.map((s) => <li key={s.id}><a className="navigation-link" href={`#${s.id}`}>{s.name}</a></li>)}
            </ul>
          </div>
          <div className="grid-right-footer">
            <div className="flex-footer">
              <p className="text-footer light">Legal</p>
              {legalLinks.map((l) => <button key={l.label} className="footer-link" type="button" data-codex={l.codex} data-section={l.section}>{l.label}</button>)}
            </div>
            <div className="flex-footer">
              <p className="text-footer light">Códex</p>
              {codexLinks.map((l) => <button key={l.label} className="footer-link" type="button" data-codex={l.codex}>{l.label}</button>)}
            </div>
            <div className="flex-footer">
              <p className="text-footer light">Idioma</p>
              <div className="lang-switcher" role="group" aria-label="Idioma">
                {languages.map((lang) => (
                  <button key={lang.code} type="button" aria-pressed={lang.ready ? 'true' : 'false'} aria-disabled={lang.ready ? undefined : 'true'} data-lang={lang.code} title={lang.ready ? undefined : 'Tradução pendente'}>{lang.label}</button>
                ))}
              </div>
            </div>
            <div className="flex-footer">
              <p className="text-footer light">Crédito</p>
              <p className="text-footer">Design e código · Response Design</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
