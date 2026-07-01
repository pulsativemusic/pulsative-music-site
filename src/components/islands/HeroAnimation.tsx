import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroAnimationProps {
  bandName: string;
  tagline: string;
}

export default function HeroAnimation({ bandName, tagline }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.hero-title .char', {
        opacity: 0,
        y: 60,
        rotateX: -40,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-tagline', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bandName, tagline]);

  const chars = bandName.split('');

  return (
    <div ref={containerRef} className="hero-text">
      <p className="hero-kicker">New music out now</p>
      <h1 className="hero-title" aria-label={bandName}>
        {chars.map((char, index) => (
          <span key={`${char}-${index}`} className="char" aria-hidden="true">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <p className="hero-tagline">{tagline}</p>

      <style>{`
        .hero-text {
          max-width: 52rem;
        }

        .hero-kicker {
          font-size: 0.75rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 1rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 14vw, 8rem);
          line-height: 0.9;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 1.5rem;
          perspective: 600px;
        }

        .hero-title .char {
          display: inline-block;
          transform-origin: bottom center;
        }

        .hero-tagline {
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          color: var(--color-text-muted);
          max-width: 32rem;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
