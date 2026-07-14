import type { APIRoute } from 'astro';
import { getShows, getSiteSettings, isLivePageEnabled } from '../../lib/data';
import { generateIcsFeed } from '../../lib/utils';

export const GET: APIRoute = async () => {
  const [shows, settings] = await Promise.all([getShows(), getSiteSettings()]);

  if (!isLivePageEnabled(settings)) {
    return new Response('Not Found', { status: 404 });
  }

  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://pulsative-site.pages.dev';
  const ics = generateIcsFeed(shows, settings.bandName, siteUrl);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pulsative-dates.ics"',
    },
  });
};
