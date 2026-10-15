// One story per section of the product page, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Product' };

export const Product = { name: 'Product', render: section('product', 'product'), parameters: note('product', 'product') };
export const Trust = { name: 'Trust row', render: section('product', 'trust'), parameters: note('product', 'trust') };
export const Related = { name: 'Related', render: section('product', 'related'), parameters: note('product', 'related') };
