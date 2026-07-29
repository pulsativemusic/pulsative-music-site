import { CalendarIcon } from '@sanity/icons/Calendar';
import { CaseIcon } from '@sanity/icons/Case';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { ImagesIcon } from '@sanity/icons/Images';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('show').title('Live Dates').icon(CalendarIcon),
      S.listItem()
        .title('Media')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Media')
            .items([
              S.documentTypeListItem('video').title('Videos'),
              S.documentTypeListItem('photo').title('Photos'),
            ]),
        ),
      S.documentTypeListItem('legalPage').title('Legal Pages').icon(DocumentTextIcon),
      S.listItem()
        .title('Press')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Press')
            .items([S.documentTypeListItem('pressAsset').title('Press Kit')]),
        ),
    ]);
