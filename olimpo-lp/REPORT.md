# olimpo-lp: Astro, Next.js and Storybook ports

The Olimpo landing (`flowforge/projects/olimpo/src`, read only) is ported three ways: as an Astro 7 static site, as a Next.js 15 static export and as a Storybook 10 of its sections. Two pages are ported, `index.html` (the landing) and `style-guide.html`. Two things are left out. `_lab/` holds experiments and is not a page of the site. `vase.html` is the standalone test page of the vase scene, which the landing already embeds.

Addresses:

- Astro: `https://joaomob.com/concepts/olimpo-lp/` and `/concepts/olimpo-lp/style-guide`
- Next.js: `/concepts/olimpo-lp/next/` and `/concepts/olimpo-lp/next/style-guide`
- Storybook: `/concepts/olimpo-lp/storybook/`

Every page has `noindex` and a canonical on `https://joaomob.com/concepts/olimpo-lp/<page>` (for Next, `.../next/<page>`).

No CDN is used. The CSP of `/concepts` allows only `'self'` and `'unsafe-inline'`, so everything is served from the site. GSAP comes from npm and three.js from `vendor/`.

## Trees

```
olimpo-lp/
  astro/
    astro.config.mjs        base /concepts/olimpo-lp/, build.format 'file', trailingSlash 'never', three aliases
    src/
      layouts/BaseLayout.astro
      pages/index.astro, style-guide.astro
      components/home/       28 components (one per section plus the repeated pieces)
      components/style-guide/ 5 components
      data/                  14 data files
      lib/site.ts            base path, asset(), canonical()
      scripts/home.js, olimpo.js, phones.js, vase.js
      styles/home/ (base files, codex/, scenes/, sections/), styles/style-guide/
    public/assets/           copied by scripts/sync-assets.mjs, gitignored
  next/
    next.config.mjs          output 'export', basePath /concepts/olimpo-lp/next, images unoptimized
    app/(home)/layout.tsx, page.tsx
    app/(style-guide)/layout.tsx, style-guide/page.tsx
    components/home/         29 TSX (the 28 sections and pieces plus HomeMotion.tsx)
    components/style-guide/  5 TSX
    components/motion.ts
    lib/meta.ts, types/
  storybook/
    .storybook/main.js, preview.js
    src/sections.js          the single list of sections per page
    src/stories/page.js, Home.stories.js, StyleGuide.stories.js, Tokens.stories.js
  scripts/parity.mjs, storybook-check.mjs, sync-assets.mjs
  vendor/three/              three 0.171.0 module build and RoomEnvironment, MIT LICENSE
  review/                    parity and Storybook screenshots (JPG, each under 300 KB), parity.json
```

## Componentization

The home sections have the same names in Astro (`.astro`) and in Next (`.tsx`):

- SiteNav, Preloader, OpeningSection, Frieze
- ProblemSection, TurnSection, MethodSection, PlannerSection
- FollowupSection, ExecutionSection, PersonalizationSection, StayingPowerSection
- TrustSection, PlansSection, ClosingSection, SiteFooter, CodexRoot

Repeated pieces: ArchetypeCard, AttemptCard, CodexDoor, Eyebrow, FocusMock, HeroGoalCard, LearnMore, OracleMock, PlanCard, TapDial and Term.

Style guide: SgHero, SgSection, SgSectionHeader, SgRow and SgCard.

Next only: `HomeMotion.tsx`. This client component runs the home scripts in an effect, with GSAP from npm and `vase.js` through a dynamic import, and it calls the cleanup they return on unmount.

`getStaticPaths` is not used. The site has two pages of different types, so there is no repeated page type.

## Data files

`astro/src/data/` holds 14 files:

- archetypes.ts, attempts.ts, codex-content.json, codex-doors.ts
- execution.ts, followup.ts, footer.ts, method.ts
- planner.ts, plans.ts, sections.ts, style-guide-nav.ts
- style-guide.json, trust.ts

The Next components import the same files through the `@astro/*` alias, so both builds render from one source.

## Build commands

Run from `olimpo-lp/`. The binaries are the ones in the root `node_modules`, and nothing is installed here.

```
cd astro && node ../scripts/sync-assets.mjs && node ../../node_modules/astro/bin/astro.mjs build      # astro/dist
cd next && node ../../node_modules/next/dist/bin/next build                                            # next/out
cd next && node ../../node_modules/typescript/bin/tsc --noEmit -p .                                    # type check
node ../node_modules/storybook/dist/bin/dispatcher.js build -c storybook/.storybook -o storybook/storybook-static --disable-telemetry
node scripts/parity.mjs                  # or --only=astro, --only=next (ports 4641, 4642, 4643)
node scripts/storybook-check.mjs         # port 4643, after the Astro and Storybook builds
```

The Storybook build writes relative `./` paths in `index.html` and `iframe.html`. Through staticDirs, it also copies `astro/dist` into its output at `concepts/olimpo-lp/`.

## Parity

The original is compared with each build under `prefers-reduced-motion: reduce`, on 15 October 2026. The text, links, images, inline SVG and console errors all match, and the height drift limit is 2%.

| Page | Width | Build | Height (original/build) | Drift | Links | Images | SVGs | Result |
|---|---|---|---|---|---|---|---|---|
| home | 1440 | astro | 17048/17048 | 0.00% | 36 | 46 | 100 | pass |
| home | 375 | astro | 15684/15684 | 0.00% | 36 | 46 | 100 | pass |
| style-guide | 1440 | astro | 20098/20098 | 0.00% | 29 | 0 | 0 | pass |
| style-guide | 375 | astro | 19492/19492 | 0.00% | 29 | 0 | 0 | pass |
| home | 1440 | next | 17048/17048 | 0.00% | 36 | 46 | 100 | pass |
| home | 375 | next | 15684/15684 | 0.00% | 36 | 46 | 100 | pass |
| style-guide | 1440 | next | 20098/20098 | 0.00% | 29 | 0 | 0 | pass |
| style-guide | 375 | next | 19492/19492 | 0.00% | 29 | 0 | 0 | pass |

Motion check: with motion on, the home of the original, of Astro and of Next each draw 2 canvases, at 1440 and at 375. Every console error comes from the original itself: a favicon 404 and a blocked Google Fonts request.

Storybook check: all 25 stories pass at 1440 and 375. Each story has content and its stylesheet loaded. It shows no console error and no failed request, and its text matches the section in `astro/dist`.

## Differences from the original

- three.js: the original imports three@0.170.0 from jsDelivr. The ports use three 0.171.0, the version available locally, vendored in `vendor/three`.
- lottie-web: the original loads lottie-web 5.13.0 from jsDelivr, and the package is not in the root `node_modules`. `LOTTIE_SRC` is `null`, so the streak counter shows its final value without the Lottie drawing. Missing package: `lottie-web`.
- Rive: the config keeps the runtime URL with `RIVE.enabled` false. The `.riv` file is missing from the original too.
- Google Fonts: the style guide loads Barlow Condensed and DM Sans from Google. The CSP blocks that request, so the ports drop it and use the fallback fonts. Parity blocks it for the original as well, so both sides are compared the same way.
- Style guide document: the original is a fragment with no doctype that starts with an HTML comment, so it renders in quirks mode. The ports add the doctype, charset, title, viewport and `lang`.
- A stray `}}`: there is one in `style-guide.html` and one in `css/olimpo.css`. Browsers drop the extra brace and PostCSS refuses it, so the ports remove it.
- `vase.js` loads through a dynamic import, so three.js is a separate chunk.
- Marquee: the original waits for the `load` event, but the Next client component can run after that event. So when the page has already loaded, the marquee starts at once.
- Next style guide: React has no fragment that takes raw HTML, so the free HTML blocks sit in `display: contents` wrappers. Empty `data-*` attributes are written as `""`, and `{' '}` keeps the spaces between inline elements.

Parity also adjusts how the original is measured, without changing its files:

- When the original style guide is served, it gets a viewport meta, because without one a phone lays it out 980 px wide.
- Everything is measured under reduced motion.
- Google Fonts is blocked.
- Whitespace between SVG tags is ignored. It draws nothing, and JSX drops it.

## Open points

- The Storybook stories show the static HTML of `astro/dist` without running any page script, so the parts that scripts draw are absent:
  - the frieze tiles;
  - the marquee clones;
  - the Oracle phone feed (phones.js);
  - the archetype portraits (olimpo.js);
  - the vase canvas (three.js);
  - the streak drawing.

  The hero story applies the end state the scripts leave under reduced motion: the goal card open at 33% and the poster of the last frame.
- The preloader has no story. It shows only with the `.js` class, and reduced motion hides it.
- `@storybook/addon-docs` is not installed at the root, so there is no autodocs page. Missing package: `@storybook/addon-docs`.
- `gitleaks dir` reports 6 generic-api-key hits, all of them Next preview keys in `next/.next/`, the gitignored build cache. `gitleaks protect --staged` finds no leak in what is committed.
