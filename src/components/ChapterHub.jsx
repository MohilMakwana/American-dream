import { motion } from 'framer-motion';
import { CHAPTERS } from '../data/media';

/**
 * Digideck-style chapter picker — non-linear navigation into any story beat.
 */
export function ChapterHub({ onSelect, onClose }) {
  return (
    <motion.div
      className="chapter-hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="chapter-hub__header">
        <div>
          <span className="section-tag" style={{ marginBottom: 6, color: 'var(--white)' }}>
            Explore the Deck
          </span>
          <h2 className="t-headline" style={{ color: 'var(--white)', marginBottom: 4 }}>
            Choose Your Path
          </h2>
          <p className="t-body" style={{ fontSize: '.88rem', maxWidth: 480 }}>
            Jump to any chapter — retail, luxury, attractions, events, or interactive leasing tools. Built for
            live screen-shares and self-guided prospect tours.
          </p>
        </div>
        <button type="button" className="btn btn-outline btn-pill-sm" onClick={onClose}>
          Close ×
        </button>
      </div>

      <div className="chapter-hub__grid">
        {CHAPTERS.map((ch, i) => (
          <motion.button
            key={ch.id}
            type="button"
            className="chapter-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 + i * 0.04, duration: 0.45, ease: [0.15, 1, 0.3, 1] }}
            onClick={() => onSelect(ch.slideIndex)}
          >
            <div className="chapter-card__media">
              <img src={ch.image} alt="" loading="lazy" decoding="async" />
              {ch.video && (
                <span className="chapter-card__badge">
                  <span aria-hidden>▶</span> Video
                </span>
              )}
              <div className="chapter-card__shade" />
            </div>
            <div className="chapter-card__body">
              <span className="chapter-card__label">{ch.label}</span>
              <h3>{ch.title}</h3>
              <p>{ch.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default ChapterHub;
