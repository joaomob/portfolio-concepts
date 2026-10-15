// The opening: the title, the two booking buttons and the pool at sunset.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';

export default function RooftopHero() {
  return (
    <>
<section className="roof_page_wrap u-theme-light" aria-labelledby="page-title">
  <div className="roof_page_contain u-container">
    <div className="roof_page_layout">
      <div className="roof_page_content">
        <p className="eyebrow_text">Can Arbós · Palma</p>
        <h1 className="roof_page_title u-text-style-h1" id="page-title">A rooftop bar and a small spa in Palma's old town</h1>
        <div className="u-button-wrapper"><Button label="Book a rooftop table" modal="contact-modal" data-contact="Rooftop table" /><Button label="Book a treatment" variant="secondary" modal="contact-modal" data-contact="Spa treatment" /></div>
      </div>
      <figure className="roof_page_media"><img {...img("rooftop/pool-sunset.webp", 1600)} className="roof_page_image" alt="A small plunge pool on the roof at sunset, with a wooden pergola, loungers and the cathedral on the skyline" width="1600" height="893" fetchPriority="high" /></figure>
    </div>
  </div>
</section>
    </>
  );
}
