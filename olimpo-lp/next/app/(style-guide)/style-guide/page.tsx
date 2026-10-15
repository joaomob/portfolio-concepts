// Page zero of the design system: every foundation class at once, as in the original style-guide.html.
import SgHero from '@/components/style-guide/SgHero';
import SgSection, { type SgSectionData } from '@/components/style-guide/SgSection';
import { pageMeta } from '@/lib/meta';
import data from '@astro/data/style-guide.json';

export const metadata = pageMeta({ title: 'Olimpo · Style Guide', path: 'style-guide' });

const sections = data.sections as SgSectionData[];

export default function StyleGuidePage() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <a href="#content" className="button is-text is-small">Skip to content</a>
        <SgHero />
        {sections.map((s) => <SgSection key={s.id} {...s} />)}
      </main>
    </div>
  );
}
