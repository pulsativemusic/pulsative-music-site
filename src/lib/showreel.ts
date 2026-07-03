import type { Showreel, SiteSettings } from './types';

export function getShowreelFromSettings(settings: SiteSettings): Showreel | null {
  if (!settings.showreelYoutubeId && !settings.showreelVideoUrl) {
    return null;
  }

  return {
    youtubeId: settings.showreelYoutubeId ?? '',
    title: settings.showreelTitle,
    description: settings.showreelDescription,
    posterUrl: settings.showreelPosterUrl,
    videoUrl: settings.showreelVideoUrl,
  };
}
