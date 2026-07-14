import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

      <style>{`
        .hero-text {
          position: relative;
          max-width: 52rem;
        }

        .hero-pulse-line {
          width: min(12rem, 40vw);
          height: 3px;
          margin-bottom: 1.25rem;
          background: var(--color-accent);
          box-shadow:
            0 0 12px rgba(232, 255, 0, 0.7),
            0 0 32px rgba(232, 255, 0, 0.25);
          border-radius: 2px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw + 0.5rem, 5.25rem);
          line-height: 0.88;
          letter-spacing: clamp(0.06em, 0.08em, 0.14em);
          text-transform: uppercase;
          margin: 0 0 1.25rem;
          color: var(--color-text);
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        .hero-title .char {
          display: inline-block;
          will-change: transform, opacity, filter;
        }

        .hero-text--ready .hero-title {
          animation: hero-glow-pulse 3.2s ease-in-out infinite;
        }

        .hero-tagline {
          font-size: clamp(0.95rem, 2.2vw, 1.2rem);
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--color-text-muted);
          max-width: 28rem;
          margin: 0;
          line-height: 1.55;
          padding-left: 0.15rem;
          border-left: 2px solid rgba(232, 255, 0, 0.45);
          padding-inline-start: 0.85rem;
        }

        @keyframes hero-glow-pulse {
          0%,
          100% {
            text-shadow:
              0 0 0 transparent,
              0 0 0 transparent;
          }
          50% {
            text-shadow:
              0 0 18px rgba(232, 255, 0, 0.35),
              0 0 42px rgba(232, 255, 0, 0.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-text--ready .hero-title {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
