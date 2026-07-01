# Band Site

High-performance promo website for a rock band, built with **Astro** and **Sanity CMS**.

## Features

- Static-first architecture for excellent performance
- Sanity CMS for editing shows, galleries, releases, and pages
- Embedded Sanity Studio at `/admin`
- View Transitions for smooth navigation
- GSAP hero animations and PhotoSwipe lightbox galleries
- Swappable CSS design tokens for future rebranding
- Mock data fallback for development without CMS credentials
- `.ics` calendar feed for tour dates

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Without Sanity credentials, the site runs on sample data.

## Sanity Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Add your project ID to `.env`:

```env
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=http://localhost:4321
```

3. Access the CMS at `/admin`
4. Seed sample content:

```bash
SANITY_API_TOKEN=your-editor-token npm run seed
```

See [docs/EDITOR_GUIDE.md](docs/EDITOR_GUIDE.md) for band member instructions.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, shows, music, photos |
| `/music` | Releases and video embeds |
| `/tour` | Upcoming and past shows |
| `/tour/calendar.ics` | Calendar download |
| `/photos` | Gallery index |
| `/photos/[slug]` | Individual gallery with lightbox |
| `/about` | Bio and band members |
| `/press` | Press kit downloads |
| `/contact` | Booking and contact form |
| `/admin` | Sanity Studio |

## Deployment

See [docs/DEPLOY.md](docs/DEPLOY.md) for Vercel/Cloudflare Pages setup and Sanity webhook configuration.

## Design Tokens

Edit `src/styles/tokens.css` to change colors, fonts, and spacing. Theme variant classes (`.theme-grunge`, `.theme-cinematic`, `.theme-retro`) are ready to uncomment when the visual identity is chosen.

## Tech Stack

- Astro 7 (static)
- React islands (GSAP, PhotoSwipe)
- Sanity CMS
- Plain CSS with custom properties
