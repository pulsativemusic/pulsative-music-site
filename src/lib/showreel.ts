import type { Showreel, SiteSettings } from './types';

export function getShowreelFromSettings(settings: SiteSettings): Showreel | null {
  if (!settings.showreelVimeoId) {
    return null;
  }

  return {
    vimeoId: settings.showreelVimeoId,
    title: settings.showreelTitle,
    description: settings.showreelDescription,
    posterUrl: settings.showreelPosterUrl,
  };
}
