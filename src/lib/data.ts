import {
  mockAbout,
  mockLegalPages,
  mockPhotoPrints,
  mockPressAssets,
  mockReleases,
  mockShows,
  mockSiteSettings,
  mockPhotos,
  mockVideos,
} from './mock-data';
import { fetchSanity, isSanityConfigured, queries } from './sanity';
import type {
  AboutContent,
  LegalPage,
  PhotoPrint,
  PressAsset,
  Release,
  Show,
  SiteSettings,
  Photo,
  Video,
} from './types';
import type { Locale } from './types';

function partitionShows(shows: Show[]) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = shows
    .filter((show) => show.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) {
    return mockSiteSettings;
  }

  const settings = await fetchSanity<SiteSettings | null>(
    queries.siteSettings,
  );
  if (!settings) {
    return mockSiteSettings;
  }

  return {
    ...mockSiteSettings,
    ...settings,
    socials:
      settings.socials && settings.socials.length > 0
        ? settings.socials
        : mockSiteSettings.socials,
  };
}

export async function getShows(): Promise<Show[]> {
  if (!isSanityConfigured()) {
    return mockShows;
  }

  return await fetchSanity<Show[]>(queries.shows);
}

export async function getUpcomingShows(limit?: number): Promise<Show[]> {
  const { upcoming } = partitionShows(await getShows());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getPastShows(): Promise<Show[]> {
  return partitionShows(await getShows()).past;
}

export async function getVideos(): Promise<Video[]> {
  if (!isSanityConfigured()) {
    return mockVideos;
  }

  return await fetchSanity<Video[]>(queries.videos);
}

export async function getPhotos(): Promise<Photo[]> {
  if (!isSanityConfigured()) {
    return mockPhotos;
  }

  return await fetchSanity<Photo[]>(queries.photos);
}

export async function getReleases(): Promise<Release[]> {
  if (!isSanityConfigured()) {
    return mockReleases;
  }

  return await fetchSanity<Release[]>(queries.releases);
}

export async function getPressAssets(): Promise<PressAsset[]> {
  if (!isSanityConfigured()) {
    return mockPressAssets;
  }

  return await fetchSanity<PressAsset[]>(queries.pressAssets);
}

export async function getAboutContent(locale: Locale = 'de'): Promise<AboutContent> {
  if (!isSanityConfigured()) {
    const bio =
      locale === 'en' && mockAbout.bioEn?.length ? mockAbout.bioEn : mockAbout.bio;
    return { ...mockAbout, bio };
  }

  const about = await fetchSanity<Partial<AboutContent> | null>(queries.about);
  if (!about) {
    const bio =
      locale === 'en' && mockAbout.bioEn?.length ? mockAbout.bioEn : mockAbout.bio;
    return { ...mockAbout, bio };
  }

  const bio =
    locale === 'en' && about.bioEn?.length ? about.bioEn : (about.bio ?? []);

  return {
    bio,
    bandPhotoUrl: about.bandPhotoUrl,
    members: about.members ?? [],
    pressQuotes: about.pressQuotes ?? [],
    lineup: about.lineup,
    repertoire: about.repertoire,
    setLength: about.setLength,
  };
}

export async function getLegalPage(
  slug: 'impressum' | 'privacy',
  locale: Locale,
): Promise<LegalPage | null> {
  if (!isSanityConfigured()) {
    return mockLegalPages.find((page) => page.slug === slug && page.locale === locale) ?? null;
  }

  const page = await fetchSanity<LegalPage | null>(queries.legalPage, {
    slug,
    locale,
  });

  return page;
}

export async function getPhotoPrints(): Promise<PhotoPrint[]> {
  if (!isSanityConfigured()) {
    return mockPhotoPrints;
  }

  return await fetchSanity<PhotoPrint[]>(queries.photoPrints);
}

export { partitionShows };
