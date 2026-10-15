// The upload modal (fs-modal, slide-up): file, email and payment, in three steps.
// Markup ported word for word from the original index.html.

export default function UploadModal() {
  return (
    <div className="modal_component" fs-modal-element="modal" fs-modal-instance="upload" fs-modal-animation="slide-up" role="dialog" aria-modal="true" aria-label="Upload your contract">
      {' '}
      <div className="modal_card">
        {' '}
        <div className="modal_close" fs-modal-element="close" fs-modal-instance="upload" role="button" tabIndex={0} aria-label="Close">
          ×
        </div>
        {' '}
        <div className="modal_progress" aria-hidden="true">
          <span className="modal_progress-bar is-active" data-bar="1" />
          <span className="modal_progress-bar" data-bar="2" />
          <span className="modal_progress-bar" data-bar="3" />
        </div>
        {' '}
        <div className="modal_upload-step is-active" data-step="1">
          {' '}
          <p className="modal_step">
            Step 1 of 3
          </p>
          {' '}
          <p className="modal_title">
            Upload your contract
          </p>
          {' '}
          <label className="modal_dropzone" data-drop="">
            <input type="file" accept=".pdf,.doc,.docx" hidden data-file="" />
            <span className="modal_dropzone-title" data-drop-text="">
              Drop your file or tap to choose
            </span>
            <span className="text-size-small text-color-secondary">
              PDF or Word, up to 30 pages
            </span>
          </label>
          {' '}
          <div className="spacer-small" />
          <a className="button is-full" href="#" data-next="2">
            <span className="button_content">
              Continue
            </span>
          </a>
          {' '}
          <p className="modal_foot">
            Report within 24 hours · No account needed
          </p>
          {' '}
        </div>
        {' '}
        <div className="modal_upload-step" data-step="2">
          {' '}
          <p className="modal_step">
            Step 2 of 3
          </p>
          {' '}
          <p className="modal_title">
            Where should we send your report?
          </p>
          {' '}
          <input className="modal_field" type="email" placeholder="you@hospital.org" aria-label="Email" data-email="" />
          {' '}
          <a className="button is-full" href="#" data-next="3">
            <span className="button_content">
              Continue to payment
            </span>
          </a>
          {' '}
        </div>
        {' '}
        <div className="modal_upload-step" data-step="3">
          {' '}
          <p className="modal_step">
            Step 3 of 3
          </p>
          {' '}
          <p className="modal_title">
            Pay $199
          </p>
          {' '}
          <div className="modal_pay-row">
            <span>
              Contract review
            </span>
            <span>
              $199
            </span>
          </div>
          {' '}
          <a className="button is-accent is-full" href="#" data-pay="">
            <span className="button_content">
              Pay $199
            </span>
          </a>
          {' '}
          <p className="modal_foot">
            Your report arrives within 24 hours.
          </p>
          {' '}
        </div>
        {' '}
      </div>
      {' '}
    </div>
  );
}
