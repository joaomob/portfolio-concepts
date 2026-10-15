// Root layout of the style guide: English, and only the style guide stylesheets (the home ones would change it).
import type { ReactNode } from 'react';
import '@astro/styles/style-guide/index.css';

export default function StyleGuideLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
