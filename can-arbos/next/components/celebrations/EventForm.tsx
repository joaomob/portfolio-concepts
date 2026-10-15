// The request form, with the contact fields of the modal and the type already set to Celebration.
import ContactFields from '@/components/layout/ContactFields';

export default function EventForm() {
  return (
    <>
<section className="event_form_wrap u-section u-theme-light u-background-2" id="event-form" aria-labelledby="form-title">
  <div className="event_form_contain u-container">
    <div className="event_form_layout">
      <div className="event_form_intro">
        <h2 className="event_form_title u-text-style-h2" id="form-title">Tell us about your day</h2>
        <p className="event_form_text">We reply within two working days.</p>
        <figure className="event_form_quote"><p className="event_form_words u-text-style-large">I answer every celebration request myself, and I'm the person you call on the day.</p><p className="team_list_role">Neus Vallespir · Events coordinator</p></figure>
      </div>
      <form className="event_form_fields" data-demo-form="event" data-contact-preset="Celebration" noValidate>
        <ContactFields prefix="event" />
      </form>
    </div>
  </div>
</section>
    </>
  );
}
