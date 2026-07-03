import { defineField, defineType } from 'sanity';

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      options: {
        list: [
          { title: 'Impressum / Legal Notice', value: 'impressum' },
          { title: 'Datenschutz / Privacy', value: 'privacy' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'German', value: 'de' },
          { title: 'English', value: 'en' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug', locale: 'locale' },
    prepare({ title, slug, locale }) {
      return {
        title: `${title} (${locale?.toUpperCase()})`,
        subtitle: slug,
      };
    },
  },
});
