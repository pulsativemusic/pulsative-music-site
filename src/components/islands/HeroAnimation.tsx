import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroAnimation.css';

interface HeroAnimationProps {
  bandName: string;
  tagline: string;
}

export default function HeroAnimation({ bandName, tagline }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      root.classList.add('hero-text--ready');
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-pulse-line', {
        scaleX: 0,
        opacity: 0,
        duration: 0.55,
        transformOrigin: 'left center',
      })
        .from(
          '.hero-title .char',
          {
            opacity: 0,
            y: 28,
            filter: 'blur(10px)',
            duration: 0.45,
            stagger: 0.035,
          },
          '-=0.2',
        )
        .from(
          '.hero-tagline',
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
          },
          '-=0.15',
        )
        .add(() => {
          root.classList.add('hero-text--ready');
        });
    }, root);

    return () => ctx.revert();
  }, [bandName, tagline]);

  const chars = bandName.split('');

  return (
    <div ref={containerRef} className="hero-text">
      <div className="hero-pulse-line" aria-hidden="true" />
      <h1 className="hero-title" aria-label={bandName}>
        {chars.map((char, index) => (
          <span key={`${char}-${index}`} className="char" aria-hidden="true">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <p className="hero-tagline">{tagline}</p>
    </div>
  );
}
