// One dish of the menu: name, price, text, then its diets and the allergens it contains. The diets also go in a data
// attribute that the menu filter reads.
import type { Dish } from '@astro/data/dining';

export interface Props {
  dish: Dish;
}

export default function DishRow(props: Props) {
  const { dish } = props;
  const diets = dish.diets.length ? `${dish.diets.join(' · ')} · ` : '';
  const allergens = dish.allergens.length ? `Contains: ${dish.allergens.join(', ')}` : 'None of the 14 allergens';
  return (
    <>
<li className="dish_list_item" data-filter-item="" data-filter-diet={dish.diets.join('|')}><h4 className="dish_list_name u-text-style-h4">{dish.name}</h4><span className="dish_list_line" aria-hidden="true"></span><p className="dish_list_price u-text-style-h4">€{dish.price}</p><p className="dish_list_text">{dish.description}</p><p className="dish_list_meta">{diets}{allergens}</p></li>
    </>
  );
}
