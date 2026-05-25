import { useEffect, useState } from 'react';

/**
 * Tunes 3D, motion, and image weight for Lighthouse / mobile targets.
 */
export function usePerformanceProfile() {
  const [profile, setProfile] = useState({
    enable3d: true,
    isMobile: false,
    isReducedMotion: false,
    imageMaxWidth: 1600,
    particleScale: 1,
  });

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const isMobile = mqMobile.matches;
      const isReducedMotion = mqReduced.matches;
      setProfile({
        enable3d: !isReducedMotion && !isMobile,
        isMobile,
        isReducedMotion,
        imageMaxWidth: isMobile ? 800 : 1600,
        particleScale: isMobile ? 0.45 : 1,
      });
    };

    update();
    mqMobile.addEventListener('change', update);
    mqReduced.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqReduced.removeEventListener('change', update);
    };
  }, []);

  return profile;
}
