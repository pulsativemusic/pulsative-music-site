export function formatShowDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
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
  shows: { date: string; venue: string; city: string; country: string; description?: string; ticketUrl?: string }[],
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

      return [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dateKey}T120000Z`,
        `DTSTART;VALUE=DATE:${dateKey}`,
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
