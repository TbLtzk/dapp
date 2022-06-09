import { useEffect, useRef } from 'react';

import { animate } from 'framer-motion/dist/es/index';

const useAnimateNumber = (to, text = ' Q', duration = 3) => {
  const animateRef = useRef();
  const lastNumber = useRef();

  useEffect(() => {
    if (animateRef.current && !isNaN(to) && to) {
      const node = animateRef.current;
      const controls = animate(lastNumber.current || 0, to, {
        duration,
        stiffness: 1,
        onUpdate (value) {
          node.textContent = value.toFixed(4) + text;
        },
        onComplete () {
          node.textContent = to + text;
        },
      });

      lastNumber.current = to;
      return () => controls.stop();
    }
  }, [animateRef, lastNumber, to, duration]);

  return animateRef;
};

export default useAnimateNumber;
