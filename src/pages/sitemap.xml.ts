import type { APIRoute } from 'astro';
import { getGalleries } from '../lib/data';

export const GET: APIRoute = async () => {
  const galleries = await getGalleries();
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? 'https://example.com').replace(/\/$/, '');

  const staticPages = ['', 'music', 'tour', 'photos', 'prints', 'about', 'press', 'contact'];
  const galleryPages = galleries.map((gallery) => `photos/${gallery.slug}`);
  const allPages = [...staticPages, ...galleryPages];

  const urls = allPages
    .map((path) => {
      const loc = path ? `${siteUrl}/${path}` : siteUrl;
      const priority = path === '' ? '1.0' : '0.7';
      const changefreq = path === '' ? 'weekly' : 'monthly';

      return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
