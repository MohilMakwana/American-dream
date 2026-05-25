import { useState } from 'react';

/**
 * Lazy-loaded image with optional fallback gradient.
 */
export function MediaImage({
  src,
  alt = '',
  className = 'full-img',
  style,
  loading = 'lazy',
  fallback = 'linear-gradient(135deg, #0c0c10 0%, #1a1a22 100%)',
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={className}
        style={{ ...style, background: fallback, position: 'absolute', inset: 0 }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: loaded ? (style?.opacity ?? 1) : 0,
        transition: 'opacity 0.5s ease',
      }}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}

export default MediaImage;
