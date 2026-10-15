// Links between the pages of the Next build: '' is the landing, 'case-study#style-guide' the style guide tab.
import { BASE } from '@astro/lib/site';

export const NEXT_MOUNT = `${BASE}next/`;

export const page = (path: string): string => `${NEXT_MOUNT}${path}`;
