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

## October 18, 2026 store-page alignment

The website now links both public store listings and adds `/help/` and `/terms/` alongside `/support/` and `/privacy/`. Version-specific help describes the 1.3.0 update while preserving the fact that personal photos are not yet in the public release. Privacy copy distinguishes website hosting, local selected-photo copies, device backups and support email. Apple's Standard EULA remains the iOS licence; the Terms page does not introduce a replacement contract.

Local validation: `npm run check` under Node 24.19.0 passed; homepage and Help were inspected through the Browser plugin. The independent copy/source review found no actionable defects. Mobile viewport, real-device accessibility, native runtime, app-store approval and public release remain separate evidence. After GitHub Pages deployment, verify the live home, help, terms, privacy, navigation and store links.
