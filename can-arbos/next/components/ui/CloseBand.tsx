// The closing band of every inner page: the cancellation line and the pair of booking buttons.
import Button from './Button';

export default function CloseBand() {
  return (
    <>
<section className="close_home_wrap u-section u-theme-dark" aria-label="Book">
  <div className="close_home_contain u-container">
    <div className="close_home_layout">
      <p className="close_home_line u-text-style-h2">Free room cancellation up to 7 days before arrival.</p>
      <div className="u-button-wrapper"><Button label="Book a room" modal="room-modal" /><Button label="Book a table" modal="table-modal" variant="secondary" /></div>
    </div>
  </div>
</section>
    </>
  );
}
