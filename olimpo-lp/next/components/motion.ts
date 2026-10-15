// Which entrance motion picks an element up: the section reveal, the hero sequence, or none (olimpo.js reads the
// data-reveal and data-hero-in attributes).
export type Motion = 'reveal' | 'hero' | 'none';

export const motionAttrs = (motion: Motion) => ({
  'data-reveal': motion === 'reveal' ? '' : undefined,
  'data-hero-in': motion === 'hero' ? '' : undefined,
});

export const cx = (...names: (string | false | null | undefined)[]): string => names.filter(Boolean).join(' ');
