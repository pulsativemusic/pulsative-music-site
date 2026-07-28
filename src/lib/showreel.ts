import type { Showreel, SiteSettings } from './types';

export function getShowreelFromSettings(settings: SiteSettings): Showreel | null {
  const videoUrl = settings.showreelVideoUrl?.trim();
  if (!videoUrl) {
    return null;
  }

  return {
    videoUrl,
    title: settings.showreelTitle,
    description: settings.showreelDescription,
    posterUrl: settings.showreelPosterUrl,
  };
}
