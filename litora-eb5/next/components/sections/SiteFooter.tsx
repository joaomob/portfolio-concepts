import type { SharedView, ViewOf } from '@astro/lib/content';
import { Logo } from '../Logo';

export function SiteFooter({ view, shared }: { view: ViewOf<'site-footer'>; shared: SharedView }) {
  const { footer } = shared.global;
  return (
    <footer className={`site-footer_component ${view.bgClass}`}>
      <div className="padding-global">
        <div className="container-large">
          <div className="site-footer_top">
            <div className="site-footer_brand" data-reveal="">
              <Logo shared={shared} />
              <p className="text-size-large">{footer.about}</p>
              <p className="text-size-small text-color-secondary">{view.fictionalNotice}</p>
            </div>
            <span className="site-footer_divider" aria-hidden="true"></span>
            <ul className="site-footer_links" role="list" data-reveal="">
              <li><a className="site-footer_link" href={shared.privacyHref}>{footer.privacyLabel}</a></li>
              <li><a className="site-footer_link" href={shared.languages.href} hrefLang={shared.languages.lang} lang={shared.languages.lang}>{footer.languageLinkLabel}</a></li>
            </ul>
          </div>
          <div className="site-footer_bottom">
            <p className="text-size-small text-color-secondary"><strong>{footer.legalNoticeTitle}</strong> {footer.legalNotice}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
