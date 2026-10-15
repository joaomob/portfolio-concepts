// The single list of the sections shown in the Storybook, page by page. Each selector is run on the built page
// (astro/dist), so a story always shows what the Astro build outputs.
//
// fixed: the element is position: fixed on the page (the project bar, the navbar, the cookie banner, the modals). The
// story puts it in a frame with a transform and a minimum height: the transform makes the frame its containing block,
// so the element keeps its place on the canvas instead of taking no height.
// settle: the state a page script puts the element in when the visitor opens it (the banner and the modals start at
// display none and finsweet-lite.js shows them), so the story shows it open.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

const show = (display) => (root) => { root.style.display = display; };

// page key: the file in astro/dist, and the class the page puts on <html> (the style guide is a tab of the case
// study page, shown under html.is-sg)
export const pages = {
  home: { file: 'index.html', htmlClass: '' },
  caseStudy: { file: 'case-study.html', htmlClass: '' },
  styleGuide: { file: 'case-study.html', htmlClass: 'is-sg' },
};

const modal = (instance) => `div.modal_component[fs-modal-instance="${instance}"]`;

// Not a story: the sticky call (display none above 767 px, and below it only after the hero leaves the screen) and the
// terms and cookie policy modals, built from the same LegalModal as the privacy policy story.
export const sections = {
  home: [
    { id: 'project-bar', name: 'Project bar', selector: 'header.project-bar_component', fixed: '44px', text: 'The three review tabs and the author credit, on top of every page.' },
    { id: 'nav', name: 'Nav', selector: 'header.navbar_component', fixed: '140px', text: 'The logo, the three section links and the upload call.' },
    { id: 'hero', name: 'Hero', selector: 'section.section_hero', text: 'The tag, the H1, the two calls, the price note, the security line and the layered contract art.' },
    { id: 'problem', name: 'Problem', selector: 'section.section_problem', text: '"The costly clauses show up when you leave.", with the four counters (finsweet-lite.js counts them up on the page).' },
    { id: 'how', name: 'How it works', selector: 'section.section_how', text: 'Three steps to a better contract, one numbered card each.' },
    { id: 'report', name: 'Report', selector: 'section.section_report', text: '"Everything in your report": what the report holds and the call to see the sample.' },
    { id: 'demo', name: 'Demo', selector: 'section.section_demo', text: '"Try it on a sample contract": the range slider and its results (run by finsweet-lite.js on the page).' },
    { id: 'terms', name: 'Terms', selector: 'section.section_terms', text: 'Six clauses we always check, one card each with its line icon.' },
    { id: 'pricing', name: 'Pricing', selector: 'section.section_pricing', text: '"What a contract review costs": the price and the upload call.' },
    { id: 'security', name: 'Security', selector: 'section.section_security', text: 'The security standards, one card each with its line icon.' },
    { id: 'testimonials', name: 'Testimonials', selector: 'section.section_testimonials', text: '"Physicians who checked before signing": three cards; below 992 px home.js turns the grid into a carousel.' },
    { id: 'founder', name: 'Founder', selector: 'section.section_founder', text: '"What physicians ask before uploading", with the portrait.' },
    { id: 'faq', name: 'FAQ', selector: 'section.section_faq', text: 'The accordion. On the page finsweet-lite.js opens the first item and closes the rest; here every answer shows.' },
    { id: 'cta', name: 'CTA', selector: 'section.section_cta', text: '"Review your contract before you sign it." and the last upload call.' },
    { id: 'footer', name: 'Footer', selector: 'footer.footer_component', text: 'The brand line, the product, legal and contact columns and the disclaimer.' },
    { id: 'cookie-banner', name: 'Cookie banner', selector: 'div.cookie_banner', fixed: '260px', settle: show('flex'), text: 'The cookie banner as it opens on the first visit.' },
    { id: 'upload-modal', name: 'Upload modal', selector: modal('upload'), fixed: '900px', settle: show('flex'), text: 'The upload form, open.' },
    { id: 'report-modal', name: 'Sample report modal', selector: modal('report'), fixed: '900px', settle: show('flex'), text: 'The five pages of the sample report behind their shield, open.' },
    { id: 'privacy-modal', name: 'Privacy policy modal', selector: modal('privacy'), fixed: '900px', settle: show('flex'), text: 'One legal modal, the privacy policy, open. The terms and the cookie policy use the same component.' },
    { id: 'cookie-preferences', name: 'Cookie preferences', selector: 'div.cookie_preferences', fixed: '900px', settle: show('flex'), text: 'The cookie preferences, open from the banner or the footer.' },
  ],
  caseStudy: [
    { id: 'hero', name: 'Hero', selector: 'section.section_case-study-hero', text: '"Redline MD, a landing page built for Google Ads": the goal, the tags and the before and after screens.' },
    { id: 'found', name: 'What I found', selector: 'section.section_case-study-found', text: '"A site that made physicians doubt it".' },
    { id: 'hero-block', name: 'Hero block', selector: 'section.section_case-study-hero-block', text: '"The ROI before the scroll".' },
    { id: 'numbers', name: 'Numbers', selector: 'section.section_case-study-numbers', text: '"Numbers that agree with each other".' },
    { id: 'report', name: 'Report', selector: 'section.section_case-study-report', text: '"The sample report, on the page and protected".' },
    { id: 'demo', name: 'Demo', selector: 'section.section_case-study-demo', text: '"Try it before you pay".' },
    { id: 'calc', name: 'Calculator', selector: 'section.section_case-study-calc', text: '"A calculator anyone understands".' },
    { id: 'terms', name: 'Terms', selector: 'section.section_case-study-terms', text: '"Six clauses, each with a source".' },
    { id: 'cost', name: 'Cost', selector: 'section.section_case-study-cost', text: '"The cost, side by side".' },
    { id: 'trust', name: 'Trust', selector: 'section.section_case-study-trust', text: '"Trust before the payment".' },
    { id: 'mobile', name: 'Mobile', selector: 'section.section_case-study-mobile', text: '"Built for the phone first".' },
    { id: 'legal', name: 'Legal', selector: 'section.section_case-study-legal', text: '"Everything stays on the page".' },
    { id: 'build', name: 'Build', selector: 'section.section_case-study-build', text: '"Easy for the team to edit": Webflow and Client-First.' },
    { id: 'accessibility', name: 'Accessibility', selector: 'section.section_case-study-accessibility', text: '"Checked against WCAG AA".' },
    { id: 'questions', name: 'Questions', selector: 'section.section_case-study-questions', text: '"Before launch": what is still a placeholder for the real content.' },
    { id: 'cta', name: 'CTA', selector: 'section.section_case-study-cta', text: '"See the landing page live" and the credit.' },
  ],
  styleGuide: [
    { id: 'intro', name: 'Intro', selector: 'section.section_style-guide-intro', text: '"Redline MD design system" and its index.' },
    { id: 'colors', name: 'Colors', selector: 'section.section_style-guide-colors', text: 'The palette and what each color means.' },
    { id: 'type', name: 'Type', selector: 'section.section_style-guide-type', text: 'Figtree in 4 weights and the heading sizes per breakpoint.' },
    { id: 'text', name: 'Text', selector: 'section.section_style-guide-text', text: 'The Client-First text utility classes.' },
    { id: 'buttons', name: 'Buttons', selector: 'section.section_style-guide-buttons', text: 'The black pills and their red hover layer.' },
    { id: 'tags', name: 'Tags', selector: 'section.section_style-guide-tags', text: 'Tags and pills.' },
    { id: 'surfaces', name: 'Surfaces', selector: 'section.section_style-guide-surfaces', text: 'The section frame, the section card and the cards inside.' },
    { id: 'layout', name: 'Layout', selector: 'section.section_style-guide-layout', text: 'The Client-First structure: padding-global and the containers.' },
    { id: 'spacing', name: 'Spacing', selector: 'section.section_style-guide-spacing', text: 'The spacers and the hide classes.' },
    { id: 'components', name: 'Components', selector: 'section.section_style-guide-components', text: 'The pieces of the landing in their real states.' },
    { id: 'motion', name: 'Motion', selector: 'section.section_style-guide-motion', text: 'The Webflow Interactions of the page.' },
    { id: 'finsweet', name: 'Finsweet', selector: 'section.section_style-guide-finsweet', text: 'The Finsweet attributes set in the Designer.' },
    { id: 'code', name: 'Code', selector: 'section.section_style-guide-code', text: 'The custom code and the link of every modal.' },
    { id: 'breakpoints', name: 'Breakpoints', selector: 'section.section_style-guide-breakpoints', text: 'The Webflow breakpoints, mobile first.' },
  ],
};
