export type MediaOrientation = 'portrait' | 'landscape';

export function resolveOrientation(orientation?: MediaOrientation): MediaOrientation {
  return orientation === 'landscape' ? 'landscape' : 'portrait';
}

export function orientationClass(orientation?: MediaOrientation): string {
  return resolveOrientation(orientation);
}
