import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLOSE_DELAY_MS = 120;

/**
 * Section nav pill + dropdown anchored directly under the pill (no transform conflict with motion).
 */
export function NavSectionMenu({
  sec,
  section,
  slides,
  currentIndex,
  onJumpToSection,
  onJumpToSlide,
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handleEnter = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const isActiveSection = sec === section;

  return (
    <div
      className="nav-item"
      onMouseEnter={handleEnter}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => onJumpToSection(sec)}
        className={`nav-pill-btn ${isActiveSection ? 'active' : ''}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {sec}
      </button>

      <AnimatePresence>
        {open && (
          <div
            className="nav-dropdown-anchor"
            onMouseEnter={handleEnter}
            onMouseLeave={scheduleClose}
          >
            <motion.div
              role="menu"
              className="nav-dropdown"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.16, ease: [0.15, 1, 0.3, 1] }}
            >
              <div className="nav-dropdown__caret" aria-hidden="true" />
              <p className="nav-dropdown__label">
                {sec} · {slides.length} screens
              </p>
              <ul className="nav-dropdown__list">
                {slides.map((s) => {
                  const slideIndex = s.globalIndex;
                  const isCurrent = slideIndex === currentIndex;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        role="menuitem"
                        className={`nav-dropdown__item ${isCurrent ? 'is-active' : ''}`}
                        onClick={() => {
                          onJumpToSlide(slideIndex);
                          setOpen(false);
                        }}
                      >
                        <span className="nav-dropdown__item-title">{s.title}</span>
                        {isCurrent && <span className="nav-dropdown__dot" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavSectionMenu;
