import type { SharedView } from '@astro/lib/content';
import { Icon } from './Icon';

export function Logo({ shared }: { shared: SharedView }) {
  return <a className="logo_component" href={shared.logo.href}><Icon name="logo" /><span className="logo_text">{shared.logo.text}</span></a>;
}
