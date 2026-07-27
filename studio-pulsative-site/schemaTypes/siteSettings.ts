import { defineField, defineType } from 'sanity';
import { localizedString } from './localized';

const socialPlatformOptions = [
  { title: 'Instagram', value: 'Instagram' },
  { title: 'TikTok', value: 'TikTok' },
  { title: 'Facebook', value: 'Facebook' },
  { title: 'Vimeo', value: 'Vimeo' },
  { title: 'Spotify', value: 'Spotify' },
  { title: 'Other', value: 'Other' },
];

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'homepage', title: 'Homepage' },
    { name: 'live', title: 'Live' },
    { name: 'announcement', title: 'Announcement' },
    { name: 'pages', title: 'Page intros' },
    { name: 'contact', title: 'Contact & social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'bandName',
      title: 'Band Name',
      type: 'string',
      group: 'general',
    }),
    localizedString('taglineLine1', 'Tagline line 1', undefined, 'general'),
    localizedString('taglineLine2', 'Tagline line 2', undefined, 'general'),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),

    localizedString('shortDescription', 'Short Description (Homepage)', 3, 'homepage'),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'homepage',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      group: 'homepage',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'showreelVimeoId',
      title: 'Showreel Vimeo ID',
      type: 'string',
      group: 'homepage',
      description: 'Vimeo video ID for the homepage showreel teaser.',
    }),
    localizedString('showreelTitle', 'Showreel Title', undefined, 'homepage'),
    localizedString('showreelDescription', 'Showreel Description', 2, 'homepage'),
    defineField({
      name: 'showreelPoster',
      title: 'Showreel Poster',
      type: 'image',
      group: 'homepage',
      options: { hotspot: true },
      description: 'Optional fallback thumbnail when video is loading.',
    }),
    defineField({
      name: 'showHomepageUpcomingDates',
      title: 'Show Upcoming Dates on Homepage',
      type: 'boolean',
      group: 'homepage',
      initialValue: true,
      description:
        'Shows the upcoming dates section on the homepage when there are future shows.',
    }),

    defineField({
      name: 'showLivePage',
      title: 'Show Live Page',
      type: 'boolean',
      group: 'live',
      initialValue: true,
      description:
        'Shows the Live nav link and /live page. When off, /live redirects to the homepage.',
    }),
    localizedString('liveIntro', 'Live Page Intro', 3, 'live'),

    defineField({
      name: 'showAnnouncementBanner',
      title: 'Show Announcement Banner',
      type: 'boolean',
      group: 'announcement',
      initialValue: false,
      description:
        'Shows a promo bar below the header on all pages. Turn off when the announcement is over.',
    }),
    localizedString('announcementMessage', 'Announcement Message', undefined, 'announcement'),
    defineField({
      name: 'announcementLink',
      title: 'Announcement Link',
      type: 'url',
      group: 'announcement',
      description: 'Optional link — e.g. ticket URL or a page on this site.',
    }),
    localizedString('announcementLinkLabel', 'Announcement Link Label', undefined, 'announcement'),

    localizedString('videosIntro', 'Videos Page Intro', 3, 'pages'),
    localizedString('fotosIntro', 'Fotos Page Intro', 3, 'pages'),

    defineField({
      name: 'bookingContactName',
      title: 'Booking Contact Name',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      group: 'contact',
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

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
  ],
});
