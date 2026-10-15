// The single list of the stories: which built page each group reads and which sections it shows. The event page and
// the second thank you page reuse the webinar's sections with other content, so only the section that differs in
// structure (the event form, with its period choice) gets its own story.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

// page key: the file in astro/dist (pt-BR, the default language)
export const pages = {
  webinar: 'webinar-visto-eb5.html',
  event: 'evento-visto-eb5-sao-paulo.html',
  thankYou: 'webinar-visto-eb5/obrigado.html',
  privacy: 'privacidade.html',
};

export const sections = {
  webinar: [
    { id: 'header', name: 'Site header', selector: 'body .site-header_component', text: 'The fixed header: language switch, logo and the call to the form. Hidden over the hero on the page, shown here.' },
    { id: 'hero', name: 'Hero', selector: 'main > .section_hero-event', text: 'The photo and the dark panel with the date, the hours and the registration form.' },
    { id: 'statement', name: 'Statement', selector: 'main > .section_statement-reveal', text: 'One sentence whose words light up with the scroll.' },
    { id: 'project', name: 'Project reveal', selector: 'main > .section_project-reveal', text: 'The project photo that opens through a circle, with the giant word over it.' },
    { id: 'topics', name: 'Topics', selector: 'main > .section_topic-grid', text: 'Numbered rows of what the webinar covers, each with a thumbnail.' },
    { id: 'audience', name: 'Audience', selector: 'main > .section_audience-cards', text: 'Who the program is for, as three photo cards.' },
    { id: 'speakers', name: 'Speakers', selector: 'main > .section_speakers', text: 'The people who speak, with their role.' },
    { id: 'numbers', name: 'Numbers', selector: 'main > .section_stat-row', text: 'The program numbers on a ruler, then the cost table.' },
    { id: 'stack', name: 'Project stack', selector: 'main > .section_project-stack', text: 'Full screen photos that stack over each other with the scroll.' },
    { id: 'faq', name: 'Questions', selector: 'main > .section_faq-accordion', text: 'The process timeline beside the questions, the first one open and one open at a time.' },
    { id: 'cta', name: 'Final call', selector: 'main > .section_cta-band', text: 'The last call over a photo.' },
    { id: 'footer', name: 'Site footer', selector: 'body .site-footer_component', text: 'About, the fictional brand notice, privacy and language links, and the legal notice.' },
  ],
  event: [
    { id: 'hero', name: 'Hero', selector: 'main > .section_hero-event', text: 'The event hero: the same panel, with the city and the period choice in the form.' },
  ],
  thankYou: [
    { id: 'confirmation', name: 'Confirmation hero', selector: 'main > .section_confirmation-hero', text: 'The still hero of the thank you page, with the calendar file to save.' },
    { id: 'steps', name: 'Steps', selector: 'main > .section_steps-list', text: 'Numbered next steps (the topic row without its photo).' },
  ],
  privacy: [
    { id: 'legal', name: 'Legal text', selector: 'main > .section_legal-text', text: 'The privacy policy: heading, date and paragraphs.' },
  ],
};
