import { sanityClient } from 'sanity:client';
import {
  mockAbout,
  mockGalleries,
  mockPhotoPrints,
  mockPressAssets,
  mockReleases,
  mockShows,
  mockSiteSettings,
} from './mock-data';
import { isSanityConfigured, queries } from './sanity';
import type {
  AboutContent,
  Gallery,
  PhotoPrint,
  PressAsset,
  Release,
  Show,
  SiteSettings,
} from './types';

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

  const settings = await sanityClient.fetch<SiteSettings | null>(
    queries.siteSettings,
  );
  return settings ?? mockSiteSettings;
}

export async function getShows(): Promise<Show[]> {
  if (!isSanityConfigured()) {
    return mockShows;
  }

  return await sanityClient.fetch<Show[]>(queries.shows);
}

export async function getUpcomingShows(limit?: number): Promise<Show[]> {
  const { upcoming } = partitionShows(await getShows());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getPastShows(): Promise<Show[]> {
  return partitionShows(await getShows()).past;
}

export async function getReleases(): Promise<Release[]> {
  if (!isSanityConfigured()) {
    return mockReleases;
  }

  return await sanityClient.fetch<Release[]>(queries.releases);
}

export async function getGalleries(): Promise<Gallery[]> {
  if (!isSanityConfigured()) {
    return mockGalleries;
  }

  return await sanityClient.fetch<Gallery[]>(queries.galleries);
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  if (!isSanityConfigured()) {
    return mockGalleries.find((gallery) => gallery.slug === slug) ?? null;
  }

  const gallery = await sanityClient.fetch<Gallery | null>(
    queries.galleryBySlug,
    { slug },
  );

  return gallery;
}

export async function getPressAssets(): Promise<PressAsset[]> {
  if (!isSanityConfigured()) {
    return mockPressAssets;
  }

  return await sanityClient.fetch<PressAsset[]>(queries.pressAssets);
}

export async function getAboutContent(): Promise<AboutContent> {
  if (!isSanityConfigured()) {
    return mockAbout;
  }

  const about = await sanityClient.fetch<Partial<AboutContent> | null>(queries.about);
  if (!about) {
    return mockAbout;
  }

  return {
    bio: about.bio ?? [],
    members: about.members ?? [],
    pressQuotes: about.pressQuotes ?? [],
  };
}

export async function getPhotoPrints(): Promise<PhotoPrint[]> {
  if (!isSanityConfigured()) {
    return mockPhotoPrints;
  }

  return await sanityClient.fetch<PhotoPrint[]>(queries.photoPrints);
}

export async function getFeaturedPrints(limit = 3): Promise<PhotoPrint[]> {
  const prints = await getPhotoPrints();
  const featured = prints.filter((print) => print.featured);
  const source = featured.length > 0 ? featured : prints;
  return source.slice(0, limit);
}

export { partitionShows };
