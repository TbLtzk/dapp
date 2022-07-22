import { useEffect, useRef } from 'react';

import { animate } from 'framer-motion';

import { fN } from 'func/useful';

const useAnimateNumber = (to: any, text = ' Q', formatter = fN) => {
  const animateRef = useRef<HTMLDivElement>(null);
  const lastNumber = useRef<HTMLDivElement>();

  useEffect(() => {
    if (animateRef.current && !isNaN(to)) {
      const node = animateRef.current;
      const controls = animate(lastNumber.current || 0, Number(to), {
        duration: 2,
        onUpdate (value) {
          node.textContent = formatter(value) + text;
        },
      });

      lastNumber.current = to;
      return () => controls.stop();
    }
  }, [animateRef, lastNumber, to]);

  return animateRef;
};

export default useAnimateNumber;
