import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'pulsative',
  title: 'PULSATIVE',
  projectId: '9yuo6i9f',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            S.documentTypeListItem('show').title('Live Dates'),
            S.documentTypeListItem('video').title('Videos'),
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('pressAsset').title('Press Kit'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
            S.divider(),
            S.documentTypeListItem('release').title('Music (hidden)'),
            S.documentTypeListItem('photoPrint').title('Merch (hidden)'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
