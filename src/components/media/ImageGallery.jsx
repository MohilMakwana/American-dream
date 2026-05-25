import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Horizontal scroll gallery + lightbox (Digideck-style visual density).
 */
export function ImageGallery({ items = [], title, className = '' }) {
  const [lightbox, setLightbox] = useState(null);

  if (!items?.length) return null;

  return (
    <>
      <div className={`image-gallery ${className}`}>
        {title && <p className="image-gallery__title">{title}</p>}
        <div className="image-gallery__track">
          {items.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              className="image-gallery__card"
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.caption || ''} loading="lazy" decoding="async" />
              <div className="image-gallery__caption">{item.caption}</div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="image-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="image-lightbox__inner"
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="image-lightbox__close" onClick={() => setLightbox(null)}>
                ×
              </button>
              <img src={lightbox.src} alt={lightbox.caption || ''} />
              {lightbox.caption && <p>{lightbox.caption}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImageGallery;
