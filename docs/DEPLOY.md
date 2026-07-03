# Deployment Guide — PULSATIVE

Static Astro site on **Cloudflare Pages**, content in **Sanity CMS**. Publishing in Sanity can trigger a rebuild via webhook.

## Prerequisites

- Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
- Cloudflare account with Pages enabled
- GitHub repo connected to Cloudflare Pages
- Domain `pulsative.band` configured in Cloudflare DNS

## Environment Variables

Set in **Cloudflare Pages → Settings → Environment variables**:

| Variable | Description |
|----------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Usually `production` |
| `PUBLIC_SITE_URL` | `https://pulsative.band` |
| `PUBLIC_MATOMO_URL` | Matomo instance URL (optional) |
| `PUBLIC_MATOMO_SITE_ID` | Matomo site ID (optional) |
| `NODE_VERSION` | `22` |

`SANITY_API_TOKEN` is only needed locally for `pnpm run seed`, not at build time.

## Cloudflare Pages Setup

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the `pulsative-site` repository
3. Build settings:
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
4. Add environment variables for Production (and Preview if desired)
5. Deploy

`wrangler.toml` sets `pages_build_output_dir = "./dist"`.

### Custom domain

In Pages → **Custom domains**, add `pulsative.band` and optionally redirect `www` to apex. Set `PUBLIC_SITE_URL=https://pulsative.band`.

## Sanity Webhook → Cloudflare Pages

1. Cloudflare: **Pages → Settings → Builds → Deploy hooks** → copy hook URL
2. Sanity: **API → Webhooks → Create**
   - **URL:** deploy hook URL
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["show", "video", "siteSettings", "page", "pressAsset", "legalPage"]`

## Local Development

```bash
cp .env.example .env
# Add your Sanity project ID

pnpm install
pnpm dev
```

- Site: `http://localhost:4321`
- Embedded Studio (Astro): `http://localhost:4321/admin`
- Standalone Studio: `pnpm studio` → `http://localhost:3333`

Schemas live in `studio-pulsative-site/schemaTypes/` (shared by both studios).

Without Sanity credentials, the site uses built-in PULSATIVE mock data.

## Standalone Sanity Studio

```bash
pnpm studio          # dev at http://localhost:3333
pnpm studio:deploy   # deploy hosted studio to sanity.studio
pnpm sanity:schema   # deploy schema from repo root (or from studio-pulsative-site)
```

## Seeding Content

```bash
SANITY_API_TOKEN=your-token pnpm run seed
```

## Build Verification

```bash
pnpm build
pnpm preview
```

## Manual deploy (optional)

```bash
pnpm build
npx wrangler pages deploy dist --project-name=pulsative-site
```
