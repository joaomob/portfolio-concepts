// Renders one module of a content file with its section component. The switch narrows the view type per module, so a
// new section is one case here and one component in ./sections.
import type { ModuleView, SharedView } from '@astro/lib/content';
import { AudienceCards } from './sections/AudienceCards';
import { ConfirmationHero } from './sections/ConfirmationHero';
import { CtaBand } from './sections/CtaBand';
import { FaqAccordion } from './sections/FaqAccordion';
import { FormCard } from './sections/FormCard';
import { HeroEvent } from './sections/HeroEvent';
import { LegalText } from './sections/LegalText';
import { ProjectReveal } from './sections/ProjectReveal';
import { ProjectStack } from './sections/ProjectStack';
import { Speakers } from './sections/Speakers';
import { StatementReveal } from './sections/StatementReveal';
import { StatRow } from './sections/StatRow';
import { StepsList } from './sections/StepsList';
import { TopicGrid } from './sections/TopicGrid';

export function Module({ mod, shared }: { mod: ModuleView; shared: SharedView }) {
  switch (mod.module) {
    case 'hero-event': return <HeroEvent view={mod.view} shared={shared} />;
    case 'confirmation-hero': return <ConfirmationHero view={mod.view} shared={shared} />;
    case 'form-card': return <FormCard view={mod.view} />;
    case 'statement-reveal': return <StatementReveal view={mod.view} />;
    case 'project-reveal': return <ProjectReveal view={mod.view} />;
    case 'topic-grid': return <TopicGrid view={mod.view} />;
    case 'audience-cards': return <AudienceCards view={mod.view} />;
    case 'speakers': return <Speakers view={mod.view} />;
    case 'stat-row': return <StatRow view={mod.view} />;
    case 'project-stack': return <ProjectStack view={mod.view} />;
    case 'faq-accordion': return <FaqAccordion view={mod.view} />;
    case 'cta-band': return <CtaBand view={mod.view} />;
    case 'steps-list': return <StepsList view={mod.view} />;
    case 'legal-text': return <LegalText view={mod.view} />;
    default: return null;
  }
}
