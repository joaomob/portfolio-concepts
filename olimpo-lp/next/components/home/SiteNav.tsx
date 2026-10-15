// The header: the logo, the numbered index of the twelve sections with previous and next, the Codex and the CTA.
import { Fragment } from 'react';
import { sections } from '@astro/data/sections';
import { asset } from '@astro/lib/site';

export default function SiteNav() {
  return (
    <header className="nav" data-nav="">
      <a className="nav_logo" href="#opening" aria-label="Olimpo, início">
        <img className="nav_logo-black" src={asset('logo-black.svg')} alt="" width="128" height="40" />{' '}
        <img className="nav_logo-white" src={asset('logo-white.svg')} alt="" width="128" height="40" />
      </a>
      <nav className="nav_index" aria-label="Seções da página">
        <button className="nav_step" type="button" data-sec-prev="" aria-label="Seção anterior"><span aria-hidden="true">‹</span></button>
        <ol className="nav_list" data-nav-list="">
          {sections.map((s) => (
            <Fragment key={s.id}>
              <li><a href={`#${s.id}`} data-sec={s.id} aria-label={`${s.n}, ${s.name}`}><span className="nav_n">{s.n}</span><span className="nav_nm"><span>{s.name}</span></span></a></li>
              {s.endsGroup && <li className="nav_sep" aria-hidden="true" />}
            </Fragment>
          ))}
        </ol>
        <button className="nav_step" type="button" data-sec-next="" aria-label="Próxima seção"><span aria-hidden="true">›</span></button>
      </nav>
      <div className="nav_right">
        <a className="nav_codex" href="#codex/indice" data-codex="IDX">Códex<span className="nav_count" data-nav-count="" hidden /></a>{' '}
        <a className="nav_cta" href="#plans">Começar grátis</a>
      </div>
    </header>
  );
}
