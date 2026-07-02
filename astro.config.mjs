// @ts-check
/// <reference types="node" />
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const fileEnv = loadEnv(mode, process.cwd(), '');
// Cloudflare Pages injects vars into process.env; loadEnv only reads .env files.
const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  fileEnv.PUBLIC_SANITY_PROJECT_ID ??
  '492ijj89';
const dataset =
  process.env.PUBLIC_SANITY_DATASET ?? fileEnv.PUBLIC_SANITY_DATASET ?? 'production';
const siteUrl =
  process.env.PUBLIC_SITE_URL ?? fileEnv.PUBLIC_SITE_URL ?? 'https://example.com';

console.log(`[build] Sanity project: ${projectId}, dataset: ${dataset}`);

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  output: 'static',
  site: siteUrl,
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
