import { defineField, defineType } from 'sanity';
import { localizedString } from './localized';

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
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
