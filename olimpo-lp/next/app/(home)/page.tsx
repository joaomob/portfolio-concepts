// The home: twelve sections in the original order, the Greek key friezes between the acts, the footer, the Codex
// reader with its dock, and the live region the scripts announce through.
import Preloader from '@/components/home/Preloader';
import SiteNav from '@/components/home/SiteNav';
import Frieze from '@/components/home/Frieze';
import OpeningSection from '@/components/home/OpeningSection';
import ProblemSection from '@/components/home/ProblemSection';
import TurnSection from '@/components/home/TurnSection';
import MethodSection from '@/components/home/MethodSection';
import PlannerSection from '@/components/home/PlannerSection';
import FollowupSection from '@/components/home/FollowupSection';
import ExecutionSection from '@/components/home/ExecutionSection';
import PersonalizationSection from '@/components/home/PersonalizationSection';
import StayingPowerSection from '@/components/home/StayingPowerSection';
import TrustSection from '@/components/home/TrustSection';
import PlansSection from '@/components/home/PlansSection';
import ClosingSection from '@/components/home/ClosingSection';
import SiteFooter from '@/components/home/SiteFooter';
import CodexRoot from '@/components/home/CodexRoot';
import HomeMotion from '@/components/home/HomeMotion';
import { pageMeta } from '@/lib/meta';
import { asset } from '@astro/lib/site';

export const metadata = pageMeta({
  title: 'Olimpo · Você sabe aonde quer chegar.',
  description: 'O Olimpo mantém a meta onde ela está e constrói os degraus até ela. Se a subida travar no meio, ele chama de volta.',
  path: '',
  ogImage: asset('img/og-image.webp'),
});

export default function HomePage() {
  return (
    <>
      <Preloader />
      <a className="skip" href="#main-content">Pular para o conteúdo</a>
      <SiteNav />
      <main id="main-content" className="page-content">
        <OpeningSection />
        <Frieze />
        <ProblemSection />
        <TurnSection />
        <Frieze />
        <MethodSection />
        <PlannerSection />
        <FollowupSection />
        <ExecutionSection />
        <PersonalizationSection />
        <StayingPowerSection />
        <Frieze />
        <TrustSection />
        <PlansSection />
        <ClosingSection />
      </main>
      <Frieze />
      <SiteFooter />
      <CodexRoot />
      <div className="sr-only" aria-live="polite" data-live />
      <HomeMotion />
    </>
  );
}
