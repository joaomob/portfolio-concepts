// One story per section of bag.html and checkout.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Shop' };

export const BagShop = { name: 'Bag', render: section('bag', 'shop'), parameters: note('bag', 'shop') };

export const CheckoutShop = { name: 'Checkout', render: section('checkout', 'shop'), parameters: note('checkout', 'shop') };

export const CheckoutThanks = { name: 'Order thanks', render: section('checkout', 'thanks'), parameters: note('checkout', 'thanks') };
