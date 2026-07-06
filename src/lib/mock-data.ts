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
  tagline: {
    de: 'Neo-Brass Collective · House · Techno · EDM',
    en: 'Neo-Brass Collective · House · Techno · EDM',
  },
  shortDescription: {
    de: 'Festivals · Clubs · Streets · Events — Köln · NRW · Deutschland · Europa. Clubkultur acoustique · Boiler Room trifft Brassensemble.',
    en: 'Festivals · Clubs · Streets · Events — Cologne · NRW · Germany · Europe. Club culture acoustique · Boiler Room meets brass ensemble.',
  },
  liveIntro: {
    de: 'PULSATIVE live — Festivals, Clubs und Events in Köln, NRW und Europa.',
    en: 'PULSATIVE live — festivals, clubs, and events across Cologne, NRW, and Europe.',
  },
  videosIntro: {
    de: 'Festival Trailer, Live-Clips und Cover-Performances.',
    en: 'Festival trailer, live clips, and cover performances.',
  },
  fotosIntro: {
    de: 'Live-Momente, Backstage und Festival-Eindrücke.',
    en: 'Live moments, backstage, and festival impressions.',
  },
  bookingContactName: 'Fabian Junge',
  bookingEmail: 'pulsative@proton.me',
  phone: '01577-9588093',
  seoDescription:
    'PULSATIVE — Neo-Brass-Kollektiv aus Köln. House, Techno und EDM live. Termine, Videos, Presse und Booking.',
  showreelYoutubeId: 'dQw4w9WgXcQ',
  showreelVideoUrl:
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
  socials: [
    { platform: 'Instagram', url: 'https://instagram.com/pulsative.music' },
  ],
};

export const mockShows: Show[] = [
  {
    _id: 'show-1',
    date: '2026-08-15',
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
    title: { de: 'Gloria Theater', en: 'Gloria Theater' },
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=1600&fit=crop&q=80',
    sortOrder: 1,
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-2',
    title: { de: 'Festival Stage', en: 'Festival Stage' },
    imageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=1600&fit=crop&q=80',
    sortOrder: 2,
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-3',
    title: { de: 'Backstage', en: 'Backstage' },
    imageUrl:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&h=1600&fit=crop&q=80',
    sortOrder: 3,
    credit: '© PULSATIVE',
  },
];

export const mockVideos: Video[] = [
  {
    _id: 'video-1',
    title: { de: 'Festival Trailer (1 min)', en: 'Festival Trailer (1 min)' },
    vimeoId: '1203716758',
    sortOrder: 1,
  },
  {
    _id: 'video-2',
    title: { de: 'Worakls — Detached Motion', en: 'Worakls — Detached Motion' },
    vimeoId: '1203716751',
    sortOrder: 2,
  },
  {
    _id: 'video-3',
    title: { de: 'Roya — Cruise', en: 'Roya — Cruise' },
    vimeoId: '1203716757',
    sortOrder: 3,
  },
];

export const mockReleases: Release[] = [];

export const mockPhotoPrints: PhotoPrint[] = [];

export const mockPressAssets: PressAsset[] = [
  {
    _id: 'press-1',
    title: 'PULSATIVE Logo (PNG)',
    assetType: 'logo',
    fileUrl: '/press/band-logo.svg',
    description: 'High-resolution logo on transparent background.',
  },
  {
    _id: 'press-2',
    title: 'Press Photo Pack',
    assetType: 'photo',
    fileUrl: '/press/press-photos.zip',
    description: 'Official promo photos for media use.',
  },
  {
    _id: 'press-3',
    title: 'EPK Web (PDF)',
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
  {
    _id: 'press-5',
    title: 'Stage Plot',
    assetType: 'stagePlot',
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
  bandPhotoUrl:
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
  members: [],
  pressQuotes: [],
  lineup: [
    'Sousaphon',
    'Bariton-, Alt-, Tenorsax',
    'Posaune',
    'Trompete',
    'Schlagzeug',
    'Percussion (optional)',
  ],
  repertoire: [
    'Benny Benassi – Satisfaction',
    'Fisher – Losing It',
    'Gaia – Freed from Desire',
    'Roya – Cruise',
    'Tyga & Zyntherius – Sunglasses at Night',
    'u.v.m.',
  ],
  setLength: {
    de: '30–45 Minuten. Erweiterbar bis 90 Minuten.',
    en: '30–45 minutes. Extendable up to 90 minutes.',
  },
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
            text: 'Diese Website nutzt Matomo Analytics zur anonymen Auswertung der Website-Nutzung. Tracking erfolgt nur nach deiner Einwilligung über den Cookie-Banner. Du kannst deine Einwilligung jederzeit widerrufen, indem du die gespeicherten Website-Daten in deinem Browser löschst.',
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
            text: 'This website uses Matomo Analytics to measure site usage anonymously. Tracking only runs after you consent via the cookie banner. You can withdraw consent at any time by clearing stored site data in your browser.',
            marks: [],
          },
        ],
      },
    ],
  },
];
