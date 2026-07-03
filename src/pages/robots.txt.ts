import type { APIRoute } from 'astro';
import { getSiteUrl } from '../lib/seo';

export const GET: APIRoute = () => {
  const siteUrl = getSiteUrl();

  const body = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
