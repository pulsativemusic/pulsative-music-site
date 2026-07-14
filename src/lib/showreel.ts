import type { Showreel, SiteSettings } from './types';

export function getShowreelFromSettings(settings: SiteSettings): Showreel | null {
  const vimeoId = settings.showreelVimeoId?.trim();
  if (!vimeoId) {
    return null;
  }

  return {
    vimeoId,
    title: settings.showreelTitle,
    description: settings.showreelDescription,
    posterUrl: settings.showreelPosterUrl,
  };
}
