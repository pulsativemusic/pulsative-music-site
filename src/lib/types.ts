import type { PortableTextBlock } from '@portabletext/types';

export type Locale = 'de' | 'en';

export interface LocalizedString {
  de?: string;
  en?: string;
}

export interface LocalizedPortableText {
  de?: PortableTextBlock[];
  en?: PortableTextBlock[];
}

export interface SanityImage {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
    originalFilename?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  _id: string;
  bandName: string;
  taglineLine1: LocalizedString | string;
  taglineLine2?: LocalizedString | string;
  shortDescription?: LocalizedString | string;
  liveIntro?: LocalizedString | string;
  /** Optional photo on the Live page. */
  liveImageUrl?: string;
  /** Optional band photo on the About page. */
  aboutImageUrl?: string;
  /** Optional About bio (rich text). Site settings wins over the About page document. */
  aboutBio?: LocalizedPortableText;
  showHomepageUpcomingDates?: boolean;
  showLivePage?: boolean;
  showVideosPage?: boolean;
  showFotosPage?: boolean;
  showAboutPage?: boolean;
  showContactPage?: boolean;
  showPromoKitPage?: boolean;
  showAnnouncementBanner?: boolean;
  announcementMessage?: LocalizedString | string;
  announcementLink?: string;
  announcementLinkLabel?: LocalizedString | string;
  videosIntro?: LocalizedString | string;
  fotosIntro?: LocalizedString | string;
  bookingContactName?: string;
  bookingEmail: string;
  phone?: string;
  socials: SocialLink[];
  heroImageUrl?: string;
  heroImageMobileUrl?: string;
  heroImageDesktopUrl?: string;
  heroImageWideUrl?: string;
  /** CSS object-position from Sanity hero hotspot (fallback / legacy) */
  heroObjectPosition?: string;
  heroObjectPositionMobile?: string;
  heroObjectPositionDesktop?: string;
  heroObjectPositionWide?: string;
  heroVideoUrl?: string;
  logoUrl?: string;
  showreelVideoUrl?: string;
  showreelTitle?: LocalizedString | string;
  showreelDescription?: LocalizedString | string;
  showreelPosterUrl?: string;
  seoDescription?: string;
}

export interface Showreel {
  videoUrl: string;
  title?: LocalizedString | string;
  description?: LocalizedString | string;
  posterUrl?: string;
}

export interface Show {
  _id: string;
  date: string;
  /** Start time as HH:mm (24h). Formatted per locale on display. */
  time?: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  soldOut: boolean;
  poster?: SanityImage;
  posterUrl?: string;
  description?: string;
}

export type MediaOrientation = 'portrait' | 'landscape';

export interface Video {
  _id: string;
  title: LocalizedString | string;
  vimeoId: string;
  sortOrder: number;
  orientation?: MediaOrientation;
  thumbnailUrl?: string;
}

export interface Photo {
  _id: string;
  title: LocalizedString | string;
  imageUrl: string;
  /** Raw Sanity asset URL for max-res download */
  originalUrl: string;
  width: number;
  height: number;
  downloadFilename?: string;
  /** CSS object-position from Sanity hotspot, e.g. "42% 30%" */
  objectPosition?: string;
  sortOrder: number;
  orientation?: MediaOrientation;
  credit?: string;
}

export interface Release {
  _id: string;
  title: string;
  releaseDate: string;
  coverArt?: SanityImage;
  coverUrl?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeId?: string;
}

export interface GalleryPhoto {
  _key?: string;
  image?: SanityImage;
  imageUrl?: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface Gallery {
  _id: string;
  title: string;
  slug: string;
  showDate?: string;
  venue?: string;
  coverImage?: SanityImage;
  coverUrl?: string;
  photos: GalleryPhoto[];
}

export type PressAssetType = 'pressKit' | 'technicalRider';

export interface PressAsset {
  _id: string;
  title: string;
  assetType: PressAssetType;
  fileUrl?: string;
  description?: string;
}

export interface LegalPage {
  _id: string;
  title: string;
  slug: 'impressum' | 'privacy';
  locale: Locale;
  body: PortableTextBlock[];
}

export interface PageSection {
  _type: string;
  _key: string;
  heading?: string;
  body?: PortableTextBlock[];
  text?: string;
  images?: GalleryPhoto[];
  embedUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface Page {
  _id: string;
  slug: string;
  title: string;
  sections: PageSection[];
}

export interface PhotoPrint {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImage;
  imageUrl?: string;
  description?: string;
  category?: string;
  price: number;
  currency: string;
  sizes?: string[];
  purchaseUrl?: string;
  soldOut: boolean;
  featured?: boolean;
}

export interface BandMember {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
}

export interface AboutContent {
  bio: PortableTextBlock[];
  bioEn?: PortableTextBlock[];
  bandPhotoUrl?: string;
  members: BandMember[];
  pressQuotes: { quote: string; source: string }[];
}
