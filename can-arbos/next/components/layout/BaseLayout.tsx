// The body of every page, as the Astro BaseLayout writes it: the skip link, the menu, <main>, the footer, the
// dialogs and the page scripts. The head (title, description, noindex, canonical, hreflang) comes from the route's
// metadata in lib/routes.tsx, so title, description and slug are only carried here for the same call as in Astro.
import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Modals from './Modals';
import PageScripts from './PageScripts';
import { useTranslate, type Lang } from '@astro/i18n/index';

export interface Props {
  title: string;
  description: string;
  slug: string;
  lang?: Lang;
  alternates?: boolean;
  children?: ReactNode;
}

export default function BaseLayout({ lang = 'en', children }: Props) {
  const t = useTranslate(lang);
  return (
    <div className="page_wrap" lang={lang === 'es' ? 'es' : undefined}>
      <a className="skip_link" href="#main">{t('Skip to content')}</a>
      <Nav lang={lang} />
      <main className="page_main" id="main">
        {children}
      </main>
      <Footer lang={lang} />
      <Modals lang={lang} />
      <PageScripts />
    </div>
  );
}
