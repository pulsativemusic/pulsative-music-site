import { defineField, defineType } from 'sanity';
import { localizedString } from './localized';

const socialPlatformOptions = [
  { title: 'Instagram', value: 'Instagram' },
  { title: 'TikTok', value: 'TikTok' },
  { title: 'Facebook', value: 'Facebook' },
  { title: 'YouTube', value: 'YouTube' },
  { title: 'Spotify', value: 'Spotify' },
  { title: 'Other', value: 'Other' },
];

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'bandName', title: 'Band Name', type: 'string' }),
    localizedString('tagline', 'Tagline'),
    localizedString('shortDescription', 'Short Description (Homepage)', 3),
    localizedString('liveIntro', 'Live Page Intro', 3),
    localizedString('videosIntro', 'Videos Page Intro', 3),
    localizedString('fotosIntro', 'Fotos Page Intro', 3),
    defineField({
      name: 'bookingContactName',
      title: 'Booking Contact Name',
      type: 'string',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'showreelYoutubeId',
      title: 'Showreel YouTube ID',
      type: 'string',
      description: 'YouTube video ID for the homepage showreel teaser.',
    }),
    localizedString('showreelTitle', 'Showreel Title'),
    localizedString('showreelDescription', 'Showreel Description', 2),
    defineField({
      name: 'showreelPoster',
      title: 'Showreel Poster',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback thumbnail when video is loading.',
    }),
    defineField({
      name: 'showreelVideo',
      title: 'Showreel Video (MP4)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Optional self-hosted teaser. Overrides YouTube when set.',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        defineField({
          name: 'social',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: { list: socialPlatformOptions },
            }),
            defineField({ name: 'url', type: 'url', title: 'URL' }),
          ],
        }),
      ],
    }),
  ],
});
