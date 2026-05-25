import { useEffect, useState, useRef } from 'react';

function buildEmbedUrl(source) {
  if (!source?.id) return null;
  if (source.type === 'vimeo') {
    return `https://player.vimeo.com/video/${source.id}?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&quality=auto`;
  }
  if (source.type === 'youtube') {
    const id = source.id;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1`;
  }
  return null;
}

/**
 * Full-bleed background video (Vimeo / YouTube). Poster shows instantly; iframe fades in when ready.
 */
export function VideoBackground({
  source,
  poster,
  isActive = true,
  prefetch = false,
  opacity = 0.55,
  overlay = true,
  className = '',
}) {
  const [ready, setReady] = useState(false);
  const isDirectVideo = source?.type === 'video' || source?.type === 'mp4' || (typeof source === 'string' && source.endsWith('.mp4'));
  const embedUrl = isDirectVideo ? null : buildEmbedUrl(source);
  const mountIframe = isActive || prefetch;

  const prevActiveRef = useRef(isActive);
  useEffect(() => {
    if (prevActiveRef.current && !isActive && !prefetch) {
      const t = setTimeout(() => setReady(false), 0);
      return () => clearTimeout(t);
    }
    prevActiveRef.current = isActive;
  }, [isActive, prefetch]);

  if (!isDirectVideo && !embedUrl) return null;

  return (
    <div className={`video-bg ${className}`} aria-hidden="true">
      {poster && (
        <img
          src={poster}
          alt=""
          className={`video-bg__poster full-img ${ready && isActive ? 'video-bg__poster--ready' : ''}`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      )}
      {!ready && isActive && <div className="video-bg__shimmer" aria-hidden="true" />}
      
      {isDirectVideo && mountIframe && (
        <video
          src={source.url || (typeof source === 'string' ? source : source.id)}
          autoPlay
          loop
          muted
          playsInline
          className={`video-bg__iframe ${ready && isActive ? 'video-bg__iframe--ready' : ''}`}
          style={{ opacity: ready && isActive ? opacity : 0, objectFit: 'cover' }}
          onCanPlayThrough={() => setReady(true)}
        />
      )}

      {!isDirectVideo && mountIframe && (
        <iframe
          src={embedUrl}
          title="Property video"
          className={`video-bg__iframe ${ready && isActive ? 'video-bg__iframe--ready' : ''}`}
          style={{ opacity: ready && isActive ? opacity : 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="eager"
          onLoad={() => setReady(true)}
        />
      )}
      {overlay && <div className="video-bg__overlay" />}
    </div>
  );
}

/**
 * Inline video panel with play control (Digideck-style media block).
 */
export function VideoPanel({ source, poster, title = 'Watch', className = '' }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = buildEmbedUrl(source);

  return (
    <div
      className={`video-panel ${className}`}
      onClick={() => embedUrl && setPlaying(true)}
      onKeyDown={(e) => e.key === 'Enter' && embedUrl && setPlaying(true)}
      role={embedUrl ? 'button' : undefined}
      tabIndex={embedUrl ? 0 : undefined}
    >
      {playing && embedUrl ? (
        <iframe
          src={embedUrl.replace('background=1', 'background=0').replace('controls=0', 'controls=1')}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
        />
      ) : (
        <>
          {poster && <img src={poster} alt="" className="full-img" />}
          <div className="video-panel__play">
            <span className="video-panel__play-icon">▶</span>
            <span className="video-panel__play-label">{title}</span>
          </div>
        </>
      )}
      <div className="overlay-bottom pointer-events-none" />
    </div>
  );
}

export default VideoBackground;
