// The fields of the contact form, by type of request. The contact modal and the inline form of the celebrations page
// share them, so every id carries a prefix. The event form names its two required fields in the error.
import Button from '@/components/ui/Button';
import { page } from '@/lib/paths';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  prefix: string;
  lang?: Lang;
}

export default function ContactFields(props: Props) {
  const { prefix, lang = 'en' } = props;
  const t = useTranslate(lang);
  const error =
    prefix === 'event'
      ? 'Please fill in the date, the number of guests, your name and an email address like name@example.com.'
      : 'Please fill in every field of your request, your name and an email address like name@example.com.';
  return (
    <>
<div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-type`}>{t("What's it about?")}</label><select className="field_input" id={`${prefix}-type`} name="type" data-contact-switch=""><option value="Stay">{t("Stay")}</option><option value="Celebration">{t("Celebration")}</option><option value="Experience">{t("Experience")}</option><option value="Spa treatment">{t("Spa treatment")}</option><option value="Rooftop table">{t("Rooftop table")}</option><option value="Press">{t("Press")}</option><option value="Something else">{t("Something else")}</option></select></div>
    <fieldset className="contact_fields" data-contact-type="Stay">
      <legend className="u-sr-only">{t("Your stay")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-arrival`}>{t("Arrival")}</label><input className="field_input" id={`${prefix}-arrival`} name="arrival" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-departure`}>{t("Departure")}</label><input className="field_input" id={`${prefix}-departure`} name="departure" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-stay-guests`}>{t("Guests")}</label><select defaultValue="2" className="field_input" id={`${prefix}-stay-guests`} name="stay_guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
      </div>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-question`}>{t("Your question")}</label><textarea className="field_input is-textarea" id={`${prefix}-question`} name="question" rows={3}></textarea></div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Celebration">
      <legend className="u-sr-only">{t("Your celebration")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-kind`}>{t("Type of celebration")}</label><select className="field_input" id={`${prefix}-kind`} name="kind"><option value="Wedding">{t("Wedding")}</option><option value="Elopement">{t("Elopement")}</option><option value="Private dinner">{t("Private dinner")}</option><option value="Company event">{t("Company event")}</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-date`}>{t("Date")}</label><input className="field_input" id={`${prefix}-date`} name="event_date" type="date" data-required-for="Celebration" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-guests`}>{t("Number of guests")}</label><input className="field_input" id={`${prefix}-guests`} name="event_guests" type="number" min="2" max="40" data-required-for="Celebration" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-rooms`}>{t("Rooms needed")}</label><select className="field_input" id={`${prefix}-rooms`} name="rooms"><option value="None">{t("None")}</option><option value="Some">{t("Some")}</option><option value="The whole house">{t("The whole house")}</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-budget`}>{t("Budget")}</label><select className="field_input" id={`${prefix}-budget`} name="budget"><option value="Not sure yet">{t("Not sure yet")}</option><option value="Under €10,000">{t("Under €10,000")}</option><option value="€10,000 to €25,000">{t("€10,000 to €25,000")}</option><option value="Over €25,000">{t("Over €25,000")}</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-phone`}>{t("Phone")}</label><input className="field_input" id={`${prefix}-phone`} name="phone" type="tel" autoComplete="tel" /></div>
      </div>
      <label className="check_wrap"><input type="checkbox" name="flexible" /> {t("My date is flexible")}</label>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-know`}>{t("Anything we should know")}</label><textarea className="field_input is-textarea" id={`${prefix}-know`} name="know" rows={3}></textarea></div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Experience">
      <legend className="u-sr-only">{t("Your experience")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-experience`}>{t("Experience")}</label><select className="field_input" id={`${prefix}-experience`} name="experience" data-contact-detail=""><option value="Sunset sail in the Bay of Palma">{t("Sunset sail in the Bay of Palma")}</option><option value="Morning at Mercat de l&#x27;Olivar with our chef">{t("Morning at Mercat de l'Olivar with our chef")}</option><option value="Old town courtyards walk">{t("Old town courtyards walk")}</option><option value="Wine tasting in Binissalem">{t("Wine tasting in Binissalem")}</option><option value="A llaüt to a cove">{t("A llaüt to a cove")}</option><option value="Palma Cathedral and its terraces">{t("Palma Cathedral and its terraces")}</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-exp-date`}>{t("Date")}</label><input className="field_input" id={`${prefix}-exp-date`} name="experience_date" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-exp-guests`}>{t("Guests")}</label><select defaultValue="2" className="field_input" id={`${prefix}-exp-guests`} name="experience_guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select></div>
      </div>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-exp-know`}>{t("Anything we should know")}</label><textarea className="field_input is-textarea" id={`${prefix}-exp-know`} name="experience_know" rows={3}></textarea></div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Spa treatment">
      <legend className="u-sr-only">{t("Your treatment")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-treatment`}>{t("Treatment")}</label><select className="field_input" id={`${prefix}-treatment`} name="treatment" data-contact-detail=""><option value="Relaxing massage">{t("Relaxing massage")}</option><option value="Deep tissue massage">{t("Deep tissue massage")}</option><option value="Facial with almond oil">{t("Facial with almond oil")}</option><option value="Massage for two, side by side">{t("Massage for two, side by side")}</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-spa-date`}>{t("Date")}</label><input className="field_input" id={`${prefix}-spa-date`} name="spa_date" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-spa-time`}>{t("Time")}</label><select className="field_input" id={`${prefix}-spa-time`} name="spa_time"><option value="10:00">10:00</option><option value="12:00">12:00</option><option value="14:00">14:00</option><option value="16:00">16:00</option><option value="18:00">18:00</option></select></div>
      </div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Rooftop table">
      <legend className="u-sr-only">{t("Your rooftop table")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-roof-date`}>{t("Date")}</label><input className="field_input" id={`${prefix}-roof-date`} name="roof_date" type="date" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-roof-time`}>{t("Time")}</label><select className="field_input" id={`${prefix}-roof-time`} name="roof_time"><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option></select></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-roof-guests`}>{t("Guests")}</label><select defaultValue="2" className="field_input" id={`${prefix}-roof-guests`} name="roof_guests"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
      </div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Press">
      <legend className="u-sr-only">{t("Your press request")}</legend>
      <div className="modal_grid">
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-publication`}>{t("Publication")}</label><input className="field_input" id={`${prefix}-publication`} name="publication" type="text" /></div>
        <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-deadline`}>{t("Deadline")}</label><input className="field_input" id={`${prefix}-deadline`} name="deadline" type="date" /></div>
      </div>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-need`}>{t("What you need")}</label><textarea className="field_input is-textarea" id={`${prefix}-need`} name="need" rows={3}></textarea></div>
    </fieldset>
    <fieldset className="contact_fields" data-contact-type="Something else">
      <legend className="u-sr-only">{t("Your message")}</legend>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-message`}>{t("Your message")}</label><textarea className="field_input is-textarea" id={`${prefix}-message`} name="message" rows={4}></textarea></div>
    </fieldset>
    <div className="modal_grid">
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-name`}>{t("Your name")}</label><input className="field_input" id={`${prefix}-name`} name="name" type="text" autoComplete="name" required /></div>
      <div className="field_wrap"><label className="field_label" htmlFor={`${prefix}-email`}>{t("Email")}</label><input className="field_input" id={`${prefix}-email`} name="email" type="email" autoComplete="email" required /></div>
    </div>
    <p className="modal_note">{t("We keep your details only to show how this demo works.")} <a href={page("privacy")}>{t("Read our privacy notice.")}</a></p>
    <Button label={t("Send request")} type="submit" />
    <p className="field_error" data-form-error="" data-visible="false">{t(error)}</p>
    <p className="modal_result" data-form-success="" data-visible="false"></p>
    </>
  );
}
