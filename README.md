# Golden Moments — Astro website

A quiet, static website for Golden Moments. It shares the mobile app's DESIGN.md source, avoids medical claims and false feature promises, and deploys to GitHub Pages with no backend, web forms, trackers, cookies, or external font requests.

## Local development

Requires Node.js 24+.

```sh
npm ci
npm run dev
npm run check
```

Production output is in `dist/`. The CI and deployment workflows both run `npm run check` before publishing.

## GitHub Pages

This is a project site at **https://streamentry.github.io/golden-moments-web/**. `astro.config.mjs` sets the `site` and `base`. All internal links and public assets pass through `pathFor()`; do not add root-relative URLs that omit the project prefix.

After merging, set **Settings → Pages → Build and deployment → Source: GitHub Actions** once. The deploy workflow runs on pushes to `main` and can be run manually. The website needs no server-side functionality, API tokens, or runtime environment variables.

A custom domain requires changing `site`, removing `base` if served from the origin root, updating canonical/sitemap expectations, and adding a CNAME. See Astro's official GitHub Pages guide.

## Editorial contract

- This is a **website**, not a representation of the unreleased mobile build.
- The tiny matching activity is a clearly labeled, hand-illustrated web preview; it is **not a native app screenshot**.
- A personal-photo feature is **in development**; do not describe it as already available in the App Store version.
- Do not make cognitive improvement, dementia treatment, prevention, assessment, or medical efficacy claims.
- The public App Store still lists an earlier release. Review the live listing and the mobile repository's `docs/specs/release-status.json` before changing product claims.
- For every visual change, consult `DESIGN.md` (copied from `streamentry/golden_moments`). Avoid gradients, glass overlays, stock-grandparent clichés, invented testimonials, and generic AI art.
- The support address is taken from the publisher's public App Store listing. Confirm ownership before adopting an alternative.
- There are no client-side analytics or cookies. Avoid adding third-party scripts.

See `AGENTS.md` for the implementation contract.

## Verification

`npm run test` covers the demo state machine and source invariants. `npm run verify:dist` checks the emitted GitHub Pages prefix, pages, asset links, and forbidden external scripts after `npm run build`. Build output must be checked in CI; source checks alone do not prove deployment.

The app download link is the live, published App Store URL. Links to other websites open separately.

## App Review legal pages

Public URLs, once GitHub Pages is enabled and the site is deployed:

- App Privacy Policy: `https://streamentry.github.io/golden-moments-web/app-privacy/` (suggested App Store Connect **Privacy Policy URL**)
- Privacy Choices: `https://streamentry.github.io/golden-moments-web/privacy-choices/` (optional **Privacy Choices URL**)
- Support: `https://streamentry.github.io/golden-moments-web/support/`
- Terms / standard EULA reference: `https://streamentry.github.io/golden-moments-web/terms/`
- Safety: `https://streamentry.github.io/golden-moments-web/safety/`
- Website privacy: `https://streamentry.github.io/golden-moments-web/privacy/`
- Index: `https://streamentry.github.io/golden-moments-web/legal/`

**Do not copy these into App Store Connect before confirming the pages are live and the native binary's disclosures match.** The public store still lists an older release. `docs/legal/app-review-gates.md` records the outstanding verification and contact-ownership decisions. Do not replace Apple's standard EULA with a custom license by default. These pages are drafts subject to legal and privacy review, not a promise of legal clearance.
