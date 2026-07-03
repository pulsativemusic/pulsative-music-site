import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'showDate', title: 'Show Date', type: 'date' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineField({
          name: 'photo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'credit', title: 'Credit', type: 'string' }),
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'venue', media: 'coverImage' },
  },
});
