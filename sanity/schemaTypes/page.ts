import { BlockElementIcon } from '@sanity/icons/BlockElement';
import { BlockquoteIcon } from '@sanity/icons/Blockquote';
import { CodeBlockIcon } from '@sanity/icons/CodeBlock';
import { DocumentIcon } from '@sanity/icons/Document';
import { ImagesIcon } from '@sanity/icons/Images';
import { LaunchIcon } from '@sanity/icons/Launch';
import { UsersIcon } from '@sanity/icons/Users';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { localizedString } from './localized';

const richText = defineArrayMember({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
});

const memberGrid = defineArrayMember({
  name: 'memberGrid',
  title: 'Band Members',
  type: 'object',
  icon: UsersIcon,
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
  icon: BlockquoteIcon,
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
  icon: ImagesIcon,
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
  icon: CodeBlockIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'embedUrl', title: 'Embed URL', type: 'url' }),
  ],
});

const cta = defineArrayMember({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
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
  icon: DocumentIcon,
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
    defineField({
      name: 'lineup',
      title: 'Lineup (Instruments)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'repertoire',
      title: 'Repertoire',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    localizedString('setLength', 'Set Length', 2),
  ],
});
