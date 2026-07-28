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
import { fetchSanity, getImageUrl, isSanityConfigured, objectPositionFromHotspot, queries } from './sanity';
import type {
  AboutContent,
  BandMember,
  LegalPage,
  PhotoPrint,
  PressAsset,
  Release,
  SanityImage,
  Show,
  SiteSettings,
  Photo,
  Video,
} from './types';
import { pickLocalized } from './i18n';
import type { Locale } from './types';

function partitionShows(shows: Show[]) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''));
  const past = shows
    .filter((show) => show.date < today)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || (b.time ?? '').localeCompare(a.time ?? ''),
    );

  return { upcoming, past };
}

export function isHomepageUpcomingDatesEnabled(settings: SiteSettings) {
  return settings.showHomepageUpcomingDates !== false;
}

export function isNavPageEnabled(
  settings: SiteSettings,
  page: 'live' | 'videos' | 'fotos' | 'about' | 'contact' | 'promoKit',
) {
  const flags = {
    live: settings.showLivePage,
    videos: settings.showVideosPage,
    fotos: settings.showFotosPage,
    about: settings.showAboutPage,
    contact: settings.showContactPage,
    promoKit: settings.showPromoKitPage,
  } as const;
  return flags[page] !== false;
}

export function isLivePageEnabled(settings: SiteSettings) {
  return isNavPageEnabled(settings, 'live');
}

export function isAnnouncementBannerVisible(
  settings: SiteSettings,
  locale: Locale,
) {
  if (!settings.showAnnouncementBanner) {
    return false;
  }

  const message = pickLocalized(settings.announcementMessage, locale);
  return Boolean(message?.trim());
}

type SiteSettingsRow = Omit<
  SiteSettings,
  'showreelPosterUrl' | 'heroImageUrl' | 'heroObjectPosition' | 'logoUrl'
> & {
  showreelPoster?: SanityImage;
  heroImage?: SanityImage;
  logo?: SanityImage;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) {
    return mockSiteSettings;
  }

  const settings = await fetchSanity<SiteSettingsRow | null>(queries.siteSettings);
  if (!settings) {
    return mockSiteSettings;
  }

  const { showreelPoster, heroImage, logo, ...rest } = settings;

  return {
    ...mockSiteSettings,
    ...rest,
    showreelPosterUrl: getImageUrl(showreelPoster),
    heroImageUrl: getImageUrl(heroImage),
    heroObjectPosition: objectPositionFromHotspot(heroImage?.hotspot),
    logoUrl: getImageUrl(logo),
    socials:
      settings.socials && settings.socials.length > 0
        ? settings.socials
        : mockSiteSettings.socials,
  };
}

type ShowRow = Omit<Show, 'posterUrl' | 'poster'> & {
  poster?: SanityImage;
};

export async function getShows(): Promise<Show[]> {
  if (!isSanityConfigured()) {
    return mockShows;
  }

  const rows = await fetchSanity<ShowRow[]>(queries.shows);
  return rows.map(({ poster, ...show }) => ({
    ...show,
    poster,
    posterUrl: getImageUrl(poster),
  }));
}

export async function getUpcomingShows(limit?: number): Promise<Show[]> {
  const { upcoming } = partitionShows(await getShows());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getPastShows(): Promise<Show[]> {
  return partitionShows(await getShows()).past;
}

function withVimeoId(videos: Video[]): Video[] {
  return videos.filter((video) => video.vimeoId?.trim());
}

type VideoRow = Omit<Video, 'thumbnailUrl'> & {
  thumbnail?: SanityImage;
};

export async function getVideos(): Promise<Video[]> {
  if (!isSanityConfigured()) {
    return withVimeoId(mockVideos);
  }

  const rows = await fetchSanity<VideoRow[]>(queries.videos);
  return withVimeoId(
    rows.map(({ thumbnail, ...video }) => ({
      ...video,
      thumbnailUrl: getImageUrl(thumbnail),
    })),
  );
}

type PhotoRow = Omit<Photo, 'imageUrl'> & {
  image?: SanityImage;
};

export async function getPhotos(): Promise<Photo[]> {
  if (!isSanityConfigured()) {
    return mockPhotos;
  }

  const rows = await fetchSanity<PhotoRow[]>(queries.photos);
  return rows.flatMap(({ image, ...photo }) => {
    const imageUrl = getImageUrl(image);
    if (!imageUrl) return [];
    return [{
      ...photo,
      imageUrl,
      objectPosition: objectPositionFromHotspot(image?.hotspot),
    }];
  });
}

type ReleaseRow = Omit<Release, 'coverUrl' | 'coverArt'> & {
  coverArt?: SanityImage;
};

export async function getReleases(): Promise<Release[]> {
  if (!isSanityConfigured()) {
    return mockReleases;
  }

  const rows = await fetchSanity<ReleaseRow[]>(queries.releases);
  return rows.map(({ coverArt, ...release }) => ({
    ...release,
    coverArt,
    coverUrl: getImageUrl(coverArt),
  }));
}

export async function getPressAssets(): Promise<PressAsset[]> {
  if (!isSanityConfigured()) {
    return mockPressAssets;
  }

  return await fetchSanity<PressAsset[]>(queries.pressAssets);
}

type AboutMemberRow = Omit<BandMember, 'photoUrl'> & {
  photo?: SanityImage;
};

type AboutRow = Omit<Partial<AboutContent>, 'bandPhotoUrl' | 'members'> & {
  bandPhoto?: SanityImage;
  members?: AboutMemberRow[];
};

export async function getAboutContent(locale: Locale = 'de'): Promise<AboutContent> {
  if (!isSanityConfigured()) {
    const bio =
      locale === 'en' && mockAbout.bioEn?.length ? mockAbout.bioEn : mockAbout.bio;
    return { ...mockAbout, bio };
  }

  const about = await fetchSanity<AboutRow | null>(queries.about);
  if (!about) {
    const bio =
      locale === 'en' && mockAbout.bioEn?.length ? mockAbout.bioEn : mockAbout.bio;
    return { ...mockAbout, bio };
  }

  const bio =
    locale === 'en' && about.bioEn?.length ? about.bioEn : (about.bio ?? []);

  return {
    bio,
    bandPhotoUrl: getImageUrl(about.bandPhoto),
    members: (about.members ?? []).map(({ photo, ...member }) => ({
      ...member,
      photoUrl: getImageUrl(photo),
    })),
    pressQuotes: about.pressQuotes ?? [],
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

type PhotoPrintRow = Omit<PhotoPrint, 'imageUrl' | 'image'> & {
  image?: SanityImage;
};

export async function getPhotoPrints(): Promise<PhotoPrint[]> {
  if (!isSanityConfigured()) {
    return mockPhotoPrints;
  }

  const rows = await fetchSanity<PhotoPrintRow[]>(queries.photoPrints);
  return rows.map(({ image, ...print }) => ({
    ...print,
    image,
    imageUrl: getImageUrl(image),
  }));
}

export { partitionShows };
