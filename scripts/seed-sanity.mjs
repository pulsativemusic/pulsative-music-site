#!/usr/bin/env node
/**
 * Seed Sanity with PULSATIVE sample content.
 *
 * Usage:
 *   PUBLIC_SANITY_PROJECT_ID=xxx PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=xxx pnpm run seed
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === 'placeholder' || projectId === 'your-project-id') {
  console.error('Set PUBLIC_SANITY_PROJECT_ID to your Sanity project ID.');
  process.exit(1);
}

if (!token) {
  console.error('Set SANITY_API_TOKEN with Editor permissions.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

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
      de: 'Festivals · Clubs · Streets · Events — Köln · NRW · Deutschland · Europa.',
      en: 'Festivals · Clubs · Streets · Events — Cologne · NRW · Germany · Europe.',
    },
    liveIntro: {
      de: 'PULSATIVE live — Festivals, Clubs und Events.',
      en: 'PULSATIVE live — festivals, clubs, and events.',
    },
    videosIntro: {
      de: 'Festival Trailer, Live-Clips und Cover-Performances.',
      en: 'Festival trailer, live clips, and cover performances.',
    },
    bookingContactName: 'Fabian Junge',
    bookingEmail: 'pulsative@proton.me',
    phone: '01577-9588093',
    showreelYoutubeId: 'dQw4w9WgXcQ',
    seoDescription:
      'PULSATIVE — Neo-Brass Collective from Cologne. House, Techno, EDM live.',
    socials: [
      { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/pulsative.music' },
    ],
  },
  {
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
    _type: 'show',
    date: '2026-09-02',
    venue: 'Luxor',
    city: 'Cologne',
    country: 'Germany',
    ticketUrl: 'https://example.com/tickets',
    soldOut: false,
  },
  {
    _type: 'video',
    title: { de: 'Festival Trailer (1 min)', en: 'Festival Trailer (1 min)' },
    youtubeId: 'dQw4w9WgXcQ',
    sortOrder: 1,
  },
  {
    _type: 'video',
    title: { de: 'Worakls — Detached Motion', en: 'Worakls — Detached Motion' },
    youtubeId: 'dQw4w9WgXcQ',
    sortOrder: 2,
  },
  {
    _type: 'video',
    title: { de: 'Roya — Cruise', en: 'Roya — Cruise' },
    youtubeId: 'dQw4w9WgXcQ',
    sortOrder: 3,
  },
  {
    _type: 'pressAsset',
    title: 'PULSATIVE Logo',
    assetType: 'logo',
    description: 'High-resolution logo.',
  },
  {
    _type: 'pressAsset',
    title: 'EPK Web (PDF)',
    assetType: 'pressKit',
    description: 'Offizielles Electronic Press Kit.',
  },
  {
    _type: 'legalPage',
    _id: 'legal-impressum-de',
    title: 'Impressum',
    slug: 'impressum',
    locale: 'de',
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
            text: 'PULSATIVE — pulsative@proton.me — Fabian Junge, Köln',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'legalPage',
    _id: 'legal-privacy-de',
    title: 'Datenschutzerklärung',
    slug: 'privacy',
    locale: 'de',
    body: [
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Matomo Analytics wird nur nach Cookie-Einwilligung geladen.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
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
    ],
  },
];

console.log(`Seeding ${documents.length} documents into ${projectId}/${dataset}...`);

const transaction = client.transaction();
for (const doc of documents) {
  transaction.createOrReplace(doc);
}

await transaction.commit();
console.log('Seed complete. Upload images in Sanity Studio at /admin');
