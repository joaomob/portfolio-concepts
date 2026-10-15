// The flat pages of the season, by address, as the original prototype names them: collection and fragrance (Iron
// Court, line 01), collection-<line>, fragrance-<line> and product-<line>-<piece>. One dynamic route
// (app/[page]/page.tsx) renders them all, because an address cannot mix a fixed prefix with a dynamic part.
import { allProducts, collectionPage, fragrancePage, lines } from '@shared/lib/catalog';
import { fragranceView, type FragranceView } from '@shared/lib/fragrance';
import type { Line, Product } from '@shared/lib/types';

export type SeasonPage =
  | { kind: 'collection'; line: Line }
  | { kind: 'fragrance'; view: FragranceView }
  | { kind: 'product'; line: Line; product: Product; others: Product[] };

const pages = new Map<string, SeasonPage>();
for (const line of lines) {
  pages.set(collectionPage(line), { kind: 'collection', line });
  pages.set(fragrancePage(line), { kind: 'fragrance', view: fragranceView(line) });
}
for (const { line, product, others } of allProducts()) {
  pages.set(`product-${line.slug}-${product.id}`, { kind: 'product', line, product, others });
}

export const seasonPages = (): string[] => [...pages.keys()];
export const seasonPage = (name: string): SeasonPage | undefined => pages.get(name);
