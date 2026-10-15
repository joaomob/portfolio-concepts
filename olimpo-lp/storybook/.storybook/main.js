// Storybook of the Olimpo landing and its style guide. Each story is one section taken from a page of the BUILT Astro
// site (astro/dist, build it first), so what shows here is what goes live, with nothing copied by hand. The Astro build
// is served under /concepts/olimpo-lp/, the address its stylesheets, fonts, photos and videos use.
/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  stories: ['../src/stories/**/*.stories.js'],
  framework: { name: '@storybook/html-vite', options: {} },
  addons: ['@storybook/addon-a11y'],
  staticDirs: [{ from: '../../astro/dist', to: '/concepts/olimpo-lp' }],
  core: { disableTelemetry: true },
  // the catalogue is published on joaomob.com and stays out of search, like the builds
  managerHead: (head) => `${head}<meta name="robots" content="noindex">`,
  previewHead: (head) => `${head}<meta name="robots" content="noindex">`,
};
