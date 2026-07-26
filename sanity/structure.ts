import { CalendarIcon } from '@sanity/icons/Calendar';
import { CaseIcon } from '@sanity/icons/Case';
import { CogIcon } from '@sanity/icons/Cog';
import { DesktopIcon } from '@sanity/icons/Desktop';
import { EyeClosedIcon } from '@sanity/icons/EyeClosed';
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
      S.listItem()
        .title('Live')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Live')
            .items([S.documentTypeListItem('show').title('Live Dates')]),
        ),
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
      S.listItem()
        .title('Website')
        .icon(DesktopIcon)
        .child(
          S.list()
            .title('Website')
            .items([
              S.documentTypeListItem('page').title('Pages'),
              S.documentTypeListItem('legalPage').title('Legal Pages'),
            ]),
        ),
      S.listItem()
        .title('Press')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Press')
            .items([S.documentTypeListItem('pressAsset').title('Press Kit')]),
        ),
      S.divider(),
      S.listItem()
        .title('Hidden')
        .icon(EyeClosedIcon)
        .child(
          S.list()
            .title('Hidden')
            .items([
              S.documentTypeListItem('release').title('Music'),
              S.documentTypeListItem('photoPrint').title('Merch'),
            ]),
        ),
    ]);
