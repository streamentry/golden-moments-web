import type { APIRoute } from 'astro';
import { pathFor } from '../config/site';

const pages = ['/', '/activities/', '/privacy/', '/accessibility/', '/support/', '/help/', '/terms/', '/app-privacy/', '/privacy-choices/', '/safety/', '/legal/'];

export const GET: APIRoute = () => {
  const entries = pages.map(page => {
    const url = new URL(pathFor(page), import.meta.env.SITE).href;
    return '<url><loc>' + url + '</loc></url>';
  }).join('');
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    entries + '</urlset>';
  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
