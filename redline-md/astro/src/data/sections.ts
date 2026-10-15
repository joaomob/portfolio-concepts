// The order of the sections of each page, as in the original. The case study page holds two tabs: the case study
// sections show by default and the style guide sections show under html.is-sg (case-study.css).
export const homeSections = [
  'HeroSection', 'ProblemSection', 'HowSection', 'ReportSection', 'DemoSection', 'TermsSection',
  'PricingSection', 'SecuritySection', 'TestimonialsSection', 'FounderSection', 'FaqSection', 'CtaSection',
] as const;

export const caseStudySections = [
  'HeroSection', 'FoundSection', 'HeroBlockSection', 'NumbersSection', 'ReportSection', 'DemoSection',
  'CalcSection', 'TermsSection', 'CostSection', 'TrustSection', 'MobileSection', 'LegalSection',
  'BuildSection', 'AccessibilitySection', 'QuestionsSection', 'CtaSection',
] as const;

export const styleGuideSections = [
  'IntroSection', 'ColorsSection', 'TypeSection', 'TextSection', 'ButtonsSection', 'TagsSection',
  'SurfacesSection', 'LayoutSection', 'SpacingSection', 'ComponentsSection', 'MotionSection',
  'FinsweetSection', 'CodeSection', 'BreakpointsSection',
] as const;
