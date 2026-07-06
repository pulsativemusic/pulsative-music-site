import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? '9yuo6i9f';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  project: {
    basePath: '/admin',
  },
});
