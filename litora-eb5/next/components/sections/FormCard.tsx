// The registration form inside the hero panel. Every message is in the markup (data-error-*), in the page language;
// astro/src/scripts/form.ts checks the fields and takes the visitor to the thank you page (it never posts).
// The fields stay uncontrolled on purpose: the same script runs on the Astro build, where there is no React.
import type { FormView } from '@astro/lib/content';
import { ButtonLabel } from '../ButtonLabel';
import { Keep } from '../Keep';

export function FormCard({ view }: { view: FormView }) {
  return (
    <div className="form-card_component" id={view.anchorId}>
      <h2 className="heading-style-h3"><Keep text={view.heading} /></h2>
      <form className="form-card_form" method="post" action={view.redirect} data-hubspot-form="" data-redirect={view.redirect} data-page-name={view.pageName}>
        <div className="form_component">
          {view.fields.map((field) => {
            if (field.kind === 'text') return (
              <div key={field.id} className={field.half ? 'form_field' : 'form_field is-full'}>
                <label className="form_label" htmlFor={field.id}>{field.label}</label>
                <input className="form_input" id={field.id} name={field.name} type={field.type} autoComplete={field.autocomplete} required
                  aria-describedby={field.describedBy} data-form-text="" data-error-required={field.errors.required} data-error-invalid={field.errors.invalid} />
                {field.help && <p className="form_help" id={field.helpId}>{field.help}</p>}
                <p className="form_error" id={field.errorId} data-form-error=""></p>
              </div>
            );
            if (field.kind === 'radio') return (
              <fieldset key={field.id} className="form_field is-full" aria-describedby={field.errorId} data-form-group="" data-error-required={field.errors.required}>
                <legend className="form_label">{field.label}</legend>
                <div className="form_options">
                  {field.options?.map((option) => (
                    <label key={option.value} className="form_check">
                      <input className="form_check-input is-radio" type="radio" name={field.name} value={option.value} required /><span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className="form_error" id={field.errorId} data-form-error=""></p>
              </fieldset>
            );
            return (
              <div key={field.id} className="form_field is-full">
                <label className="form_check">
                  <input className="form_check-input" type="checkbox" id={field.id} name={field.name} value="true" required aria-describedby={field.errorId}
                    data-form-check="" data-error-required={field.errors.required} data-consent-text={field.isConsent ? field.label : undefined} />
                  <span>{field.label}</span>
                </label>
                {field.linkLabel && <p className="form_help"><a href={field.linkHref}>{field.linkLabel}</a></p>}
                <p className="form_error" id={field.errorId} data-form-error=""></p>
              </div>
            );
          })}
          <div className="form_field is-full">
            <button className="button" type="submit"><ButtonLabel label={view.submitLabel} /></button>
            <p className="form_help">{view.submitNote}</p>
            <p className="form_error" role="alert" data-form-status="" data-submit-error={view.submitError}></p>
          </div>
        </div>
      </form>
      <p className="form-card_notice text-size-small text-color-secondary">{view.notice}</p>
    </div>
  );
}
