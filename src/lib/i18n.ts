import type { Locale } from './types';
import { pathFor } from './routes';

export { defaultLocale, locales } from './routes';
export {
  pathFor,
  resolveRoute,
  switchLocalePath,
  type RouteId,
} from './routes';

const ui = {
  de: {
    nav: {
      live: 'Live',
      videos: 'Videos',
      fotos: 'Fotos',
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
    fotos: {
      kicker: 'Fotos',
      title: 'Fotos',
      tryDome: 'Dome-Galerie ausprobieren',
      backToGrid: 'Zurück zur Raster-Galerie',
      domeKicker: 'Experiment',
      domeTitle: 'Dome-Galerie',
      domeNote: 'Interaktiver Test — ziehen zum Drehen, tippen zum Vergrößern.',
    },
    about: {
      kicker: 'Die Band',
      title: 'About',
      lineup: 'Besetzung',
    },
    contact: {
      kicker: 'Kontakt',
      title: 'Kontakt',
      intro: 'Booking, Presse und allgemeine Anfragen.',
      booking: 'Booking',
      phone: 'Telefon',
    },
    promoKit: {
      kicker: 'Presse',
      title: 'Promo Kit',
      intro: 'Electronic Press Kit und Technical Rider als PDF.',
      download: 'Download',
      comingSoon: 'Demnächst verfügbar',
      pressKit: 'Electronic Press Kit (EPK)',
      technicalRider: 'Technical Rider',
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
    announcement: {
      label: 'Ankündigung',
      learnMore: 'Mehr erfahren',
    },
    misc: {
      soldOut: 'Ausverkauft',
      tickets: 'Tickets',
      notFoundTitle: 'Seite nicht gefunden',
      notFoundText: 'Diese URL existiert nicht. Zurück zur Startseite?',
      backHome: 'Zur Startseite',
    },
    seo: {
      about:
        'PULSATIVE — Neo-Brass-Kollektiv aus Köln. House, Techno und EDM live. Band und Booking.',
      promoKit:
        'Pressebereich von PULSATIVE: Electronic Press Kit (EPK), Technical Rider und Booking-Kontakt für Medien und Veranstalter.',
      legalImpressum: 'Impressum und Anbieterkennzeichnung der offiziellen PULSATIVE Website.',
      legalPrivacy: 'Datenschutzerklärung der PULSATIVE Website inklusive Cloudflare Web Analytics.',
    },
  },
  en: {
    nav: {
      live: 'Live',
      videos: 'Videos',
      fotos: 'Photos',
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
    fotos: {
      kicker: 'Photos',
      title: 'Photos',
      tryDome: 'Try dome gallery',
      backToGrid: 'Back to grid gallery',
      domeKicker: 'Experiment',
      domeTitle: 'Dome Gallery',
      domeNote: 'Interactive test — drag to rotate, tap to enlarge.',
    },
    about: {
      kicker: 'The Band',
      title: 'About',
      lineup: 'Lineup',
    },
    contact: {
      kicker: 'Get in Touch',
      title: 'Contact',
      intro: 'Booking, press, and general inquiries.',
      booking: 'Booking',
      phone: 'Phone',
    },
    promoKit: {
      kicker: 'Press',
      title: 'Promo Kit',
      intro: 'Electronic Press Kit and Technical Rider as PDF.',
      download: 'Download',
      comingSoon: 'Coming soon',
      pressKit: 'Electronic Press Kit (EPK)',
      technicalRider: 'Technical Rider',
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
    announcement: {
      label: 'Announcement',
      learnMore: 'Learn more',
    },
    misc: {
      soldOut: 'Sold Out',
      tickets: 'Tickets',
      notFoundTitle: 'Page not found',
      notFoundText: "This URL doesn't exist. Head back to the homepage?",
      backHome: 'Back to home',
    },
    seo: {
      about:
        'PULSATIVE — neo-brass collective from Cologne. Live House, Techno and EDM. Band and booking.',
      promoKit:
        'PULSATIVE press area: Electronic Press Kit (EPK), Technical Rider, and booking contact for media and promoters.',
      legalImpressum: 'Legal notice and provider information for the official PULSATIVE website.',
      legalPrivacy: 'Privacy policy for the PULSATIVE website, including Cloudflare Web Analytics.',
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

export function joinTagline(
  line1: { de?: string; en?: string } | string | undefined,
  line2: { de?: string; en?: string } | string | undefined,
  locale: Locale,
): string {
  return [pickLocalized(line1, locale), pickLocalized(line2, locale)]
    .filter(Boolean)
    .join(' ');
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

export function legalPath(slug: 'impressum' | 'privacy', locale: Locale): string {
  return pathFor(slug, locale);
}

export function privacyPath(locale: Locale): string {
  return pathFor('privacy', locale);
}
