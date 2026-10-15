// The document shell of every page: the display font preloaded, the two text fonts that wait for the load event (the
// same stand-ins of the same width keep the text in place until they arrive) and the film grain, switched on after
// the load. Each page renders its own frame (components/chrome/Frame.tsx).
import type { ReactNode } from 'react';
import { MEDIA } from '@shared/lib/photos';

const fonts = `${MEDIA}/fonts`;
const range = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const late = [
  `@font-face{font-family:'Inter Tight';font-style:normal;font-weight:400 500;font-display:swap;src:url('${fonts}/inter-tight-latin.woff2') format('woff2');unicode-range:${range}}`,
  `@font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:400 500;font-display:swap;src:url('${fonts}/jetbrains-mono-latin.woff2') format('woff2');unicode-range:${range}}`,
];
// one family at a time, 0.3 s and 0.9 s after the load event, so the page is laid out again in two short steps
const LATE_FONTS = "addEventListener('load', function () { document.querySelectorAll('[data-late-fonts]').forEach(function (sheet, i) { setTimeout(function () { sheet.media = 'all'; }, 300 + i * 600); }); });";
const GRAIN = "addEventListener('load', function () { setTimeout(function () { document.documentElement.classList.add('grain-on'); }, 1800); });";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // the grain script adds a class to <html> after the load event
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={`${fonts}/anton-latin.woff2`} as="font" type="font/woff2" crossOrigin="" />
        {late.map((face, i) => <style key={i} data-late-fonts={String(i)} media="not all" dangerouslySetInnerHTML={{ __html: face }} />)}
        <script dangerouslySetInnerHTML={{ __html: LATE_FONTS }} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: GRAIN }} />
      </body>
    </html>
  );
}
