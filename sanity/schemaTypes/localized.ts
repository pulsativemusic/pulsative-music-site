import { defineField } from 'sanity';

export const localizedString = (name: string, title: string, rows?: number) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'de', title: 'German', type: rows ? 'text' : 'string', rows }),
      defineField({ name: 'en', title: 'English', type: rows ? 'text' : 'string', rows }),
    ],
  });
