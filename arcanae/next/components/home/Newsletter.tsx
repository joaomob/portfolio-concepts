// Home newsletter (Newsletter.astro).
export default function Newsletter() {
  return (
    <section className="section_newsletter" id="newsletter"><div className="padding-global padding-section-medium"><div className="container-large">
      <div className="newsletter_component">
        <h2 className="newsletter_heading">News from Arcanae Craft</h2>
        <div className="newsletter_form-block" data-wf-form="block">
          <form className="newsletter_form" id="newsletter-form" name="newsletter-form" data-name="Newsletter" data-wf-form="form">
            <label className="visually-hidden" htmlFor="newsletter-email" data-wf-form="label">Email for new drops &amp; collections</label>
            <input className="newsletter_input" id="newsletter-email" type="email" name="email" data-name="Email" maxLength={256} autoComplete="email" required placeholder="Email for new drops & collections" data-wf-form="input" />
            <input className="button is-gold" type="submit" value="Sign up" data-wait="Please wait..." data-wf-form="button" />
          </form>
          <div className="newsletter_status" data-wf-form="success" role="status"><div>Thanks, you’re on the list.</div></div>
          <div className="newsletter_status" data-wf-form="fail" role="alert"><div>Oops! Something went wrong while submitting the form.</div></div>
        </div>
      </div>
    </div></div></section>
  );
}
