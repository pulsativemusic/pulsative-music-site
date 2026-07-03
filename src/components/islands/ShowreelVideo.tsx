import { useEffect, useRef } from 'react';

interface ShowreelVideoProps {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  title: string;
}

export default function ShowreelVideo({
  src,
  fallbackSrc,
  poster,
  title,
}: ShowreelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tryPlay = async () => {
      video.muted = true;
      video.controls = false;
      try {
        await video.play();
      } catch {
        // ponytail: autoplay blocked — poster stays, no controls
      }
    };

    const onError = () => {
      if (fallbackSrc && video.src !== fallbackSrc) {
        video.src = fallbackSrc;
        void tryPlay();
      }
    };

    video.addEventListener('canplay', tryPlay);
    video.addEventListener('error', onError);
    void tryPlay();

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('error', onError);
    };
  }, [src, fallbackSrc]);

  return (
    <video
      ref={videoRef}
      className="showreel-media"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      aria-label={title}
    />
  );
}
