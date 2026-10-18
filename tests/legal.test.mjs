import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(path, 'utf8');

const legalRoutes = [
  ['app-privacy', 'Mobile app privacy policy'],
  ['privacy-choices', 'Privacy choices and deletion'],
  ['terms', 'Terms of use and app license'],
  ['safety', 'Safety and intended use'],
  ['support', 'Support'],
  ['privacy', 'Website privacy notice']
];

test('all six requested routes exist and are linked in navigation and sitemap', () => {
  const footer = read('src/components/Footer.astro');
  const sitemap = read('src/pages/sitemap.xml.ts');
  for (const [slug, heading] of legalRoutes) {
    const path = 'src/pages/' + slug + '/index.astro';
    assert.ok(existsSync(path), 'missing route ' + path);
    const page = read(path);
    assert.ok(page.includes(heading), path + ' must have a clear heading');
    assert.match(page, /<SiteLayout[\s\S]+?<h1>/);
    assert.match(page, /SUPPORT_EMAIL/);
    assert.ok(sitemap.includes('/' + slug + '/'), 'missing sitemap ' + slug);
    assert.ok(footer.includes("pathFor('/" + slug + "/')"), 'missing footer link ' + slug);
    assert.match(page, /2026-10-18|last updated|Last updated|Currently published|Support/i);
  }
  assert.ok(footer.includes("pathFor('/legal/')"), 'missing all-legal index');
});

test('app privacy does not confuse local photos with developer collection', () => {
  const policy = read('src/pages/app-privacy/index.astro');
  for (const phrase of [
    'Cloudjet Solutions Pte. Ltd.',
    'Singapore',
    'SUPPORT_EMAIL',
    'Family photos',
    'device backup',
    'Firebase',
    'Apple',
    'support',
    'Remove all photo copies',
    'consent',
    'deletion',
    "pathFor('/privacy-choices/')",
    "pathFor('/privacy/')",
    'not in the currently published App Store version'
  ]) assert.ok(policy.toLowerCase().includes(phrase.toLowerCase()), 'privacy missing: ' + phrase);
  assert.doesNotMatch(policy, /We collect no data|No data is ever shared|HIPAA compliant|100% secure|guaranteed deletion|no network requests/i);
});

test('website privacy expressly discloses host connection details and email correspondence', () => {
  const site = read('src/pages/privacy/index.astro');
  assert.match(site, /GitHub Pages/);
  assert.match(site, /IP addresses/);
  assert.match(site, /email address/);
  assert.match(site, /the <strong>website<\/strong>/);
  assert.match(site, /pathFor\('\/app-privacy\/'\)/);
  assert.doesNotMatch(site, /We collect no data|No data is ever shared|we guarantee anonymity/i);
});

test('Apple Standard EULA remains separate from website terms and consumer rights survive', () => {
  const terms = read('src/pages/terms/index.astro');
  assert.match(terms, /www\.apple\.com\/legal\/internet-services\/itunes\/dev\/stdeula\//);
  assert.match(terms, /does not replace or amend Apple's Standard EULA/);
  assert.match(terms, /Nothing on this page excludes a consumer right/);
  assert.doesNotMatch(terms, /binding arbitration|waive your rights|automatically renews/i);
});

test('privacy choices distinguish app copies, originals, backup and requests', () => {
  const p = read('src/pages/privacy-choices/index.astro');
  for (const phrase of ['Remove all photo copies', 'original', 'backups', 'Offload App', 'Delete App', 'SUPPORT_EMAIL', 'does not automatically delete']) {
    assert.ok(p.toLowerCase().includes(phrase.toLowerCase()), 'deletion guide missing ' + phrase);
  }
});

test('safety and support discourage diagnosis, respect choice, avoid invented efficacy', () => {
  const safety = read('src/pages/safety/index.astro');
  const support = read('src/pages/support/index.astro');
  assert.match(safety, /not intended for medical diagnosis/);
  assert.match(safety, /Stop, take a break, or change activities/);
  assert.match(safety, /local emergency number/);
  assert.match(safety, /not a measure of their intelligence/);
  assert.match(support, /privacy-choices/);
  assert.match(support, /Avoid deleting or reinstalling/);
  for (const source of [safety, support]) {
    assert.doesNotMatch(source, /clinically proven|FDA approved|improves memory|slows Alzheimer|cures dementia/i);
  }
});

test('public legal writing does not include unfinished placeholders or manufactured authority', () => {
  for (const [slug] of legalRoutes) {
    const p = read('src/pages/' + slug + '/index.astro');
    assert.doesNotMatch(p, /\[COMPANY\]|\[YOUR EMAIL\]|\[DATE\]|LOREM IPSUM|TODO:|HIPAA certified|FDA-cleared|100% protected/i);
    assert.ok(!p.includes('unverified individual DPO name'), 'internal editorial comments should not be public');
  }
});

test('release checklist prevents unsupported Apple/medical/privacy claims', () => {
  const checklist = read('docs/legal/app-review-gates.md');
  for (const phrase of ['App Store Connect', 'Not Collected', 'Firebase', 'age rating', 'legal counsel', 'support mailbox', 'privacy manifest', 'medical', 'Pages', 'DPO']) {
    assert.ok(checklist.toLowerCase().includes(phrase.toLowerCase()), 'missing review gate ' + phrase);
  }
});
