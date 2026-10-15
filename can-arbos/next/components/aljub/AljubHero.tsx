// The opening of Aljub: two round photos, the title, the line about the cistern and courtyard, and the two buttons.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';

export default function AljubHero() {
  return (
    <>
<section className="dining_page_wrap u-theme-dark" aria-labelledby="page-title">
  <div className="dining_page_contain u-container">
    <div className="dining_home_layout is-page">
      <div className="dining_home_media">
        <div className="dining_home_circle"><img {...img("dining/aljub-night.webp", 1400)} alt="Tables with linen and candles under stone vaults, around an old cistern with an iron well head" width="1400" height="781" fetchPriority="high" /></div>
        <div className="dining_home_circle is-small"><img {...img("dining/wine-courtyard.webp", 700)} alt="A glass of red wine and a bottle on a stone table in the courtyard at dusk" width="700" height="869" /></div>
      </div>
      <div className="dining_home_content">
        <p className="eyebrow_text">Can Arbós · Palma</p>
        <h1 className="dining_home_title u-text-style-h1" id="page-title">Aljub, a Mallorcan restaurant in Palma's old town</h1>
        <p className="dining_home_text u-text-style-large">Dinner is served around the house's old cistern, and in the courtyard from May to October. The kitchen cooks with produce from the island.</p>
        <div className="u-button-wrapper"><Button label="Book a table" modal="table-modal" /><Button label="See the menu" variant="secondary" href={"#menu"} /></div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
