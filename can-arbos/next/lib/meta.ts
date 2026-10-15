// The head of a page: what the Astro pages pass to their BaseLayout, used here by generateMetadata.
import type { Lang } from '@astro/i18n/index';

export interface PageMeta {
  title: string;
  description: string;
  /** the page's slug for its canonical address ('' is the Home) */
  slug: string;
  lang?: Lang;
  /** the two Homes name each other with hreflang */
  alternates?: boolean;
}
