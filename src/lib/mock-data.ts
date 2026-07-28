import type {
  AboutContent,
  LegalPage,
  PhotoPrint,
  PressAsset,
  Release,
  Show,
  SiteSettings,
  Photo,
  Video,
} from './types';

export const mockSiteSettings: SiteSettings = {
  _id: 'settings',
  bandName: 'PULSATIVE',
  taglineLine1: {
    de: 'Neo-Brass Collective',
    en: 'Neo-Brass Collective',
  },
  taglineLine2: {
    de: 'House · Techno · EDM',
    en: 'House · Techno · EDM',
  },
  shortDescription: {
    de: 'Festivals · Clubs · Streets · Events — Köln · NRW · Deutschland · Europa. Clubkultur acoustique · Boiler Room trifft Brassensemble.',
    en: 'Festivals · Clubs · Streets · Events — Cologne · NRW · Germany · Europe. Club culture acoustique · Boiler Room meets brass ensemble.',
  },
  liveIntro: {
    de: 'PULSATIVE live — Festivals, Clubs und Events in Köln, NRW und Europa.',
    en: 'PULSATIVE live — festivals, clubs, and events across Cologne, NRW, and Europe.',
  },
  liveImageUrl:
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
  videosIntro: {
    de: 'Festival Trailer, Live-Clips und Cover-Performances.',
    en: 'Festival trailer, live clips, and cover performances.',
  },
  fotosIntro: {
    de: 'Live-Momente, Backstage und Festival-Eindrücke.',
    en: 'Live moments, backstage, and festival impressions.',
  },
  showHomepageUpcomingDates: true,
  showLivePage: true,
  showVideosPage: true,
  showFotosPage: true,
  showAboutPage: true,
  showContactPage: true,
  showPromoKitPage: true,
  showAnnouncementBanner: false,
  bookingContactName: 'Fabian Junge',
  bookingEmail: 'pulsative@proton.me',
  phone: '01577-9588093',
  seoDescription:
    'PULSATIVE — Neo-Brass-Kollektiv aus Köln. House, Techno und EDM live. Termine, Videos, Presse und Booking.',
  showreelVideoUrl: '/videos/showreel.mp4',
  showreelTitle: {
    de: 'Festival Trailer',
    en: 'Festival Trailer',
  },
  showreelDescription: {
    de: 'Ein Minutengerüst aus PULSATIVE live — Klick zum Abspielen.',
    en: 'A one-minute glimpse of PULSATIVE live — click to play.',
  },
  showreelPosterUrl: '/images/hero.png',
  heroImageUrl: '/images/hero.png',
  heroImageMobileUrl: '/images/hero.png',
  heroImageDesktopUrl: '/images/hero.png',
  heroImageWideUrl: '/images/hero.png',
  socials: [
    { platform: 'Instagram', url: 'https://instagram.com/pulsative.music' },
  ],
};

export const mockShows: Show[] = [
  {
    _id: 'show-1',
    date: '2026-08-15',
    time: '20:00',
    venue: 'Gloria Theater',
    city: 'Cologne',
    country: 'Germany',
    ticketUrl: 'https://example.com/tickets',
    soldOut: false,
    posterUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    description: 'Home show — full live set.',
  },
  {
    _id: 'show-2',
    date: '2026-09-02',
    time: '21:30',
    venue: 'Luxor',
    city: 'Cologne',
    country: 'Germany',
    ticketUrl: 'https://example.com/tickets',
    soldOut: false,
    posterUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  },
  {
    _id: 'show-3',
    date: '2026-09-20',
    time: '22:00',
    venue: 'Berghain Kantine',
    city: 'Berlin',
    country: 'Germany',
    soldOut: true,
    posterUrl:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  },
  {
    _id: 'show-4',
    date: '2026-05-10',
    venue: 'Bootshaus',
    city: 'Cologne',
    country: 'Germany',
    soldOut: false,
    posterUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  },
];

export const mockPhotos: Photo[] = [
  {
    _id: 'photo-1',
    title: { de: 'Band auf der Bühne', en: 'Band on Stage' },
    imageUrl: '/fotos/01-portrait-deck.png',
    originalUrl: '/fotos/01-portrait-deck.png',
    width: 900,
    height: 1600,
    downloadFilename: '01-portrait-deck.png',
    sortOrder: 1,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-2',
    title: { de: 'Live im Feld', en: 'Live in the Field' },
    imageUrl: '/fotos/02-landscape-field.png',
    originalUrl: '/fotos/02-landscape-field.png',
    width: 1600,
    height: 900,
    downloadFilename: '02-landscape-field.png',
    sortOrder: 2,
    orientation: 'landscape',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-3',
    title: { de: 'Instrumente hoch', en: 'Instruments Up' },
    imageUrl: '/fotos/03-landscape-wide.png',
    originalUrl: '/fotos/03-landscape-wide.png',
    width: 1600,
    height: 900,
    downloadFilename: '03-landscape-wide.png',
    sortOrder: 3,
    orientation: 'landscape',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-4',
    title: { de: 'Von unten', en: 'Low Angle' },
    imageUrl: '/fotos/04-portrait-low-angle.png',
    originalUrl: '/fotos/04-portrait-low-angle.png',
    width: 900,
    height: 1600,
    downloadFilename: '04-portrait-low-angle.png',
    sortOrder: 4,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-5',
    title: { de: 'Wiese', en: 'Meadow' },
    imageUrl: '/fotos/05-portrait-meadow.png',
    originalUrl: '/fotos/05-portrait-meadow.png',
    width: 900,
    height: 1600,
    downloadFilename: '05-portrait-meadow.png',
    sortOrder: 5,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
];

export const mockVideos: Video[] = [
  {
    _id: 'video-1',
    title: { de: 'Festival Trailer (1 min)', en: 'Festival Trailer (1 min)' },
    vimeoId: '1203716758',
    sortOrder: 1,
    orientation: 'portrait',
  },
  {
    _id: 'video-2',
    title: { de: 'Worakls — Detached Motion', en: 'Worakls — Detached Motion' },
    vimeoId: '1203716751',
    sortOrder: 2,
    orientation: 'portrait',
  },
  {
    _id: 'video-3',
    title: { de: 'Roya — Cruise', en: 'Roya — Cruise' },
    vimeoId: '1203716757',
    sortOrder: 3,
    orientation: 'portrait',
  },
];

export const mockReleases: Release[] = [];

export const mockPhotoPrints: PhotoPrint[] = [];

export const mockPressAssets: PressAsset[] = [
  {
    _id: 'press-3',
    title: 'Electronic Press Kit (EPK)',
    assetType: 'pressKit',
    fileUrl: '/press/pulsative-epk-web.pdf',
    description: 'Offizielles Electronic Press Kit — Bio, Repertoire, Besetzung, Booking.',
  },
  {
    _id: 'press-4',
    title: 'Technical Rider',
    assetType: 'technicalRider',
    description: 'Available soon.',
  },
];

export const mockAbout: AboutContent = {
  bio: [
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio1span',
          text: 'PULSATIVE übersetzt ikonische House-, Techno- und EDM-Tracks in ein organisches Live-Set. Subsonische Sousaphon-Basslines, Four-to-the-Floor-Grooves und minimalistische Bläser-Patterns: Damit bringt das Kölner Neo-Brass-Kollektiv Party People aller Generationen in Bewegung.',
          marks: [],
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bio2',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio2span',
          text: 'PULSATIVE, das ist Clubkultur acoustique: präzise wie eine Maschine, gespielt von echten Menschen.',
          marks: [],
        },
      ],
    },
  ],
  bioEn: [
    {
      _type: 'block',
      _key: 'bioEn1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bioEn1span',
          text: 'PULSATIVE translates iconic house, techno, and EDM tracks into an organic live set. Subsonic sousaphone basslines, four-to-the-floor grooves, and minimalist brass patterns — the Cologne neo-brass collective gets party people of all generations moving.',
          marks: [],
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bioEn2',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bioEn2span',
          text: 'PULSATIVE is club culture acoustique: precise as a machine, played by real humans.',
          marks: [],
        },
      ],
    },
  ],
  members: [],
  pressQuotes: [],
};

export const mockLegalPages: LegalPage[] = [
  {
    _id: 'legal-impressum-de',
    title: 'Impressum',
    slug: 'impressum',
    locale: 'de',
    body: [
      {
        _type: 'block',
        _key: 'imp1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'imp1span',
            text: 'PULSATIVE\nFabian Junge (Booking)\nKöln, Deutschland\n\nE-Mail: pulsative@proton.me\nTelefon: 01577-9588093',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'legal-privacy-de',
    title: 'Datenschutzerklärung',
    slug: 'privacy',
    locale: 'de',
    body: [
      {
        _type: 'block',
        _key: 'priv1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'priv1span',
            text: 'Diese Website nutzt Cloudflare Web Analytics zur anonymen Auswertung der Website-Nutzung. Die Messung ist cookieless und erfolgt ohne Einwilligungs-Banner.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'legal-impressum-en',
    title: 'Legal Notice',
    slug: 'impressum',
    locale: 'en',
    body: [
      {
        _type: 'block',
        _key: 'imp2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'imp2span',
            text: 'PULSATIVE\nFabian Junge (Booking)\nCologne, Germany\n\nEmail: pulsative@proton.me\nPhone: 01577-9588093',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'legal-privacy-en',
    title: 'Privacy Policy',
    slug: 'privacy',
    locale: 'en',
    body: [
      {
        _type: 'block',
        _key: 'priv2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'priv2span',
            text: 'This website uses Cloudflare Web Analytics to measure site usage anonymously. Measurement is cookieless and does not require a consent banner.',
            marks: [],
          },
        ],
      },
    ],
  },
];
