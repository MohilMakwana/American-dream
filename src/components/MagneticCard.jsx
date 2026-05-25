import { useRef, useCallback } from 'react';

/**
 * MagneticCard — wraps any content and applies a live 3D perspective tilt
 * based on mouse position within the card. On mouse leave it springs back.
 *
 * Props:
 *  className  — extra classes forwarded to the outer div
 *  intensity  — tilt strength (default 12 degrees max)
 *  glare      — show a specular glare layer (default true)
 *  scale      — scale factor on hover (default 1.03)
 *  children
 */
export function MagneticCard({
  children,
  className = '',
  intensity = 12,
  glare = false,
  scale = 1.03,
  style = {},
}) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Normalised -1 → +1
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (e.clientY - cy) / (rect.height / 2);

        const rotY = nx * intensity;
        const rotX = -ny * intensity;

        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        el.style.transition = 'transform 0.08s linear';

        if (glare && glareRef.current) {
          // Glare angle: 0° = top-left, 90° = top-right, 180° = bottom-right…
          const angle = Math.atan2(ny, nx) * (180 / Math.PI) + 90;
          const dist = Math.hypot(nx, ny); // 0..√2
          glareRef.current.style.opacity = Math.min(dist * 0.35, 0.28);
          glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.55) 0%, transparent 65%)`;
        }
      });
    },
    [intensity, scale, glare]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.55s cubic-bezier(0.15,1,0.3,1)';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = 0;
    }
  }, [glare]);

  return (
    <div
      ref={ref}
      className={`magnetic-card-root ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.15s ease',
            zIndex: 20,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}

/**
 * SplitText — wraps each word/char in a span for per-char hover animations.
 * Applies the .split-text-word class to each word.
 *
 * Props:
 *  text      — the string to split
 *  className — classes on the outer span
 *  as        — element tag (default 'span')
 */
export function SplitText({ text, className = '', as: Tag = 'span' }) {
  const words = text.split(' ');
  return (
    <Tag className={`split-text ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="split-text__word" style={{ display: 'inline-block' }}>
          {word.split('').map((ch, ci) => (
            <span
              key={ci}
              className="split-text__char"
              style={{ display: 'inline-block', animationDelay: `${(wi * 3 + ci) * 18}ms` }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && '\u00a0'}
        </span>
      ))}
    </Tag>
  );
}
