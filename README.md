# PULSATIVE — Official Website

Astro 7 static site with Sanity CMS for [pulsative.band](https://pulsative.band).

## Stack

- **Astro 7** — static site, bilingual DE/EN
- **Sanity** — content management (`/admin`)
- **Cloudflare Pages** — hosting
- **Matomo** — analytics (consent-gated)

## Pages

| Route | Content |
|-------|---------|
| `/` | Homepage — hero, optional Vimeo showreel, upcoming dates |
| `/live` | Tour dates |
| `/videos` | Vimeo embeds (portrait/landscape grid) |
| `/fotos` | Live photos (masonry grid) |
| `/about` | Bio and lineup |
| `/contact` | Booking, phone, socials |
| `/promo-kit` | Press downloads |
| `/en/*` | English versions |
| `404` | Custom not-found page (`src/pages/404.astro` → `dist/404.html`) |

Missing Vimeo IDs or showreel settings produce **no empty placeholder** — those blocks are omitted entirely.

## Content (Sanity)

- Studio: `/admin` (embedded) or `pnpm studio` (standalone)
- Schemas: `sanity/schemaTypes/`
- Editor guide: [docs/EDITOR_GUIDE.md](docs/EDITOR_GUIDE.md)

```bash
pnpm sanity:schema   # deploy schema
pnpm run seed        # seed via CLI login
pnpm run seed:token  # seed via SANITY_API_TOKEN in .env
```

## Development

```bash
pnpm install
pnpm dev
```

Without Sanity credentials, mock PULSATIVE content is used automatically.

See [docs/DEPLOY.md](docs/DEPLOY.md) for production deployment.
