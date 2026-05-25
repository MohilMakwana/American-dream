import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Full-viewport modal via portal — avoids clipping from slide transform parents.
 */
export function DeckModal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="deck-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`deck-modal ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default DeckModal;
