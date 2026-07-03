import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? 'https://pulsative.band').replace(/\/$/, '');

  const dePages = [
    '',
    'live',
    'videos',
    'about',
    'contact',
    'promo-kit',
    'impressum',
    'datenschutz',
  ];

  const enPages = [
    'en',
    'en/live',
    'en/videos',
    'en/about',
    'en/contact',
    'en/promo-kit',
    'en/imprint',
    'en/privacy',
  ];

  const allPages = [...dePages, ...enPages];

  const urls = allPages
    .map((path) => {
      const loc = path ? `${siteUrl}/${path}` : siteUrl;
      const priority = path === '' || path === 'en' ? '1.0' : '0.7';
      const changefreq = path === '' || path === 'en' ? 'weekly' : 'monthly';

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
