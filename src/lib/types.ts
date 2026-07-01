import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  asset?: {
    _ref?: string;
    url?: string;
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
  tagline: string;
  bookingEmail: string;
  socials: SocialLink[];
  heroImageUrl?: string;
  seoDescription?: string;
}

export interface Show {
  _id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  soldOut: boolean;
  poster?: SanityImage;
  posterUrl?: string;
  description?: string;
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

export interface PressAsset {
  _id: string;
  title: string;
  assetType: 'photo' | 'logo' | 'bio' | 'other';
  fileUrl?: string;
  description?: string;
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
  members: BandMember[];
  pressQuotes: { quote: string; source: string }[];
}
