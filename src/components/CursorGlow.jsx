import { useEffect, useRef } from 'react';

/**
 * CursorGlow — renders a subtle ring cursor that follows the mouse.
 * Placed once at app root level.
 */
export function CursorGlow() {
  const ringRef = useRef(null);
  const pos = useRef({ x: -999, y: -999 });
  const curr = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      curr.current.x = lerp(curr.current.x, pos.current.x, 0.18);
      curr.current.y = lerp(curr.current.y, pos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${curr.current.x - 12}px, ${curr.current.y - 12}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.4)',
        pointerEvents: 'none',
        zIndex: 1000,
        willChange: 'transform',
        transition: 'none',
        mixBlendMode: 'difference',
      }}
    />
  );
}
