// The dialogs every page can open: room, table, contact, sign up and sign in.
import Button from '@/components/ui/Button';
import ContactFields from './ContactFields';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  lang: Lang;
}

export default function Modals(props: Props) {
  const { lang } = props;
  const t = useTranslate(lang);
  return (
    <>
<dialog className="modal_dialog" id="room-modal" aria-labelledby="room-modal-title">
  <form className="modal_inner" data-demo-form="room" method="dialog" noValidate>
    <div className="modal_head"><h2 className="u-text-style-h3 u-margin-bottom-0" id="room-modal-title">{t("Book a room")}</h2><button type="button" className="modal_close" data-modal-close="">{t("Close")}</button></div>
    <div className="modal_grid">
      <div className="field_wrap"><label className="field_label" htmlFor="room-arrival">{t("Arrival")}</label><input className="field_input" id="room-arrival" name="arrival" type="date" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor="room-departure">{t("Departure")}</label><input className="field_input" id="room-departure" name="departure" type="date" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor="room-guests">{t("Guests")}</label><select defaultValue="2" className="field_input" id="room-guests" name="guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
      <div className="field_wrap"><label className="field_label" htmlFor="room-type">{t("Room type")}</label><select className="field_input" id="room-type" name="room"><option value="Any room">{t("Any room")}</option><option value="Courtyard Room">{t("Courtyard Room")}</option><option value="Old Town Room">{t("Old Town Room")}</option><option value="Junior Suite">{t("Junior Suite")}</option><option value="Terrace Suite">{t("Terrace Suite")}</option><option value="The Arbós Suite">{t("The Arbós Suite")}</option></select></div>
    </div>
    <p className="modal_note">{t("Free cancellation up to 7 days before arrival. Booking direct includes breakfast and a drink on the roof.")}</p>
    <Button label={t("Check availability")} type="submit" />
    <p className="modal_result" data-form-success="" data-visible="false">{t("This is a portfolio demo, so nothing gets booked here. A real hotel would send your dates, guests and room type to its booking engine from this step.")}</p>
  </form>
</dialog>

<dialog className="modal_dialog" id="table-modal" aria-labelledby="table-modal-title">
  <form className="modal_inner" data-demo-form="table" method="dialog" noValidate>
    <div className="modal_head"><h2 className="u-text-style-h3 u-margin-bottom-0" id="table-modal-title">{t("Book a table at Aljub")}</h2><button type="button" className="modal_close" data-modal-close="">{t("Close")}</button></div>
    <div className="modal_grid">
      <div className="field_wrap"><label className="field_label" htmlFor="table-date">{t("Date")}</label><input className="field_input" id="table-date" name="date" type="date" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor="table-time">{t("Time")}</label><select className="field_input" id="table-time" name="time"><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option></select></div>
      <div className="field_wrap"><label className="field_label" htmlFor="table-guests">{t("Guests")}</label><select defaultValue="2" className="field_input" id="table-guests" name="guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div>
      <div className="field_wrap"><label className="field_label" htmlFor="table-name">{t("Name")}</label><input className="field_input" id="table-name" name="name" type="text" autoComplete="name" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor="table-email">{t("Email")}</label><input className="field_input" id="table-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor="table-diet">{t("Diet or allergy (optional)")}</label><input className="field_input" id="table-diet" name="diet" type="text" /></div>
    </div>
    <p className="modal_note">{t("Hotel guests and members can book 60 days ahead. Everyone else, 30 days.")}</p>
    <Button label={t("Book this table")} type="submit" />
    <p className="field_error" data-form-error="" data-visible="false">{t("Please fill in the date, your name and an email address like name@example.com.")}</p>
    <p className="modal_result" data-form-success="" data-visible="false"></p>
  </form>
</dialog>

<dialog className="modal_dialog" id="contact-modal" aria-labelledby="contact-modal-title">
  <form className="modal_inner" data-demo-form="contact" method="dialog" noValidate>
    <div className="modal_head"><h2 className="u-text-style-h3 u-margin-bottom-0" id="contact-modal-title">{t("Contact us")}</h2><button type="button" className="modal_close" data-modal-close="">{t("Close")}</button></div>
    <ContactFields prefix="contact" lang={lang} />
  </form>
</dialog>

<dialog className="modal_dialog" id="signup-modal" aria-labelledby="signup-modal-title">
  <form className="modal_inner" data-member-form="signup" method="dialog" noValidate>
    <div className="modal_head"><h2 className="u-text-style-h3 u-margin-bottom-0" id="signup-modal-title">{t("Create your account")}</h2><button type="button" className="modal_close" data-modal-close="">{t("Close")}</button></div>
    <div className="field_wrap"><label className="field_label" htmlFor="signup-name">{t("First name")}</label><input className="field_input" id="signup-name" name="first_name" type="text" autoComplete="given-name" required /></div>
    <div className="field_wrap"><label className="field_label" htmlFor="signup-email">{t("Email")}</label><input className="field_input" id="signup-email" name="email" type="email" autoComplete="email" required /></div>
    <div className="field_wrap"><label className="field_label" htmlFor="signup-password">{t("Password")}</label><input className="field_input" id="signup-password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
    <p className="modal_note">{t("We'll only email you about your bookings, unless you subscribe to our letters.")}</p>
    <p className="modal_note">{t("This is a portfolio demo. Accounts are test accounts and are deleted every month.")}</p>
    <Button label={t("Create account")} type="submit" />
    <p className="field_error" data-form-error="" data-visible="false">{t("Please use at least 8 characters for your password.")}</p>
  </form>
</dialog>

<dialog className="modal_dialog" id="signin-modal" aria-labelledby="signin-modal-title">
  <form className="modal_inner" data-member-form="signin" method="dialog" noValidate>
    <div className="modal_head"><h2 className="u-text-style-h3 u-margin-bottom-0" id="signin-modal-title">{t("Sign in")}</h2><button type="button" className="modal_close" data-modal-close="">{t("Close")}</button></div>
    <div className="field_wrap"><label className="field_label" htmlFor="signin-email">{t("Email")}</label><input className="field_input" id="signin-email" name="email" type="email" autoComplete="email" required /></div>
    <div className="field_wrap"><label className="field_label" htmlFor="signin-password">{t("Password")}</label><input className="field_input" id="signin-password" name="password" type="password" autoComplete="current-password" required /></div>
    <p className="modal_note">{t("This is a portfolio demo. Accounts are test accounts and are deleted every month.")}</p>
    <Button label={t("Sign in")} type="submit" />
    <p className="field_error" data-form-error="" data-visible="false">{t("That email and password don't match. Try again or reset your password.")}</p>
    <p className="modal_note"><a href="#" data-modal-close="">{t("Forgot your password?")}</a></p>
  </form>
</dialog>
    </>
  );
}
