import type { Locale } from './types';

export const defaultLocale: Locale = 'de';
export const locales: Locale[] = ['de', 'en'];

const ui = {
  de: {
    nav: {
      live: 'Live',
      videos: 'Videos',
      about: 'About',
      contact: 'Kontakt',
      promoKit: 'Promo Kit',
    },
    home: {
      showreel: 'Showreel',
      playTeaser: 'Teaser abspielen',
      upcomingShows: 'Nächste Termine',
      allDates: 'Alle Termine',
      scroll: 'Scroll',
    },
    live: {
      kicker: 'Live',
      title: 'Termine',
      upcoming: 'Kommende Shows',
      past: 'Vergangene Konzerte',
      calendar: 'Zum Kalender hinzufügen (.ics)',
    },
    videos: {
      kicker: 'Videos',
      title: 'Videos',
    },
    about: {
      kicker: 'Die Band',
      title: 'About',
      lineup: 'Besetzung',
      repertoire: 'Repertoire',
      setLength: 'Spielzeit',
    },
    contact: {
      kicker: 'Kontakt',
      title: 'Kontakt',
      intro: 'Booking, Presse und allgemeine Anfragen.',
      booking: 'Booking',
      phone: 'Telefon',
      social: 'Social Media',
    },
    promoKit: {
      kicker: 'Presse',
      title: 'Promo Kit',
      intro: 'Logos, Fotos und Press Kit zum Download.',
      download: 'Download',
      comingSoon: 'Demnächst verfügbar',
      pressKit: 'Press Kit',
      photos: 'Pressefotos',
      logos: 'Logo',
      technicalRider: 'Technical Rider',
      stagePlot: 'Stage Plot',
      bookingPress: 'Booking & Presse',
      bookingPressText: 'Für Interviews, Presseanfragen und Booking:',
    },
    legal: {
      impressum: 'Impressum',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
    },
    footer: {
      official: 'Official Site',
      follow: 'Follow',
      contact: 'Kontakt',
      legal: 'Rechtliches',
    },
    cookie: {
      title: 'Cookies & Analytics',
      text: 'Wir nutzen Matomo Analytics, um die Website-Nutzung anonym auszuwerten. Du kannst zustimmen oder ablehnen.',
      accept: 'Akzeptieren',
      reject: 'Ablehnen',
      privacyLink: 'Datenschutz',
    },
    misc: {
      soldOut: 'Ausverkauft',
      tickets: 'Tickets',
    },
    seo: {
      about:
        'PULSATIVE — Neo-Brass-Kollektiv aus Köln. House, Techno und EDM live. Besetzung, Repertoire und Booking.',
      promoKit:
        'Pressebereich von PULSATIVE: EPK, Logos, Fotos und Booking-Kontakt für Medien und Veranstalter.',
      legalImpressum: 'Impressum und Anbieterkennzeichnung der offiziellen PULSATIVE Website.',
      legalPrivacy: 'Datenschutzerklärung der PULSATIVE Website inklusive Matomo Analytics.',
    },
  },
  en: {
    nav: {
      live: 'Live',
      videos: 'Videos',
      about: 'About',
      contact: 'Contact',
      promoKit: 'Promo Kit',
    },
    home: {
      showreel: 'Showreel',
      playTeaser: 'Play teaser',
      upcomingShows: 'Upcoming Dates',
      allDates: 'All Dates',
      scroll: 'Scroll',
    },
    live: {
      kicker: 'Live',
      title: 'Dates',
      upcoming: 'Upcoming Shows',
      past: 'Past Concerts',
      calendar: 'Add to Calendar (.ics)',
    },
    videos: {
      kicker: 'Videos',
      title: 'Videos',
    },
    about: {
      kicker: 'The Band',
      title: 'About',
      lineup: 'Lineup',
      repertoire: 'Repertoire',
      setLength: 'Set length',
    },
    contact: {
      kicker: 'Get in Touch',
      title: 'Contact',
      intro: 'Booking, press, and general inquiries.',
      booking: 'Booking',
      phone: 'Phone',
      social: 'Social Media',
    },
    promoKit: {
      kicker: 'Press',
      title: 'Promo Kit',
      intro: 'Download logos, photos, and press materials.',
      download: 'Download',
      comingSoon: 'Coming soon',
      pressKit: 'Press Kit',
      photos: 'Press Photos',
      logos: 'Logo',
      technicalRider: 'Technical Rider',
      stagePlot: 'Stage Plot',
      bookingPress: 'Booking & Press',
      bookingPressText: 'For interviews, press requests, and booking:',
    },
    legal: {
      impressum: 'Legal Notice',
      privacy: 'Privacy Policy',
      imprint: 'Legal Notice',
    },
    footer: {
      official: 'Official Site',
      follow: 'Follow',
      contact: 'Contact',
      legal: 'Legal',
    },
    cookie: {
      title: 'Cookies & Analytics',
      text: 'We use Matomo Analytics to measure site usage anonymously. You can accept or decline.',
      accept: 'Accept',
      reject: 'Decline',
      privacyLink: 'Privacy Policy',
    },
    misc: {
      soldOut: 'Sold Out',
      tickets: 'Tickets',
    },
    seo: {
      about:
        'PULSATIVE — neo-brass collective from Cologne. Live House, Techno and EDM. Lineup, repertoire and booking.',
      promoKit:
        'PULSATIVE press area: EPK, logos, photos, and booking contact for media and promoters.',
      legalImpressum: 'Legal notice and provider information for the official PULSATIVE website.',
      legalPrivacy: 'Privacy policy for the PULSATIVE website, including Matomo analytics.',
    },
  },
} as const;

export type UiStrings = (typeof ui)[Locale];

export function getUi(locale: Locale): UiStrings {
  return ui[locale];
}

export function pickLocalized(
  value: { de?: string; en?: string } | string | undefined,
  locale: Locale,
): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  return value[locale] ?? value.de ?? value.en ?? '';
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'de';
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'de') {
    return normalized === '/' ? '/' : normalized;
  }
  if (normalized === '/') {
    return '/en/';
  }
  return `/en${normalized}`;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const isEnglish = currentPath === '/en' || currentPath.startsWith('/en/');
  const stripped = isEnglish
    ? currentPath.replace(/^\/en/, '') || '/'
    : currentPath;

  if (targetLocale === 'de') {
    return stripped === '/' ? '/' : stripped;
  }

  return localizedPath(stripped === '/' ? '' : stripped, 'en');
}

export function legalPath(slug: 'impressum' | 'privacy', locale: Locale): string {
  if (locale === 'de') {
    return slug === 'impressum' ? '/impressum' : '/datenschutz';
  }
  return slug === 'impressum' ? '/en/imprint' : '/en/privacy';
}

export function privacyPath(locale: Locale): string {
  return legalPath('privacy', locale);
}
