#!/usr/bin/env node
/**
 * Seed Sanity with PULSATIVE content (mirrors src/lib/mock-data.ts).
 *
 * Usage:
 *   PUBLIC_SANITY_PROJECT_ID=xxx PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=xxx pnpm run seed
 *   # or with logged-in CLI session:
 *   sanity exec scripts/seed-sanity.mjs --with-user-token
 */

import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

for (const [key, value] of Object.entries(loadEnv('development', root, ''))) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
  }
}

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_AUTH_TOKEN ?? process.env.SANITY_API_TOKEN;
const tokenSource = process.env.SANITY_AUTH_TOKEN
  ? 'CLI session (sanity exec --with-user-token)'
  : process.env.SANITY_API_TOKEN
    ? '.env SANITY_API_TOKEN'
    : null;

if (!projectId || projectId === 'placeholder' || projectId === 'your-project-id') {
  console.error(
    'Set PUBLIC_SANITY_PROJECT_ID in .env (see .env.example).\n' +
      'Or run: npx sanity exec scripts/seed-sanity.mjs --with-user-token',
  );
  process.exit(1);
}

if (!token) {
  console.error('Set SANITY_API_TOKEN (or run via: sanity exec --with-user-token).');
  process.exit(1);
}

const placeholderTokens = new Set(['your-editor-token', 'your-token', 'xxx', 'placeholder']);
if (placeholderTokens.has(token)) {
  console.error(
    'SANITY_API_TOKEN is still a placeholder.\n' +
      'Create an Editor token at https://www.sanity.io/manage → API → Tokens\n' +
      'Or run: npx sanity exec scripts/seed-sanity.mjs --with-user-token',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function imageRef(asset) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

function fileRef(asset) {
  return {
    _type: 'file',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function uploadImageFromUrl(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload('image', buffer, { filename });
}

async function uploadImageFromFile(relativePath, filename) {
  const filePath = path.join(root, relativePath);
  const buffer = await readFile(filePath);
  return client.assets.upload('image', buffer, { filename });
}

async function uploadFileFromFile(relativePath, filename) {
  const filePath = path.join(root, relativePath);
  const buffer = await readFile(filePath);
  return client.assets.upload('file', buffer, { filename });
}

const showPosters = {
  'show-1':
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'show-2':
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  'show-3':
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  'show-4':
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
};

const photoSources = {
  'photo-1':
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=1600&fit=crop&q=80',
  'photo-2':
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=1600&fit=crop&q=80',
  'photo-3':
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&h=1600&fit=crop&q=80',
};

const documents = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
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
    showreelVimeoId: '1203716758',
    showreelTitle: { de: 'Festival Trailer', en: 'Festival Trailer' },
    showreelDescription: {
      de: 'Ein Minutengerüst aus PULSATIVE live — Klick zum Abspielen.',
      en: 'A one-minute glimpse of PULSATIVE live — click to play.',
    },
    seoDescription:
      'PULSATIVE — Neo-Brass-Kollektiv aus Köln. House, Techno und EDM live. Termine, Videos, Presse und Booking.',
    socials: [
      { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/pulsative.music' },
    ],
  },
  {
    _id: 'show-1',
    _type: 'show',
    date: '2026-08-15',
    venue: 'Gloria Theater',
    city: 'Cologne',
    country: 'Germany',
    ticketUrl: 'https://example.com/tickets',
    soldOut: false,
    description: 'Home show — full live set.',
  },
  {
    _id: 'show-2',
    _type: 'show',
    date: '2026-09-02',
    venue: 'Luxor',
    city: 'Cologne',
    country: 'Germany',
    ticketUrl: 'https://example.com/tickets',
    soldOut: false,
  },
  {
    _id: 'show-3',
    _type: 'show',
    date: '2026-09-20',
    venue: 'Berghain Kantine',
    city: 'Berlin',
    country: 'Germany',
    soldOut: true,
  },
  {
    _id: 'show-4',
    _type: 'show',
    date: '2026-05-10',
    venue: 'Bootshaus',
    city: 'Cologne',
    country: 'Germany',
    soldOut: false,
  },
  {
    _id: 'video-1',
    _type: 'video',
    title: { de: 'Festival Trailer (1 min)', en: 'Festival Trailer (1 min)' },
    vimeoId: '1203716758',
    sortOrder: 1,
    orientation: 'portrait',
  },
  {
    _id: 'video-2',
    _type: 'video',
    title: { de: 'Worakls — Detached Motion', en: 'Worakls — Detached Motion' },
    vimeoId: '1203716751',
    sortOrder: 2,
    orientation: 'portrait',
  },
  {
    _id: 'video-3',
    _type: 'video',
    title: { de: 'Roya — Cruise', en: 'Roya — Cruise' },
    vimeoId: '1203716757',
    sortOrder: 3,
    orientation: 'portrait',
  },
  {
    _id: 'photo-1',
    _type: 'photo',
    title: { de: 'Gloria Theater', en: 'Gloria Theater' },
    sortOrder: 1,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-2',
    _type: 'photo',
    title: { de: 'Festival Stage', en: 'Festival Stage' },
    sortOrder: 2,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
  {
    _id: 'photo-3',
    _type: 'photo',
    title: { de: 'Backstage', en: 'Backstage' },
    sortOrder: 3,
    orientation: 'portrait',
    credit: '© PULSATIVE',
  },
  {
    _id: 'press-1',
    _type: 'pressAsset',
    title: 'PULSATIVE Logo (PNG)',
    assetType: 'logo',
    description: 'High-resolution logo on transparent background.',
  },
  {
    _id: 'press-3',
    _type: 'pressAsset',
    title: 'EPK Web (PDF)',
    assetType: 'pressKit',
    description: 'Offizielles Electronic Press Kit — Bio, Repertoire, Besetzung, Booking.',
  },
  {
    _id: 'press-4',
    _type: 'pressAsset',
    title: 'Technical Rider',
    assetType: 'technicalRider',
    description: 'Available soon.',
  },
  {
    _id: 'press-5',
    _type: 'pressAsset',
    title: 'Stage Plot',
    assetType: 'stagePlot',
    description: 'Available soon.',
  },
  {
    _id: 'legal-impressum-de',
    _type: 'legalPage',
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
    _type: 'legalPage',
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
            text: 'Diese Website nutzt Matomo Analytics zur anonymen Auswertung der Website-Nutzung. Tracking erfolgt nur nach deiner Einwilligung über den Cookie-Banner.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'legal-impressum-en',
    _type: 'legalPage',
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
    _type: 'legalPage',
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
            text: 'This website uses Matomo Analytics to measure site usage anonymously. Tracking only runs after you consent via the cookie banner.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'page-about',
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
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
    sections: [
      {
        _type: 'richText',
        _key: 'bio',
        heading: 'Bio',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: 'PULSATIVE übersetzt ikonische House-, Techno- und EDM-Tracks in ein organisches Live-Set. Subsonische Sousaphon-Basslines, Four-to-the-Floor-Grooves und minimalistische Bläser-Patterns: Damit bringt das Kölner Neo-Brass-Kollektiv Party People aller Generationen in Bewegung.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'b2',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 's2',
                text: 'PULSATIVE, das ist Clubkultur acoustique: präzise wie eine Maschine, gespielt von echten Menschen.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _type: 'richText',
        _key: 'bioEn',
        heading: 'Bio (EN)',
        body: [
          {
            _type: 'block',
            _key: 'b3',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 's3',
                text: 'PULSATIVE translates iconic house, techno, and EDM tracks into an organic live set. Subsonic sousaphone basslines, four-to-the-floor grooves, and minimalist brass patterns — the Cologne neo-brass collective gets party people of all generations moving.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'b4',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 's4',
                text: 'PULSATIVE is club culture acoustique: precise as a machine, played by real humans.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _type: 'imageGrid',
        _key: 'bandPhoto',
        heading: 'Band Photo',
        images: [],
      },
    ],
  },
];

function permissionHelp(error) {
  const is403 =
    error?.statusCode === 403 ||
    error?.details?.type === 'mutationError' ||
    String(error?.message ?? '').includes('Insufficient permissions');

  if (!is403) {
    return false;
  }

  console.error(
    '\nSanity rejected the request: insufficient permissions (create/upload required).\n\n' +
      `Auth used: ${tokenSource ?? 'none'}\n\n` +
      'Fix options:\n' +
      '  1. pnpm run seed          — uses your Sanity CLI login (recommended)\n' +
      '  2. Create an Editor token at https://www.sanity.io/manage → API → Tokens\n' +
      '     Set SANITY_API_TOKEN in .env (Viewer/Read tokens will not work)\n' +
      '  3. Remove or comment out SANITY_API_TOKEN in .env if it is a weak token\n',
  );
  return true;
}

try {
  console.log(`Seeding ${projectId}/${dataset} via ${tokenSource}...`);

  const [heroImage, showreelPoster, bandPhoto, logoFile, epkFile] = await Promise.all([
    uploadImageFromFile('public/images/hero.png', 'hero.png'),
    uploadImageFromFile('public/images/hero.png', 'showreel-poster.png'),
    uploadImageFromUrl(
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
      'band-photo.jpg',
    ),
    uploadFileFromFile('public/press/band-logo.svg', 'pulsative-logo.svg'),
    uploadFileFromFile('public/press/pulsative-epk-web.pdf', 'pulsative-epk-web.pdf'),
  ]);

const showPosterAssets = await Promise.all(
  Object.entries(showPosters).map(async ([id, url]) => {
    const asset = await uploadImageFromUrl(url, `${id}-poster.jpg`);
    return [id, asset];
  }),
);

const photoAssets = await Promise.all(
  Object.entries(photoSources).map(async ([id, url]) => {
    const asset = await uploadImageFromUrl(url, `${id}.jpg`);
    return [id, asset];
  }),
);

const showPosterMap = Object.fromEntries(showPosterAssets);
const photoAssetMap = Object.fromEntries(photoAssets);

for (const doc of documents) {
  if (doc._type === 'siteSettings') {
    doc.heroImage = imageRef(heroImage);
    doc.showreelPoster = imageRef(showreelPoster);
  }

  if (doc._type === 'show' && showPosterMap[doc._id]) {
    doc.poster = imageRef(showPosterMap[doc._id]);
  }

  if (doc._type === 'photo' && photoAssetMap[doc._id]) {
    doc.image = imageRef(photoAssetMap[doc._id]);
  }

  if (doc._id === 'press-1') {
    doc.file = fileRef(logoFile);
  }

  if (doc._id === 'press-3') {
    doc.file = fileRef(epkFile);
  }

  if (doc._id === 'page-about') {
    const imageGrid = doc.sections.find((section) => section._key === 'bandPhoto');
    if (imageGrid) {
      imageGrid.images = [imageRef(bandPhoto)];
    }
  }
}

const transaction = client.transaction();
for (const doc of documents) {
  transaction.createOrReplace(doc);
}

await transaction.commit();

console.log(`Seed complete: ${documents.length} documents into ${projectId}/${dataset}`);
} catch (error) {
  if (!permissionHelp(error)) {
    throw error;
  }
  process.exit(1);
}
