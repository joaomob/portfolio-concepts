// One story per section of product-riot-pinned-tartan.html, in the order of the page (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Product' };

export const Main = { name: 'Product', render: section('product', 'main'), parameters: note('product', 'main') };

export const Look = { name: 'Worn in', render: section('product', 'look'), parameters: note('product', 'look') };

export const More = { name: 'More pieces', render: section('product', 'more'), parameters: note('product', 'more') };

export const SizeGuide = { name: 'Size guide', render: section('product', 'size-guide'), parameters: note('product', 'size-guide') };
