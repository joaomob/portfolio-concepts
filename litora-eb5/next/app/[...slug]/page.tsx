// Every page of the site from one route, as in the Astro build: five page types in two languages, rendered from the
// content files through pageView() with the Next.js base path, so links, canonical and hreflang point at /next/.
import type { Metadata } from 'next';
import { ASSETS, NEXT_BASE, pageView, routeOf, routes } from '@astro/lib/content';
import { Module } from '@/components/Module';
import { PageScripts } from '@/components/PageScripts';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteHeader } from '@/components/sections/SiteHeader';

export const dynamicParams = false;
export const generateStaticParams = () => routes.map((route) => ({ slug: route.slug.split('/') }));

interface Props { params: Promise<{ slug: string[] }> }

const viewOf = async (params: Props['params']) => pageView(routeOf((await params).slug.join('/')), NEXT_BASE);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await viewOf(params);
  const { meta, share } = page;
  return {
    title: meta.title,
    description: meta.metaDescription,
    robots: { index: false },
    alternates: { canonical: page.canonical, languages: Object.fromEntries(page.alternates.map((a) => [a.lang, a.href])) },
    openGraph: { type: 'website', title: meta.title, description: meta.metaDescription, images: [{ url: share.src, width: share.width, height: share.height, alt: meta.shareImageAlt }] },
    twitter: { card: 'summary_large_image' },
    icons: { icon: { url: `${ASSETS}images/favicon.svg`, type: 'image/svg+xml' } },
  };
}

export default async function Page({ params }: Props) {
  const page = await viewOf(params);
  return (
    <div className="page-wrapper">
      <a className="skip-link_component" href="#main">{page.shared.global.skipLink}</a>
      <SiteHeader view={page.header} shared={page.shared} />
      <main className="main-wrapper" id="main">
        {page.main.map((mod) => <Module key={mod.key} mod={mod} shared={page.shared} />)}
      </main>
      <SiteFooter view={page.footer} shared={page.shared} />
      <PageScripts />
    </div>
  );
}
