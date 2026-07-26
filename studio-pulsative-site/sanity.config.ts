import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '../sanity/schemaTypes';
import { structure } from '../sanity/structure';

export default defineConfig({
  name: 'pulsative',
  title: 'PULSATIVE',
  projectId: '9yuo6i9f',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
