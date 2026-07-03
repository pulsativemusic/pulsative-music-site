import { defineField, defineType } from 'sanity';
import { localizedString } from './localized';

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    localizedString('title', 'Title'),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      titleDe: 'title.de',
      titleEn: 'title.en',
      youtubeId: 'youtubeId',
      media: 'thumbnail',
    },
    prepare({ titleDe, titleEn, youtubeId, media }) {
      return {
        title: titleDe ?? titleEn ?? youtubeId,
        subtitle: youtubeId,
        media,
      };
    },
  },
});
