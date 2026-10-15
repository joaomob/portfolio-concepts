# Arcanae Craft, Astro + Next.js + Storybook port

Source: the original prototype in `flowforge/projects/arcanae/src` (read only), pages in `src/site/`.
Published addresses on joaomob.com:

| Build | Address | Output folder |
| --- | --- | --- |
| Astro | `/concepts/arcanae/` | `arcanae/astro/dist` |
| Next.js | `/concepts/arcanae/next/` | `arcanae/next/out` |
| Storybook | `/concepts/arcanae/storybook/` | `arcanae/storybook/storybook-static` |

Every page has `<meta name="robots" content="noindex">` and a canonical of `https://joaomob.com/concepts/arcanae/<page>` (Astro) or `https://joaomob.com/concepts/arcanae/next/<page>` (Next). The Storybook manager and preview carry the same noindex.

## Pages ported

| Page | Astro | Next |
| --- | --- | --- |
| Home | `index.html` | `index.html` |
| Collection (the `?status=` and category views switch in the browser, as in the original) | `collection.html` | `collection.html` |
| 22 product pages (`product.html?card=<slug>` in the original) | `product/<slug>.html` | `product/<slug>.html` |
| Shipping, Terms, Privacy, Legal Notice | `shipping.html`, `terms.html`, `privacy.html`, `legal-notice.html` | same |
| Success (after checkout) | `success.html` | `success.html` |

## Folder trees (source only)

```
arcanae/
  package.json            scripts only, no dependencies (the root node_modules is used)
  .gitignore              review/all/
  REPORT.md
  scripts/
    vendor-three.mjs      copies the used part of three.js into vendor/three and the Draco decoder
    parity.mjs            parity check against the original (ports 4611, 4612)
    storybook-check.mjs   opens every story as published (port 4613)
  vendor/three/           three.js 0.171.0, only the files the hero imports (code, under 1 MB each)
  review/                 parity.json and 12 screenshots under 300 KB
  astro/
    astro.config.mjs, tsconfig.json
    scripts/sync-assets.mjs     copies the media from the original into public/assets (gitignored)
    public/vendor/draco/        Draco decoder fetched at runtime
    src/
      env.d.ts
      data/        products.json, catalog.ts, home.ts, pages.ts, shipping.ts, legal/*.html
      lib/         site.ts (bases, asset(), page(), canonical()), catalog.ts (view helpers)
      styles/      tokens.css, base.css, components.css, states.css
      scripts/     boot.ts, cart.ts, effects.ts, faq.ts, focus-trap.ts, hero-3d.ts, motion.ts,
                   product-gallery.ts, product-grid.ts, site-chrome.ts, smooth-scroll.ts
      scripts/head/  hero-still.js, intro-gate.js, card-loading.js (inlined before the first paint)
      layouts/     BaseLayout.astro
      components/  Nav, Footer, CartDrawer, Intro, ProductCard, StatusFilter, Trust
      components/home/     Hero, Collection, Craft, TrustBand, Plate, Story, Faq, Wheel, Newsletter
      components/product/  Product, ProductGallery, ProductInfo, ProductTrust, Related, Lightbox
      components/info/     LegalArticle
      components/success/  Success
      pages/       index.astro, collection.astro, product/[slug].astro, [info].astro, success.astro
  next/
    next.config.mjs, tsconfig.json, types.d.ts, next-env.d.ts
    app/         layout.tsx, page.tsx, collection/page.tsx, product/[slug]/page.tsx, [info]/page.tsx, success/page.tsx
    components/  SiteFrame, PageScripts (client), Nav, Footer, CartDrawer, Intro, ProductCard, StatusFilter, Trust,
                 LegalArticle, Success
    components/home/     Hero, Collection, Craft, TrustBand, Plate, Story, Faq, Wheel, Newsletter
    components/product/  Product, ProductTrust, Related, Lightbox
    lib/         meta.ts (Next metadata), head-scripts.ts (reads astro/src/scripts/head at build time)
  storybook/
    .storybook/  main.js, preview.js
    src/sections.js
    src/stories/  page.js, Home, Collection, Product, Info, Success, Tokens (.stories.js)
```

## What was componentized

- Shared frame: Nav, Footer, CartDrawer, Intro (home only), ProductCard, StatusFilter, Trust.
- Home: one component per section, 9 sections (Hero, Collection, Craft, TrustBand, Plate, Story, Faq, Wheel, Newsletter).
- Product: Product (gallery and info), ProductTrust, Related, Lightbox.
- Info pages: LegalArticle. Success: Success.
- Next.js mirrors the same list in TSX. It imports the data, the view helpers (`astro/src/lib`), the four CSS files and the browser code (`astro/src/scripts/boot.ts`) from the Astro tree, so both builds have one source of content, style and behavior. The Next `SiteFrame` plays the part of `BaseLayout.astro`, and `PageScripts` (a client component) calls `boot(page)` in `useEffect` and returns its cleanup.
- GSAP 3.13.0 and Lenis 1.3.27 come from npm (root node_modules). Every module returns a cleanup function, so the Next pages undo listeners, ScrollTriggers, Lenis and the WebGL renderer on unmount.

## Data files

- `astro/src/data/products.json`: the 22 cards from the original `src/site/js/products.js` (price, height, weight, image, renders, correspondences, blurb, meaning).
- `astro/src/data/catalog.ts`: types and the fixed text of the product page (includes, finish, uses, artwork).
- `astro/src/data/home.ts`: craft steps, trust items of the home and of the product page, FAQ, story.
- `astro/src/data/pages.ts`: titles, descriptions, social card text, the category views of the collection and the four info pages.
- `astro/src/data/legal/*.html`: the rich text of the info pages, with `{{base}}` for the link base.
- `astro/src/data/shipping.ts`: shipping cost per country and the margin, from the original `store.js`.

## Build commands

Run from `portfolio-concepts/arcanae` (nothing is installed; the binaries are the ones in `portfolio-concepts/node_modules`):

```
node astro/scripts/sync-assets.mjs
cd astro && node ../../node_modules/astro/bin/astro.mjs build && cd ..
cd next && node ../../node_modules/next/dist/bin/next build && cd ..
node ../node_modules/storybook/dist/bin/dispatcher.js build -c storybook/.storybook -o storybook/storybook-static
node scripts/parity.mjs --shots
node scripts/storybook-check.mjs
```

The same commands are in `package.json` as `assets`, `astro:build` (runs the asset copy first), `next:build`, `storybook:build`, `parity` and `storybook:check`. `node scripts/vendor-three.mjs <path to node_modules/three>` refreshes `vendor/three` and is only needed to change the three.js version.

The Storybook reads the built Astro pages, so the Astro build runs before it. `next build` runs the TypeScript check and passes.

## Parity

`scripts/parity.mjs` serves the original on port 4611 and both builds on port 4612, opens every page at 1440x900 and 375x812 in headless Chrome, scrolls through it, waits for the images and compares visible text, visible links, broken visible images, console errors and document height (2% tolerance). Result in `review/parity.json`: **116 of 116 checks pass**.

| Page | Astro 1440 | Astro 375 | Next 1440 | Next 375 | Height difference | Links at 1440 (port/original) |
| --- | --- | --- | --- | --- | --- | --- |
| home | pass | pass | pass | pass | 0 px | 21/21 |
| collection | pass | pass | pass | pass | 0 px | 33/33 |
| product, 22 pages | 22/22 | 22/22 | 22/22 | 22/22 | 0 px on every page | 15/15 |
| shipping | pass | pass | pass | pass | 0 px | 11/11 |
| terms | pass | pass | pass | pass | 0 px | 15/15 |
| privacy | pass | pass | pass | pass | 0 px | 12/12 |
| legal-notice | pass | pass | pass | pass | 0 px | 13/13 |
| success | pass | pass | pass | pass | 0 px | 1/1 |

No broken images and no console errors on any page of either build.

Screenshots in `review/` (home and The Fool, both widths, original, Astro and Next); the rest (collection, shipping, success, every story) are in `review/all/`, which is not committed. I looked at them: the ports match the original section by section. In a full page screenshot some lazy card photos and the wheel statues are still loading in the original and in the ports alike, and the sections that fade in on scroll are forced visible for the picture only.

Storybook: `scripts/storybook-check.mjs` serves the static Storybook at `/concepts/arcanae/storybook/` and the Astro build at `/concepts/arcanae/`, opens the manager and all 18 stories, and checks that each section renders with the site stylesheet and no failed request or script error: **19 of 19 pass**.

## Differences from the original and why

- URLs: product pages are `product/<slug>` instead of `product.html?card=<slug>`, so each product has its own static page and canonical. The parity check maps the old form to the new one.
- Rendered on the server instead of in the browser: the product grids (all 22 cards rendered; the cards past the first page of the home start hidden and the grid script pages through them), the status counts, the wheel statues, the product page and the shipping list of the cart drawer. The original built these with JavaScript after load.
- three.js 0.171.0, vendored, against 0.170.0 from a CDN in the original: three is not installed at the root of portfolio-concepts and npm install is not allowed here, so the local copy available was vendored. GSAP comes from npm at the same version as the original CDN (3.13.0); Lenis from npm (1.3.27) against the vendored copy the original loads.
- `robots` is `noindex` (the brief) against `noindex, nofollow` in the original.
- Next sets `og:image` as an absolute URL (`https://joaomob.com/concepts/arcanae/assets/brand/og-image.jpg`) through `metadataBase`; Astro keeps the root relative path of the original.
- Next product cards: the photo box is rendered with `dangerouslySetInnerHTML`. The card-loading head script (from the original) adds the gold dot outline inside it before React hydrates, and with a normal child list React reported hydration error 418 on every page with cards. React does not compare inside `dangerouslySetInnerHTML`, so the output HTML stays the same and the error is gone.
- The parity text compare leaves out the hero loading line ("Loading The Fool 100%"): it is a progress state that depends on how fast the 3D model arrives, and with three pages loading at once it was sometimes still on screen in one version and gone in the other.
- Google Fonts are kept as in the original (Cinzel, Cormorant Garamond, Inter; the success page loads its smaller set).

## Open points

- Checkout calls `/api/create-checkout-session`, as the original does. joaomob.com serves static files, so the button returns to its normal state with no message; the message for "checkout not available" has no approved text in the original either.
- The newsletter form shows the success message without sending anything, as in the original prototype.
- If joaomob.com adds a Content Security Policy, it must allow `fonts.googleapis.com` and `fonts.gstatic.com`, and `wasm-unsafe-eval` for the Draco decoder of the 3D hero.
- The headless Chrome used for parity has a working GPU, so the 3D hero ran in both versions; the still picture shown on devices without a GPU was not part of the check.

## Left out, and why

- `src/site/category-template.html`, `info-template.html`, `product-template.html`, `webflow-parts.html`: helpers for pasting into Webflow, not pages of the site.
- `src/site/style-guide.html` and `src/style-guide.html`: internal; the Storybook Tokens story covers colours, type scale and spacing.
- `src/_before-site/`, `src/_check-before/`, `src/_lab/` (`hero.html`): earlier versions and experiments.
- `src/index.html`, `src/home.html`, `src/proto-v4.html`, `src/grade-preview.html`, `src/hs/`: the replica of the GSAP Field base and earlier prototypes, not the store.
- `src/assets/*.html`: saved reference pages.
- `src/site/js/i18n.js`: not used by any page.
- Videos: the store pages use none. The only mp4 and webm files in the original belong to the GSAP Field reference above.
- Build and measuring scripts of the original (`build-*.js`, `measure-*.py`, `run-lighthouse.mjs`, `stl-*.py`, `price-by-weight.js`): tools, not site.
- The cart drawer has no story of its own: without the page script it is closed and off screen; it is covered by the parity run on every page.
