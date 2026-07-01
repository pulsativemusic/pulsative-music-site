# Deployment Guide

This site is a static Astro build with Sanity CMS. Content updates trigger a rebuild via webhook.

## Prerequisites

- Sanity project created at [sanity.io/manage](https://www.sanity.io/manage)
- Hosting on Vercel or Cloudflare Pages
- Environment variables configured

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Usually `production` |
| `PUBLIC_SITE_URL` | Full site URL (e.g. `https://yourband.com`) |
| `SANITY_API_TOKEN` | For seed script only (not needed at build) |

## Vercel Deployment

1. Push the repo to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Set environment variables in Project Settings
4. Build command: `npm run build`
5. Output directory: `dist`

### Sanity Webhook → Vercel

1. In Sanity: **API → Webhooks → Create**
2. URL: `https://api.vercel.com/v1/integrations/deploy/YOUR_DEPLOY_HOOK`
3. Trigger on: Create, Update, Delete
4. Filter: `_type in ["show", "gallery", "release", "siteSettings", "page", "pressAsset"]`

Create a Deploy Hook in Vercel: Project Settings → Git → Deploy Hooks.

## Cloudflare Pages Deployment

1. Connect GitHub repo in Cloudflare Pages
2. Build command: `npm run build`
3. Build output: `dist`
4. Add environment variables

### Sanity Webhook → Cloudflare

Use Cloudflare Pages deploy hook URL in Sanity webhook settings, same as Vercel.

## Local Development

```bash
cp .env.example .env
# Add your Sanity project ID

npm install
npm run dev
```

- Site: `http://localhost:4321`
- Sanity Studio: `http://localhost:4321/admin`

Without Sanity credentials, the site uses built-in mock data.

## Seeding Content

```bash
SANITY_API_TOKEN=your-token npm run seed
```

## Build Verification

```bash
npm run build
npm run preview
```

## Custom Domain

Configure in your hosting provider. Update `PUBLIC_SITE_URL` to match.
