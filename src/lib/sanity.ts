import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { SanityImage } from './types';

export function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '9yuo6i9f';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export function isSanityConfigured(): boolean {
  return Boolean(
    projectId && projectId !== 'placeholder' && projectId !== 'your-project-id',
  );
}

const builder =
  projectId &&
  projectId !== 'placeholder' &&
  projectId !== 'your-project-id'
    ? imageUrlBuilder({ projectId, dataset })
    : null;

/** GROQ projection: enough for @sanity/image-url to apply crop/hotspot */
export const imageProjection = `{ asset->{_id}, crop, hotspot }`;

export function urlFor(source: SanityImageSource | SanityImage | undefined) {
  if (!source || !builder) {
    return null;
  }

  return builder.image(source);
}

export function getImageUrl(
  image: SanityImage | undefined,
  options?: { width?: number; height?: number; quality?: number },
): string | undefined {
  if (!image?.asset) {
    return undefined;
  }

  const imageBuilder = urlFor(image);
  if (!imageBuilder) {
    return undefined;
  }

  let result = imageBuilder.auto('format').quality(options?.quality ?? 80);

  if (options?.width) {
    result = result.width(options.width);
  }

  if (options?.height) {
    result = result.height(options.height);
  }

  return result.url();
}

export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    _id,
    bandName,
    tagline,
    shortDescription,
    liveIntro,
    showHomepageUpcomingDates,
    showLivePage,
    showVideosPage,
    showFotosPage,
    showAboutPage,
    showContactPage,
    showPromoKitPage,
    showAnnouncementBanner,
    announcementMessage,
    announcementLink,
    announcementLinkLabel,
    videosIntro,
    fotosIntro,
    bookingContactName,
    bookingEmail,
    phone,
    seoDescription,
    // ponytail: coalesce until legacy siteSettings docs are re-saved with showreelVimeoId
    "showreelVimeoId": coalesce(showreelVimeoId, showreelYoutubeId),
    showreelTitle,
    showreelDescription,
    "showreelPoster": showreelPoster${imageProjection},
    socials[]{platform, url},
    "heroImage": heroImage${imageProjection},
    "heroVideoUrl": heroVideo.asset->url,
    "logo": logo${imageProjection}
  }`,

  shows: `*[_type == "show"] | order(date desc){
    _id,
    date,
    venue,
    city,
    country,
    ticketUrl,
    soldOut,
    description,
    "poster": poster${imageProjection}
  }`,

  videos: `*[_type == "video"] | order(sortOrder asc, _createdAt desc){
    _id,
    title,
    vimeoId,
    orientation,
    sortOrder,
    "thumbnail": thumbnail${imageProjection}
  }`,

  photos: `*[_type == "photo"] | order(sortOrder asc, _createdAt desc){
    _id,
    title,
    credit,
    orientation,
    sortOrder,
    "image": image${imageProjection}
  }`,

  releases: `*[_type == "release"] | order(releaseDate desc){
    _id,
    title,
    releaseDate,
    spotifyUrl,
    appleUrl,
    youtubeId,
    "coverArt": coverArt${imageProjection}
  }`,

  pressAssets: `*[_type == "pressAsset"] | order(title asc){
    _id,
    title,
    assetType,
    description,
    "fileUrl": file.asset->url
  }`,

  about: `*[_type == "page" && slug.current == "about"][0]{
    "bio": sections[_type == "richText" && heading == "Bio"][0].body,
    "bioEn": sections[_type == "richText" && heading == "Bio (EN)"][0].body,
    "bandPhoto": sections[_type == "imageGrid"][0].images[0]${imageProjection},
    "members": sections[_type == "memberGrid"][0].members[]{
      name,
      role,
      bio,
      "photo": photo${imageProjection}
    },
    "pressQuotes": sections[_type == "pressQuotes"][0].quotes[]{quote, source},
    lineup,
    repertoire,
    setLength
  }`,

  legalPage: `*[_type == "legalPage" && slug == $slug && locale == $locale][0]{
    _id,
    title,
    slug,
    locale,
    body
  }`,

  photoPrints: `*[_type == "photoPrint"] | order(featured desc, title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    price,
    currency,
    sizes,
    purchaseUrl,
    soldOut,
    featured,
    "image": image${imageProjection}
  }`,
};
