// The root layout of the Spanish Home (/es); the English pages have theirs in app/(en).
import type { ReactNode } from 'react';
import '@astro/styles/index.css';
import { HeadExtras } from '@/lib/head';

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return (
    // the inline script adds "is-motion" and "is-ready" to <html> before React hydrates
    <html lang="es" suppressHydrationWarning>
      <head><HeadExtras /></head>
      <body>{children}</body>
    </html>
  );
}
