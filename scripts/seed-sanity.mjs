#!/usr/bin/env node
/**
 * Seed Sanity with sample band content.
 *
 * Usage:
 *   PUBLIC_SANITY_PROJECT_ID=xxx PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=xxx node scripts/seed-sanity.mjs
 *
 * Create a token at https://www.sanity.io/manage with Editor permissions.
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === 'placeholder') {
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
    bandName: 'Marco Bonadies',
    tagline: 'Music and photography from Cologne.',
    bookingEmail: 'booking@marcobonadies.com',
    seoDescription:
      'Official site for Marco Bonadies — musician and photographer based in Cologne. Music, tour dates, and fine art prints.',
    socials: [
      { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com' },
      { _key: 'sp', platform: 'Spotify', url: 'https://open.spotify.com' },
      { _key: 'yt', platform: 'YouTube', url: 'https://youtube.com' },
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
    description: 'Home show — album release party.',
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
    _type: 'show',
    date: '2026-09-20',
    venue: 'Berghain Kantine',
    city: 'Berlin',
    country: 'Germany',
    soldOut: true,
  },
  {
    _type: 'release',
    title: 'Neon Wounds',
    releaseDate: '2026-07-01',
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://music.apple.com',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    _type: 'gallery',
    title: 'Gloria Theater — Home Show',
    slug: { _type: 'slug', current: 'gloria-theater' },
    showDate: '2026-05-10',
    venue: 'Gloria Theater, Cologne',
    photos: [],
  },
  {
    _type: 'photoPrint',
    title: 'Rhine at Dusk',
    slug: { _type: 'slug', current: 'rhine-at-dusk' },
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
    _type: 'photoPrint',
    title: 'Dom Through Fog',
    slug: { _type: 'slug', current: 'dom-through-fog' },
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
    _type: 'pressAsset',
    title: 'Band Logo (SVG)',
    assetType: 'logo',
    description: 'High-resolution logo on transparent background.',
  },
  {
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
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
                text: 'Marco Bonadies is a musician and photographer based in Cologne, Germany. His songs blend intimate storytelling with driving rhythm, while his photography captures the city he calls home.',
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
