import type { APIRoute } from 'astro';
import { pathFor } from '../config/site';

export const GET: APIRoute = () => {
  const sitemap = new URL(pathFor('/sitemap.xml'), import.meta.env.SITE).href;
  return new Response('User-agent: *\nAllow: /\nSitemap: ' + sitemap + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
