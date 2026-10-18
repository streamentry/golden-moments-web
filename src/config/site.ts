export const APP_STORE_URL =
  'https://apps.apple.com/us/app/golden-moments-memento-maze/id6749312459';
export const SUPPORT_EMAIL = 'apple@locuno.com';
export const SITE_NAME = 'Golden Moments';
export const SITE_DESCRIPTION =
  'Gentle picture matching and familiar activities to enjoy together. Made for calm moments with older adults and families.';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function pathFor(path = '/'): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  return base + clean;
}
