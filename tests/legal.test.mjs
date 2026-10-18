import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(path, 'utf8');

const routes = [
  ['app-privacy', 'Mobile app privacy policy'],
  ['privacy-choices', 'Your privacy choices'],
  ['terms', 'Terms of use'],
  ['safety', 'Safety and medical-use information'],
  ['legal', 'Legal and privacy information']
];

test('legal routes and links are available through the footer and sitemap', () => {
  const footer = read('src/components/Footer.astro');
  const sitemap = read('src/pages/sitemap.xml.ts');
  for (const [slug, heading] of routes) {
    const path = 'src/pages/' + slug + '/index.astro';
    assert.ok(existsSync(path), path);
    assert.match(read(path), new RegExp(heading));
    assert.ok(sitemap.includes('/' + slug + '/'), 'missing from sitemap: ' + slug);
  }
  for (const slug of ['app-privacy', 'privacy-choices', 'terms', 'safety']) {
    assert.ok(footer.includes("pathFor('/" + slug + "/')"), 'missing footer link ' + slug);
  }
  assert.ok(footer.includes("pathFor('/privacy/')"), 'website policy should remain distinct');
});

test('app privacy notice identifies accountable party, local data, backups, SDK and email boundary', () => {
  const policy = read('src/pages/app-privacy/index.astro');
  for (const phrase of [
    'Cloudjet Solutions Pte. Ltd.',
    'Singapore',
    'SUPPORT_EMAIL',
    'Selected family photos',
    'device backup',
    'Firebase',
    'Apple',
    'support',
    'Remove all photo copies',
    'consent',
    'deletion',
    "pathFor('/privacy-choices/')"
  ]) {
    assert.ok(policy.toLowerCase().includes(phrase.toLowerCase()), 'missing in policy: ' + phrase);
  }
  assert.doesNotMatch(policy, /We collect no data|No data is ever shared|HIPAA compliant|100% secure|guaranteed deletion|no network requests/i);
});

test('no custom EULA or waiver of mandatory consumer protections is introduced', () => {
  const terms = read('src/pages/terms/index.astro');
  assert.match(terms, /www\.apple\.com\/legal\/internet-services\/itunes\/dev\/stdeula\//);
  assert.match(terms, /does <strong>not<\/strong> replace or amend that license/);
  assert.match(terms, /Nothing here excludes or limits a right or remedy/);
  assert.doesNotMatch(terms, /binding arbitration|waive your rights|automatically renews/i);
});

test('privacy choices distinguishes app copies, originals, and device backups', () => {
  const choices = read('src/pages/privacy-choices/index.astro');
  for (const text of ['Remove all photo copies', 'original', 'backups', 'Offload App', 'Delete App', 'SUPPORT_EMAIL']) {
    assert.ok(choices.includes(text), 'missing user choice: ' + text);
  }
});

test('medical-use page and support discourage diagnoses and do not promise efficacy', () => {
  const safety = read('src/pages/safety/index.astro');
  const support = read('src/pages/support/index.astro');
  assert.match(safety, /not a medical device intended to diagnose/);
  assert.match(safety, /Stop, take a break, or change activities/);
  assert.match(safety, /local emergency number/);
  assert.match(support, /privacy-choices/);
  for (const file of [safety, support]) {
    assert.doesNotMatch(file, /clinically proven|FDA approved|improves memory|slows Alzheimer|cures dementia/i);
  }
});

test('review instructions explicitly prevent unverified privacy and medical claims', () => {
  const checklist = read('docs/legal/app-review-gates.md');
  for (const phrase of ['App Store Connect', 'Not Collected', 'Firebase', 'age rating', 'legal counsel', 'support mailbox', 'privacy manifest', 'medical', 'Pages']) {
    assert.ok(checklist.toLowerCase().includes(phrase.toLowerCase()), 'missing review gate: ' + phrase);
  }
});
