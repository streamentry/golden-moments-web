import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const source = path => readFileSync(path, 'utf8');

test('the Astro site is static and configured for the GitHub Pages project prefix', () => {
  const config = source('astro.config.mjs');
  assert.match(config, /site:\s*'https:\/\/streamentry\.github\.io'/);
  assert.match(config, /base:\s*'\/golden-moments-web'/);
  assert.match(config, /output:\s*'static'/);
  assert.match(source('src/config/site.ts'), /BASE_URL/);
});

test('the stylesheet uses the app palette with a readable type floor', () => {
  const css = source('src/styles/global.css');
  const design = source('DESIGN.md');
  for (const hex of ['#7A5600', '#FFE08A', '#C99200', '#FDF9F0', '#F5EDE0', '#EADFCB', '#222222', '#5C5346', '#7D7366']) {
    assert.ok(design.includes(hex), 'DESIGN.md missing ' + hex);
    assert.ok(css.includes(hex), 'CSS missing ' + hex);
  }
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /linear-gradient\(/);
});

test('every essential site page and local art file exists', () => {
  for (const path of [
    'src/pages/index.astro',
    'src/pages/activities/index.astro',
    'src/pages/privacy/index.astro',
    'src/pages/accessibility/index.astro',
    'src/pages/support/index.astro',
    'src/pages/404.astro',
    'src/pages/robots.txt.ts',
    'src/pages/sitemap.xml.ts',
    'public/illustrations/teacup.svg',
    'public/illustrations/sunflower.svg',
    'public/favicon.svg',
    'public/og-card.svg',
    'public/scripts/demo.js'
  ]) assert.ok(existsSync(path), 'missing ' + path);
});

test('released and planned app features remain distinguishable', () => {
  const home = source('src/pages/index.astro');
  const activities = source('src/pages/activities/index.astro');
  assert.match(home, /not in the currently published App Store version/);
  assert.match(activities, /not part of the currently published version/);
  assert.match(home, /is not a treatment/);
  assert.doesNotMatch(home, /clinically proven|improves memory|slows Alzheimer/i);
});

test('the website does not depend on analytics, cookies, external fonts, or cloud API calls', () => {
  const pkg = JSON.parse(source('package.json'));
  assert.deepEqual(Object.keys(pkg.devDependencies), ['astro']);
  const html = source('src/layouts/SiteLayout.astro');
  assert.doesNotMatch(html, /google-analytics|gtag\(|pixel|fonts\.googleapis|cdn\.jsdelivr/i);
  const demo = source('public/scripts/demo.js');
  assert.doesNotMatch(demo, /fetch\(|localStorage|sessionStorage|document\.cookie|setTimeout/);
});
