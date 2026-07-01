import { defineField, defineType } from 'sanity';

export const photoPrint = defineType({
  name: 'photoPrint',
  title: 'Photo Print',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'City', value: 'city' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Live', value: 'live' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'EUR',
      options: {
        list: [
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'USD ($)', value: 'USD' },
          { title: 'GBP (£)', value: 'GBP' },
        ],
      },
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. A4, A3, A2',
    }),
    defineField({
      name: 'purchaseUrl',
      title: 'Purchase URL',
      type: 'url',
      description: 'Stripe Payment Link, Gumroad, or other checkout URL',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});
