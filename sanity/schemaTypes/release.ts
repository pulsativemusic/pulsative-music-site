import { MicrophoneIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  icon: MicrophoneIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'date' }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'spotifyUrl', title: 'Spotify URL', type: 'url' }),
    defineField({ name: 'appleUrl', title: 'Apple Music URL', type: 'url' }),
    defineField({ name: 'youtubeId', title: 'YouTube Video ID', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'releaseDate', media: 'coverArt' },
  },
});
