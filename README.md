# Portfolio concepts

The coded prototypes of João Marcos's portfolio cases, each built twice, in Astro and in Next.js, with a Storybook of
its sections. Every build is published hidden (noindex, out of the sitemap) on joaomob.com and linked from its case,
next to the Webflow or HubSpot build.

Framework choice and sources: `joaomob-site/docs/research/coded-prototypes-framework-2026-10-15.md` (Astro static for
every case, Next.js with static export as the second build, Storybook 10 with `@storybook/html-vite`).

## Layout

```
<slug>/astro       Astro 7, static output, base /concepts/<slug>/
<slug>/next        Next.js 15, App Router, TypeScript, output 'export', basePath /concepts/<slug>/next
<slug>/storybook   Storybook 10 (html-vite), one story per section taken from the Astro build, base /concepts/<slug>/storybook/
<slug>/REPORT.md   what was ported, the parity check against the original prototype, open points
```

One `npm install` at the root serves every case (Node resolves packages upward), so a case folder has no
`node_modules` of its own.

## Where each case comes from

| Case | Original prototype |
|---|---|
| vanth | `flowforge/projects/ai-photo-collections/src` (Next.js start: `ai-photo-collections/next`) |
| arcanae | `flowforge/projects/arcanae/src` |
| can-arbos | `flowforge/projects/can-arbos/src` |
| litora-eb5 | `flowforge/projects/eb5-real-estate/src` |
| olimpo-lp | `flowforge/projects/olimpo/src` |
| redline-md | `flowforge/projects/redline-md/src` |

The originals are read, never changed from here.

## Rules for every build

- Same page, same look: every page of each build matches the original prototype in visible text, links, images and
  a screenshot at 1440 and 375.
- Photos and media live once, in the Astro build (`/concepts/<slug>/assets/`); the Next.js build points at the same
  addresses.
- Scripts (GSAP, Lenis, three.js) are served from joaomob.com, because the CSP of `/concepts/**` allows scripts from
  the site only.
- Every page carries `<meta name="robots" content="noindex">` and a canonical to its own address.
- Code, comments, file names in English.
