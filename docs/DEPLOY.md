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

### 404 pages (important)

Cloudflare Pages treats the site as a **single-page app** when `index.html` exists but **`404.html` does not** — unknown URLs then serve the homepage (hero + showreel).

This project builds `404.html` from `src/pages/404.astro`. After deploy, bad URLs should return a proper 404 page, not the home page. If random paths still show the homepage, confirm the latest build includes `dist/404.html`.

### Custom domain

In Pages → **Custom domains**, add `pulsative.band` and optionally redirect `www` to apex. Set `PUBLIC_SITE_URL=https://pulsative.band`.

## Sanity Webhook → Cloudflare Pages

1. Cloudflare: **Pages → Settings → Builds → Deploy hooks** → copy hook URL
2. Sanity: **API → Webhooks → Create**
   - **URL:** deploy hook URL
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["show", "video", "photo", "siteSettings", "page", "pressAsset", "legalPage", "release", "photoPrint"]`
   - **Projection:** leave empty (deploy hook only needs the POST)
3. In Studio, use **Publish** — draft saves do not update the live site.

After a CMS change, Cloudflare should start a new build within a minute. Check **Pages → Deployments** for the triggered build.

### Stale content troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Production unchanged after CMS edit | Static HTML from last build | Confirm webhook + deploy hook; wait for build to finish |
| Some content types never update | Webhook filter too narrow | Include all types in the filter (see above) |
| Local `pnpm preview` shows old data | Preview serves `dist/` from last build | Run `pnpm build` again, or use `pnpm dev` for live Sanity |
| Local `pnpm dev` shows old data | Browser cache | Hard refresh; Sanity fetches use `cache: 'no-store'` |

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

Schemas live in `sanity/schemaTypes/` (imported by the embedded Studio and `studio-pulsative-site/`).

Without Sanity credentials, the site uses built-in PULSATIVE mock data.

## Standalone Sanity Studio

```bash
pnpm studio          # dev at http://localhost:3333
pnpm studio:deploy   # deploy hosted studio to sanity.studio
pnpm sanity:schema   # deploy schema from repo root (or from studio-pulsative-site)
```

## Schema & seeding

Deploy schema changes before relying on new CMS fields:

```bash
pnpm sanity:schema
```

Seed demo content (mock-data mirror, including Vimeo IDs, photos, shows):

```bash
# Logged in via Sanity CLI (recommended)
pnpm run seed

# Or with an Editor token in .env
pnpm run seed:token
```

`SANITY_API_TOKEN` needs **Editor** role (create + upload). Placeholder tokens will fail with a permission error.

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
