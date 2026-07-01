import type {
  AboutContent,
  Gallery,
  Page,
  PhotoPrint,
  PressAsset,
  Release,
  Show,
  SiteSettings,
} from './types';

export const mockSiteSettings: SiteSettings = {
  _id: 'settings',
  bandName: 'Marco Bonadies',
  tagline: 'Music and photography from Cologne.',
  bookingEmail: 'booking@marcobonadies.com',
  seoDescription:
    'Official site for Marco Bonadies — musician and photographer based in Cologne. Music, tour dates, and fine art prints.',
  heroImageUrl:
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=1920&q=80',
  socials: [
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'Spotify', url: 'https://open.spotify.com' },
    { platform: 'YouTube', url: 'https://youtube.com' },
    { platform: 'TikTok', url: 'https://tiktok.com' },
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
    description: 'Home show — album release party.',
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
      'https://images.unsplash.com/photo-1459749411175-04bf5294ceea?w=800&q=80',
  },
];

export const mockReleases: Release[] = [
  {
    _id: 'release-1',
    title: 'Neon Wounds',
    releaseDate: '2026-07-01',
    coverUrl:
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80',
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://music.apple.com',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    _id: 'release-2',
    title: 'City Static EP',
    releaseDate: '2025-11-14',
    coverUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    spotifyUrl: 'https://open.spotify.com',
  },
];

const galleryPhotos = (seed: number) =>
  Array.from({ length: 8 }, (_, index) => ({
    _key: `photo-${seed}-${index}`,
    imageUrl: `https://images.unsplash.com/photo-${
      [
        '1470229722913-7c0e2dbbafd3',
        '1514525253161-7a46d19cd819',
        '1498038432885-c6f3f1b912ee',
        '1506157786151-b8491531f063',
        '1459749411175-04bf5294ceea',
        '1511671782779-c97d3d27a1d4',
        '1614613535308-eb5fbd3d2c17',
        '1516280440614-37939bbacd81',
      ][index]
    }?w=1200&q=80`,
    caption: `Live shot ${index + 1}`,
    credit: 'Marco Bonadies',
    width: 1200,
    height: 800,
  }));

export const mockGalleries: Gallery[] = [
  {
    _id: 'gallery-1',
    title: 'Gloria Theater — Home Show',
    slug: 'gloria-theater',
    showDate: '2026-05-10',
    venue: 'Gloria Theater, Cologne',
    coverUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    photos: galleryPhotos(1),
  },
  {
    _id: 'gallery-2',
    title: 'Cologne Nights',
    slug: 'cologne-nights',
    showDate: '2026-06-22',
    venue: 'Cologne, Germany',
    coverUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    photos: galleryPhotos(2),
  },
];

export const mockPhotoPrints: PhotoPrint[] = [
  {
    _id: 'print-1',
    title: 'Rhine at Dusk',
    slug: 'rhine-at-dusk',
    imageUrl:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    description: 'The Rhine promenade as the city lights come on.',
    category: 'city',
    price: 89,
    currency: 'EUR',
    sizes: ['A4', 'A3', 'A2'],
    purchaseUrl: 'https://example.com/buy/rhine-at-dusk',
    soldOut: false,
    featured: true,
  },
  {
    _id: 'print-2',
    title: 'Backstage Portrait',
    slug: 'backstage-portrait',
    imageUrl:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    description: 'Quiet moment before the set.',
    category: 'portrait',
    price: 75,
    currency: 'EUR',
    sizes: ['A4', 'A3'],
    purchaseUrl: 'https://example.com/buy/backstage-portrait',
    soldOut: false,
    featured: true,
  },
  {
    _id: 'print-3',
    title: 'Dom Through Fog',
    slug: 'dom-through-fog',
    imageUrl:
      'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80',
    description: 'Cologne Cathedral on a misty autumn morning.',
    category: 'landscape',
    price: 95,
    currency: 'EUR',
    sizes: ['A3', 'A2'],
    purchaseUrl: 'https://example.com/buy/dom-through-fog',
    soldOut: false,
    featured: true,
  },
  {
    _id: 'print-4',
    title: 'Stage Lights',
    slug: 'stage-lights',
    imageUrl:
      'https://images.unsplash.com/photo-1459749411175-04bf5294ceea?w=800&q=80',
    description: 'Live energy from a club date in Ehrenfeld.',
    category: 'live',
    price: 65,
    currency: 'EUR',
    sizes: ['A4', 'A3'],
    purchaseUrl: 'https://example.com/buy/stage-lights',
    soldOut: true,
    featured: false,
  },
];

export const mockPressAssets: PressAsset[] = [
  {
    _id: 'press-1',
    title: 'Band Logo (PNG)',
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
    title: 'One-Sheet Bio',
    assetType: 'bio',
    fileUrl: '/press/one-sheet.pdf',
    description: 'Short bio, lineup, and contact info.',
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
          text: 'Marco Bonadies is a musician and photographer based in Cologne, Germany. His songs blend intimate storytelling with driving rhythm, while his photography captures the city he calls home — from the Rhine at dusk to backstage portraits on tour. When he is not on stage, Marco is behind the lens, and selected works are available as limited-edition fine art prints.',
          marks: [],
        },
      ],
    },
  ],
  members: [
    {
      name: 'Marco Bonadies',
      role: 'Musician & Photographer',
      bio: 'Based in Cologne. Writes songs, shoots film, and prints what moves him.',
      photoUrl:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80',
    },
  ],
  pressQuotes: [
    {
      quote: 'A rare voice that sounds as honest on record as it does in a packed club.',
      source: 'Kölner Stadt-Anzeiger',
    },
    {
      quote: 'His photographs find beauty in the everyday — Cologne has rarely looked this cinematic.',
      source: 'Fotografie Magazin',
    },
  ],
};

export const mockPages: Page[] = [
  {
    _id: 'page-about',
    slug: 'about',
    title: 'About',
    sections: [],
  },
];
