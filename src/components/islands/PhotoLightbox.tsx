import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import './PhotoLightbox.css';

interface PhotoLightboxProps {
  downloadLabel?: string;
}

function syncDownloadLink(link: HTMLAnchorElement, pswp: {
  currSlide?: { data: { src?: string; element?: HTMLElement } } | null;
}) {
  const trigger = pswp.currSlide?.data.element;
  const originalUrl = trigger?.dataset.downloadSrc || pswp.currSlide?.data.src;
  const filename = trigger?.dataset.downloadFilename;

  if (!originalUrl) return;

  link.href = originalUrl;
  if (filename) {
    link.setAttribute('download', filename);
  } else {
    link.setAttribute('download', '');
  }
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
        tagName: 'a',
        title: downloadLabel,
        ariaLabel: downloadLabel,
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: 'pswp__icn-download',
        },
        onInit: (el, pswp) => {
          const link = el as HTMLAnchorElement;
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener');
          syncDownloadLink(link, pswp);
          pswp.on('change', () => {
            syncDownloadLink(link, pswp);
          });
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
