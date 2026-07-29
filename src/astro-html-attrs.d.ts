import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    /** Astro HTML uses `class`; editor may typecheck .astro as React JSX. */
    class?: string | null | undefined;
    'class:list'?: unknown;
    'set:html'?: string | null | undefined;
    /** Astro/HTML boolean attrs (React types use camelCase). */
    autoplay?: boolean | null | undefined;
    playsinline?: boolean | null | undefined;
  }

  interface SVGAttributes<T> {
    class?: string | null | undefined;
    'stroke-width'?: string | number | null | undefined;
    'stroke-linecap'?: string | null | undefined;
    'stroke-linejoin'?: string | null | undefined;
  }
}
