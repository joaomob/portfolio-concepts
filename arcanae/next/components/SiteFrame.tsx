// What every page carries (BaseLayout.astro in the Astro build): fonts, the scripts that run before the first paint,
// the menu, the footer, the cart drawer and the browser code.
import type { ReactNode } from 'react';
import type { PageId } from '../../astro/src/scripts/boot';
import { masks } from '../../astro/src/lib/catalog';
import { NEXT_BASE } from '../../astro/src/lib/site';
import { HEAD_SCRIPTS } from '../lib/head-scripts';
import CartDrawer from './CartDrawer';
import Footer from './Footer';
import Intro from './Intro';
import Nav from './Nav';
import PageScripts from './PageScripts';

const FONTS_SITE =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@1,600&family=Inter:wght@300;400;500;600;700&display=swap';
const FONTS_SUCCESS =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap';

const Inline = ({ code }: { code: string }) => <script dangerouslySetInnerHTML={{ __html: code }} />;

interface Props {
  page: PageId;
  children: ReactNode;
  /** rendered after the footer (the product lightbox) */
  after?: ReactNode;
  chrome?: boolean;
  cartNote?: boolean;
  cards?: boolean;
}

export default function SiteFrame({ page, children, after, chrome = true, cartNote = false, cards = false }: Props) {
  const onHome = page === 'home';
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={page === 'success' ? FONTS_SUCCESS : FONTS_SITE} precedence="fonts" />
      {onHome && <Inline code={HEAD_SCRIPTS.heroStill} />}
      {onHome && <Inline code={HEAD_SCRIPTS.introGate} />}
      {onHome && <noscript><style>{'.intro_component{display:none}'}</style></noscript>}
      {cards && <Inline code={`window.ARCANAE_MASKS=${JSON.stringify(masks())};`} />}
      {cards && <Inline code={HEAD_SCRIPTS.cardLoading} />}
      {onHome && <Intro />}
      <div className="page-wrapper">
        {chrome && <Nav base={NEXT_BASE} onHome={onHome} />}
        <main className="main-wrapper">{children}</main>
        {chrome && <Footer base={NEXT_BASE} onHome={onHome} />}
        {after}
        {chrome && <CartDrawer note={cartNote} />}
      </div>
      {page === 'success' && <Inline code={'try{localStorage.removeItem("arcanae_cart_v1")}catch(e){}'} />}
      <PageScripts page={page} />
    </>
  );
}
