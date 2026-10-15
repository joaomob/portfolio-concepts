// The two inline icons of the site, drawn from the same paths as the Astro build.
import { chevron, logoMark } from '@astro/lib/icons';

export function Icon({ name }: { name: 'logo' | 'chevron' }) {
  if (name === 'logo') {
    return (
      <svg className="logo_mark" xmlns="http://www.w3.org/2000/svg" viewBox={logoMark.viewBox} aria-hidden="true" focusable="false">
        <path d={logoMark.d} fill="currentColor" fillRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="faq_icon" xmlns="http://www.w3.org/2000/svg" viewBox={chevron.viewBox} aria-hidden="true" focusable="false">
      <path d={chevron.d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
