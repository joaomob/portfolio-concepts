// The opening over the courtyard dinner photo, with the three numbers of the house.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';

export default function CelebrationsHero() {
  return (
    <>
<section className="fest_page_wrap fest_home_wrap u-theme-brand" aria-labelledby="page-title">
  <img {...img("celebrations/courtyard-dinner.webp", 1920)} className="fest_home_image" alt="Long tables with candles and olive branches under the courtyard arches at night, with guests seated" width="1920" height="1072" fetchPriority="high" />
  <div className="fest_home_contain u-container">
    <div className="fest_home_layout">
      <div className="fest_home_panel is-wide">
        <p className="eyebrow_text">Celebrations</p>
        <h1 className="fest_home_title u-text-style-h1" id="page-title">An intimate wedding venue in Palma's old town</h1>
        <p className="fest_home_text">Can Arbós suits weddings of 10 to 40 people, elopements for two, and birthday dinners that need a whole courtyard. We host one celebration at a time. Celebrations follow the house rule, so every guest must be 16 or older.</p>
        <div className="u-button-wrapper"><Button label="Plan a celebration" href="#event-form" /></div>
      </div>
      <dl className="fest_page_facts">
        <div className="fest_page_fact"><dt className="fest_page_label">at dinner</dt><dd className="fest_page_number u-text-style-h2">40</dd></div>
        <div className="fest_page_fact"><dt className="fest_page_label">at a ceremony</dt><dd className="fest_page_number u-text-style-h2">30</dd></div>
        <div className="fest_page_fact"><dt className="fest_page_label">rooms, the whole house</dt><dd className="fest_page_number u-text-style-h2">21</dd></div>
      </dl>
    </div>
  </div>
</section>
    </>
  );
}
