# Deployment Guide

This site is a static Astro build hosted on **Cloudflare Pages**, with content managed in Sanity CMS. Publishing in Sanity triggers a rebuild via webhook.

## Prerequisites

- Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
- Cloudflare account with Pages enabled
- GitHub repo connected to Cloudflare Pages

## Environment Variables

Set these in **Cloudflare Pages → Settings → Environment variables**:

| Variable | Description |
|----------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Usually `production` |
| `PUBLIC_SITE_URL` | Production URL (e.g. `https://marcobonadies.com`) |
| `NODE_VERSION` | `22` (matches `package.json` engines) |

`SANITY_API_TOKEN` is only needed locally for `npm run seed`, not at build time.

## Cloudflare Pages Setup

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select `Zarzarius/marco-bonadies-site`
3. Build settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
4. Add the environment variables above for **Production** (and Preview if you want Sanity in preview deploys)
5. Deploy

The repo includes `wrangler.toml` with `pages_build_output_dir` for Cloudflare tooling.

### Custom domain

In Pages → **Custom domains**, add your domain (e.g. `marcobonadies.com`). Update `PUBLIC_SITE_URL` to match and redeploy.

## Sanity Webhook → Cloudflare Pages

When content changes in Sanity, trigger a new Pages build:

1. In Cloudflare: **Pages → your project → Settings → Builds → Deploy hooks** → **Add deploy hook**
2. Copy the hook URL
3. In Sanity: **API → Webhooks → Create**
   - **URL:** your Cloudflare deploy hook URL
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["show", "gallery", "photoPrint", "release", "siteSettings", "page", "pressAsset"]`

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

## Optional: Wrangler CLI

```bash
npx wrangler pages deploy dist --project-name=marco-bonadies-site
```

Useful for manual deploys without pushing to Git.
