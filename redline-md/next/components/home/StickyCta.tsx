// The mobile sticky upload button, shown between the hero call and the final call.
// Markup ported word for word from the original index.html.

export default function StickyCta() {
  return (
    <div className="sticky-cta_component" data-sticky="">
      <a className="button is-accent is-full" href="#" fs-modal-element="open" fs-modal-instance="upload">
        <span className="button_content">
          {"Upload contract "}
          <span className="button_price">
            $199
          </span>
        </span>
      </a>
    </div>
  );
}
