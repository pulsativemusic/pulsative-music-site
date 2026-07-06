import { legalPage } from './legalPage';
import { page } from './page';
import { photo } from './photo';
import { photoPrint } from './photoPrint';
import { pressAsset } from './pressAsset';
import { release } from './release';
import { show } from './show';
import { siteSettings } from './siteSettings';
import { video } from './video';

export const schemaTypes = [
  siteSettings,
  show,
  video,
  photo,
  page,
  pressAsset,
  legalPage,
  release,
  photoPrint,
];
