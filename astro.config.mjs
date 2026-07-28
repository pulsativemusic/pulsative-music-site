// @ts-check
/// <reference types="node" />
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const fileEnv = loadEnv(mode, process.cwd(), '');
const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  fileEnv.PUBLIC_SANITY_PROJECT_ID ??
  '9yuo6i9f';
const dataset =
  process.env.PUBLIC_SANITY_DATASET ?? fileEnv.PUBLIC_SANITY_DATASET ?? 'production';
const siteUrl =
  process.env.PUBLIC_SITE_URL ?? fileEnv.PUBLIC_SITE_URL ?? 'https://pulsative-site.pages.dev';

console.log(`[build] Sanity project: ${projectId}, dataset: ${dataset}`);

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  output: 'static',
  site: siteUrl,
  compressHTML: true,
  // Hash-based CSP (no unsafe-inline scripts). Incompatible with <ClientRouter />.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://pbs.twimg.com",
        "font-src 'self'",
        "media-src 'self' blob: https://cdn.sanity.io",
        "frame-src https://player.vimeo.com https://www.youtube.com https://www.youtube-nocookie.com",
        "connect-src 'self' https://cdn.sanity.io https://static.cloudflareinsights.com",
        "worker-src 'self' blob:",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
          en: 'en-US',
        },
      },
      filter: (page) => !page.includes('/admin'),
    }),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      perspective: 'published',
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
    ssr: {
      noExternal: ['photoswipe'],
    },
    plugins: [
      {
        name: 'sanity-download-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.startsWith('/api/download')) {
              next();
              return;
            }

            try {
              const { proxySanityDownload } = await import('./worker/download-asset.ts');
              const url = new URL(req.url, 'http://localhost');
              const src = url.searchParams.get('src');
              const filename = url.searchParams.get('filename') || 'photo.jpg';
              if (!src) {
                res.statusCode = 400;
                res.end('Missing src');
                return;
              }

              const response = await proxySanityDownload(src, filename);
              res.statusCode = response.status;
              response.headers.forEach((value, key) => {
                res.setHeader(key, value);
              });
              const body = Buffer.from(await response.arrayBuffer());
              res.end(body);
            } catch (error) {
              console.error('[download-proxy]', error);
              res.statusCode = 500;
              res.end('Download proxy failed');
            }
          });
        },
      },
    ],
  },
});
