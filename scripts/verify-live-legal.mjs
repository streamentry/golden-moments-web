// Verify the six public GitHub Pages legal URLs only after deployment.
// This is availability QA, not legal approval or a native-app privacy audit.
const site = new URL(process.env.SITE_URL ?? 'https://streamentry.github.io/golden-moments-web/');
if (site.protocol !== 'https:') throw new Error('Published site must use HTTPS');

const routes = new Map([
  ['app-privacy/', 'Mobile app privacy policy'],
  ['privacy-choices/', 'Privacy choices and deletion'],
  ['terms/', 'Terms of use and app license'],
  ['safety/', 'Safety and intended use'],
  ['support/', 'Support'],
  ['privacy/', 'Website privacy notice'],
]);
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function inspect([relativePath, heading]) {
  const url = new URL(relativePath, site);
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
    headers: { 'Cache-Control': 'no-cache' },
  });
  const html = await response.text();
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!response.ok) throw new Error(relativePath + ': HTTP ' + response.status);
  if (!response.url.startsWith(url.origin + url.pathname)) {
    throw new Error(relativePath + ': unexpected redirect to ' + response.url);
  }
  const actualHeading = h1?.[1]?.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
  if (actualHeading !== heading) {
    throw new Error(relativePath + ': expected heading "' + heading +
      '", received "' + actualHeading + '"');
  }
  if (!html.includes('rel="canonical"')) {
    throw new Error(relativePath + ': canonical URL missing');
  }
}
let failures = [];
for (let attempt = 1; attempt <= 10; attempt++) {
  const settled = await Promise.allSettled([...routes].map(inspect));
  failures = settled.filter(item => item.status === 'rejected')
    .map(item => String(item.reason));
  if (failures.length === 0) {
    console.log('Six live HTTPS legal pages verified:');
    for (const route of routes.keys()) console.log('  ' + new URL(route, site).href);
    process.exit(0);
  }
  console.warn('Attempt ' + attempt + '/10: ' + failures.join('; '));
  if (attempt < 10) await pause(4000);
}
console.error('Legal-page audit failed:\n' + failures.join('\n'));
process.exit(1);
