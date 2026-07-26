import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import './PhotoLightbox.css';

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

    return () => {
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
    </div>
  );
}
