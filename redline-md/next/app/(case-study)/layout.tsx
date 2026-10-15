// Root layout of the case study: English, the case study stylesheets of the Astro build, and the two head lines of
// the original (the style guide tab switch, then the reveal switch).
import type { ReactNode } from 'react';
import { ANIM_ON_SCRIPT } from '@astro/scripts/reveal.js';
import { SG_HEAD_SCRIPT } from '@astro/scripts/case-study.js';
import '@astro/styles/fonts.css';
import '@astro/styles/base.css';
import '@astro/styles/case-study.css';

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SG_HEAD_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: ANIM_ON_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
