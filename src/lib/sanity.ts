import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { SanityImage } from './types';

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
  if (!image) {
    return undefined;
  }

  if (image.asset?.url) {
    return image.asset.url;
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
    videosIntro,
    fotosIntro,
    bookingContactName,
    bookingEmail,
    phone,
    seoDescription,
    showreelYoutubeId,
    showreelTitle,
    showreelDescription,
    "showreelPosterUrl": showreelPoster.asset->url,
    "showreelVideoUrl": showreelVideo.asset->url,
    socials[]{platform, url},
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,
    "logoUrl": logo.asset->url
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
    poster,
    "posterUrl": poster.asset->url
  }`,

  videos: `*[_type == "video"] | order(sortOrder asc, _createdAt desc){
    _id,
    title,
    vimeoId,
    sortOrder,
    "thumbnailUrl": thumbnail.asset->url
  }`,

  photos: `*[_type == "photo"] | order(sortOrder asc, _createdAt desc){
    _id,
    title,
    credit,
    sortOrder,
    "imageUrl": image.asset->url
  }`,

  releases: `*[_type == "release"] | order(releaseDate desc){
    _id,
    title,
    releaseDate,
    spotifyUrl,
    appleUrl,
    youtubeId,
    coverArt,
    "coverUrl": coverArt.asset->url
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
    "bandPhotoUrl": sections[_type == "imageGrid"][0].images[0].asset->url,
    "members": sections[_type == "memberGrid"][0].members[]{
      name,
      role,
      bio,
      "photoUrl": photo.asset->url
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
    image,
    "imageUrl": image.asset->url
  }`,
};
