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
    defineField({
      name: 'showHomepageUpcomingDates',
      title: 'Show Upcoming Dates on Homepage',
      type: 'boolean',
      initialValue: true,
      description:
        'Shows the upcoming dates section on the homepage when there are future shows.',
    }),
    defineField({
      name: 'showLivePage',
      title: 'Show Live Page',
      type: 'boolean',
      initialValue: true,
      description:
        'Shows the Live nav link and /live page. When off, /live redirects to the homepage.',
    }),
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
      name: 'showreelVimeoId',
      title: 'Showreel Vimeo ID',
      type: 'string',
      description: 'Vimeo video ID for the homepage showreel teaser.',
    }),
    localizedString('showreelTitle', 'Showreel Title'),
    localizedString('showreelDescription', 'Showreel Description', 2),
    defineField({
      name: 'showreelPoster',
      title: 'Showreel Poster',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional fallback thumbnail when video is loading.',
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
