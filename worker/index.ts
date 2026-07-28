import { proxySanityDownload } from './download-asset';

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/download') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method Not Allowed', { status: 405 });
      }

      const src = url.searchParams.get('src');
      const filename = url.searchParams.get('filename') || 'photo.jpg';
      if (!src) return new Response('Missing src', { status: 400 });

      return proxySanityDownload(src, filename);
    }

    return env.ASSETS.fetch(request);
  },
};
