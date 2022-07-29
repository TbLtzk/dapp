import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen (ref: RefObject<Element>) {
  const [isIntersecting, setIsIntersecting] = useState(true);

  const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));

  useEffect(() => {
    if (!ref?.current) return;

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
