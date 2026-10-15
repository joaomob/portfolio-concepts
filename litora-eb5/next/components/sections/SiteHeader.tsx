// The fixed header: hidden while the hero is on screen (motion.ts, interaction 1), dark over dark sections (14).
import type { SharedView, ViewOf } from '@astro/lib/content';
import { ButtonLabel } from '../ButtonLabel';
import { LanguageSwitch } from '../LanguageSwitch';
import { Logo } from '../Logo';

export function SiteHeader({ view, shared }: { view: ViewOf<'site-header'>; shared: SharedView }) {
  return (
    <header className={view.hasHero ? 'site-header_component is-hidden' : 'site-header_component'} data-site-header="">
      <div className="padding-global">
        <div className="container-large">
          <div className="site-header_layout">
            <div className="site-header_languages"><LanguageSwitch shared={shared} /></div>
            <Logo shared={shared} />
            <div className="site-header_action">{view.ctaLabel && <a className="button" href={view.ctaTarget}><ButtonLabel label={view.ctaLabel} /></a>}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
