// The case study page: the project bar and one main with two tabs, the case study (16 sections) and the style
// guide (14 sections, shown under html.is-sg), in the order of data/sections.ts.
import type { ComponentType } from 'react';
import ProjectBar from '@/components/shared/ProjectBar';
import CaseStudyMotion from '@/components/case-study/CaseStudyMotion';
import * as caseStudy from '@/components/case-study';
import * as styleGuide from '@/components/style-guide';
import { caseStudySections, styleGuideSections } from '@astro/data/sections';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({
  title: 'Redline MD · Case study',
  description: 'How I redesigned the Redline MD landing page for Google Ads, and its design system.',
  path: 'case-study',
});

const sections: [string, ComponentType][] = [
  ...caseStudySections.map((n): [string, ComponentType] => [`cs-${n}`, caseStudy[n]]),
  ...styleGuideSections.map((n): [string, ComponentType] => [`sg-${n}`, styleGuide[n]]),
];

export default function CaseStudyPage() {
  return (
    <div className="page-wrapper">
      <ProjectBar />
      <main className="main-wrapper" id="top">
        {sections.map(([key, Section]) => <Section key={key} />)}
      </main>
      <CaseStudyMotion />
    </div>
  );
}
