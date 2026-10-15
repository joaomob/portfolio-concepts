// One story per section of the page astro/dist/index.html, in page order (src/sections.js).
import { section, note } from './page.js';

export default { title: 'Home' };

export const ProjectBar = { name: 'Project bar', render: section('home', 'project-bar'), parameters: note('home', 'project-bar') };

export const Nav = { name: 'Nav', render: section('home', 'nav'), parameters: note('home', 'nav') };

export const Hero = { name: 'Hero', render: section('home', 'hero'), parameters: note('home', 'hero') };

export const Problem = { name: 'Problem', render: section('home', 'problem'), parameters: note('home', 'problem') };

export const How = { name: 'How it works', render: section('home', 'how'), parameters: note('home', 'how') };

export const Report = { name: 'Report', render: section('home', 'report'), parameters: note('home', 'report') };

export const Demo = { name: 'Demo', render: section('home', 'demo'), parameters: note('home', 'demo') };

export const Terms = { name: 'Terms', render: section('home', 'terms'), parameters: note('home', 'terms') };

export const Pricing = { name: 'Pricing', render: section('home', 'pricing'), parameters: note('home', 'pricing') };

export const Security = { name: 'Security', render: section('home', 'security'), parameters: note('home', 'security') };

export const Testimonials = { name: 'Testimonials', render: section('home', 'testimonials'), parameters: note('home', 'testimonials') };

export const Founder = { name: 'Founder', render: section('home', 'founder'), parameters: note('home', 'founder') };

export const Faq = { name: 'FAQ', render: section('home', 'faq'), parameters: note('home', 'faq') };

export const Cta = { name: 'CTA', render: section('home', 'cta'), parameters: note('home', 'cta') };

export const Footer = { name: 'Footer', render: section('home', 'footer'), parameters: note('home', 'footer') };

export const CookieBanner = { name: 'Cookie banner', render: section('home', 'cookie-banner'), parameters: note('home', 'cookie-banner') };

export const UploadModal = { name: 'Upload modal', render: section('home', 'upload-modal'), parameters: note('home', 'upload-modal') };

export const ReportModal = { name: 'Sample report modal', render: section('home', 'report-modal'), parameters: note('home', 'report-modal') };

export const PrivacyModal = { name: 'Privacy policy modal', render: section('home', 'privacy-modal'), parameters: note('home', 'privacy-modal') };

export const CookiePreferences = { name: 'Cookie preferences', render: section('home', 'cookie-preferences'), parameters: note('home', 'cookie-preferences') };
