import React, { useRef } from 'react';

import { AnimatePresence as Transition, motion } from 'framer-motion';

import useOnClickOutside from 'hooks/useOnClickOutside';

function AnimatePresence ({ children, open, onClose, initial, animate, exit, ...rest }) {
  const ref = useRef();

  useOnClickOutside(ref, () => onClose());

  return (
    <Transition>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, ...initial }}
          animate={{
            opacity: 1,
            ...animate,
          }}
          exit={{ opacity: 0, ...exit }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </Transition>
  );
}

export default AnimatePresence;
