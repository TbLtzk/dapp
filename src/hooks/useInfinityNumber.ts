import { useEffect, useRef } from 'react';

import { formatInfinityNumber } from 'utils/useful';

function useInfinityNumber (
  initialNumber: number,
  text = '',
  formatter = formatInfinityNumber,
  increase = 0.0001,
  interval = 100
) {
  const numberRef = useRef<number>();
  const animateRef = useRef<HTMLParagraphElement | HTMLDivElement>(null);

  useEffect(() => {
    if (animateRef.current && !isNaN(initialNumber)) {
      const node = animateRef.current;

      node.textContent = formatter(initialNumber) + text;
      numberRef.current = Number(initialNumber);

      const intervalCount = setInterval(() => {
        const number = numberRef.current;
        numberRef.current = Number(number) + increase;
        node.textContent = formatter(numberRef.current) + text;
      }, interval);

      return () => {
        clearInterval(intervalCount);
      };
    }
  }, [animateRef, numberRef, interval, initialNumber]);

  return animateRef;
}

export default useInfinityNumber;
