import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '492ijj89';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'marco-bonadies',
  title: 'Marco Bonadies',
  projectId,
  dataset,
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
            S.documentTypeListItem('show').title('Shows'),
            S.documentTypeListItem('gallery').title('Photo Galleries'),
            S.documentTypeListItem('photoPrint').title('Photo Prints'),
            S.documentTypeListItem('release').title('Releases'),
            S.documentTypeListItem('pressAsset').title('Press Assets'),
            S.documentTypeListItem('page').title('Pages'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
