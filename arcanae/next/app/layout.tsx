// The document shell: the four CSS layers shared with the Astro build. Each page renders its own frame
// (components/SiteFrame.tsx), because the success page has no menu, footer or cart.
import type { ReactNode } from 'react';
import '../../astro/src/styles/tokens.css';
import '../../astro/src/styles/base.css';
import '../../astro/src/styles/components.css';
import '../../astro/src/styles/states.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // the head scripts add classes to <html> before React hydrates
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
