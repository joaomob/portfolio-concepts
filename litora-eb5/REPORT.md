# Litora EB-5: Astro, Next.js and Storybook port

The source is the static prototype in `flowforge/projects/eb5-real-estate/src`. Its generator (`build.mjs`) writes `site/` from `templates/`, `sections/` and `content/`. This port rebuilds the real site pages in three ways. It reads the original and never changes it.

## What was ported and what was left out

The port covers 10 pages, each in pt-BR and en-US, plus the 2 calendar files:

- the webinar page (`/webinar-visto-eb5`, `/en/eb5-visa-webinar`)
- the webinar thank you page (`/webinar-visto-eb5/obrigado`, `/en/eb5-visa-webinar/thank-you`)
- the event page (`/evento-visto-eb5-sao-paulo`, `/en/eb5-event-sao-paulo`)
- the event thank you page (`/evento-visto-eb5-sao-paulo/obrigado`, `/en/eb5-event-sao-paulo/thank-you`)
- the privacy page (`/privacidade`, `/en/privacy`)
- `litora-eb5-webinar.ics`, in pt-BR and en-US

These parts of the original were left out:

| Left out | Why |
| --- | --- |
| `style-guide.html` | A lab page for the design system, not a page of the site. Its tokens appear as the Tokens story in Storybook. |
| `sections/*.html` (16 fragments) | The generator's inputs. Their markup now lives in the section components. |
| `templates/*.html` (page, button, language switch, logo) | Generator inputs too. They became `BaseLayout`, `ButtonLabel`, `LanguageSwitch` and `Logo`. |
| `shots/`, `webflow/` | Review screenshots and Webflow export work. Neither is part of the site. |
| `build-*.py`, `run-*.mjs`, `check-interactions.cjs`, `review-shots.cjs` | Build and test tooling for the original. |

## Folder trees (tracked files)

```
litora-eb5/
  .gitignore                 review/all/, next/next-env.d.ts
  REPORT.md
  scripts/parity.mjs
  review/                    12 JPGs (largest 136 KB) and parity.json
  astro/
    astro.config.mjs  package.json  tsconfig.json
    scripts/sync-assets.mjs  copies the original's media into public/assets (gitignored)
    src/
      assets/fonts/unbounded-latin-500-word.woff2
      data/site.json  data/images.json  data/content/*.json (12 files)
      layouts/BaseLayout.astro
      lib/content.ts  head.ts  icons.ts  types.ts
      pages/[...slug].astro  pages/[...file].ics.ts
      components/*.astro (10)  components/sections/*.astro (16)
      scripts/form.ts  motion.ts  page.ts
      styles/index.css  tokens.css  system.css  sections/*.css (15)
  next/
    next.config.ts  package.json  tsconfig.json
    app/[...slug]/layout.tsx  app/[...slug]/page.tsx
    components/*.tsx (11)  components/sections/*.tsx (16)
  storybook/
    package.json
    .storybook/main.js  .storybook/preview.js
    src/sections.js
    src/stories/page.js  Webinar.stories.js  Event.stories.js  ThankYou.stories.js  Privacy.stories.js  Tokens.stories.js
```

## What was componentized

- **Sections (16, identical in Astro and Next):** SiteHeader, HeroEvent, FormCard, StatementReveal, ProjectReveal, TopicGrid, AudienceCards, Speakers, StatRow, ProjectStack, FaqAccordion, CtaBand, ConfirmationHero, StepsList, LegalText, SiteFooter.
- **Shared pieces:** ButtonLabel, Icon, LanguageSwitch, Logo, HeroTopBanner, Picture, TimeBlock, PhotoCard, Keep (the "keep together" span that prevents orphans) and Module, which maps each content module to its section. Next also has PageScripts, a client component that starts and stops the form and motion scripts.
- **One dynamic route per build:** the 10 pages come from the same route file and the data. In Astro that is `[...slug].astro`, in Next `app/[...slug]/page.tsx` with `generateStaticParams`. The event and webinar landing pages use the same modules and differ only in their content file.
- **One content layer:** `astro/src/lib/content.ts` turns a route into a page view (head, alternates, modules, calendar link). It has no framework code. Next imports it through the `@astro/*` path, so both builds render the same data.
- **Styles:** the original CSS split into tokens, system and one file per section. Next imports the same `index.css`.

## Data files

- `astro/src/data/site.json`: brand, base URL, default language, and every page with its path per language.
- `astro/src/data/content/<page>.<lang>.json`: the text and module list of each page, plus `global.<lang>.json` for the skip link, header and footer.
- `astro/src/data/images.json`: the image manifest, with the resized files of each photo per crop (wide and tall) and their sizes.

## Build commands

Run from `portfolio-concepts/` after the root `npm install` (no install per folder; every script calls the root binaries).

```
cd litora-eb5/astro && npm run build        # output: litora-eb5/astro/dist
cd litora-eb5/next && npm run build         # output: litora-eb5/next/out (basePath /concepts/litora-eb5/next)
cd litora-eb5/storybook && npm run build    # output: litora-eb5/storybook/storybook-static (needs astro/dist first)
node litora-eb5/scripts/parity.mjs          # add --only=astro or --only=next, and --shots=all for every full page shot
```

The Next type check passes during `next build`. `npm run check` in `astro/` and `next/` runs `tsc --noEmit` on its own.

## Parity

`scripts/parity.mjs` serves the original on 4631, Astro on 4632 and Next on 4633. It opens every page at 1440x900 and 375x812 in Chrome and compares four things against the original: visible text, links, images and console errors. It also compares the full page height (2% tolerance) and the first screen pixels (1% tolerance). The last run (15/10/2026) gave:

| Page | 1440 Astro | 1440 Next | 375 Astro | 375 Next |
| --- | --- | --- | --- | --- |
| webinar-visto-eb5 | pass | pass | pass | pass |
| en/eb5-visa-webinar | pass | pass | pass | pass |
| webinar-visto-eb5/obrigado | pass | pass | pass | pass |
| en/eb5-visa-webinar/thank-you | pass | pass | pass | pass |
| evento-visto-eb5-sao-paulo | pass | pass | pass | pass |
| en/eb5-event-sao-paulo | pass | pass | pass | pass |
| evento-visto-eb5-sao-paulo/obrigado | pass | pass | pass | pass |
| en/eb5-event-sao-paulo/thank-you | pass | pass | pass | pass |
| privacidade | pass | pass | pass | pass |
| en/privacy | pass | pass | pass | pass |

All 40 rows pass, with 0.00% height drift and 0.00% first screen pixel difference. The behaviour checks also pass for the original, Astro and Next on the webinar and event pages: scroll reveals at 1440 and 375, plus form validation and the redirect to the thank you page (18 of 18). The only note is an error that the original logs on some pages and the port does not; see the IntersectionObserver item below. The details are in `review/parity.json`. The screenshots in `review/` are the webinar and its thank you page at both widths, for the original, Astro and Next. With `--shots=all`, full page shots of every page go to `review/all/`, which is gitignored.

Storybook was checked separately. All 17 stories render at 1440 and 375 without console errors. The test server's missing `/favicon.ico` was the only 404.

## Storybook

- Storybook 10 with `@storybook/html-vite` and `@storybook/addon-a11y`. Each story reads a page of `astro/dist` as text and takes one section out of it, so the stories show the HTML that goes live.
- 17 stories in "Page/Section" groups:
  - Webinar (12): header, hero, statement, project, topics, audience, speakers, numbers, stack, questions, final call, footer.
  - Event (1): the hero, whose form has the period choice.
  - Thank you (2): confirmation hero and steps.
  - Privacy (1): legal text.
  - Tokens (1): colours, type scale and spacing, read from `tokens.css`, with values from the live stylesheet.
- Sections the event and thank you pages share with the webinar are not repeated.
- The viewport menu has 1440x900, 768x1024 and 375x812.
- The build uses relative paths, so it works under `/concepts/litora-eb5/storybook/`. `astro/dist` is served at `/concepts/litora-eb5/`, the address the stylesheet, fonts and photos use.

## Differences from the original, and why

1. **Forms never post.** The original's `js/form.js` posts to `https://api.hsforms.com/submissions/v3/integration/submit/`. That host is not `api-eu1.hsforms.com`, the only form host the CSP allows. The port keeps the markup and validation, then shows the prototype's own success state by going to the thank you page (`data-redirect`). The `data-hubspot-form` hook stays, so a submit to `api-eu1.hsforms.com` can be added later.
2. **HubSpot portal id and form guids removed.** The repository is public, so the ids were taken out of `site.json`, the content files, the types and the form markup.
3. **GSAP is bundled.** The original loads GSAP 3.15.0 from cdnjs. The port imports the `gsap` npm package installed at the root, version 3.13.0, so there is no third party script at run time. The motion checks pass with it.
4. **IntersectionObserver fix.** When the window height is 0, the original's header observer builds a `rootMargin` that is not a valid length and throws a SyntaxError. The port clamps it with `Math.max(0, innerHeight - nav)`. That is why the parity notes list a console error for the original only.
5. **Calendar file.** Only the Astro build writes the `.ics` files. The Next thank you page links to the Astro address of the same file, so the calendar link has an absolute href.
6. **Font URL warning.** The fonts use absolute URLs under the base path (`/concepts/litora-eb5/assets/fonts/`). Vite reports that they "didn't resolve at build time". The files come from `public/assets`, filled by `sync-assets.mjs`, and load in the browser, as the parity screenshots show.
7. **Storybook shows sections still.** The page scripts do not run in Storybook, so every reveal shows its final state, as with reduced motion. The header is shown even though the page hides it over the hero (`is-hidden` is removed).

## Open points

- The forms do not reach HubSpot. Sending real submissions needs `api-eu1.hsforms.com` with the portal and form ids, which a public repository should not hold. They would have to come from build time configuration.
- GSAP 3.13.0 (root npm) against 3.15.0 in the original. Moving the root to 3.15.0 would make the versions match.
- The media come from the original folder through `astro/scripts/sync-assets.mjs` and are not committed here. Building on another machine needs the flowforge folder, or `LITORA_SRC` pointing at the original assets.
- Storybook is 13 MB, because it copies `astro/dist` to serve the stylesheet and the photos.
