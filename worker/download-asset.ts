/** Proxy Sanity CDN assets with Content-Disposition: attachment (browser fetch is CORS-blocked). */

const DEFAULT_PROJECT_ID = '9yuo6i9f';

function projectId(): string {
  try {
    // Node (astro/vite) only — Workers have no process.env by default.
    const fromEnv =
      typeof process !== 'undefined' ? process.env.PUBLIC_SANITY_PROJECT_ID : undefined;
    return fromEnv || DEFAULT_PROJECT_ID;
  } catch {
    return DEFAULT_PROJECT_ID;
  }
}

export function isAllowedSanityAssetUrl(src: string, allowedProjectId = projectId()): boolean {
  try {
    const url = new URL(src);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'cdn.sanity.io' &&
      url.pathname.startsWith(`/images/${allowedProjectId}/`)
    );
  } catch {
    return false;
  }
}

function contentDisposition(filename: string): string {
  const trimmed = filename.trim() || 'photo.jpg';
  const ascii = trimmed.replace(/[^\w.\- ()[\]]+/g, '_').slice(0, 180) || 'photo.jpg';
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(trimmed)}`;
}

export async function proxySanityDownload(src: string, filename: string): Promise<Response> {
  if (!isAllowedSanityAssetUrl(src)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Server-side fetch has no browser Origin — Sanity CDN allows it.
  const upstream = await fetch(src);
  if (!upstream.ok) {
    return new Response('Upstream error', { status: upstream.status });
  }

  const headers = new Headers();
  headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/octet-stream');
  headers.set('Content-Disposition', contentDisposition(filename));
  headers.set('Cache-Control', 'private, max-age=3600');
  const length = upstream.headers.get('Content-Length');
  if (length) headers.set('Content-Length', length);

  return new Response(upstream.body, { status: 200, headers });
}
