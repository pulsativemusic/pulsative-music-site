import { defineField, defineType } from 'sanity';
import { localizedString } from './localized';

const orientationField = defineField({
  name: 'orientation',
  title: 'Aspect Ratio',
  type: 'string',
  options: {
    list: [
      { title: 'Portrait (9:16)', value: 'portrait' },
      { title: 'Landscape (16:9)', value: 'landscape' },
    ],
    layout: 'radio',
  },
  initialValue: 'portrait',
});

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  liveEdit: true,
  fields: [
    localizedString('title', 'Title'),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo Video ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    orientationField,
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
      vimeoId: 'vimeoId',
      media: 'thumbnail',
    },
    prepare({ titleDe, titleEn, vimeoId, media }) {
      return {
        title: titleDe ?? titleEn ?? vimeoId,
        subtitle: vimeoId,
        media,
      };
    },
  },
});
