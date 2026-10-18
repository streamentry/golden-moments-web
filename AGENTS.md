# Golden Moments website agent contract

Build a useful, dignified, lightweight Astro website for older adults, family members, and caregivers. The site is promotional and informational, not a medical device, diagnosis service, or live family-photo application.

## Sources of truth

- **Design:** this repo's `DESIGN.md`, synchronized from `streamentry/golden_moments/DESIGN.md`. Keep hex tokens, type scale, motion restraint, and adult voice aligned. The website may expand the page container for editorial columns while preserving the app's 720px reading measure.
- **Shipped features and release readiness:** mobile repo `README.md`, `metadata/app-store.en-US.json`, `docs/specs/release-status.json` and the **actual public App Store release**. Do not confuse code merged to main with an App Store release.
- **Delivery:** `astro.config.mjs`, `src/config/site.ts`, and GitHub Pages workflows. Keep project-base URLs correct.

## Invariants

- Astro static output; no adapter, SSR, database, account, forms requiring servers, analytics, trackers, third-party embeds, cookies, runtime remote images or fonts.
- The website preview is explicitly identified as an illustration, never passed off as a product screenshot. Use handcrafted SVGs and text; avoid AI slop, fake reviews, unsupported statistics, medical symbols, gradients, stock photography and decorative noise.
- Avoid cognitive improvement, diagnostic, treatment, prevention, therapeutic or disease-stage claims. Mention dementia and Alzheimer's only as audience/search context.
- Keep user choice and adult dignity: no countdowns, points, punishment, fireworks or forced reminiscence; matching mismatches wait for the next tap.
- Clearly label personal-photo importing as **planned** until actually available in the public app release.
- All navigation, internal links, favicon/preview assets, canonical links, sitemap, and scripts must work beneath `/golden-moments-web/` (and respect future custom domains).
- Links to the App Store and support email must work. No pretend contact forms.
- CSS mirrors palette: Antique Gold #7A5600, Parchment #FDF9F0, Linen #F5EDE0, Ink #222222, Walnut #5C5346, Driftwood #7D7366; bright Honey is ornament only.
- Text >=16px; controls >=48px; primary buttons >=56px; visible focus, 4.5:1 body contrast, no color-only state, no truncation at 200% zoom, reduced-motion support, actual semantic HTML.
- English copy is warm, concrete, and concise. Do not use marketing superlatives, faux scientific claims, artificial urgency, emojis or invented social proof.

## Implementation and evidence

Work in small, complete increments. Run `npm run check` locally or in GitHub Actions. Test keyboard navigation, mobile widths, 200% zoom, prefers-reduced-motion, relative asset paths and error pages. Do not claim visual/browser verification until performed.

Prefer native Astro, HTML, CSS, and a small amount of ordinary JavaScript. No UI framework, animation library, client hydration, external fonts, or unnecessary packages.

For changes affecting privacy or published app promises, check sources again and update legal/support copy deliberately. Document exceptions instead of weakening tests.

## Legal and App Review guardrails

- `/privacy/` describes the website; `/app-privacy/` is the proposed App Store **mobile app privacy-policy URL**. Do not confuse them. `/privacy-choices/`, `/terms/`, `/safety/`, `/legal/` and `/support/` must remain navigable and deployed.
- The mobile app license is the **Apple Standard EULA** by default. Do not introduce a custom EULA or binding mandatory arbitration without legal sign-off.
- Do not promise `Data Not Collected`, no Firebase transmissions, perfect encryption, no ads, clinical benefit, or complete deletion from backups unless the exact release build is verified and App Store Connect is consistent.
- Privacy and terms are **version-aware**. Family-photo import is in development; avoid depicting it as available in the currently published store version.
- Never assert a published DPO contact, corporate postal address, consent, vendor DPA or medical/legal approval unless verified. Keep `docs/legal/app-review-gates.md` unresolved items visibly open until evidence exists.
- Changes affecting data collection, marketing, region availability, in-app links, permissions, or pricing require corresponding privacy, terms, and release checklist updates before publication.
