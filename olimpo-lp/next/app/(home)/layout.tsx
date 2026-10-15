// Root layout of the home: Portuguese, light theme, the stylesheets of the Astro build, and the inline script that
// marks the page as scripted and skips the preloader on later visits (the same line as the original head).
import type { ReactNode } from 'react';
import '@astro/styles/home/index.css';

const headScript = "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('olimpo-pre'))document.documentElement.classList.add('pre-seen')}catch(e){}";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
