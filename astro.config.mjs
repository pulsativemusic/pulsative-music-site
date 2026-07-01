// @ts-check
/// <reference types="node" />
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset = env.PUBLIC_SANITY_DATASET ?? 'production';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  output: 'static',
  site: env.PUBLIC_SITE_URL ?? 'https://example.com',
  integrations: [
    react(),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
      studioBasePath: '/admin',
    }),
  ],
  vite: {
    envPrefix: ['PUBLIC_', 'SANITY_STUDIO_'],
    define: {
      'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
    },
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
    ssr: {
      noExternal: ['photoswipe'],
    },
  },
});
