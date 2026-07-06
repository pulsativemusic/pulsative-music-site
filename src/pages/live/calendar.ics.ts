import type { APIRoute } from 'astro';
import { getShows, getSiteSettings } from '../../lib/data';
import { generateIcsFeed } from '../../lib/utils';

export const GET: APIRoute = async () => {
  const [shows, settings] = await Promise.all([getShows(), getSiteSettings()]);
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://pulsative-site.pages.dev';
  const ics = generateIcsFeed(shows, settings.bandName, siteUrl);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pulsative-dates.ics"',
    },
  });
};
