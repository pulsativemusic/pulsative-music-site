export function formatShowDate(date: string, locale: 'de' | 'en' = 'de') {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'de-DE',
    { day: 'numeric', month: 'short', year: 'numeric' },
  );
  // de-DE yields "17. Okt. 2023"; strip the month abbreviation period → "17. Okt 2023"
  return locale === 'de' ? formatted.replace(/([A-Za-zäöüÄÖÜ]+)\./g, '$1') : formatted;
}

/** `time` is HH:mm (24h). EN → am/pm, DE → 24-hour. */
export function formatShowTime(time: string, locale: 'de' | 'en') {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!match) return time;
  const date = new Date(2000, 0, 1, Number(match[1]), Number(match[2]));
  return date.toLocaleTimeString(locale === 'en' ? 'en-US' : 'de-DE', {
    hour: locale === 'en' ? 'numeric' : '2-digit',
    minute: '2-digit',
    hour12: locale === 'en',
  });
}

export function formatShortDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatPrice(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount);
}

function escapeIcsText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function generateIcsFeed(
  shows: {
    date: string;
    time?: string;
    venue: string;
    city: string;
    country: string;
    description?: string;
    ticketUrl?: string;
  }[],
  bandName: string,
  siteUrl: string,
) {
  const events = shows
    .map((show) => {
      const dateKey = show.date.replace(/-/g, '');
      const uid = `${dateKey}-${show.venue.replace(/\s+/g, '-').toLowerCase()}@${siteUrl}`;
      const location = `${show.venue}, ${show.city}, ${show.country}`;
      const description = [show.description, show.ticketUrl ? `Tickets: ${show.ticketUrl}` : '']
        .filter(Boolean)
        .join('\\n');
      const timeMatch = show.time?.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
      const dtStart = timeMatch
        ? `DTSTART:${dateKey}T${timeMatch[1]}${timeMatch[2]}00`
        : `DTSTART;VALUE=DATE:${dateKey}`;

      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dateKey}T120000Z`,
        dtStart,
        `SUMMARY:${escapeIcsText(`${bandName} — ${show.venue}`)}`,
        `LOCATION:${escapeIcsText(location)}`,
        description ? `DESCRIPTION:${escapeIcsText(description)}` : '',
        'END:VEVENT',
      ]
        .filter(Boolean)
        .join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Band Site//Tour Dates//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    events,
    'END:VCALENDAR',
  ].join('\r\n');
}
