import React from 'react';
import { motion } from 'framer-motion';

/**
 * Digideck-style split panel: full-height visual + narrative column.
 * visualWrapper — optional React element to wrap the visual column (e.g. MagneticCard for tilt)
 */
export function SplitMedia({
  visual,
  children,
  reverse = false,
  className = '',
  visualClassName = '',
  visualWrapper = null,
}) {
  const visualCol = (
    <motion.div
      className={`split-media__visual ${visualClassName}`}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.15, 1, 0.3, 1] }}
    >
      {visual}
    </motion.div>
  );

  return (
    <div className={`split-media ${reverse ? 'split-media--reverse' : ''} ${className}`}>
      {visualWrapper
        ? React.cloneElement(visualWrapper, {}, visualCol)
        : visualCol
      }
      <div className="split-media__copy">{children}</div>
    </div>
  );
}

export default SplitMedia;
