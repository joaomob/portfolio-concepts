// Root layout of the landing: English, the stylesheets of the Astro build, and the head line that turns the reveals
// on before the first paint (the same test as the original head).
import type { ReactNode } from 'react';
import { ANIM_ON_SCRIPT } from '@astro/scripts/reveal.js';
import '@astro/styles/fonts.css';
import '@astro/styles/base.css';
import '@astro/styles/home.css';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANIM_ON_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
