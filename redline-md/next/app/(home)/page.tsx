// The landing: the project bar, the navbar, the twelve sections, the footer and the overlays (sticky call, cookie
// banner, the five modals and the cookie preferences).
import ProjectBar from '@/components/shared/ProjectBar';
import SiteNav from '@/components/home/SiteNav';
import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import HowSection from '@/components/home/HowSection';
import ReportSection from '@/components/home/ReportSection';
import DemoSection from '@/components/home/DemoSection';
import TermsSection from '@/components/home/TermsSection';
import PricingSection from '@/components/home/PricingSection';
import SecuritySection from '@/components/home/SecuritySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FounderSection from '@/components/home/FounderSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';
import SiteFooter from '@/components/home/SiteFooter';
import StickyCta from '@/components/home/StickyCta';
import CookieBanner from '@/components/home/CookieBanner';
import UploadModal from '@/components/home/UploadModal';
import ReportModal from '@/components/home/ReportModal';
import LegalModal from '@/components/home/LegalModal';
import CookiePreferences from '@/components/home/CookiePreferences';
import HomeMotion from '@/components/home/HomeMotion';
import { legal } from '@astro/data/legal';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'RedlineMD · Physician Contract Review for $199',
  description: 'Know what your physician employment contract costs before you sign it. Redlines and a financial analysis within 24 hours. Flat $199.',
  path: '',
});

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <ProjectBar />
      <SiteNav />
      <main className="main-wrapper" id="top">
        <HeroSection />
        <ProblemSection />
        <HowSection />
        <ReportSection />
        <DemoSection />
        <TermsSection />
        <PricingSection />
        <SecuritySection />
        <TestimonialsSection />
        <FounderSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <section className="overlays_component">
        <StickyCta />
        <CookieBanner />
        <UploadModal />
        <ReportModal />
        {legal.map((m) => <LegalModal key={m.instance} {...m} />)}
        <CookiePreferences />
      </section>
      <HomeMotion />
    </div>
  );
}
