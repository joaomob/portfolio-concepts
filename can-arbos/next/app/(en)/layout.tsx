// The root layout of the English pages. The Spanish Home has its own root layout in app/(es) for <html lang="es">.
import type { ReactNode } from 'react';
import '@astro/styles/index.css';
import { HeadExtras } from '@/lib/head';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    // the inline script adds "is-motion" and "is-ready" to <html> before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head><HeadExtras /></head>
      <body>{children}</body>
    </html>
  );
}
