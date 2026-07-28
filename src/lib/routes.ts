import type { Locale } from './types';

export const defaultLocale: Locale = 'de';
export const locales: Locale[] = ['de', 'en'];

export type RouteId =
  | 'home'
  | 'live'
  | 'videos'
  | 'fotos'
  | 'about'
  | 'contact'
  | 'promoKit'
  | 'impressum'
  | 'privacy';

export const routes: Record<RouteId, Record<Locale, string>> = {
  home: { de: '/', en: '/en' },
  live: { de: '/live', en: '/en/live' },
  videos: { de: '/videos', en: '/en/videos' },
  fotos: { de: '/fotos', en: '/en/fotos' },
  about: { de: '/about', en: '/en/about' },
  contact: { de: '/contact', en: '/en/contact' },
  promoKit: { de: '/promo-kit', en: '/en/promo-kit' },
  impressum: { de: '/impressum', en: '/en/imprint' },
  privacy: { de: '/datenschutz', en: '/en/privacy' },
};

export type ResolvedRoute = { routeId: RouteId; locale: Locale };

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  return pathname.replace(/\/$/, '') || '/';
}

export function pathFor(routeId: RouteId, locale: Locale): string {
  const path = routes[routeId][locale];
  // Keep trailing slash on EN home for consistency with existing links.
  if (routeId === 'home' && locale !== defaultLocale) {
    return `${path}/`;
  }
  return path;
}

export function resolveRoute(pathname: string): ResolvedRoute | null {
  const normalized = normalizePath(pathname);

  for (const routeId of Object.keys(routes) as RouteId[]) {
    for (const locale of locales) {
      if (normalizePath(routes[routeId][locale]) === normalized) {
        return { routeId, locale };
      }
    }
  }

  return null;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const resolved = resolveRoute(pathname);
  if (!resolved) {
    // Fallback: prefix/strip for unknown paths (404, assets).
    const normalized = normalizePath(pathname);
    const isPrefixed = locales.some(
      (locale) =>
        locale !== defaultLocale &&
        (normalized === `/${locale}` || normalized.startsWith(`/${locale}/`)),
    );

    if (targetLocale === defaultLocale) {
      if (!isPrefixed) {
        return normalized === '/' ? '/' : normalized;
      }
      const stripped = normalized.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
      return stripped === '/' ? '/' : stripped;
    }

    if (isPrefixed) {
      return normalized.replace(/^\/[a-z]{2}(?=\/|$)/, `/${targetLocale}`) || `/${targetLocale}`;
    }
    return normalized === '/' ? `/${targetLocale}/` : `/${targetLocale}${normalized}`;
  }

  return pathFor(resolved.routeId, targetLocale);
}

export function getStaticRoutePaths(): Array<{
  params: { slug: string | undefined };
  props: ResolvedRoute;
}> {
  const paths: Array<{
    params: { slug: string | undefined };
    props: ResolvedRoute;
  }> = [];

  for (const routeId of Object.keys(routes) as RouteId[]) {
    for (const locale of locales) {
      // Default-locale home is served by pages/index.astro.
      if (routeId === 'home' && locale === defaultLocale) {
        continue;
      }

      const path = normalizePath(routes[routeId][locale]);
      const slug = path === '/' ? undefined : path.replace(/^\//, '');

      paths.push({
        params: { slug },
        props: { routeId, locale },
      });
    }
  }

  return paths;
}
