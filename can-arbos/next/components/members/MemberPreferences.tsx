// The preferences card of "My stay": diets, allergies, coffee, pillow and what the member is celebrating.
import Button from '@/components/ui/Button';
import { DIETS } from '@astro/data/dining';

export default function MemberPreferences() {
  const FIELDS: [name: string, label: string][] = [
    ['allergies', 'Allergies'],
    ['coffee', 'How do you take your coffee?'],
  ];
  return (
    <>
<section className="member_card_wrap is-wide" aria-labelledby="prefs-title">
  <h2 className="member_card_title u-text-style-h3" id="prefs-title">Your preferences</h2>
  <form className="member_form_wrap" data-member-form="prefs" noValidate>
    <fieldset className="member_form_group"><legend className="field_label">Diet, choose any</legend>{DIETS.map((diet) => <label className="check_wrap"><input type="checkbox" name="diet" value={diet} /> {diet}</label>)}</fieldset>
    <div className="modal_grid">
      {FIELDS.map(([name, label]) => (
        <div className="field_wrap"><label className="field_label" htmlFor={`pref-${name}`}>{label}</label><input className="field_input" id={`pref-${name}`} name={name} type="text" /></div>
      ))}
      <div className="field_wrap"><label className="field_label" htmlFor="pref-pillow">Pillow</label><select className="field_input" id="pref-pillow" name="pillow"><option value="Soft">Soft</option><option value="Firm">Firm</option></select></div>
      <div className="field_wrap"><label className="field_label" htmlFor="pref-celebrating">Are you celebrating anything?</label><input className="field_input" id="pref-celebrating" name="celebrating" type="text" /></div>
    </div>
    <Button label="Save preferences" type="submit" />
    <p className="modal_result" data-form-success="" data-visible="false">Saved. We'll have these ready for your next visit.</p>
  </form>
</section>
    </>
  );
}
