import type { Locale, SiteSettings } from './types';
import { pickLocalized } from './i18n';

export function getSiteUrl(fallback = 'https://pulsative.band'): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL ?? import.meta.env.SITE;
  const raw = typeof fromEnv === 'string' ? fromEnv : fallback;
  return raw.replace(/\/$/, '');
}

export function absoluteUrl(path: string, siteUrl = getSiteUrl()): string {
  if (!path || path === '/') {
    return siteUrl;
  }
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function resolveAssetUrl(url: string | undefined, siteUrl = getSiteUrl()): string | undefined {
  if (!url) {
    return undefined;
  }
  return url.startsWith('/') ? absoluteUrl(url, siteUrl) : url;
}

export function ogLocale(locale: Locale): string {
  return locale === 'de' ? 'de_DE' : 'en_US';
}

export function truncateDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) {
    return normalized;
  }
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function buildPageTitle(pageTitle: string | undefined, bandName: string): string {
  if (!pageTitle || pageTitle === bandName) {
    return bandName;
  }
  return `${pageTitle} — ${bandName}`;
}

export function resolvePageDescription(
  description: string | undefined,
  settings: SiteSettings,
  locale: Locale,
  isHome: boolean,
): string {
  const tagline = pickLocalized(settings.tagline, locale);
  const candidate =
    description ??
    (isHome ? pickLocalized(settings.shortDescription, locale) : undefined) ??
    settings.seoDescription ??
    tagline;

  return truncateDescription(candidate);
}

interface MusicGroupJsonLdOptions {
  settings: SiteSettings;
  siteUrl: string;
  description: string;
  locale: Locale;
}

export function buildMusicGroupJsonLd({
  settings,
  siteUrl,
  description,
  locale,
}: MusicGroupJsonLdOptions): Record<string, unknown> {
  const image = resolveAssetUrl(settings.heroImageUrl, siteUrl);
  const sameAs = settings.socials?.map((social) => social.url).filter(Boolean) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': `${siteUrl}/#music-group`,
    name: settings.bandName,
    url: siteUrl,
    description,
    image,
    genre: ['House', 'Techno', 'EDM', 'Neo-Brass'],
    areaServed: locale === 'de' ? 'Deutschland' : 'Germany',
    location: {
      '@type': 'Place',
      name: locale === 'de' ? 'Köln, Deutschland' : 'Cologne, Germany',
    },
    ...(settings.bookingEmail && { email: settings.bookingEmail }),
    ...(settings.phone && { telephone: settings.phone }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function buildWebPageJsonLd(
  siteUrl: string,
  canonicalUrl: string,
  title: string,
  description: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'PULSATIVE',
      url: siteUrl,
    },
  };
}
