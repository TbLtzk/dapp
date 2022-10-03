import { useEffect, useRef } from 'react';

import { formatNumber } from '@q-dev/utils';
import { animate } from 'framer-motion';

const useAnimateNumber = (
  to: string | number,
  text = ' Q',
  formatter = formatNumber
) => {
  const animateRef = useRef<HTMLDivElement>(null);
  const lastNumber = useRef<number>(0);

  useEffect(() => {
    if (animateRef.current && !isNaN(Number(to))) {
      const node = animateRef.current;
      const controls = animate(lastNumber.current || 0, Number(to), {
        duration: 1,
        onUpdate (value) {
          node.textContent = formatter(value as number) + text;
        },
      });

      lastNumber.current = Number(to);
      return () => controls.stop();
    }
  }, [animateRef, lastNumber, to]);

  return animateRef;
};

export default useAnimateNumber;
