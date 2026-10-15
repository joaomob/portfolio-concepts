// The cookie banner (fs-cc banner): reject, accept and the link to the preferences.
// Markup ported word for word from the original index.html.

export default function CookieBanner() {
  return (
    <div className="cookie_banner" fs-cc="banner" role="region" aria-label="Cookie consent">
      {' '}
      <p className="cookie_title">
        Cookies
      </p>
      {' '}
      <p className="text-size-small text-color-secondary">
        We use cookies to measure traffic and improve your experience.
      </p>
      {' '}
      <div className="cookie_actions">
        <a className="button is-small is-secondary" href="#" fs-cc="deny">
          <span className="button_content">
            Reject
          </span>
        </a>
        <a className="button is-small" href="#" fs-cc="allow">
          <span className="button_content">
            Accept
          </span>
        </a>
      </div>
      {' '}
      <a className="cookie_link" href="#cookie-settings" fs-cc="open-preferences">
        Choose cookies
      </a>
      {' '}
    </div>
  );
}
