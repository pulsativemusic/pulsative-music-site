import { ImageIcon } from '@sanity/icons/Image';
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

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: ImageIcon,
  liveEdit: true,
  fields: [
    localizedString('title', 'Title'),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    orientationField,
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
      credit: 'credit',
      media: 'image',
    },
    prepare({ titleDe, titleEn, credit, media }) {
      return {
        title: titleDe ?? titleEn ?? 'Photo',
        subtitle: credit,
        media,
      };
    },
  },
});
