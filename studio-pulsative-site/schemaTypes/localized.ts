import { defineField } from 'sanity';

export const localizedString = (
  name: string,
  title: string,
  rows?: number,
  group?: string,
) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    fields: [
      defineField({ name: 'de', title: 'German', type: rows ? 'text' : 'string', rows }),
      defineField({ name: 'en', title: 'English', type: rows ? 'text' : 'string', rows }),
    ],
  });

export const localizedBlockContent = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    fields: [
      defineField({
        name: 'de',
        title: 'German',
        type: 'array',
        of: [{ type: 'block' }],
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'array',
        of: [{ type: 'block' }],
      }),
    ],
  });
