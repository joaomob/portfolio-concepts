import { viewports } from '../src/sections.js';

/** @type { import('@storybook/html').Preview } */
export default {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    viewport: {
      options: Object.fromEntries(viewports.map((v) => [v.id, { name: `${v.name} ${v.width}x${v.height}`, styles: { width: `${v.width}px`, height: `${v.height}px` }, type: v.id }])),
    },
  },
  initialGlobals: { viewport: { value: 'desktop', isRotated: false } },
};
