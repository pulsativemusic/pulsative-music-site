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
| `/` | Homepage — hero, showreel, upcoming dates |
| `/live` | Tour dates |
| `/videos` | YouTube embeds |
| `/about` | Bio and lineup |
| `/contact` | Booking, phone, socials |
| `/promo-kit` | Press downloads |
| `/en/*` | English versions |

## Development

```bash
pnpm install
pnpm dev
```

Without Sanity credentials, mock PULSATIVE content is used automatically.

See [docs/DEPLOY.md](docs/DEPLOY.md) for production deployment.
