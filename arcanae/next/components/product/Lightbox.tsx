// The full-size image viewer of the product page (Lightbox.astro).
export default function Lightbox() {
  return (
    <div className="lightbox_component" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
      <button className="lightbox_close" aria-label="Close">×</button>
      <img className="lightbox_image" id="lightbox-img" alt="" />
    </div>
  );
}
