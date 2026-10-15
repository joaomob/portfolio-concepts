// The logo and the language switch at the top of the hero panel (the fixed header shows the same two, later).
import type { SharedView } from '@astro/lib/content';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export function HeroTopBanner({ shared }: { shared: SharedView }) {
  return <div className="hero_top-banner"><Logo shared={shared} /><LanguageSwitch shared={shared} /></div>;
}
