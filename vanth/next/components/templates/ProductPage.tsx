// The page of one piece: its photograph and buy block, the look it is worn in, and more pieces of its line. Garments
// and footwear add the size picker and the size guide.
import { Frame } from '../chrome/Frame';
import { ProductMain } from '../product/ProductMain';
import { WornIn } from '../product/WornIn';
import { MorePieces } from '../product/MorePieces';
import { SizeGuide } from '../product/SizeGuide';
import type { Line, Product } from '@shared/lib/types';
import { productPage } from '@shared/lib/catalog';
import { chartFor } from '@shared/lib/sizes';
import { pageMeta } from '@/lib/meta';

export function productMeta(line: Line, product: Product) {
  const summary = product.beauty ? `${product.beauty.body} ${product.price}.` : `${product.material}. ${product.price}, made to order in Berlin.`;
  return pageMeta(
    `${product.name}, ${product.beauty ? 'lipstick of ' : ''}${line.name} | Vanth`,
    `${product.name}, from ${line.name}, line ${line.number} of the Vanth Autumn Winter 2026 season. ${summary}`,
    productPage(line, product.id),
  );
}

export function ProductPage({ line, product, others }: { line: Line; product: Product; others: Product[] }) {
  const chart = chartFor(product.label);
  return (
    <Frame sheets="product" current="collections" motion="product" after={chart && <SizeGuide chart={chart} />}>
      <ProductMain line={line} item={product} chart={chart} />
      <WornIn line={line} item={product} />
      <MorePieces line={line} others={others} />
    </Frame>
  );
}
