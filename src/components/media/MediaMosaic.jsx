import { useState } from 'react';
import { motion } from 'framer-motion';

function MosaicCell({ item, i }) {
  const [hoverActive, setHoverActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.figure
      className={`media-mosaic__cell ${item.featured ? 'media-mosaic__cell--featured' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'crosshair', position: 'relative' }}
    >
      {/* Base grayscale image */}
      <img 
        src={item.src} 
        alt={item.caption || ''} 
        loading="lazy" 
        decoding="async" 
        style={{
          filter: 'grayscale(100%) brightness(0.65)',
          transition: 'filter 0.4s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Color overlay with spotlight clip-path (follows cursor position) */}
      <img
        src={item.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          clipPath: hoverActive
            ? `circle(140px at ${mousePos.x}px ${mousePos.y}px)`
            : 'circle(0px at 0px 0px)',
          transition: hoverActive ? 'none' : 'clip-path 0.35s ease-out',
          zIndex: 2,
        }}
      />

      {item.caption && (
        <figcaption style={{ zIndex: 3 }}>{item.caption}</figcaption>
      )}
    </motion.figure>
  );
}

export function MediaMosaic({ items = [], className = '' }) {
  if (!items?.length) return null;

  const layoutClass =
    items.length >= 4 ? 'media-mosaic--four' : items.length === 3 ? 'media-mosaic--three' : 'media-mosaic--two';

  return (
    <div className={`media-mosaic ${layoutClass} ${className}`}>
      {items.map((item, i) => (
        <MosaicCell key={`${item.src}-${i}`} item={item} i={i} />
      ))}
    </div>
  );
}

export default MediaMosaic;