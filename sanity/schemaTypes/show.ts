import { CalendarIcon } from '@sanity/icons/Calendar';
import { defineField, defineType } from 'sanity';

export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'ticketUrl', title: 'Ticket URL', type: 'url' }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'poster',
      title: 'Poster / Flyer',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'venue',
      subtitle: 'city',
      date: 'date',
      media: 'poster',
    },
    prepare({ title, subtitle, date, media }) {
      return {
        title: `${date ?? 'TBD'} — ${title}`,
        subtitle,
        media,
      };
    },
  },
});
