import { useEffect, useRef } from 'react';

import { formatInfinityNumber } from 'func/useful';

function useInfinityNumber (
  initialNumber,
  text = '',
  formatter = formatInfinityNumber,
  increase = 0.0001,
  interval = 100
) {
  const numberRef = useRef();
  const animateRef = useRef();

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
