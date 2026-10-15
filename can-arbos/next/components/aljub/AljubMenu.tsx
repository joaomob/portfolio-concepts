// The menu: four dishes in a round photo, the diet filter (it dims the dishes outside the diet and leaves them in
// place, so the menu keeps its shape), the four courses, the allergens and the tasting menu.
import { img } from '@/lib/paths';
import DishRow from './DishRow';
import { dishes, dishByOrder, COURSES, DIETS, FEATURED_DISHES, TASTING_COURSES } from '@astro/data/dining';

export default function AljubMenu() {
  const tasting = dishes.find((dish) => dish.course === 'tasting')!;
  return (
    <>
<section className="menu_page_wrap u-section u-theme-dark" id="menu" aria-labelledby="menu-title">
  <div className="menu_page_contain u-container">
    <div className="menu_page_head">
      <h2 className="menu_page_title u-text-style-h2" id="menu-title">The menu, with prices and allergens</h2>
      <p className="menu_page_note">Prices include VAT.</p>
    </div>
    <ul className="dish_feature_list" role="list" aria-label="Four dishes from the menu">{FEATURED_DISHES.map(({ order, photo, alt }) => {
      const dish = dishByOrder(order);
      return <li className="dish_feature_item"><div className="dish_feature_circle"><img {...img(`dining/${photo}`, 1024)} className="dish_feature_image" alt={alt} width="1024" height="1024" loading="lazy" /></div><p className="dish_feature_name u-text-style-h4">{dish.name}</p><p className="dish_feature_price">€{dish.price}</p></li>;
    })}</ul>
    <form className="filter_bar_wrap" data-filter-scope="" data-filter-mode="dim" aria-label="Filter the menu by diet">
      <fieldset className="filter_group"><legend className="field_label">Diet</legend>
        <label className="filter_chip"><input type="radio" name="diet" value="" defaultChecked /> All</label>
        {DIETS.map((diet) => <label className="filter_chip"><input type="radio" name="diet" value={diet} /> {diet}</label>)}
      </fieldset>
    </form>
    <p className="filter_empty" data-filter-empty="" data-visible="false">No dish matches this diet.</p>
    <div className="menu_page_grid">
      {COURSES.map((course) => (
        <div className="menu_course_wrap"><h3 className="menu_course_title eyebrow_text">{course.label}</h3><ul className="dish_list_wrap">{dishes.filter((dish) => dish.course === course.key).map((dish) => <DishRow dish={dish} />)}</ul></div>
      ))}
    </div>
    <div className="menu_diet_wrap">
      <h2 className="menu_diet_title u-text-style-h4" id="diet-title">Vegetarian, vegan and the 14 allergens</h2>
      <div className="menu_diet_body"><p className="menu_diet_text">We cook for vegetarian, vegan, gluten-free and dairy-free diets. Every dish shows which of the 14 allergens in EU law it contains.</p><p className="menu_diet_text">Every dish comes from one kitchen, so traces are possible. The pine nuts in the black pig loin aren't on the EU list. Our wines contain sulphites.</p></div>
    </div>
    <div className="tasting_menu_wrap">
      <div className="tasting_menu_content">
        <h3 className="tasting_menu_title u-text-style-h3">Tasting menu, seven courses for €{tasting.price}</h3>
        <p className="tasting_menu_text">Served to the whole table, priced per person. Island wines with each course add €60 per person. Vegetarian or vegan table? Tell us when you book, and the kitchen cooks its own version of each course for you.</p>
        <p className="dish_list_meta">Contains: {tasting.allergens.join(', ')}</p>
      </div>
      <ol className="tasting_menu_list">{TASTING_COURSES.map((course) => <li className="tasting_menu_item">{course}</li>)}</ol>
    </div>
  </div>
</section>
    </>
  );
}
