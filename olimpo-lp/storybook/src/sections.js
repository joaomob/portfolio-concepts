// The single list of the sections shown in the Storybook, page by page. Each selector is run on the built page
// (astro/dist), so a story always shows what the Astro build outputs.
//
// fixed: the element is position: fixed on the page (the header, the dock). The story puts it in a
// frame with a transform and a minimum height: the transform makes the frame its containing block, so the element
// keeps its place on the canvas instead of taking no height.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

// settle: the state the page scripts leave a section in with reduced motion, for the parts the HTML alone does not
// show. The hero's goal card leaves the build hidden at 0% and the video has no source until olimpo.js picks the
// theme's file; phones.js then opens the card at the share of completed projects and olimpo.js shows the poster of the
// last frame. Same steps here, so the story shows the opening as a visitor sees it once it has played.
function settleHero(root) {
  const card = root.querySelector('[data-hero-meta]');
  const projects = [...card.querySelectorAll('.hero-goal_project')];
  const ratio = projects.filter((p) => p.classList.contains('is-completed')).length / projects.length;
  card.hidden = false;
  card.classList.add('is-in', 'is-expanded');
  card.style.setProperty('--hero-goal-p', ratio.toFixed(4));
  card.querySelector('[data-hero-goal-num]').textContent = Math.round(ratio * 100) + '%';
  const video = root.querySelector('[data-hero-video]');
  video.removeAttribute('autoplay');
  video.preload = 'none';
  video.poster = video.dataset.endLight;
}

// page key: the file in astro/dist
export const pages = { home: 'index.html', styleGuide: 'style-guide.html' };

// Not a story: the preloader. It shows only when a page script has run (.js on <html>), on the first visit, and the
// reduced motion state these stories show hides it.
export const sections = {
  home: [
    { id: 'nav', name: 'Nav', selector: 'body > header.nav', fixed: '88px', text: 'The logo, the numbered index of the twelve sections, the Codex and the call to start.' },
    { id: 'hero', name: 'Hero', selector: '#opening', settle: settleHero, text: 'The opening as it ends: the temple on the last frame, the title, the two calls and the goal card of Olimpo itself, open at one project of three.' },
    { id: 'frieze', name: 'Frieze', selector: 'main > .frieze', text: 'The Greek key band between acts. olimpo.js fills it with the meander tiles, so here it shows as the empty band.' },
    { id: 'problem', name: 'Problem', selector: '#problem', text: 'Every count reset after one slip, with the band of attempts that stopped (moved by olimpo.js on the page).' },
    { id: 'turn', name: 'Turn', selector: '#turn', text: 'The statement with the traveler inline; on the page its words fade in with the scroll.' },
    { id: 'method', name: 'Method', selector: '#method', text: 'Goal, project, task: one row each, with the illustration of the current theme.' },
    { id: 'planner', name: 'Planner', selector: '#planner', text: 'The temple of Delphi in the back and the Oracle phone that builds the plan.' },
    { id: 'followup', name: 'Follow-up', selector: '#followup', text: 'Chiron calls you back. The red figure vase is a three.js canvas on the page, so it is empty here.' },
    { id: 'execution', name: 'Execution', selector: '#execution', text: 'The steps that light up with the scroll beside the Focus Mode phone.' },
    { id: 'personalization', name: 'Personalization', selector: '#personalization', text: 'The band of the 16 types; on the page vertical scrolling moves it sideways.' },
    { id: 'staying-power', name: 'Staying power', selector: '#staying-power', text: 'The bento with the curfew dial, the streak and the trophies.' },
    { id: 'trust', name: 'Trust', selector: '#trust', text: 'Cerberus and the three layers of privacy.' },
    { id: 'plans', name: 'Plans', selector: '#plans', text: 'The billing switch and the three plan cards, annual prices first.' },
    { id: 'closing', name: 'Closing', selector: '#closing', text: 'The summit in the back and the last call to start.' },
    { id: 'footer', name: 'Footer', selector: 'body > footer.section_footer', text: 'The section list, the legal documents and the Codex.' },
    { id: 'dock', name: 'Codex dock', selector: '#codex > .dock', fixed: '120px', text: 'The dock of the Codex reader. With no tab open it shows only "Códex".' },
  ],
  styleGuide: [
    { id: 'hero', name: 'Hero', selector: '#content', text: 'The small nav, the title, the intro and the index of the six sections.' },
    { id: 'typography', name: 'Typography', selector: '#typography', text: 'The fluid root scale and the nine heading levels.' },
    { id: 'rich-text', name: 'Rich text', selector: '#richtext', text: 'The rich text block every CMS field renders through.' },
    { id: 'color', name: 'Color', selector: '#color', text: 'The brand palette and the semantic layer that points at it.' },
    { id: 'spacing', name: 'Spacing', selector: '#spacing', text: 'The spacing scale, the direction and size combo and the spacers.' },
    { id: 'sizing', name: 'Sizing', selector: '#sizing', text: 'Containers, the page padding and the max widths.' },
    { id: 'components', name: 'Components', selector: '#components', text: 'The buttons, the navigation and the other Webflow components.' },
  ],
};
