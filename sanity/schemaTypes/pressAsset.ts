import { defineField, defineType } from 'sanity';

export const pressAsset = defineType({
  name: 'pressAsset',
  title: 'Press Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'assetType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Logo', value: 'logo' },
          { title: 'Bio', value: 'bio' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({ name: 'file', title: 'File', type: 'file' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
});
