// The cookie preferences panel (fs-cc preferences): essential, analytics and marketing.
// Markup ported word for word from the original index.html.

export default function CookiePreferences() {
  return (
    <div className="cookie_preferences" fs-cc="preferences" role="dialog" aria-modal="true" aria-label="Cookie settings">
      {' '}
      <div className="modal_card is-legal">
        {' '}
        <div className="modal_close" fs-cc="close" role="button" tabIndex={0} aria-label="Close">
          ×
        </div>
        {' '}
        <p className="modal_title">
          Cookie settings
        </p>
        {' '}
        <div className="cookie_pref-row">
          <div>
            <p className="legal_heading">
              Essential
            </p>
            <p className="legal_text">
              Needed for upload, checkout and security. Always on.
            </p>
          </div>
          <span className="pill is-gray">
            Always on
          </span>
        </div>
        {' '}
        <label className="cookie_pref-row">
          <div>
            <p className="legal_heading">
              Analytics
            </p>
            <p className="legal_text">
              Anonymous traffic measurement that helps us improve the site.
            </p>
          </div>
          <input className="cookie_checkbox" type="checkbox" fs-cc-checkbox="analytics" />
        </label>
        {' '}
        <label className="cookie_pref-row">
          <div>
            <p className="legal_heading">
              Marketing
            </p>
            <p className="legal_text">
              Measures which ads bring physicians to Redline MD.
            </p>
          </div>
          <input className="cookie_checkbox" type="checkbox" fs-cc-checkbox="marketing" />
        </label>
        {' '}
        <div className="spacer-small" />
        <a className="button is-full" href="#" fs-cc="submit">
          <span className="button_content">
            Save preferences
          </span>
        </a>
        {' '}
      </div>
      {' '}
    </div>
  );
}
