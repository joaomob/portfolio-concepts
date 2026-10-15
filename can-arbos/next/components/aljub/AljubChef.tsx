// The chef and the sommelier, then breakfast for hotel guests.
import { img } from '@/lib/paths';

export default function AljubChef() {
  return (
    <>
<section className="chef_page_wrap u-section u-theme-light" aria-labelledby="chef-title">
  <div className="chef_page_contain u-container">
    <div className="split_block_layout is-reverse">
      <img {...img("dining/chef-market.webp", 900)} className="split_block_image" alt="A chef in a white jacket choosing fresh fish at a market stall" width="900" height="1117" loading="lazy" />
      <div className="split_block_content">
        <h2 className="split_block_title u-text-style-h2" id="chef-title">Our chef shops at Mercat de l'Olivar</h2>
        <p className="split_block_text">Margalida Bauzà walks there most mornings. The menu changes with what she finds. Bernat Coll, our sommelier, pours wines from Binissalem and Pla i Llevant, the island's two DO regions.</p>
        <ul className="team_list_wrap"><li className="team_list_item"><h3 className="team_list_name u-text-style-h4">Margalida Bauzà</h3><p className="team_list_role">Chef</p></li><li className="team_list_item"><h3 className="team_list_name u-text-style-h4">Bernat Coll</h3><p className="team_list_role">Sommelier</p></li></ul>
      </div>
    </div>
    <div className="breakfast_block_layout">
      <img {...img("dining/breakfast-gallery.webp", 900)} className="breakfast_block_image is-arch" alt="A breakfast tray with coffee, an ensaïmada and orange juice on a small table in the stone gallery, beside green shutters" width="900" height="1117" loading="lazy" />
      <div className="breakfast_block_content">
        <h2 className="breakfast_block_title u-text-style-h3" id="breakfast-title">Breakfast, cooked to order with island produce</h2>
        <p className="breakfast_block_text">Breakfast is for hotel guests, between 8:00 and 11:00. It's served in the courtyard May to October and around the cistern in winter.</p>
        <p className="breakfast_block_text">Eggs are cooked when you order them. The ensaïmada comes warm from the oven.</p>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
