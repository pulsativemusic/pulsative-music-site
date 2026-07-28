import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import './PhotoLightbox.css';

interface PhotoLightboxProps {
  downloadLabel?: string;
}

function filenameFromUrl(url: string): string {
  try {
    const name = new URL(url).pathname.split('/').pop();
    return name && name.length > 0 ? name : 'photo.jpg';
  } catch {
    return 'photo.jpg';
  }
}

function currentDownload(pswp: {
  currSlide?: { data: { src?: string; element?: HTMLElement } } | null;
}): { url: string; filename: string } | null {
  const trigger = pswp.currSlide?.data.element;
  const url = trigger?.dataset.downloadSrc || pswp.currSlide?.data.src;
  if (!url) return null;
  return {
    url,
    filename: trigger?.dataset.downloadFilename || filenameFromUrl(url),
  };
}

/** Same-origin proxy sets Content-Disposition: attachment (Sanity CDN blocks CORS fetch). */
function triggerSaveToDevice(src: string, filename: string): void {
  const params = new URLSearchParams({ src, filename });
  const anchor = document.createElement('a');
  anchor.href = `/api/download?${params.toString()}`;
  anchor.rel = 'noopener';
  // Same-origin + Content-Disposition from the proxy → Save dialog
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function PhotoLightbox({ downloadLabel = 'Download' }: PhotoLightboxProps) {
  useEffect(() => {
    const gallery = document.querySelector('#pswp-gallery');
    if (!gallery || !gallery.querySelector('a.photo-lightbox-link')) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#pswp-gallery',
      children: 'a.photo-lightbox-link',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.on('uiRegister', () => {
      const ui = lightbox.pswp?.ui;
      if (!ui) return;

      ui.registerElement({
        name: 'download-button',
        order: 8,
        isButton: true,
        tagName: 'button',
        title: downloadLabel,
        ariaLabel: downloadLabel,
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: 'pswp__icn-download',
        },
        onClick: (event, _el, pswp) => {
          event.preventDefault();
          event.stopPropagation();

          const target = currentDownload(pswp);
          if (!target) return;
          triggerSaveToDevice(target.url, target.filename);
        },
      });

      ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: 'div',
        onInit: (el, pswp) => {
          pswp.on('change', () => {
            const caption = pswp.currSlide?.data.element?.dataset.pswpCaption ?? '';
            el.textContent = caption;
            el.style.display = caption ? 'block' : 'none';
          });
        },
      });
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [downloadLabel]);

  return null;
}
