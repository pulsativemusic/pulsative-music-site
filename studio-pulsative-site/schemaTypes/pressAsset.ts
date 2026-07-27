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
          { title: 'Electronic Press Kit (EPK)', value: 'pressKit' },
          { title: 'Technical Rider', value: 'technicalRider' },
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
