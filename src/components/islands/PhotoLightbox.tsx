import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export interface LightboxImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
}

interface PhotoLightboxProps {
  images: LightboxImage[];
}

export default function PhotoLightbox({ images }: PhotoLightboxProps) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#pswp-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();

    const handlePageLoad = () => {
      lightbox.destroy();
      lightbox.init();
    };

    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      lightbox.destroy();
    };
  }, [images]);

  return (
    <div id="pswp-gallery" className="photo-grid">
      {images.map((image) => (
        <a
          key={image.id}
          href={image.src}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          target="_blank"
          rel="noreferrer"
          className="photo-item"
        >
          <img src={image.src} alt={image.alt ?? ''} loading="lazy" />
          {image.caption && <span className="photo-caption">{image.caption}</span>}
        </a>
      ))}

      <style>{`
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 0.75rem;
        }

        .photo-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          aspect-ratio: 3 / 2;
          background: var(--color-surface);
        }

        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .photo-item:hover img {
          transform: scale(1.06);
        }

        .photo-caption {
          position: absolute;
          inset: auto 0 0 0;
          padding: 0.75rem;
          font-size: 0.75rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .photo-item:hover .photo-caption {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
