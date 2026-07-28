import { defineArrayMember, defineField, defineType } from 'sanity';

const richText = defineArrayMember({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
});

const memberGrid = defineArrayMember({
  name: 'memberGrid',
  title: 'Band Members',
  type: 'object',
  fields: [
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        defineField({
          name: 'member',
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'bio', type: 'text', rows: 2 }),
            defineField({ name: 'photo', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
});

const pressQuotes = defineArrayMember({
  name: 'pressQuotes',
  title: 'Press Quotes',
  type: 'object',
  fields: [
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        defineField({
          name: 'quoteItem',
          type: 'object',
          fields: [
            defineField({ name: 'quote', type: 'text', rows: 2 }),
            defineField({ name: 'source', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
});

const imageGrid = defineArrayMember({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
});

const embed = defineArrayMember({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'embedUrl', title: 'Embed URL', type: 'url' }),
  ],
});

const cta = defineArrayMember({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'Button URL', type: 'url' }),
  ],
});

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [richText, memberGrid, pressQuotes, imageGrid, embed, cta],
    }),
  ],
});
