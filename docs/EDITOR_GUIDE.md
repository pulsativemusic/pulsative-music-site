# Band Site — Editor Guide

Quick reference for band members updating the website content.

## Accessing the CMS

1. Go to **your-site.com/admin** (or `localhost:4321/admin` during development)
2. Sign in with your Sanity account
3. Use the sidebar to find what you need

## Site Settings (homepage & global)

Open **Site Settings** (single document at the top of the sidebar). Fields are grouped into tabs: **General**, **Homepage**, **Live**, **Announcement**, **Page intros**, **Contact & social**, and **SEO**.

| Field | What it does |
|-------|----------------|
| **Band Name**, **Tagline**, **Short Description** | Homepage text |
| **Hero Image** | Homepage background (used when no hero video is set) |
| **Hero Video** | Optional MP4 background — overrides hero image when set |
| **Showreel Video** | Optional MP4 below the hero on the homepage |
| **Showreel Title / Description / Poster** | Optional metadata for the showreel (poster is a loading fallback) |
| **Live / Videos / Fotos Page Intro** | Intro text on those pages (DE + EN) |
| **Show Upcoming Dates on Homepage** | When on, future shows appear in the homepage section (only if dates exist) |
| **Show Live Page** | When on, shows the Live nav link and `/live` page. When off, `/live` redirects to the homepage |
| **Show Announcement Banner** | When on, shows a promo bar below the header on all pages (only if a message is filled in) |
| **Announcement Message** | Banner text (DE + EN) — e.g. upcoming show, new release, festival appearance |
| **Announcement Link / Link Label** | Optional CTA — ticket URL or internal page; label defaults to “Mehr erfahren” / “Learn more” if empty |
| **Booking Email**, **Phone**, **Social Links** | Contact page and header/footer |

**Showreel:** Upload an MP4 (or other video) under **Showreel Video**. If empty, no showreel block appears on the homepage — no empty box.

**Videos page:** Only the numeric **Vimeo video ID** is needed (e.g. from `vimeo.com/1203716758` → `1203716758`). Entries without a Vimeo ID are not shown.

Click **Publish** when done.

## Adding a Show

1. Click **Live Dates** in the sidebar
2. Click **Create** (+ button)
3. Fill in:
   - **Date** — when the show happens
   - **Time** — start time in 24-hour format (e.g. `20:00`). Optional. Shown as am/pm on the English site, 24-hour on German
   - **Venue** — club or festival name
   - **City** and **Country**
   - **Ticket URL** — link to buy tickets (optional)
   - **Sold Out** — check this when tickets are gone
   - **Poster** — upload a flyer image (optional)
4. Click **Publish**

The show appears on the Live page within a few minutes after publishing. Future dates show under **Upcoming**; past dates move to **Past Shows** automatically.

## Adding a Video

1. Click **Videos** in the sidebar
2. Click **Create** (+ button)
3. Fill in:
   - **Title** (DE + EN)
   - **Vimeo Video ID** — required; copy the number from the Vimeo URL
   - **Aspect Ratio** — Portrait (9:16) or Landscape (16:9); landscape tiles are wider on desktop
   - **Sort Order** — lower numbers appear first
   - **Custom Thumbnail** — optional
4. Click **Publish**

Videos appear on `/videos` (and `/en/videos`) within a few minutes.

- Entries **without** a Vimeo ID are not shown on the site.
- If no valid videos exist, the grid section is hidden (page title and intro can still show).

Edit the page intro under **Site Settings** → **Videos Page Intro**.

## Adding a Photo

1. Click **Photos** in the sidebar
2. Click **Create** (+ button)
3. Fill in:
   - **Title** (DE + EN)
   - **Image** — upload a portrait photo (9:16 works best)
   - **Credit** — photographer credit (optional)
   - **Aspect Ratio** — Portrait (9:16) or Landscape (16:9)
   - **Sort Order** — lower numbers appear first
4. Click **Publish**

Photos appear on `/fotos` (and `/en/fotos`) within a few minutes.

Edit the page intro under **Site Settings** → **Fotos Page Intro**.

## Adding a Release

1. Click **Releases** (listed as **Music (hidden)** in the sidebar)
2. Add title, release date, cover art
3. Paste Spotify, Apple Music, or YouTube links
4. Publish

## Tips

- Always click **Publish** — drafts don't appear on the live site
- Use landscape images for hero and gallery covers
- Portrait 9:16 works well for live photos and performance clips
- Keep show dates in the future for the homepage **Upcoming** section (when **Show Upcoming Dates on Homepage** is on)
- Turn off **Show Live Page** to hide tour dates from navigation while keeping show data in the CMS
- Turn off **Show Announcement Banner** when the promo is over — you can leave the message in place for next time
- Clear **Showreel Video** or delete a video document to remove it from the site — nothing empty is left behind

## Need Help?

Contact your web developer if something doesn't look right after publishing.
