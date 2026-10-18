import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const prefix = '/golden-moments-web/';
const expectedPages = [
  'index.html',
  'activities/index.html',
  'privacy/index.html',
  'app-privacy/index.html',
  'privacy-choices/index.html',
  'safety/index.html',
  'legal/index.html',
  'accessibility/index.html',
  'support/index.html',
  'help/index.html',
  'terms/index.html',
  '404.html'
];
const requiredAssets = [
  'favicon.svg',
  'og-card.svg',
  'scripts/demo.js',
  'scripts/match-engine.js',
  'illustrations/teacup.svg',
  'illustrations/sunflower.svg',
  'sitemap.xml',
  'robots.txt'
];

function fail(message) {
  console.error('Website validation failed: ' + message);
  process.exitCode = 1;
}

for (const file of [...expectedPages, ...requiredAssets]) {
  if (!existsSync(join('dist', file))) fail('missing ' + file);
}

for (const file of expectedPages) {
  const path = join('dist', file);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) fail(file + ' lacks a title');
  if (!html.includes('rel="canonical"')) fail(file + ' lacks canonical link');
  if (!html.includes(prefix)) fail(file + ' lacks project-site prefix');
  if (!html.includes('Skip to content')) fail(file + ' lacks skip link');

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith('/') && !url.startsWith(prefix)) fail(file + ' uses an unprefixed path: ' + url);
    if (/^https?:\/\//.test(url) && /\.js(?:\?|$)/.test(url)) fail(file + ' loads an external JavaScript file: ' + url);
  }
}

if (existsSync('dist/sitemap.xml')) {
  const xml = readFileSync('dist/sitemap.xml', 'utf8');
  for (const page of ['/', '/activities/', '/privacy/', '/accessibility/', '/support/', '/help/', '/terms/', '/app-privacy/', '/privacy-choices/', '/safety/', '/legal/']) {
    if (!xml.includes('https://streamentry.github.io' + prefix.slice(0, -1) + page)) {
      fail('sitemap missing ' + page);
    }
  }
}

if (!process.exitCode) console.log('All GitHub Pages paths, pages, assets, metadata and sitemap entries verified.');
