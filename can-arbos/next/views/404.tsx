// The page shown for an address that does not exist: an empty arch, the line and the way back home.
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import Button from '@/components/ui/Button';
import { page } from '@/lib/paths';

export const meta: PageMeta = { title: "Page Not Found · Can Arbós", description: "This page isn't here. It may have moved, or the link has a typo.", slug: "404" };

export default function NotFoundView() {
  return (
    <BaseLayout {...meta}>
  <section className="lost_page_wrap u-theme-light" aria-labelledby="page-title">
    <div className="lost_page_contain u-container">
      <div className="lost_page_layout">
        <div className="lost_page_arch is-arch" aria-hidden="true"></div>
        <div className="lost_page_content">
          <h1 className="lost_page_title u-text-style-h1" id="page-title">This page isn't here</h1>
          <p className="lost_page_text u-text-style-large">It may have moved, or the link has a typo.</p>
          <div className="u-button-wrapper"><Button label="Back to home" href={page()} /></div>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
  );
}
