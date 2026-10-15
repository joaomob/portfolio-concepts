// The page for an address that does not exist (out/404.html), with its own <html>, as Next.js asks of a global 404.
import '@astro/styles/index.css';
import { HeadExtras } from '@/lib/head';
import { metadataOf } from '@/lib/routes';
import NotFoundView, { meta } from '@/views/404';

export const metadata = metadataOf(meta);

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><HeadExtras /></head>
      <body><NotFoundView /></body>
    </html>
  );
}
