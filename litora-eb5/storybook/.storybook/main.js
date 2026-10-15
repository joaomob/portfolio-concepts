// Storybook of the Litora EB-5 sections. Each story is one section taken from a page of the BUILT Astro site
// (astro/dist, build it first), so what shows here is what goes live, with nothing copied by hand. The Astro build is
// served under /concepts/litora-eb5/, the address its stylesheet, fonts and photos use.
/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  stories: ['../src/stories/**/*.stories.js'],
  framework: { name: '@storybook/html-vite', options: {} },
  addons: ['@storybook/addon-a11y'],
  staticDirs: [{ from: '../../astro/dist', to: '/concepts/litora-eb5' }],
  core: { disableTelemetry: true },
};
